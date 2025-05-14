'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateUserMutation } from '@/graphql/generated/output'

import {
	TypeCreateAccountSchema,
	createAccountSchema
} from '@/schemas/auth/create-account.schema'

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

export default function CreateAccountForm({}) {
	const translations = useTranslations('auth.register')

	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			email: '',
			username: '',
			password: ''
		}
	})

	const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true)
		},
		onError() {
			toast.error(translations('errorMessage'))
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeCreateAccountSchema) {
		create({ variables: { data } })
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
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{translations('usernameLabel')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder='johndoe'
											disabled={isLoadingCreate}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{translations('usernameDescription')}
									</FormDescription>
								</FormItem>
							)}
						/>
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
											placeholder='john.doe@example.com'
											disabled={isLoadingCreate}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{translations('emailDescription')}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{translations('passwordLabel')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder='********'
											disabled={isLoadingCreate}
											type='password'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{translations(
											'passwordDescription'
										)}
									</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingCreate}
						>
							{translations('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWRapper>
	)
}
