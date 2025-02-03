import { DndContext, useDndContext, useDroppable } from "@dnd-kit/core"
import { ReactNode, useContext, useEffect } from "react"

export default function Droppable({
  id,
  dropAction = function logAction() {
    console.log("No drop action specified.")
  },
  children,
}: {
  id: string
  dropAction?: () => void
  children: ReactNode
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${dropAction.name}-${id}`,
    data: { dropAction: dropAction },
  })
  const { active } = useDndContext()

  const style = {
    background: isOver ? "magenta" : "goldenrod",
  }

  return (
    <div ref={setNodeRef} className="droppable" style={style}>
      {children}
    </div>
  )
}
