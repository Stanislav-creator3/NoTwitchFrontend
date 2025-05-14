'use client'

import parser from 'html-react-parser'
import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'

import {
	useFindNotificationsByUserQuery,
	useFindNotificationsUnreadCountQuery
} from '@/graphql/generated/output'

import { getNotificationIcon } from '@/utils/get-notification-icon'

import { Separator } from '@/components/ui/common/Separator'

export function NotificationsList() {
	const t = useTranslations(
		'layout.header.headerMenu.profileMenu.notifications'
	)

	const { refetch } = useFindNotificationsUnreadCountQuery()

	const { data, loading: isLoadingNotifications } =
		useFindNotificationsByUserQuery({
			onCompleted() {
				refetch()
			}
		})

	const notifications = data?.findNotificationsByUser ?? []

	return (
		<>
			<h2 className='text-center text-lg font-medium'>{t('heading')}</h2>
			<Separator className='my-3' />

			{isLoadingNotifications ? (
				<div className='flex items-center justify-center gap-x-2 text-sm text-foreground'>
					<Loader className='size-5 animate-spin' />
					{t('loading')}
				</div>
			) : notifications.length ? (
				notifications.map((notification, index) => {
					const Icon = getNotificationIcon(notification.type)

					return (
						<Fragment key={notification.id}>
							<div className='flex items-center gap-x-3 text-sm'>
								<div className='rounded-full bg-foreground p-2'>
									<Icon className='size-6 text-secondary'/>
								</div>
								<div>{parser(notification.message)}</div>
							</div>
							{index < notifications.length - 1 && (
								<Separator className='my-3' />
							)}
						</Fragment>
					)
				})
			) : (
				<div className='text-center text-muted-foreground'>
					{t('empty')}
				</div>
			)}
		</>
	)
}
