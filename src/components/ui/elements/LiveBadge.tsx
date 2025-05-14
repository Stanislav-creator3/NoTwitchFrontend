'use client'

import { useTranslations } from 'next-intl'

export function LiveBadge() {
	const t = useTranslations('components.liveBadge')

	return (
		<div className='rounded-full bg-rose-500 px-2 py-0.5 text-center text-xs font-semibold uppercase tracking-wider text-white'>
			{t('text')}
		</div>
	)
}
