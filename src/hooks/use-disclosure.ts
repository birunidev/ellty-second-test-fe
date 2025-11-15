import { useCallback, useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const onToggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return { isOpen, onOpen, onClose, onToggle }
}
