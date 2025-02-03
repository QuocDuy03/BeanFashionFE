import { create } from 'zustand'
import { IAddressFieldData } from '@/interfaces'

type AuthState = {
  currentProvinces: IAddressFieldData[]
  error: string | null
  message: string
}
type AuthAction = {
  resetMessage: () => void
  setCurrentProvinces: (currentProvinces: IAddressFieldData[] | null) => void
}
export const useProvincesStore = create<AuthState & AuthAction>((set) => ({
  currentProvinces: [],
  error: null,
  message: '',
  setCurrentProvinces: (currentProvinces) => set({ currentProvinces: currentProvinces || [] }),
  resetMessage: () => set({ message: '', error: null })
}))
