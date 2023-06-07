import { Regex } from '@companion-module/base'

export default {
    getConfigFields() {
        return [
            {
                type: 'textinput',
                id: 'ip',
                label: 'IP',
                width: 12,
                regex: Regex.IP,
            },
            {
                type: 'textinput',
                id: 'port',
                label: 'Port',
                width: 12,
                regex: Regex.PORT,
                default: 6565
            }
        ];
    }
}