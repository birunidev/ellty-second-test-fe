import type { PropsWithChildren } from 'react'
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const TopicItem = ({ children }: PropsWithChildren) => {
  return <Card className="gap-3">{children}</Card>
}

export const TopicItemHeader = ({ children }: PropsWithChildren) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">{children}</div>
    </CardHeader>
  )
}

export const TopicItemHeaderContent = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        <div className="flex items-center gap-2 flex-wrap">{children}</div>
      </CardDescription>
    </div>
  )
}

export const TopicItemDescriptionSeparator = () => {
  return <span>•</span>
}

export const TopicItemDescriptionMeta = ({
  icon: Icon,
  children,
}: PropsWithChildren<{
  icon: LucideIcon
}>) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </div>
    </div>
  )
}

export const TopicItemShowReplyButton = ({
  onClick,
  isExpanded,
}: {
  onClick: () => void
  isExpanded: boolean
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      {isExpanded ? (
        <>
          <ChevronDown className="h-4 w-4" />
          Hide replies
        </>
      ) : (
        <>
          <ChevronRight className="h-4 w-4" />
          Show replies
        </>
      )}
    </Button>
  )
}

export const TopicItemContent = ({ children }: PropsWithChildren) => {
  return <CardContent>{children}</CardContent>
}

export const TopicItemReplies = ({
  replyCount,
  children,
}: PropsWithChildren<{ replyCount: number }>) => {
  return (
    <div className="mt-4 pt-4 border-t">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Replies ({replyCount})
      </h3>
      <div>{children}</div>
    </div>
  )
}

export const TopicItemFooter = ({ children }: PropsWithChildren) => {
  return (
    <CardFooter className="border-t py-0">
      <div className="w-full">{children}</div>
    </CardFooter>
  )
}
