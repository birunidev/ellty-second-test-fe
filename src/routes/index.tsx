import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import PostsPage from '@/pages/posts-page'

export const Route = createFileRoute('/')({
  component: PostsPage,
  validateSearch: z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
  }),
})
