import { Dispatch, SetStateAction } from 'react'

export interface IUseBoolean {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}
