import { Button, List, ListItem, Stack, Title } from "@mantine/core"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"
import NestView from "~/features/collections/pages/NestView.tsx"
import { useDroppable } from "@dnd-kit/core"
import { PropsWithChildren } from "react"

export default function CollectionsDropContainer() {
  const [collections, updateCollections] = useCollections()
  useLogger("CollectionsList", [{ collections }])
  return (
    collections && (
      <>
        <Title order={3}>Collections</Title>
        <Stack>
          {collections.map((collection) => (
            <CollectionsDroppable id={collection.id} name={collection.name} />
          ))}
        </Stack>
      </>
    )
  )
}

function CollectionsDroppable({ id, name }: { id: string; name: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${id}-droppable`,
  })
  const style = {
    border: isOver ? "2px solid magenta" : undefined,
  }

  return (
    <Button style={style} ref={setNodeRef}>
      {name}
    </Button>
  )
}
