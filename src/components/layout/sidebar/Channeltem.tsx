import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/common/Button'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { ChannelVerified } from '@/components/ui/elements/ChannelVerified'
import { Hint } from '@/components/ui/elements/Hint'
import { LiveBadge } from '@/components/ui/elements/LiveBadge'

import { FindRecommendedChannelsQuery } from '@/graphql/generated/output'

import { useSideBar } from '@/hooks/useSidabar'

import { cn } from '@/utils/tw-merge'
import { Skeleton } from '@/components/ui/common/Skeleton'

interface ChannelItemProps {
	channel: FindRecommendedChannelsQuery['findRecommended'][0]
}

export function ChannelItem({ channel }: ChannelItemProps) {
	const pathname = usePathname()
	const { isCollapsed } = useSideBar()

	const isActive = pathname === `/${channel.username}`

	return isCollapsed ? (
		<Hint label={channel.username} side='right' asChild>
			<Link
				href={`/${channel.username}`}
				className='mt-3 flex w-full items-center justify-center'
			>
				<ChannelAvatar
					channel={channel}
					isLive={channel.stream.isLive}
				/>
			</Link>
		</Hint>
	) : (
		<Button
			className={cn(
				'mt-2 h-11 w-full justify-start',
				isActive && 'bg-accent'
			)}
			variant='ghost'
			asChild
		>
			<Link
				href={`/${channel.username}`}
				className='flex w-full items-center'
			>
				<ChannelAvatar
					size='sm'
					channel={channel}
					isLive={channel.stream.isLive}
				/>
				<h2 className='truncate pl-3'>{channel.username}</h2>
				{channel.isVerified && <ChannelVerified size='sm' />}
				{channel.stream.isLive && (
					<div className='absolute right-5'>
						<LiveBadge />
					</div>
				)}
			</Link>
		</Button>
	)
}

export function ChannelItemSkeleton() {
	return <Skeleton className='mt-3 h-11 w-full rounded-full' />
}
