import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { LogoImage } from '@/components/images/LogoImage'
import { Button } from '@/components/ui/common/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

interface Props {
	heading: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWRapper({
	children,
	heading,
	backButtonLabel,
	backButtonHref
}: PropsWithChildren<Props>) {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-[450px]'>
				<CardHeader className='flex-row items-center justify-center gap-x-4'>
					<LogoImage />
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='-mt-2'>
					{backButtonLabel && backButtonHref && (
						<Button variant={'ghost'} className='w-full'>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
