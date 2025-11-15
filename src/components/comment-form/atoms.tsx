import { Label } from '@radix-ui/react-label'
import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export const CommentForm = ({
  children,
  formProps,
  className,
}: PropsWithChildren<{
  formProps: React.ComponentProps<'form'>
  className?: string
}>) => {
  return (
    <div>
      <form {...formProps} className={cn('space-y-3', className)}>
        {children}
      </form>
    </div>
  )
}

export const CommentFormGroup = ({ children }: PropsWithChildren) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="comment" className="sr-only">
        Comment
      </Label>
      {children}
    </div>
  )
}
export const CommentFormAction = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center justify-end gap-2">{children}</div>
}
