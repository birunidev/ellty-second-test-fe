import { Link } from '@tanstack/react-router'
import { usePostAuthLogout } from '@/api/test-api/api'
import { Button } from '@/components/ui/button'
import { useUser } from '@/providers/user-provider'

export const Header = () => {
  const { isUserReady } = useUser()
  const logoutMutation = usePostAuthLogout({
    mutation: {
      onSuccess: () => {
        window.location.href = '/auth/login'
      },
    },
  })
  return (
    <header className="p-4   shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1>LOGO</h1>
        <div className="flex items-center gap-2">
          {isUserReady ? (
            <Button
              onClick={() => logoutMutation.mutate({ data: {} })}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
