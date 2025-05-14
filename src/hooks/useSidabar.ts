import { sidebarStore } from '@/store/sidebar/sidebar.store'

export function useSideBar() {
	const isCollapsed = sidebarStore(state => state.isCollapsed)
	const setIsCollapsed = sidebarStore(state => state.setIsCollapsed)

	const open = () => setIsCollapsed(false)
	const close = () => setIsCollapsed(true)

	return {
		isCollapsed,
		open,
		close
	}
}
