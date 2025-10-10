import type { ModuleInstance } from './main.js'
import got from 'got'
import {CompanionActionDefinitions, CompanionInputFieldDropdown, InstanceStatus} from '@companion-module/base'

export function UpdateActions(self: ModuleInstance): void {
    const doAction = async (path: string) => {
        const baseUrl = `http://${self.config.ip}:${self.config.port}`;
        const url = `${baseUrl}${path}`;

        try {
            await got(url);

            self.updateStatus(InstanceStatus.Ok)
        } catch (e: any) {
            self.log('error', `HTTP GET Request failed (${e.message})`)
            self.updateStatus(InstanceStatus.UnknownError, e.code)
        }
    }

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

    let actions: CompanionActionDefinitions = {};
    actions['start'] = {
        name: 'Start Timer',
        options: [timerIdOption],
        callback: async (event) => {
            await doAction(`/timer/${event.options['timerId']}/start`)
        }
    };
    actions['pause'] = {
        name: 'Pause Timer',
        options: [timerIdOption],
        callback: async (event) => {
            await doAction(`/timer/${event.options['timerId']}/pause`)
        }
    };
    actions['resume'] = {
        name: 'Resume Timer',
        options: [timerIdOption],
        callback: async (event) => {
            await doAction(`/timer/${event.options['timerId']}/resume`)
        }
    };
    actions['toggle'] = {
        name: 'Toggle Pause/Resume',
        options: [timerIdOption],
        callback: async (event) => {
            await doAction(`/timer/${event.options['timerId']}/toggle-pause`)
        }
    };
    actions['reset'] = {
        name: 'Reset Timer',
        options: [timerIdOption],
        callback: async (event) => {
            await doAction(`/timer/${event.options['timerId']}/reset`)
        }
    };
    actions['set'] = {
        name: 'Set Time',
        options: [
            timerIdOption,
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
            await doAction(`/timer/${event.options['timerId']}/set/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
        }
    }
    actions['jog-set'] = {
        name: 'Jog set time',
        options: [
            timerIdOption,
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
            await doAction(`/timer/${event.options['timerId']}/jog-set/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
        }
    };
    actions['jog-current'] = {
        name: 'Jog current time',
        options: [
            timerIdOption,
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
            await doAction(`/timer/${event.options['timerId']}/jog-current/${event.options.hours}/${event.options.minutes}/${event.options.seconds}`)
        }
    };

    self.setActionDefinitions(actions)
}