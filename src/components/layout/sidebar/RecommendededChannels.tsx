'use client'

import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/common/Separator'

import { useFindRecommendedChannelsQuery } from '@/graphql/generated/output'

import { useSideBar } from '@/hooks/useSidabar'
import { ChannelItem, ChannelItemSkeleton } from './Channeltem'


export function RecommendedChannels() {
	const t = useTranslations('layout.sidebar.recommended')

	const { isCollapsed } = useSideBar()

	const { data, loading: isLoadingRecommended } =
		useFindRecommendedChannelsQuery()
	const channels = data?.findRecommended ?? []

	return (
		<div>
			<Separator className='mb-3' />
			{!isCollapsed && (
				<h2 className='mb-2 px-2 text-lg font-semibold text-foreground'>
					{t('heading')}
				</h2>
			)}
			{isLoadingRecommended
				? Array.from({ length: 7 }).map((_, index) => (
						<ChannelItemSkeleton key={index} />
					))
				: channels.map((channel, index) => (
						<ChannelItem key={channel.username} channel={channel} />
					))}
		</div>
	)
}
