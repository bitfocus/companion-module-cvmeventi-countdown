import type { ModuleInstance } from './main.js'
import {CompanionVariableDefinition, CompanionVariableValues} from '@companion-module/base/dist/index.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
  const variableDefs = [
    {
      name: 'State of timer (Not Running, Running, Paused, Expired)',
      variableId: 'state'
    },
    {
      name: 'Current time (hh:mm:ss)',
      variableId: 'currentTimeHms'
    },
    {
      name: 'Current time (mm:ss)',
      variableId: 'currentTimeMs'
    },
    {
      name: 'Current time (hours only)',
      variableId: 'currentTimeH'
    },
    {
      name: 'Current time (minutes only)',
      variableId: 'currentTimeM'
    },
    {
      name: 'Current time (seconds only)',
      variableId: 'currentTimeS'
    },
    {
      name: 'Current time (in seconds)',
      variableId: 'currentTime'
    },
    {
      name: 'Time set on current timer (hh:mm:ss)',
      variableId: 'timeSetOnCurrentTimerHms'
    },
    {
      name: 'Time set on current timer (mm:ss)',
      variableId: 'timeSetOnCurrentTimerMs'
    },
    {
      name: 'Time set on current timer (hours only)',
      variableId: 'timeSetOnCurrentTimerH'
    },
    {
      name: 'Time set on current timer (minutes only)',
      variableId: 'timeSetOnCurrentTimerM'
    },
    {
      name: 'Time set on current timer (seconds only)',
      variableId: 'timeSetOnCurrentTimerS'
    },
    {
      name: 'Time set on current timer (in seconds)',
      variableId: 'timeSetOnCurrentTimer'
    },
    {
      name: 'Set time (in seconds)',
      variableId: 'setTime'
    },
    {
      name: 'Set time (hh:mm:ss)',
      variableId: 'setTimeHms'
    },
    {
      name: 'Set time (mm:ss)',
      variableId: 'setTimeMs'
    },
    {
      name: 'Set time (hours only)',
      variableId: 'setTimeH'
    },
    {
      name: 'Set time (minutes only)',
      variableId: 'setTimeM'
    },
    {
      name: 'Set time (seconds only)',
      variableId: 'setTimeS'
    },
  ]

  let variables: CompanionVariableDefinition[] = []
  let defaultValues: CompanionVariableValues = {}
  Object.keys(self.timers).forEach(key => {
    variableDefs.forEach(genericDefinition => {
      const definition = {
        name: `${self.timers[key].name} - ${genericDefinition.name}`,
        variableId: `${key}-${genericDefinition.variableId}`,
      }
      variables.push(definition)
    })

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
    }
  })

  self.setVariableDefinitions(variables)
  self.setVariableValues(defaultValues)
}