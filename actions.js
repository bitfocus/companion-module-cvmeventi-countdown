import { InstanceStatus } from '@companion-module/base';
import got from 'got';

export default {
    actions() {
        const doAction = async (path) => {
            const baseUrl = `http://${this.config.ip}:${this.config.port}`;
            const url = `${baseUrl}${path}`;

            try {
                await got(url);

                this.updateStatus(InstanceStatus.Ok)
            } catch (e) {
                this.log('error', `HTTP GET Request failed (${e.message})`)
                this.updateStatus(InstanceStatus.UnknownError, e.code)
            }
        }

        var actions = {};
        actions['start'] = {
            name: 'Start Timer',
            options: [],
            callback: async (event) => {
                await doAction("/start")
            }
        };
        actions['pause'] = {
            name: 'Pause Timer',
            options: [],
            callback: async (event) => {
                await doAction("/pause")
            }
        };
        actions['resume'] = {
            name: 'Resume Timer',
            options: [],
            callback: async (event) => {
                await doAction("/resume")
            }
        };
        actions['toggle'] = {
            name: 'Toggle Pause/Resume',
            options: [],
            callback: async (event) => {
                await doAction("/toggle-pause")
            }
        };
        actions['reset'] = {
            name: 'Reset Timer',
            options: [],
            callback: async (event) => {
                await doAction("/reset")
            }
        };
        actions['set'] = {
            name: 'Set Time',
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
            callback: async (event) => {
                await doAction(`/set/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
            }
        }
        actions['jog-set'] = {
            name: 'Jog set time',
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
            callback: async (event) => {
                await doAction(`/jog-set/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
            }
        };
        actions['jog-current'] = {
            name: 'Jog current time',
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
            callback: async (event) => {
                await doAction(`/jog-current/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
            }
        };

        return actions;
    }
}