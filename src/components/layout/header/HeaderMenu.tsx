'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'

import { ProfileMenu } from './ProfileMenu'
import { Button } from '@/components/ui/common/Button'

export function HeaderMenu() {
	const t = useTranslations('layout.header.headerMenu')
	const { isAuthenticated } = useAuth()
	return (
		<div className='ml-auto flex items-center gap-x-4'>
			{isAuthenticated ? (
				<ProfileMenu />
			) : (
				<>
					<Link href={'/account/login'}>
						<Button variant='secondary'>{t('login')}</Button>
					</Link>

					<Link href={'/account/create'}>
						<Button variant='secondary'>{t('register')}</Button>
					</Link>
				</>
			)}
		</div>
	)
}
