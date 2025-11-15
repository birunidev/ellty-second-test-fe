import { useState } from 'react'
import { Clock, MessageSquare, Reply, User } from 'lucide-react'
import type {
  GetPosts200DataPostsItem,
  GetPostsPostIdTree200Data,
} from '@/api/test-api/models'
import { useGetPostsPostIdTree } from '@/api/test-api/api'
import { GenericCommentForm } from '@/components/comment-form'
import { GenericReplyItem } from '@/components/reply-item'
import {
  TopicItem,
  TopicItemContent,
  TopicItemDescriptionMeta,
  TopicItemDescriptionSeparator,
  TopicItemFooter,
  TopicItemHeader,
  TopicItemHeaderContent,
  TopicItemReplies,
  TopicItemShowReplyButton,
} from '@/components/topic-item/atoms'
import { Button } from '@/components/ui/button'
import { useUser } from '@/providers/user-provider'
import { formatDate } from '@/utils/date'

export type ReplyItem = GetPostsPostIdTree200Data

export const GenericTopicItem = ({
  topic,
}: {
  topic: GetPosts200DataPostsItem
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const { isUserReady } = useUser()
  const { data } = useGetPostsPostIdTree(topic.id.toString(), {
    query: {
      enabled: isExpanded && !!topic.id,
    },
  })

  const replies = data?.data.children.map((reply) => reply as ReplyItem) ?? []
  const replyCount = topic.nodes_count

  return (
    <TopicItem>
      <TopicItemHeader>
        <TopicItemHeaderContent title={topic.initial_number.toString()}>
          <TopicItemDescriptionMeta icon={User}>
            {topic.username}
          </TopicItemDescriptionMeta>
          <TopicItemDescriptionSeparator />
          <TopicItemDescriptionMeta icon={Clock}>
            {formatDate(topic.created_at)}
          </TopicItemDescriptionMeta>
          {replyCount > 0 && (
            <>
              <TopicItemDescriptionSeparator />
              <TopicItemDescriptionMeta icon={MessageSquare}>
                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </TopicItemDescriptionMeta>
            </>
          )}
        </TopicItemHeaderContent>
        {replyCount > 0 && (
          <TopicItemShowReplyButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          />
        )}
      </TopicItemHeader>
      <TopicItemContent>
        {isExpanded && replyCount > 0 && (
          <TopicItemReplies replyCount={replyCount}>
            {replies.map((reply) => (
              <GenericReplyItem
                key={reply.id.toString()}
                reply={reply}
                depth={0}
                postId={topic.id.toString()}
              />
            ))}
          </TopicItemReplies>
        )}
      </TopicItemContent>
      <TopicItemFooter>
        {!showReplyForm ? (
          <Button
            variant="outline"
            size="sm"
            disabled={!isUserReady}
            onClick={() => setShowReplyForm(true)}
            className="flex items-center gap-2"
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        ) : (
          <GenericCommentForm
            postId={topic.id.toString()}
            parentId={null}
            onCancel={() => setShowReplyForm(false)}
          />
        )}
      </TopicItemFooter>
    </TopicItem>
  )
}
