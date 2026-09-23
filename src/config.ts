import { type InstanceTypes, type JsonObject, Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig extends JsonObject {
  bonjourHost: string | null
  ip: string
  port: number
}

export interface ModuleTypes extends InstanceTypes {
  config: ModuleConfig
}

export function GetConfigFields(): SomeCompanionConfigField[] {
  return [
    {
      type: 'bonjour-device',
      id: 'bonjourHost',
      label: 'Countdown',
      description: 'Requires Countdown v1.4.0 or later with network discovery enabled',
      width: 12,
      disableAutoExpression: true,
    },
    {
      type: 'textinput',
      id: 'ip',
      label: 'IP',
      width: 12,
      regex: Regex.IP,
      default: '127.0.0.1',
      isVisibleExpression: '!$(options:bonjourHost)',
    },
    {
      type: 'number',
      id: 'port',
      label: 'Port',
      width: 12,
      isVisibleExpression: '!$(options:bonjourHost)',
      min: 1,
      max: 65535,
      default: 6565,
    },
  ]
}