import { useDroppable } from "@dnd-kit/core"
import { ReactNode } from "react"

export default function Droppable({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${id}`,
  })
  const style = {
    background: isOver ? "magenta" : "goldenrod",
  }

  return (
    <div ref={setNodeRef} className="droppable" style={style}>
      {children}
    </div>
  )
}
