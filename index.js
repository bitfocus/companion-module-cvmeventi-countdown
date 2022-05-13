const instance_skel = require('../../instance_skel');
const WebSocket = require('ws');
const presets = require('./presets');
var debug;
var log;

class instance extends instance_skel {
    constructor(system, id, config) {
        super(system, id, config);
        Object.assign(this, {...presets});
        this.feedbackState = "NOT_RUNNING";
        this.actions();
    }

    actions() {
        this.setActions(this.getActions());
    }

    getActions() {
        var actions = {};
        actions['start'] = {
            label: 'Start Timer',
            options: [],
        };
        actions['pause'] = {
            label: 'Pause Timer',
            options: []
        };
        actions['resume'] = {
            label: 'Resume Timer',
            options: [],
        };
        actions['toggle'] = {
            label: 'Toggle Pause/Resume',
            options: [],
        };
        actions['reset'] = {
            label: 'Reset Timer',
            options: [],
        };
        actions['set'] = {
            label: 'Set Time',
            options: [
                {
                    type: 'number',
                    label: 'Hours',
                    id: 'hours',
                    tooltip: 'The number of hours to set to the time.',
                    min: 0,
                    max: 23,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Minutes',
                    id: 'minutes',
                    tooltip: 'The number of minutes to set to the time.',
                    min: 0,
                    max: 59,
                    default: 5,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Seconds',
                    id: 'seconds',
                    tooltip: 'The number of seconds to set to the time.',
                    min: 0,
                    max: 59,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                }
            ],
        }
        actions['jog-set'] = {
            label: 'Jog set time',
            options: [
                {
                    type: 'number',
                    label: 'Hours',
                    id: 'hours',
                    tooltip: 'The number of hours to add to the time. Use negative numbers to remove time.',
                    min: -23,
                    max: 23,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Minutes',
                    id: 'minutes',
                    tooltip: 'The number of minutes to add to the time. Use negative numbers to remove time.',
                    min: -59,
                    max: 59,
                    default: 5,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Seconds',
                    id: 'seconds',
                    tooltip: 'The number of seconds to add to the time. Use negative numbers to remove time.',
                    min: -59,
                    max: 59,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                }
            ],
        };
        actions['jog-current'] = {
            label: 'Jog current time',
            options: [
                {
                    type: 'number',
                    label: 'Hours',
                    id: 'hours',
                    tooltip: 'The number of hours to add to the time. Use negative numbers to remove time.',
                    min: -23,
                    max: 23,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Minutes',
                    id: 'minutes',
                    tooltip: 'The number of minutes to add to the time. Use negative numbers to remove time.',
                    min: -59,
                    max: 59,
                    default: 5,
                    step: 1,
                    required: true,
                    range: false
                },
                {
                    type: 'number',
                    label: 'Seconds',
                    id: 'seconds',
                    tooltip: 'The number of seconds to add to the time. Use negative numbers to remove time.',
                    min: -59,
                    max: 59,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false
                }
            ],
        };

        return actions;
    }

    config_fields() {
        return [
            {
                type: 'textinput',
                id: 'ip',
                label: 'IP',
                width: 12,
                regex: this.REGEX_IP
            },
            {
                type: 'textinput',
                id: 'port',
                label: 'Port',
                width: 12,
                regex: this.REGEX_PORT
            }
        ];
    }

    action(action) {
        let url = `http://${this.config.ip}:${this.config.port}`;

        switch (action.action) {
            case 'set':
                url = url + `/set/${action.options.hours}/${action.options.minutes}/${action.options.seconds}`;
                break;
            case 'jog-set':
                url = url + `/jog-set/${action.options.hours}/${action.options.minutes}/${action.options.seconds}`;
                break;
            case 'jog-current':
                url = url + `/jog-current/${action.options.hours}/${action.options.minutes}/${action.options.seconds}`;
                break;
            case 'start':
                url = url + '/start';
                break;
            case 'pause':
                url = url + '/pause';
                break;
            case 'resume':
                url = url + '/resume';
                break;
            case 'toggle':
                url = url + '/toggle-pause';
                break;
            case 'reset':
                url = url + '/reset';
                break;
        }

        this.system.emit('rest_get', url, (err, result) => {
            console.log("result:");
            console.error(result);
            console.error(result.data);
            if (err !== null) {
                this.log('error', 'HTTP GET Request failed (' + result.error.code + ')');
                this.status(this.STATUS_ERROR, result.error.code);
            } else {
                if (result.data.ok) {
                    this.status(this.STATUS_OK);
                } else {
                    this.status(this.STATUS_ERROR);
                    this.log('error', `Error from application: ${result.data.description}`)
                }
            }
        });
    }

    destroy() {
        this.debug('destroy', this.id);
        this.status(this.STATUS_UNKNOWN, "Disabled");
        this.oscListener.destroy();

        if (this.ws !== undefined) {
            this.ws.close(1000);
            delete this.ws;
        }
    }

    init() {
        console.log('Countdown init');
        debug = this.debug;
        log = this.log;
        this.initWebSocket();
        this.initVariables();
        this.initFeedbacks();
        this.initPresets();
        this.log('debug', "Countdown module initiated");
        this.status(this.STATE_OK);

    }

    maybeReconnect() {
        if (this.config.reconnect) {
            this.reconnect_timer = setTimeout(() => {
                this.initWebSocket()
            }, 5000)
        }
    }

    updateConfig(config) {
        this.config = config;
        this.initWebSocket();
        this.status(this.STATUS_OK);
    };

