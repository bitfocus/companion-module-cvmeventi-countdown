import {combineRgb, CompanionAdvancedFeedbackResult, CompanionFeedbackDefinitions} from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import {graphics} from 'companion-module-utils'
import {CompanionInputFieldDropdown} from '@companion-module/base/dist/index.js'

const black = combineRgb(0,0,0);
const white = combineRgb(255,255,255);
const green = combineRgb(0,255,0);
const grey = combineRgb(72,72,72);
const yellow = combineRgb(255,255,0);
const red = combineRgb(255,0,0);

const mapping: {[key: string]: string} = {
  "Not Running": "NOT_RUNNING",
  "Running": "RUNNING",
  "Expiring": "EXPIRING",
  "Expired": "EXPIRED",
  "Paused": "PAUSED",
}

export function UpdateFeedbacks(self: ModuleInstance): void {
  let feedbacks: CompanionFeedbackDefinitions = {};

  const choices = Object.keys(self.timers).map(key => {
    return {id: key, label: self.timers[key].name}
  });
  const timerIdOption: CompanionInputFieldDropdown = {
    id: 'timerId',
    type: 'dropdown',
    label: 'Timer',
    choices: choices,
    default: choices[0].id
  }

  feedbacks.state_color = {
    type: 'advanced',
    name: 'Countdown State',
    description: 'Change button color on state change',
    options: [
      timerIdOption,
      {
        type: 'colorpicker',
        label: 'Running state foreground',
        id: 'colRunningFg',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Running state background',
        id: 'colRunningBg',
        default: green,
      },
      {
        type: 'colorpicker',
        label: 'Paused state foreground',
        id: 'colPausedFg',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Paused state background',
        id: 'colPausedBg',
        default: grey,
      },
      {
        type: 'colorpicker',
        label: 'Expiring state foreground',
        id: 'colExpiringFg',
        default: black,
      },
      {
        type: 'colorpicker',
        label: 'Expiring state background',
        id: 'colExpiringBg',
        default: yellow,
      },
      {
        type: 'colorpicker',
        label: 'Expired state foreground',
        id: 'colExpiredFg',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Expired state background',
        id: 'colExpiredBg',
        default: red,
      },
      {
        type: 'colorpicker',
        label: 'Not Running state foreground',
        id: 'colNotRunningFg',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Not Running state background',
        id: 'colNotRunningBg',
        default: black,
      }
    ],
    callback: (feedback): CompanionAdvancedFeedbackResult => {
      //console.log(`Check ${self.feedbackstate.colour}`);
      if (!Object.keys(self.states).includes(feedback.options.timerId as string)) {
        return {
          color: feedback.options.colNotRunningFg as number,
          bgcolor: feedback.options.colNotRunningBg as number
        }
      }

      const state = mapping[self.states[feedback.options.timerId as string].state]

      if (state === 'RUNNING') {
        return {
          color: feedback.options.colRunningFg as number,
          bgcolor: feedback.options.colRunningBg as number
        }
      } else if (state === 'PAUSED') {
        return {
          color: feedback.options.colPausedFg as number,
          bgcolor: feedback.options.colPausedBg as number
        };
      } else if (state === 'EXPIRING') {
        return {
          color: feedback.options.colExpiringFg as number,
          bgcolor: feedback.options.colExpiringBg as number
        };
      }
      else if (state === 'EXPIRED') {
        return {
          color: feedback.options.colExpiredFg as number,
          bgcolor: feedback.options.colExpiredBg as number
        };
      }
      else if (state === 'NOT_RUNNING') {
        return {
          color: feedback.options.colNotRunningFg as number,
          bgcolor: feedback.options.colNotRunningBg as number
        }
      }

      return {};
    }
  }
  feedbacks.progress_bar = {
    type: 'advanced',
    name: 'Progress Bar',
    description: 'Show a progress bar on button',
    options: [
      timerIdOption,
      {
        id: 'hideWhenNotRunning',
        type: 'checkbox',
        label: 'Hide when not running',
        default: true,
      },
      {
        type: 'colorpicker',
        label: 'Running color',
        id: 'runningColor',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Expiring color',
        id: 'expiringColor',
        default: white,
      },
      {
        type: 'colorpicker',
        label: 'Expired',
        id: 'expiredColor',
        default: white,
      },
    ],
    callback: async (feedback) => {
      if (!Object.keys(self.states).includes(feedback.options.timerId as string)) {
        return {}
      }

      const state = mapping[self.states[feedback.options.timerId as string].state]

      if (feedback.options.hideWhenNotRunning && state === "NOT_RUNNING") {
        return {}
      }

      const progress = 100 * self.states[feedback.options.timerId as string].currentTime! / self.states[feedback.options.timerId as string].timeSetOnCurrentTimer!

      const isExpiring = state === "EXPIRING";
      const isExpired = state === "EXPIRED";
      let colors: graphics.BarColor[];

      if (isExpiring) {
        colors = [
          { size: 100, color: feedback.options.expiringColor as number, background: feedback.options.expiringColor as number, backgroundOpacity: 64 },
        ]
      } else if (isExpired) {
        colors = [
          { size: 100, color: feedback.options.expiredColor as number, background: feedback.options.expiredColor as number, backgroundOpacity: 64 },
        ]
      } else {
        colors = [
          { size: 100, color: feedback.options.runningColor as number, background: feedback.options.runningColor as number, backgroundOpacity: 64 },
        ]
      }

      const options: graphics.OptionsBar = {
        width: feedback.image?.width ?? 0,
        height: feedback.image?.height ?? 0,
        colors: colors,
        barLength: 62,
        barWidth: 8,
        value:  !isExpired ? progress : 100,
        type: 'horizontal',
        offsetX: 5,
        offsetY: feedback.image?.height ?? 0 > 58 ? 62 : 48,
        opacity: 255
      }

      return {
        imageBuffer: graphics.bar(options)
      }
    },
  }

  self.setFeedbackDefinitions(feedbacks)
}