import { useState } from 'react'
import { Clock, Reply as ReplyIcon, User } from 'lucide-react'
import { GenericCommentForm } from '@/components/comment-form'
import {
  ReplyItem,
  ReplyItemContainer,
  ReplyItemContent,
  ReplyItemContentText,
  ReplyItemDescriptionMeta,
  ReplyItemMeta,
  ReplyItemReplyButton,
} from '@/components/reply-item/atoms'
import type { ReplyItem as ReplyItemType } from '@/components/topic-item'
import { Button } from '@/components/ui/button'
import { useUser } from '@/providers/user-provider'
import { formatDate } from '@/utils/date'

export const GenericReplyItem = ({
  reply,
  depth = 0,
  postId,
}: {
  reply: ReplyItemType
  depth?: number
  postId: string
}) => {
  const { isUserReady } = useUser()
  const [isExpanded, setIsExpanded] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const hasReplies = reply.children.length > 0
  const nestedReplies = reply.children.map(
    (nestedReply) => nestedReply as ReplyItemType,
  )

  return (
    <ReplyItem>
      <ReplyItemContainer>
        {hasReplies && (
          <ReplyItemReplyButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        )}
        {!hasReplies && <div className="w-6" />}
        <ReplyItemContent>
          <ReplyItemMeta>
            <ReplyItemDescriptionMeta icon={User}>
              {reply.username}
            </ReplyItemDescriptionMeta>
            <ReplyItemDescriptionMeta icon={Clock}>
              {formatDate(reply.created_at)}
            </ReplyItemDescriptionMeta>
          </ReplyItemMeta>
          <ReplyItemContentText>
            {reply.operation} {reply.operand} = {reply.value}
          </ReplyItemContentText>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="h-7 text-xs"
            disabled={!isUserReady}
          >
            <ReplyIcon className="h-3 w-3 mr-1.5" />
            Reply
          </Button>
          {showReplyForm && (
            <div className="mt-2">
              <GenericCommentForm
                postId={postId}
                parentId={reply.id.toString()}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {hasReplies && isExpanded && (
            <div className="mt-2">
              {nestedReplies.map((nestedReply) => (
                <GenericReplyItem
                  key={nestedReply.id.toString()}
                  reply={nestedReply}
                  depth={depth + 1}
                  postId={postId}
                />
              ))}
            </div>
          )}
        </ReplyItemContent>
      </ReplyItemContainer>
    </ReplyItem>
  )
}
