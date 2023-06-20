import { InstanceBase, runEntrypoint, combineRgb, InstanceStatus } from '@companion-module/base';
import WebSocket from 'ws';
import presets from './presets.js';
import actions from './actions.js';
import variables from './variables.js';
import configFields from './configFields.js';
import UpgradeScripts from './upgrades.js'
import feedbacks from './feedbacks.js';

class CountdownInstance extends InstanceBase {
    constructor(internal) {
        super(internal);
        Object.assign(this, {
            ...presets,
            ...actions,
            ...variables,
            ...configFields,
            ...feedbacks,
        });
        this.feedbackState = "NOT_RUNNING";
        this.progress = 0;
    }

    destroy() {
        this.updateStatus(InstanceStatus.Disconnected, "Disabled");
        this.oscListener.destroy();

        if (this.ws !== undefined) {
            this.ws.close(1000);
            delete this.ws;
        }
    }

    async init(config) {
        console.log('Countdown init');
        this.configUpdated(config);
        this.initWebSocket();
        this.initVariables();
        this.setActionDefinitions(this.actions());
        this.setFeedbackDefinitions(this.feedbacks());
        this.presets();
        this.log('debug', "Countdown module initiated");
        this.updateStatus(InstanceStatus.Ok);

    }

    maybeReconnect() {
        if (!this.reconnectTimer) {
            this.reconnectTimer = setTimeout(() => {
                this.initWebSocket()
            }, 5000)
        }
    }

    configUpdated(config) {
        this.config = config;
        this.initWebSocket();
        this.updateStatus(InstanceStatus.Ok);
    };

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
            delete this.ws;
        }
        this.ws = new WebSocket(`ws://${ip}:${port}/ws`);

        this.ws.on('open', () => {
            this.log('debug', `Connection opened`);
            this.updateStatus(InstanceStatus.Ok);
            if (this.config.reset_variables) {
                this.updateVariables();
            }
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

    messageReceivedFromWebSocket(data) {
        let msgValue = null
        try {
            msgValue = JSON.parse(data)
        } catch (e) {
            return;
        }
        this.log('debug', `Message received: ${data}`);

        if ('state' in msgValue) {
            const state = msgValue['state']
            const mapping = {
                "Not Running": "NOT_RUNNING",
                "Running": "RUNNING",
                "Expiring": "EXPIRING",
                "Expired": "EXPIRED",
                "Paused": "PAUSED",
            }

            this.feedbackState = mapping[state];
            this.checkFeedbacks('state_color');
        }

        if ('timeSetOnCurrentTimer' in msgValue && 'currentTime' in msgValue) {
            this.progress = parseInt(100 * msgValue['currentTime'] / msgValue['timeSetOnCurrentTimer'])
            this.checkFeedbacks('progress_bar');
        }

        let variableValues = {};
        Object.keys(msgValue).forEach(function(key, index) {
            variableValues[key] = msgValue[key];
        });
        this.setVariableValues(variableValues);
    }
}

runEntrypoint(CountdownInstance, UpgradeScripts);