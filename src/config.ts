import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
  ip: string
  port: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
  return [
    {
      type: 'textinput',
      id: 'ip',
      label: 'IP',
      width: 12,
      regex: Regex.IP,
    },
    {
      type: 'number',
      id: 'port',
      label: 'Port',
      width: 12,
      min: 1,
      max: 65535,
      default: 6565,
    },
  ]
}