import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import type ModuleInstance from './main.js'
import { combineRgb } from '@companion-module/base'

const black = combineRgb(0,0,0);
const white = combineRgb(255,255,255);
const green = combineRgb(0,255,0);
const grey = combineRgb(72,72,72);
const yellow = combineRgb(255,255,0);
const red = combineRgb(255,0,0);

export function UpdatePresets(self: ModuleInstance): void {
  let presets: CompanionPresetDefinitions = {};

  const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  Object.keys(self.timers).forEach((timerId) => {
    // Time Presets (set only)
    minutes.forEach((minute) => {
      presets[`${timerId}-timePreset${minute}`] = {
        //category: `${self.timers[key].name}: Time Presets`,
        feedbacks: [],
        name: `${minute}m`,
        type: 'simple',
        style: {
          text: `${minute}`,
          size: '30',
          color: white,
          bgcolor: black,
        },
        steps: [{
          down: [{
            actionId: 'set',
            options: {
              timerId: { isExpression: true, value: `$(local:timer)` },
              hours: minute > 59 ? 1 : 0,
              minutes: minute < 60 ? minute : 0,
              seconds: 0,
            }
          }],
          up: [],
        }],
        localVariables: [
          { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
        ]
      }
    })

    // Time Presets (auto start)
    minutes.forEach((minute) => {
      presets[`${timerId}-timePresetAS${minute}`] = {
        //category: `${self.timers[key].name}: Time Presets (auto start)`,
        feedbacks: [],
        name: `${minute}m`,
        type: 'simple',
        style: {
          text: `${minute}`,
          size: '30',
          color: white,
          bgcolor: black,
        },
        steps: [{
          down: [{
            actionId: 'set',
            options: {
              timerId: { isExpression: true, value: `$(local:timer)` },
              hours: minute > 59 ? 1 : 0,
              minutes: minute < 60 ? minute : 0,
              seconds: 0,
            }
          },
            {
              actionId: 'start',
              delay: 100,
              options: {timerId: { isExpression: true, value: `$(local:timer)` }},
            }],
          up: [],
        }],
        localVariables: [
          { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
        ]
      };
    })

    presets[`${timerId}-startTimer`] = {
      //category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Start Timer',
      type: 'simple',
      style: {
        text: '⏵',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'start',
          options: {timerId: { isExpression: true, value: `$(local:timer)` }},
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-pauseTimer`] = {
      //category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Pause Timer',
      type: 'simple',
      style: {
        text: '⏸',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'pause',
          options: {timerId: { isExpression: true, value: `$(local:timer)` }},
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-toggleTimer`] = {
      //category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Toggle Pause/Resume Timer',
      type: 'simple',
      style: {
        text: '⏯',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'toggle',
          options: {timerId: { isExpression: true, value: `$(local:timer)` }},
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-resumeTimer`] = {
      //category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Resume Timer',
      type: 'simple',
      style: {
        text: 'Resume',
        size: '18',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'resume',
          options: {timerId: { isExpression: true, value: `$(local:timer)` }},
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-resetTimer`] = {
      //category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Reset Timer',
      type: 'simple',
      style: {
        text: 'Reset',
        size: '18',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'reset',
          options: {timerId: { isExpression: true, value: `$(local:timer)` }},
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-jogSetTimerPlus1`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+1 Jog Set Timer',
      type: 'simple',
      style: {
        text: '+1',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 1,
            seconds: 0,
          },
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-jogSetTimerPlus5`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+5 Jog Set Timer',
      type: 'simple',
      style: {
        text: '+5',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 5,
            seconds: 0,
          },
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-jogSetTimerPlus10`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+10 Jog Set Timer',
      type: 'simple',
      style: {
        text: '+10',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 10,
            seconds: 0,
          },
        }],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    };
    presets[`${timerId}-jogSetTimerMinus1`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-1 Jog Set Timer',
      type: 'simple',
      style: {
        text: '-1',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };

    presets[`${timerId}-jogSetTimerMinus5`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-5 Jog Set Timer',
      type: 'simple',
      style: {
        text: '-5',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogSetTimerMinus10`] = {
      //category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-10 Jog Set Timer',
      type: 'simple',
      style: {
        text: '-10',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-set',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerPlus1`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+1 Jog Current Timer',
      type: 'simple',
      style: {
        text: '+1',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerPlus5`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+5 Jog Current Timer',
      type: 'simple',
      style: {
        text: '+5',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerPlus10`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+10 Jog Current Timer',
      type: 'simple',
      style: {
        text: '+10',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: 10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerMinus1`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-1 Jog Current Timer',
      type: 'simple',
      style: {
        text: '-1',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerMinus5`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-5 Jog Current Timer',
      type: 'simple',
      style: {
        text: '-5',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-jogCurrentTimerMinus10`] = {
      //category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-10 Jog Current Timer',
      type: 'simple',
      style: {
        text: '-10',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'jog-current',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            hours: 0,
            minutes: -10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${timerId}-currentTimeHms`] = {
      //category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            colRunningFg: white,
            colRunningBg: green,
            colPausedFg: white,
            colPausedBg: grey,
            colExpiringFg: black,
            colExpiringBg: yellow,
            colExpiredFg: white,
            colExpiredBg: red,
            colNotRunningFg: white,
            colNotRunningBg: black
          }
        }
      ],
      name: 'Current Time HH:MM:SS',
      type: 'simple',
      style: {
        text: `$(cvmeventi-countdown:$(local:timer)-currentTimeHms)`,
        size: '14',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    }
    presets[`${timerId}-currentTimeMs`] = {
      //category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            colRunningFg: white,
            colRunningBg: green,
            colPausedFg: white,
            colPausedBg: grey,
            colExpiringFg: black,
            colExpiringBg: yellow,
            colExpiredFg: white,
            colExpiredBg: red,
            colNotRunningFg: white,
            colNotRunningBg: black
          }
        }
      ],
      name: 'Current Time MM:SS',
      type: 'simple',
      style: {
        text: `$(cvmeventi-countdown:$(local:timer)-currentTimeMs)`,
        size: '24',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    }
    presets[`${timerId}-currentState`] = {
      //category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            colRunningFg: white,
            colRunningBg: green,
            colPausedFg: white,
            colPausedBg: grey,
            colExpiringFg: black,
            colExpiringBg: yellow,
            colExpiredFg: white,
            colExpiredBg: red,
            colNotRunningFg: white,
            colNotRunningBg: black
          }
        }
      ],
      name: 'Current State',
      type: 'simple',
      style: {
        text: `$(cvmeventi-countdown:$(local:timer)-state)`,
        size: 'auto',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    }

    presets[`${timerId}-setTimeHms`] = {
      //category: `${self.timers[key].name}: Set Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            colRunningFg: white,
            colRunningBg: green,
            colPausedFg: white,
            colPausedBg: grey,
            colExpiringFg: black,
            colExpiringBg: yellow,
            colExpiredFg: white,
            colExpiredBg: red,
            colNotRunningFg: white,
            colNotRunningBg: black
          }
        }
      ],
      name: 'Set Time HH:MM:SS',
      type: 'simple',
      style: {
        text: `$(cvmeventi-countdown:$(local:timer)-setTimeHms)`,
        size: '14',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    }
    presets[`${timerId}-setTimeMs`] = {
      //category: `${self.timers[key].name}: Set Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            timerId: { isExpression: true, value: `$(local:timer)` },
            colRunningFg: white,
            colRunningBg: green,
            colPausedFg: white,
            colPausedBg: grey,
            colExpiringFg: black,
            colExpiringBg: yellow,
            colExpiredFg: white,
            colExpiredBg: red,
            colNotRunningFg: white,
            colNotRunningBg: black
          }
        }
      ],
      name: 'Set Time MM:SS',
      type: 'simple',
      style: {
        text: `$(cvmeventi-countdown:$(local:timer)-setTimeMs)`,
        size: '24',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }],
      localVariables: [
        { variableType: 'simple', variableName: 'timer', startupValue: timerId, headline: 'Timer ID' }
      ]
    }
  })

  const structure: CompanionPresetSection[] = [
    {
      id: 'control',
      name: 'Control',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: [
            `${timerId}-startTimer`,
            `${timerId}-pauseTimer`,
            `${timerId}-toggleTimer`,
            `${timerId}-resumeTimer`,
            `${timerId}-resetTimer`,
          ],
          id: `${timerId}-control`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'current-time',
      name: 'Current time',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: [
            `${timerId}-currentTimeHms`,
            `${timerId}-currentTimeMs`,
            `${timerId}-currentState`,
          ],
          id: `${timerId}-current-time`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'set-time',
      name: 'Set time',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: [
            `${timerId}-setTimeHms`,
            `${timerId}-setTimeMs`,
          ],
          id: `${timerId}-set-time`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'jog-current',
      name: 'Jog current time',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: [
            `${timerId}-jogCurrentTimerPlus1`,
            `${timerId}-jogCurrentTimerPlus5`,
            `${timerId}-jogCurrentTimerPlus10`,
            `${timerId}-jogCurrentTimerMinus1`,
            `${timerId}-jogCurrentTimerMinus5`,
            `${timerId}-jogCurrentTimerMinus10`,
          ],
          id: `${timerId}-jog-current`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'jog-set',
      name: 'Jog set time',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: [
            `${timerId}-jogSetTimerPlus5`,
            `${timerId}-jogSetTimerPlus1`,
            `${timerId}-jogSetTimerPlus10`,
            `${timerId}-jogSetTimerMinus1`,
            `${timerId}-jogSetTimerMinus5`,
            `${timerId}-jogSetTimerMinus10`,
          ],
          id: `${timerId}-jog-set`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'time-presets',
      name: 'Time presets',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: minutes.map(time => `${timerId}-timePreset${time}`),
          id: `${timerId}-time-presets`,
          name: `${timer.name}`
        }
      })
    },
    {
      id: 'time-presets-as',
      name: 'Time presets (auto start)',
      definitions: Object.entries(self.timers).map(([timerId, timer]): CompanionPresetGroup => {
        return {
          type: 'simple',
          presets: minutes.map(time => `${timerId}-timePresetAS${time}`),
          id: `${timerId}-time-presets-as`,
          name: `${timer.name}`
        }
      })
    }
  ]

  self.setPresetDefinitions(structure, presets);
}