import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { AuthStore } from './auth.type'

export const authStore = create(
	persist<AuthStore>(
		set => ({
			isAuthenticated: false,
			setIsAuAuthenticated: (value: boolean) =>
				set({ isAuthenticated: value })
		}),
		{
            name: 'auth',
            storage: createJSONStorage(() => localStorage)
        }
	)
)
