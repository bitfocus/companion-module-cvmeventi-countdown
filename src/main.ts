import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import WebSocket from 'ws'
import {UpdatePresets} from './presets.js'
import {CompanionVariableValues} from '@companion-module/base/dist/index.js'

interface TimerState {
  state: string
  setTime: number,
  setTimeHms: string,
  setTimeMs: string,
  setTimeH: string,
  setTimeM: string,
  setTimeS: string,
  currentTimeHms?: string
  currentTimeMs?: string
  currentTimeH?: string
  currentTimeM?: string
  currentTimeS?: string
  currentTime?: number
  timeSetOnCurrentTimer?: number
  timeSetOnCurrentTimerHms?: string
  timeSetOnCurrentTimerMs?: string
  timeSetOnCurrentTimerH?: string
  timeSetOnCurrentTimerM?: string
  timeSetOnCurrentTimerS?: string
  timerEndsAt?: string
}

interface TimerStates {
  [key: string]: TimerState
}

interface Timer {
  name: string
}

interface Timers {
  [key: string]: Timer
}

export class ModuleInstance extends InstanceBase<ModuleConfig> {
  config!: ModuleConfig // Setup in init()
  timers: Timers = {}
  ws: WebSocket|null = null
  reconnectTimer: NodeJS.Timeout|null = null
  states: TimerStates = {}

  constructor(internal: unknown) {
    super(internal)
  }

  async init(config: ModuleConfig): Promise<void> {
    this.log('info', 'Countdown init')
    this.config = config
    await this.configUpdated(config);

    if ((await this.loadTimers())) {
      this.updateVariableDefinitions() // export variable definitions
      this.updateActions() // export actions
      this.updateFeedbacks() // export feedbacks
      this.log('debug', JSON.stringify(this.timers));
      this.updatePresets();
      this.log('debug', "Countdown module initiated");
      this.updateStatus(InstanceStatus.Ok);
    } else {
      this.updateStatus(InstanceStatus.ConnectionFailure)
    }
  }
  // When module gets deleted
  async destroy(): Promise<void> {
    this.log('debug', 'destroy')
    this.updateStatus(InstanceStatus.Disconnected, "Disabled");

  }

  async loadTimers() {
    const ip = this.config.ip;
    const port = this.config.port;
    try {
      const response = await fetch(`http://${ip}:${port}/timers`)
      this.timers = await response.json() as Timers
      return true
    } catch (error: any) {
      this.log('error', error);
      return false
    }
  }

  async configUpdated(config: ModuleConfig): Promise<void> {
    this.config = config
    this.initWebSocket();
    this.updateStatus(InstanceStatus.Ok);
  }

  // Return config fields for web config
  getConfigFields(): SomeCompanionConfigField[] {
    return GetConfigFields()
  }

  updateActions(): void {
    UpdateActions(this)
  }

  updateFeedbacks(): void {
    UpdateFeedbacks(this)
  }

  updateVariableDefinitions(): void {
    UpdateVariableDefinitions(this)
  }

  updatePresets(): void {
    UpdatePresets(this)
  }

  initWebSocket() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    const ip = this.config.ip;
    const port = this.config.port;
    this.updateStatus(InstanceStatus.Connecting);
    if (!ip || !port) {
      this.updateStatus(InstanceStatus.BadConfig, `Configuration error - no WebSocket host and/or port defined`);
      return
    }

    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.close(1000);
      this.ws = null
    }
    this.ws = new WebSocket(`ws://${ip}:${port}/ws`);

    this.ws.on('open', () => {
      this.log('debug', `Connection opened`);
      this.updateStatus(InstanceStatus.Ok);
      /*if (this.config.reset_variables) {
        this.updateVariables();
      }*/
    })
    this.ws.on('close', (code) => {
      this.log('debug', `Connection closed with code ${code}`);
      this.updateStatus(InstanceStatus.ConnectionFailure, `Connection closed with code ${code}`);
      this.maybeReconnect();
    })

    this.ws.on('message', this.messageReceivedFromWebSocket.bind(this));

    this.ws.on('error', (data) => {
      this.log('error', `WebSocket error: ${data}`);
      this.maybeReconnect();
    })
  }

  maybeReconnect() {
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(() => {
        this.initWebSocket()
      }, 5000)
    }
  }

  messageReceivedFromWebSocket(data: any) {
    let msgValue = null
    try {
      msgValue = JSON.parse(data)
    } catch (e) {
      return;
    }
    this.log('debug', `Message received: ${data}`);

    const update = msgValue.update;

    if (msgValue.type === 'timerEngine') {
      this.log('debug', 'Timer Engine update')
      this.states[update.timerId] = {
        ...this.states[update.timerId],
        ...update,
      }

      if ('state' in update) {
        this.checkFeedbacks('state_color');
      }

      if ('timeSetOnCurrentTimer' in update && 'currentTime' in update) {
        this.checkFeedbacks('progress_bar');
      }

      let variableValues: CompanionVariableValues = {};
      Object.keys(update).forEach(function(key) {
        if (key === 'timerId') return
        variableValues[`${update.timerId}-${key}`] = update[key];
      });
      this.setVariableValues(variableValues);
    }
  }
}

runEntrypoint(ModuleInstance, UpgradeScripts)