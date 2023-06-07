import { combineRgb } from "@companion-module/base";

export default {
    feedbacks() {
        var feedbacks = {};

        const black = combineRgb(0,0,0);
        const white = combineRgb(255,255,255);
        const green = combineRgb(140,197,66);
        const grey = combineRgb(72,72,72);
        const yellow = combineRgb(240,216,78);
        const red = combineRgb(254,0,0);


        feedbacks.state_color = {
            type: 'advanced',
            label: 'Countdown State',
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
            callback: (feedback, bank) => {
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

        return feedbacks;
    }
}