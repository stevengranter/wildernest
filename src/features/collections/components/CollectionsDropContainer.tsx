import { Stack, Title } from "@mantine/core"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"

import Droppable from "~/features/card/components/DndKit/Droppable.tsx"

export default function CollectionsDropContainer() {
  const [collections] = useCollections()
  // const dndContext = useDndContext()
  // console.log("CollectionsDropContainer", dndContext)
  // useDndMonitor({
  //   // onDragStart(event) {
  //   //   console.log("CollectionView : onDragStart: id: ", event.active.id)
  //   // },
  //   // onDragMove(event) {},
  //   // onDragOver(event) {},
  //   onDragOver(event) {
  //     console.log("CollectionsDropContainer : onDragOver ", event)
  //   },
  //   onDragEnd(event) {
  //     console.log("CollectionsDropContainer : onDragEnd: id: ", event)
  //   },
  //   // onDragCancel(event) {},
  // })
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
