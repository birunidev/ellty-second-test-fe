import type { PropsWithChildren } from 'react'
import { ChevronDown, ChevronRight, Reply } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ReplyItem = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-3">
      <div className="flex gap-3">{children}</div>
    </div>
  )
}

export const ReplyItemIndentationLine = ({
  indentWidth,
}: {
  indentWidth: number
}) => {
  return (
    <div
      className="flex-shrink-0 border-l-2 border-border/50"
      style={{ width: `${indentWidth}px`, minWidth: `${indentWidth}px` }}
    />
  )
}

export const ReplyItemContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start gap-2">{children}</div>
    </div>
  )
}

export const ReplyItemReplyButton = ({
  onClick,
  isExpanded,
}: {
  onClick: () => void
  isExpanded: boolean
}) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onClick}
      className="mt-0.5 h-6 w-6 flex-shrink-0"
    >
      {isExpanded ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  )
}

export const ReplyItemDescriptionMeta = ({
  icon: Icon,
  children,
}: PropsWithChildren<{
  icon: LucideIcon
}>) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{children}</span>
      </div>
    </div>
  )
}

export const ReplyItemDescriptionSeparator = () => {
  return <span>•</span>
}

export const ReplyItemContent = ({ children }: PropsWithChildren) => {
  return <div className="flex-1 border p-2 rounded-lg">{children}</div>
}

export const ReplyItemMeta = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center gap-2 mb-2">{children}</div>
}

export const ReplyItemContentText = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-sm text-foreground whitespace-pre-wrap">{children}</p>
  )
}

export const ReplyItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="h-7 text-xs">
      <Reply className="h-3 w-3 mr-1.5" />
      Reply
    </Button>
  )
}
