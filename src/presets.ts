import type { ModuleInstance } from './main.js'
import {combineRgb, CompanionPresetDefinitions} from '@companion-module/base'

const black = combineRgb(0,0,0);
const white = combineRgb(255,255,255);
const green = combineRgb(0,255,0);
const grey = combineRgb(72,72,72);
const yellow = combineRgb(255,255,0);
const red = combineRgb(255,0,0);

export function UpdatePresets(self: ModuleInstance): void {
  let presets: CompanionPresetDefinitions = {};

  const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  Object.keys(self.timers).forEach(key => {
    // Time Presets (set only)
    minutes.forEach((minute) => {
      presets[`${key}-timePreset${minute}`] = {
        category: `${self.timers[key].name}: Time Presets`,
        feedbacks: [],
        name: `${minute}m`,
        type: 'button',
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
              timerId: key,
              hours: minute > 59 ? 1 : 0,
              minutes: minute < 60 ? minute : 0,
              seconds: 0,
            }
          }],
          up: [],
        }]
      }
    })

    // Time Presets (auto start)
    minutes.forEach((minute) => {
      presets[`${key}-timePresetAS${minute}`] = {
        category: `${self.timers[key].name}: Time Presets (auto start)`,
        feedbacks: [],
        name: `${minute}m`,
        type: 'button',
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
              timerId: key,
              hours: minute > 59 ? 1 : 0,
              minutes: minute < 60 ? minute : 0,
              seconds: 0,
            }
          },
            {
              actionId: 'start',
              delay: 100,
              options: {timerId: key},
            }],
          up: [],
        }]
      };
    })

    presets.startTimer = {
      category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Start Timer',
      type: 'button',
      style: {
        text: '⏵',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'start',
          options: {timerId: key},
        }],
        up: [],
      }]
    };
    presets.pauseTimer = {
      category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Pause Timer',
      type: 'button',
      style: {
        text: '⏸',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'pause',
          options: {timerId: key},
        }],
        up: [],
      }]
    };
    presets.toggleTimer = {
      category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Toggle Pause/Resume Timer',
      type: 'button',
      style: {
        text: '⏯',
        size: '30',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'toggle',
          options: {timerId: key},
        }],
        up: [],
      }]
    };
    presets.resumeTimer = {
      category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Resume Timer',
      type: 'button',
      style: {
        text: 'Resume',
        size: '18',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'resume',
          options: {timerId: key},
        }],
        up: [],
      }]
    };
    presets.resetTimer = {
      category: `${self.timers[key].name}: Control`,
      feedbacks: [],
      name: 'Reset Timer',
      type: 'button',
      style: {
        text: 'Reset',
        size: '18',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [{
          actionId: 'reset',
          options: {timerId: key},
        }],
        up: [],
      }]
    };
    presets.jogSetTimerPlus1 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+1 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogSetTimerPlus5 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+5 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogSetTimerPlus10 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '+10 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogSetTimerMinus1 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-1 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogSetTimerMinus5 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-5 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogSetTimerMinus10 = {
      category: `${self.timers[key].name}: Jog Set Timer`,
      feedbacks: [],
      name: '-10 Jog Set Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerPlus1 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+1 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerPlus5 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+5 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerPlus10 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '+10 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: 10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerMinus1 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-1 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -1,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerMinus5 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-5 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -5,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets.jogCurrentTimerMinus10 = {
      category: `${self.timers[key].name}: Jog Current Timer`,
      feedbacks: [],
      name: '-10 Jog Current Timer',
      type: 'button',
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
            timerId: key,
            hours: 0,
            minutes: -10,
            seconds: 0,
          },
        }],
        up: [],
      }]
    };
    presets[`${key}-currentTimeHms`] = {
      category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            'timerId': key,
            'colRunningFg': white,
            'colRunningBg': green,
            'colPausedFg': white,
            'colPausedBg': grey,
            'colExpiringFg': black,
            'colExpiringBg': yellow,
            'colExpiredFg': white,
            'colExpiredBg': red,
            'colNotRunningFg': white,
            'colNotRunningBg': black
          }
        }
      ],
      name: 'Current Time HH:MM:SS',
      type: 'button',
      style: {
        text: `$(cvmeventi-countdown:${key}-currentTimeHms)`,
        size: '14',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }]
    }
    presets[`${key}-currentTimeMs`] = {
      category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            'timerId': key,
            'colRunningFg': white,
            'colRunningBg': green,
            'colPausedFg': white,
            'colPausedBg': grey,
            'colExpiringFg': black,
            'colExpiringBg': yellow,
            'colExpiredFg': white,
            'colExpiredBg': red,
            'colNotRunningFg': white,
            'colNotRunningBg': black
          }
        }
      ],
      name: 'Current Time MM:SS',
      type: 'button',
      style: {
        text: `$(cvmeventi-countdown:${key}-currentTimeMs)`,
        size: '24',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }]
    }
    presets[`${key}-currentState`] = {
      category: `${self.timers[key].name}: Current Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            'timerId': key,
            'colRunningFg': white,
            'colRunningBg': green,
            'colPausedFg': white,
            'colPausedBg': grey,
            'colExpiringFg': black,
            'colExpiringBg': yellow,
            'colExpiredFg': white,
            'colExpiredBg': red,
            'colNotRunningFg': white,
            'colNotRunningBg': black
          }
        }
      ],
      name: 'Current State',
      type: 'button',
      style: {
        text: `$(cvmeventi-countdown:${key}-state)`,
        size: 'auto',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }]
    }

    presets[`${key}-setTimeHms`] = {
      category: `${self.timers[key].name}: Set Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            'timerId': key,
            'colRunningFg': white,
            'colRunningBg': green,
            'colPausedFg': white,
            'colPausedBg': grey,
            'colExpiringFg': black,
            'colExpiringBg': yellow,
            'colExpiredFg': white,
            'colExpiredBg': red,
            'colNotRunningFg': white,
            'colNotRunningBg': black
          }
        }
      ],
      name: 'Set Time HH:MM:SS',
      type: 'button',
      style: {
        text: `$(cvmeventi-countdown:${key}-setTimeHms)`,
        size: '14',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }]
    }
    presets[`${key}-setTimeMs`] = {
      category: `${self.timers[key].name}: Set Time`,
      feedbacks: [
        {
          feedbackId: 'state_color',
          options: {
            'timerId': key,
            'colRunningFg': white,
            'colRunningBg': green,
            'colPausedFg': white,
            'colPausedBg': grey,
            'colExpiringFg': black,
            'colExpiringBg': yellow,
            'colExpiredFg': white,
            'colExpiredBg': red,
            'colNotRunningFg': white,
            'colNotRunningBg': black
          }
        }
      ],
      name: 'Set Time MM:SS',
      type: 'button',
      style: {
        text: `$(cvmeventi-countdown:${key}-setTimeMs)`,
        size: '24',
        color: white,
        bgcolor: black
      },
      steps: [{
        down: [],
        up: [],
      }]
    }
  })

  self.setPresetDefinitions(presets);
}