import { useSearch } from '@tanstack/react-router'
import { useGetPosts } from '@/api/test-api/api'
import { Header } from '@/components/header'
import { PaginationBuilder } from '@/components/pagination-builder'
import { GenericTopicItem } from '@/components/topic-item'
import { AddNewTopicItemDialog } from '@/components/topic-item/add-new-topic-item-dialog'
import { useUser } from '@/providers/user-provider'

export default function PostsPage() {
  const { isUserReady } = useUser()
  const search = useSearch({ from: '/' })

  const { data } = useGetPosts({
    page: search.page ? search.page.toString() : '1',
    limit: search.limit ? search.limit.toString() : '10',
  })

  const posts = data?.data.posts
  const pagination = data?.data.pagination

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">0 1 0 0 0 Forum</h1>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Throw a number and see what happens.
            </p>
            {isUserReady && <AddNewTopicItemDialog />}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {posts?.map((post) => (
            <GenericTopicItem key={post.id} topic={post} />
          ))}
        </div>

        {pagination && (
          <div className="mt-8">
            <PaginationBuilder
              page={pagination.page}
              limit={pagination.limit}
              total={pagination.total}
            />
          </div>
        )}
      </div>
    </>
  )
}
