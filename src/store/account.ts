import { create } from 'zustand'

export const useAccount = create((set) => ({
  account: undefined,
  setAccount: (account) => set(() => ({ account })),
}))
