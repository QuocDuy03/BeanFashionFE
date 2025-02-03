import { create } from 'zustand'
import { ICurrentUser } from '@/interfaces'

type AuthState = {
  currentUser: ICurrentUser | null
  error: string | null
  message: string
}
type AuthAction = {
  resetMessage: () => void
  setCurrentUser: (currentUser: ICurrentUser | null) => void
}
export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  currentUser: null,
  error: null,
  message: '',
  setCurrentUser: (currentUser) => set({ currentUser }),
  resetMessage: () => set({ message: '', error: null })
}))
