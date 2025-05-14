import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { SidebarState } from './sidebar.types'

export const sidebarStore = create(
	persist<SidebarState>(
		set => ({
			isCollapsed: false,
			setIsCollapsed: (value: boolean) => set({ isCollapsed: value })
		}),
		{
			name: 'sidebar',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
