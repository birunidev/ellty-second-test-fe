import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { getGetPostsQueryKey, usePostPosts } from '@/api/test-api/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDisclosure } from '@/hooks/use-disclosure'
import { Button } from '../ui/button'

const addNewTopicItemSchema = z.object({
  initial_number: z
    .string()
    .min(1)
    .regex(/^\d+$/, 'Initial number must be a number'),
})

export const AddNewTopicItemDialog = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const form = useForm({
    defaultValues: {
      initial_number: '',
    },
    resolver: zodResolver(addNewTopicItemSchema),
  })

  const createTopicMutation = usePostPosts({
    mutation: {
      onSuccess: () => {
        toast.success('Topic created successfully')
        queryClient.invalidateQueries({
          queryKey: getGetPostsQueryKey(),
        })
        onClose()
      },
    },
  })
  const onSubmit = (data: z.infer<typeof addNewTopicItemSchema>) => {
    createTopicMutation.mutate({
      data: {
        initialNumber: parseInt(data.initial_number),
      },
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Initiate new topic
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Initiate Topic</DialogTitle>
          <DialogDescription>
            Throw a number and see what happens.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="initial_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={createTopicMutation.isPending}>
                {createTopicMutation.isPending
                  ? 'Initiating...'
                  : 'Initiate topic'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
