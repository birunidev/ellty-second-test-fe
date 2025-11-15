import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { PostPostsPostIdReplyBodyOperation } from '@/api/test-api/models'
import {
  getGetPostsPostIdTreeQueryKey,
  usePostPostsPostIdReply,
} from '@/api/test-api/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { CommentForm, CommentFormAction, CommentFormGroup } from './atoms'

const commentFormSchema = z.object({
  operation: z.enum(Object.values(PostPostsPostIdReplyBodyOperation)),
  operand: z
    .string()
    .min(1, 'Operand is required')
    .regex(/^\d+$/, 'Operand must be a number'),
})

export const GenericCommentForm = ({
  postId,
  parentId,
  onCancel,
}: {
  postId: string
  parentId: string | null
  onCancel: () => void
}) => {
  const queryClient = useQueryClient()
  const form = useForm({
    defaultValues: {
      operation: PostPostsPostIdReplyBodyOperation['+'],
      operand: '',
    },
    resolver: zodResolver(commentFormSchema),
  })

  const createCommentMutation = usePostPostsPostIdReply()

  const onSubmit = (data: z.infer<typeof commentFormSchema>) => {
    createCommentMutation.mutate(
      {
        postId: postId,
        data: {
          parentId: parentId ? parseInt(parentId) : null,
          operation: data.operation,
          operandValue: parseInt(data.operand),
        },
      },
      {
        onSuccess: () => {
          toast.success('Comment posted successfully')
          queryClient.invalidateQueries({
            queryKey: getGetPostsPostIdTreeQueryKey(postId),
          })
          onCancel()
        },
        onError: () => {
          toast.error('Failed to post comment')
        },
      },
    )
  }

  return (
    <Form {...form}>
      <CommentForm formProps={{ onSubmit: form.handleSubmit(onSubmit) }}>
        <CommentFormGroup>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select an operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PostPostsPostIdReplyBodyOperation['+']}>
                      Add
                    </SelectItem>
                    <SelectItem value={PostPostsPostIdReplyBodyOperation['-']}>
                      Subtract
                    </SelectItem>
                    <SelectItem value={PostPostsPostIdReplyBodyOperation['*']}>
                      Multiply
                    </SelectItem>
                    <SelectItem value={PostPostsPostIdReplyBodyOperation['/']}>
                      Divide
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={form.control}
              name="operand"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="flex-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CommentFormGroup>
        <CommentFormAction>
          <Button
            type="submit"
            size="sm"
            disabled={createCommentMutation.isPending}
          >
            {createCommentMutation.isPending ? 'Posting...' : 'Post Reply'}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </CommentFormAction>
      </CommentForm>
    </Form>
  )
}
