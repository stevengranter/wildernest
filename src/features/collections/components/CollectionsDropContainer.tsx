import { Stack, Title } from "@mantine/core"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"

import Droppable from "~/features/card/components/DndKit/Droppable.tsx"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"
import { useDndContext } from "@dnd-kit/core"

export default function CollectionsDropContainer() {
  const [collections] = useCollections()
  const collectionAction = useCollectionActions()
  const { active } = useDndContext()

  useLogger("Active", [active])

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
            <Droppable
              id={collection.id}
              dropAction={() => {
                if (active) {
                  collectionAction.addIdToCollectionId(
                    active.id,
                    collection.id,
                    active.data.current?.name,
                    active.data.current?.commonName,
                  )
                }
              }}
            >
              <Title>{collection.name}</Title>
            </Droppable>
          ))}
        </Stack>
      </>
    )
  )
}
