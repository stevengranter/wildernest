import { CSSProperties, ReactNode } from "react"
import { useDraggable } from "@dnd-kit/core"

import { type Data } from "@dnd-kit/core"

export default function Draggable({
  id,
  style,
  data,
  children,
}: {
  id?: string
  style: CSSProperties
  data?: Data | undefined
  children: ReactNode
}) {
  const componentId = id || crypto.randomUUID()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${componentId}`,
    data: data,
  })

  const userStyles = transform
    ? {
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        zIndex: "+1000",
        ...style,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      className="draggable"
      style={userStyles}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}
