import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	const { url, nextUrl, cookies } = req

	const session = cookies.get('session')?.value

	const isAuthPage = url.startsWith('/account')
	const isDeactivatePage = nextUrl.pathname === '/account/deactivate'

	const isDashboardPage = nextUrl.pathname.startsWith('/dashboard')

	if (!session && isDashboardPage) {
		return NextResponse.redirect(new URL('/account/login', url))
	}

	if (!session && isDeactivatePage) {
		return NextResponse.redirect(new URL('/account/login', url))
	}

	if(session && isAuthPage && !isDeactivatePage) {
		return NextResponse.redirect(new URL('/dashboard/settings', url))

	} 

	return NextResponse.next()
}

export const config = {
	matcher: ['/account/:path*', '/dashboard/:path*']
}
