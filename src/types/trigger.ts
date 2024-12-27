export type TriggerType = 'COMMENT' | 'DM'

export interface TriggerProps {
  type?: TriggerType
  keyword?: string
  types: TriggerType[]
  keywords: string[]
}

export interface InitialStateTriggerProps {
  trigger: TriggerProps
}