import type ModuleInstance from './main.js'
import type { CompanionVariableValues, CompanionVariableDefinitions } from '@companion-module/base'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
  const variableDefs: CompanionVariableDefinitions = {
  state: {
    name: 'State of timer (Not Running, Running, Paused, Expired)',
  },
  currentTimeHms: {
    name: 'Current time (hh:mm:ss)',
  },
  currentTimeMs: {
    name: 'Current time (mm:ss)',
  },
  currentTimeH: {
    name: 'Current time (hours only)',
  },
  currentTimeM: {
    name: 'Current time (minutes only)',
  },
  currentTimeS: {
    name: 'Current time (seconds only)',
  },
  currentTime: {
    name: 'Current time (in seconds)',
  },
  timeSetOnCurrentTimerHms: {
    name: 'Time set on current timer (hh:mm:ss)',
  },
  timeSetOnCurrentTimerMs: {
    name: 'Time set on current timer (mm:ss)',
  },
  timeSetOnCurrentTimerH: {
    name: 'Time set on current timer (hours only)',
  },
  timeSetOnCurrentTimerM: {
    name: 'Time set on current timer (minutes only)',
  },
  timeSetOnCurrentTimerS: {
    name: 'Time set on current timer (seconds only)',
  },
  timeSetOnCurrentTimer: {
    name: 'Time set on current timer (in seconds)',
  },
  setTime: {
    name: 'Set time (in seconds)',
  },
  setTimeHms: {
    name: 'Set time (hh:mm:ss)',
  },
  setTimeMs: {
    name: 'Set time (mm:ss)',
  },
  setTimeH: {
    name: 'Set time (hours only)',
  },
  setTimeM: {
    name: 'Set time (minutes only)',
  },
  setTimeS: {
    name: 'Set time (seconds only)',
  },
  timerAndsAt: {
    name: 'Timer ends at (mm:ss)',
  }
}

  let variables: CompanionVariableDefinitions = {}
  let defaultValues: CompanionVariableValues = {}
  Object.keys(self.timers).forEach(key => {
    for (const [defKey, defValue] of Object.entries(variableDefs)) {
      variables[`${key}-${defKey}`] = {
        name: `${self.timers[key].name} - ${defValue.name}`,
      }
    }

    defaultValues = {
      ...defaultValues,
      [`${key}-state`]: 'Not Running',
      [`${key}-currentTimeHms`]: '00:00:00',
      [`${key}-currentTimeMs`]: '00:00',
      [`${key}-currentTimeH`]: '00',
      [`${key}-currentTimeM`]: '00',
      [`${key}-currentTime`]: '00',
      [`${key}-currentTime`]: '0',
      [`${key}-timeSetOnCurrentTimerHms`]: '00:00:00',
      [`${key}-timeSetOnCurrentTimerMs`]: '00:00',
      [`${key}-timeSetOnCurrentTimerH`]: '00',
      [`${key}-timeSetOnCurrentTimerM`]: '00',
      [`${key}-timeSetOnCurrentTimerS`]: '00',
      [`${key}-timeSetOnCurrentTimer`]: '0',
      [`${key}-setTimeHms`]: '00:00:00',
      [`${key}-setTimeMs`]: '00:00',
      [`${key}-setTimeH`]: '00',
      [`${key}-setTimeM`]: '00',
      [`${key}-setTimeS`]: '00',
      [`${key}-setTime`]: '0',
      [`${key}-timerEndsAt`]: '00:00',
    }
  })

  self.setVariableDefinitions(variables)
  self.setVariableValues(defaultValues)
}