    initWebSocket() {
        if (this.reconnect_timer) {
            clearTimeout(this.reconnect_timer);
            this.reconnect_timer = null;
        }
        const ip = this.config.ip;
        const port = this.config.port;
        this.status(this.STATUS_UNKNOWN);
        if (!ip || !port) {
            this.status(this.STATUS_ERROR, `Configuration error - no WebSocket host and/or port defined`);
            return
        }

        if (this.ws !== undefined) {
            this.ws.close(1000);
            delete this.ws;
        }
        this.ws = new WebSocket(`ws://${ip}:${port}/ws`);

        this.ws.on('open', () => {
            this.log('debug', `Connection opened`);
            this.status(this.STATUS_OK);
            if (this.config.reset_variables) {
                this.updateVariables();
            }
        })
        this.ws.on('close', (code) => {
            this.log('debug', `Connection closed with code ${code}`);
            this.status(this.STATUS_ERROR, `Connection closed with code ${code}`);
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

        for (const [key, value] of Object.entries(msgValue)) {
            this.setVariable(key, value);
        }
    }

    initVariables() {
        const variables = [
            {
                label: 'State of timer (Not Running, Running, Paused, Expired)',
                name: 'state'
            },
            {
                label: 'Current time (hh:mm:ss)',
                name: 'currentTimeHms'
            },
            {
                label: 'Current time (mm:ss)',
                name: 'currentTimeMs'
            },
            {
                label: 'Current time (hours only)',
                name: 'currentTimeH'
            },
            {
                label: 'Current time (minutes only)',
                name: 'currentTimeM'
            },
            {
                label: 'Current time (seconds only)',
                name: 'currentTimeS'
            },
            {
                label: 'Current time (in seconds)',
                name: 'currentTime'
            },
            {
                label: 'Time set on current timer (hh:mm:ss)',
                name: 'timeSetOnCurrentTimerHms'
            },
            {
                label: 'Time set on current timer (mm:ss)',
                name: 'timeSetOnCurrentTimerMs'
            },
            {
                label: 'Time set on current timer (hours only)',
                name: 'timeSetOnCurrentTimerH'
            },
            {
                label: 'Time set on current timer (minutes only)',
                name: 'timeSetOnCurrentTimerM'
            },
            {
                label: 'Time set on current timer (seconds only)',
                name: 'timeSetOnCurrentTimerS'
            },
            {
                label: 'Time set on current timer (in seconds)',
                name: 'timeSetOnCurrentTimer'
            },
            {
                label: 'Set time (in seconds)',
                name: 'setTime'
            },
            {
                label: 'Set time (hh:mm:ss)',
                name: 'setTimeHms'
            },
            {
                label: 'Set time (mm:ss)',
                name: 'setTimeMs'
            },
            {
                label: 'Set time (hours only)',
                name: 'setTimeH'
            },
            {
                label: 'Set time (minutes only)',
                name: 'setTimeM'
            },
            {
                label: 'Set time (seconds only)',
                name: 'setTimeS'
            },
        ];
        this.setVariableDefinitions(variables);
        this.setVariable("state", "Not Running")
        this.setVariable('currentTimeHms', '00:00:00');
        this.setVariable('currentTimeMs', '00:00');
        this.setVariable('currentTimeH', '00');
        this.setVariable('currentTimeM', '00');
        this.setVariable('currentTimeS', '00');
        this.setVariable('currentTime', '0');
        this.setVariable('timeSetOnCurrentTimerHms', '00:00:00')
        this.setVariable('timeSetOnCurrentTimerMs', '00:00')
        this.setVariable('timeSetOnCurrentTimerH', '00')
        this.setVariable('timeSetOnCurrentTimerM', '00')
        this.setVariable('timeSetOnCurrentTimerS', '00')
        this.setVariable('timeSetOnCurrentTimer', '0')
        this.setVariable('setTimeHms', '00:00:00')
        this.setVariable('setTimeMs', '00:00')
        this.setVariable('setTimeH', '00')
        this.setVariable('setTimeM', '00')
        this.setVariable('setTimeS', '00')
        this.setVariable('setTime', '0')

    }

    initFeedbacks() {
        var feedbacks = {};

        feedbacks['state_color'] = {
            type: 'advanced',
            label: 'Countdown State',
            description: 'Change button color on state change',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Running state foreground',
                    id: 'colRunningFg',
                    default: this.rgb(255,255,255)
                },
                {
                    type: 'colorpicker',
                    label: 'Running state background',
                    id: 'colRunningBg',
                    default: this.rgb(140,197,66)
                },
                {
                    type: 'colorpicker',
                    label: 'Paused state foreground',
                    id: 'colPausedFg',
                    default: this.rgb(255,255,255)
                },
                {
                    type: 'colorpicker',
                    label: 'Paused state background',
                    id: 'colPausedBg',
                    default: this.rgb(72,72,72)
                },
                {
                    type: 'colorpicker',
                    label: 'Expiring state foreground',
                    id: 'colExpiringFg',
                    default: this.rgb(0,0,0)
                },
                {
                    type: 'colorpicker',
                    label: 'Expiring state background',
                    id: 'colExpiringBg',
                    default: this.rgb(240,216,78)
                },
                {
                    type: 'colorpicker',
                    label: 'Expired state foreground',
                    id: 'colExpiredFg',
                    default: this.rgb(255,255,255)
                },
                {
                    type: 'colorpicker',
                    label: 'Expired state background',
                    id: 'colExpiredBg',
                    default: this.rgb(254,0,0)
                },
                {
                    type: 'colorpicker',
                    label: 'Not Running state foreground',
                    id: 'colNotRunningFg',
                    default: this.rgb(255,255,255)
                },
                {
                    type: 'colorpicker',
                    label: 'Not Running state background',
                    id: 'colNotRunningBg',
                    default: this.rgb(0,0,0)
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

        this.setFeedbackDefinitions(feedbacks);
    }

    initPresets() {
        this.setPresetDefinitions(this.getPresets());
    }
}

exports = module.exports = instance