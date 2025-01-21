import { Stack, Title } from "@mantine/core"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"

import Droppable from "~/features/card/components/DndKit/Droppable.tsx"

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
            <Droppable id={collection.id}>
              <Title>{collection.name}</Title>
            </Droppable>
          ))}
        </Stack>
      </>
    )
  )
}
