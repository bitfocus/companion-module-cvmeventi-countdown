import { type InstanceTypes, type JsonObject, Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig extends JsonObject {
  ip: string
  port: number
}

export interface ModuleTypes extends InstanceTypes {
  config: ModuleConfig
}

export function GetConfigFields(): SomeCompanionConfigField[] {
  return [
    {
      type: 'textinput',
      id: 'ip',
      label: 'IP',
      width: 12,
      regex: Regex.IP,
      default: '127.0.0.1',
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