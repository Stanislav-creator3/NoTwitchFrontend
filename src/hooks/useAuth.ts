import { authStore } from '@/store/auth/auth.store'

export function useAuth() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuAuthenticated = authStore(state => state.setIsAuAuthenticated)

	const auth = () => setIsAuAuthenticated(true)
	const exit = () => setIsAuAuthenticated(false)

	return {
		isAuthenticated,
		auth,
		exit
	}
}
