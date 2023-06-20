import { combineRgb } from "@companion-module/base";
import { graphics } from 'companion-module-utils';

const black = combineRgb(0,0,0);
const white = combineRgb(255,255,255);
const green = combineRgb(0,255,0);
const grey = combineRgb(72,72,72);
const yellow = combineRgb(255,255,0);
const red = combineRgb(255,0,0);

export default {
    feedbacks() {
        var feedbacks = {};

        feedbacks.state_color = {
            type: 'advanced',
            name: 'Countdown State',
            description: 'Change button color on state change',
            options: [
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
            callback: (feedback) => {
                //console.log(`Check ${this.feedbackstate.colour}`);
                if (this.feedbackState === 'RUNNING') {
                    return {
                        color: feedback.options.colRunningFg,
                        bgcolor: feedback.options.colRunningBg
                    }
                } else if (this.feedbackState === 'PAUSED') {
                    return {
                        color: feedback.options.colPausedFg,
                        bgcolor: feedback.options.colPausedBg
                    };
                } else if (this.feedbackState === 'EXPIRING') {
                    return {
                        color: feedback.options.colExpiringFg,
                        bgcolor: feedback.options.colExpiringBg
                    };
                }
                else if (this.feedbackState === 'EXPIRED') {
                    return {
                        color: feedback.options.colExpiredFg,
                        bgcolor: feedback.options.colExpiredBg
                    };
                }
                else if (this.feedbackState === 'NOT_RUNNING') {
                    return {
                        color: feedback.options.colNotRunningFg,
                        bgcolor: feedback.options.colNotRunningBg
                    }
                }
            }
        }
        feedbacks.progress_bar = {
            type: 'advanced',
            name: 'Progress Bar',
            description: 'Show a progress bar on button',
            options: [
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
                if (feedback.options.hideWhenNotRunning && this.feedbackState === "NOT_RUNNING") {
                    return {};
                }

                const isExpiring = this.feedbackState === "EXPIRING";
                const isExpired = this.feedbackState === "EXPIRED";
                let colors = [];

                if (isExpiring) {
                    colors = [
                        { size: 100, color: feedback.options.expiringColor, background: feedback.options.expiringColor, backgroundOpacity: 64 },
                    ]
                } else if (isExpired) {
                    colors = [
                        { size: 100, color: feedback.options.expiredColor, background: feedback.options.expiredColor, backgroundOpacity: 64 },
                    ]
                } else {
                    colors = [
                        { size: 100, color: feedback.options.runningColor, background: feedback.options.runningColor, backgroundOpacity: 64 },
                    ]
                }

                const options = {
                    width: feedback.image.width,
                    height: feedback.image.height,
                    colors: colors,
                    barLength: 62,
                    barWidth: 8,
                    value:  !isExpired ? this.progress : 100,
                    type: 'horizontal',
                    offsetX: 5,
                    offsetY: feedback.image.height > 58 ? 62 : 48,
                    opacity: 255
                }

                return {
                    imageBuffer: graphics.bar(options)
                }
            },
        }

        return feedbacks;
    }
}