'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	useResetPasswordMutation
} from '@/graphql/generated/output'

import {
	TypeResetPasswordSchema,
	resetPasswordSchema
} from '@/schemas/auth/reset-password.schema'

import { AuthWRapper } from '../AuthWrapper'

import {
	Alert,
	AlertDescription,
	AlertTitle
} from '@/components/ui/common/Alert'
import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'

export default function ResetPasswordForm() {
	const translations = useTranslations('auth.resetPassword')

	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const [resetPassword, { loading: isLoadingReset }] =
		useResetPasswordMutation({
			onCompleted() {
				setIsSuccess(true)
			},
			onError() {
				toast.error(translations('errorMessage'))
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: TypeResetPasswordSchema) {
		resetPassword({ variables: { data } })
	}
	return (
		<AuthWRapper
			heading={translations('heading')}
			backButtonLabel={translations('backButtonLabel')}
			backButtonHref='/account/login'
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck />
					<AlertTitle>{translations('successAlertTitle')}</AlertTitle>
					<AlertDescription>
						{translations('successAlertDescription')}
					</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-y-3'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{translations('emailLabel')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder='johndoe'
											disabled={isLoadingReset}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{translations('emailDescription')}
									</FormDescription>
								</FormItem>
							)}
						/>

						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingReset}
						>
							{translations('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWRapper>
	)
}
