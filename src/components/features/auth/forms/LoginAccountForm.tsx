'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useLoginUserMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

import {
	TypeLoginAccountSchema,
	loginAccountSchema
} from '@/schemas/auth/login.schema'

import { AuthWRapper } from '../AuthWrapper'

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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/InputOTP'

export default function LoginAccountForm({}) {
	const translations = useTranslations('auth.login')

	const router = useRouter()

	const { auth } = useAuth()

	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const form = useForm<TypeLoginAccountSchema>({
		resolver: zodResolver(loginAccountSchema),
		defaultValues: {
			login: '',
			password: ''
		}
	})

	const [login, { loading: isLoadingCreate }] = useLoginUserMutation({
		onCompleted(data) {
			if (data.loginUser.message) {
				setIsShowTwoFactor(true)
			} else {
				auth()
				toast.success(translations('successMessage'))
				router.push('/dashboard/settings')
			}
		},
		onError() {
			toast.error(translations('errorMessage'))
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeLoginAccountSchema) {
		login({ variables: { data } })
	}
	return (
		<AuthWRapper
			heading={translations('heading')}
			backButtonLabel={translations('backButtonLabel')}
			backButtonHref='/account/create'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowTwoFactor ? (
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{translations('pinLabel')}
									</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										{translations('pinDescription')}
									</FormDescription>
								</FormItem>
							)}
						/>
					) : (
						<>
							<FormField
								control={form.control}
								name='login'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{translations('loginLabel')}
										</FormLabel>
										<FormControl>
											<Input
												placeholder='johndoe'
												disabled={isLoadingCreate}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{translations('loginDescription')}
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>
												{translations('passwordLabel')}
											</FormLabel>

											<Link
												href={'/account/recovery'}
												className='ml-auto inline-block text-sm'
											>
												{translations('forgotPassword')}
											</Link>
										</div>

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
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingCreate}
					>
						{translations('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWRapper>
	)
}
