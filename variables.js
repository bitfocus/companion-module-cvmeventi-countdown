export default {
    initVariables() {
        

        const variables = [
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
        ];
        this.setVariableDefinitions(variables);
        this.setVariableValues({
            'state': 'Not Running',
            'currentTimeHms': '00:00:00',
            'currentTimeMs': '00:00',
            'currentTimeH': '00',
            'currentTimeM': '00',
            'currentTimeS': '00',
            'currentTime': '0',
            'timeSetOnCurrentTimerHms': '00:00:00',
            'timeSetOnCurrentTimerMs': '00:00',
            'timeSetOnCurrentTimerH': '00',
            'timeSetOnCurrentTimerM': '00',
            'timeSetOnCurrentTimerS': '00',
            'timeSetOnCurrentTimer': '0',
            'setTimeHms': '00:00:00',
            'setTimeMs': '00:00',
            'setTimeH': '00',
            'setTimeM': '00',
            'setTimeS': '00',
            'setTime': '0',
        })
    }
}