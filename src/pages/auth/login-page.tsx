import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { getGetAuthMeQueryKey, usePostAuthLogin } from '@/api/test-api/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const queryClient = useQueryClient()
  const loginMutation = usePostAuthLogin({
    mutation: {
      onSuccess: () => {
        toast.success('Logged in successfully!')
        // Invalidate auth queries to refresh user data
        queryClient.invalidateQueries({ queryKey: getGetAuthMeQueryKey() })
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      },
    },
  })

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    await loginMutation.mutateAsync({
      data: values,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={
                  form.formState.isSubmitting || loginMutation.isPending
                }
              >
                {form.formState.isSubmitting || loginMutation.isPending
                  ? 'Signing in...'
                  : 'Sign in'}
              </Button>
              <Link
                to="/auth/register"
                className="text-sm text-muted-foreground text-center block"
              >
                Don't have an account? Register here
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
