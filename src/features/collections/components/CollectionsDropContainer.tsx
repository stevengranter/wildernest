import {
  Button,
  Card,
  Center,
  Container,
  List,
  ListItem,
  Stack,
  Title,
} from "@mantine/core"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"
import NestView from "~/features/collections/pages/NestView.tsx"
import { DragOverlay, useDroppable } from "@dnd-kit/core"
import { PropsWithChildren } from "react"

export default function CollectionsDropContainer() {
  const [collections, updateCollections] = useCollections()
  useLogger("CollectionsList", [{ collections }])
  return (
    collections && (
      <>
        <Title order={3}>Collections</Title>

        <Stack
          h="100%"
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="space-around"
          gap="md"
        >
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
    background: isOver ? "magenta" : "goldenrod",
  }

  return (
    <Card
      h="100%"
      w="100%"
      radius="md"
      shadow="lg"
      style={style}
      ref={setNodeRef}
    >
      <Center>{name}</Center>
    </Card>
  )
}
