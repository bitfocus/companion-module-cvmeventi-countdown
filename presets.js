import { combineRgb } from '@companion-module/base'

export default {
    presets() {
        const black = combineRgb(0,0,0);
        const white = combineRgb(255,255,255);
        let presets = {};

        const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

        // Time Presets (set only)
        minutes.forEach((minute) => {
            presets[`timePreset${minute}`] = {
                category: 'Time Presets',
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
            presets[`timePresetAS${minute}`] = {
                category: 'Time Presets (auto start)',
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
                            hours: minute > 59 ? 1 : 0,
                            minutes: minute < 60 ? minute : 0,
                            seconds: 0,
                        }
                    }, 
                    {
                        actionId: 'start',
                        delay: 100,
                        options: {},
                    }],
                    up: [],
                }]
            };
        })

        presets.startTimer = {
            category: 'Control',
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
                    options: {},
                }],
                up: [],
            }]
        };
        presets.pauseTimer = {
            category: 'Control',
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
                    options: {},
                }],
                up: [],
            }]
        };
        presets.toggleTimer = {
            category: 'Control',
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
                    options: {},
                }],
                up: [],
            }]
        };
        presets.resumeTimer = {
            category: 'Control',
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
                    options: {},
                }],
                up: [],
            }]
        };
        presets.resetTimer = {
            category: 'Control',
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
                    options: {},
                }],
                up: [],
            }]
        };
        presets.jogSetTimerPlus1 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: 1,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogSetTimerPlus5 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: 5,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogSetTimerPlus10 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: 10,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogSetTimerMinus1 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: -1,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogSetTimerMinus5 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: -5,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogSetTimerMinus10 = {
            category: 'Jog Set Timer',
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
                        hours: 0,
                        minutes: -10,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerPlus1 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: 1,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerPlus5 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: 5,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerPlus10 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: 10,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerMinus1 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: -1,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerMinus5 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: -5,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };
        presets.jogCurrentTimerMinus10 = {
            category: 'Jog Current Timer',
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
                        hours: 0,
                        minutes: -10,
                        seconds: 0,
                    },
                }],
                up: [],
            }]
        };

        this.setPresetDefinitions(presets);
    }
}