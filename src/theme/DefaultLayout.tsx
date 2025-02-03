import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import { ActionIcon, AppShell, Group, rem } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconCards, IconHome, IconSearch } from "@tabler/icons-react"
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx"

import styles from "./DefaultLayout.module.css"
import CollectionsDropContainer from "~/features/collections/components/CollectionsDropContainer.tsx"
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"

const backgroundImage = "./assets/images/ui/forest-bg-01.png"
export default function DefaultLayout() {
  useEffect(() => {
    const originalBackground = document.body.style.backgroundImage

    document.body.style.backgroundImage = `url(${backgroundImage})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "top"
    document.body.style.backgroundAttachment = "fixed"
    document.body.style.backgroundColor = "#56CADA"
    console.log({ styles })

    // Cleanup on unmount
    return () => {
      document.body.style.backgroundImage = originalBackground
    }
  }, [])
  // const pinned = useHeadroom({ fixedAt: 10 })

  const mediaQuery = `(min-width: 64em)`

  const isDesktop = useMediaQuery(mediaQuery)

  const collectionAction = useCollectionActions()

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      console.log(event)
      const activeObject = event.active
      const overObject = event.over
      let collectionId = overObject.id

      const dropAction = event.over.data.current?.dropAction
      if (event.over.data.current && dropAction) {
        const idPrefix = event.over.data.current.dropAction.name
        const regex = new RegExp(`^${idPrefix}-`)
        collectionId = event.over.id.toString().replace(regex, "")
        dropAction()
      }
      // collectionAction.addIdToCollectionId(event.active.id, collectionId)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={(e) => handleDragEnd(e)}>
      <AppShell
        layout="alt"
        // header={{ height: rem(270), collapsed: !pinned, offset: true }}
        // header={{ height: rem(120), collapsed: !pinned, offset: true }}
        footer={{ height: rem(80), collapsed: isDesktop }}
        navbar={{
          width: rem(200),
          breakpoint: "md",
          collapsed: { desktop: false, mobile: true },
        }}
        aside={{ width: 200, breakpoint: 1 }}
        p="lg"
      >
        <AppShell.Navbar withBorder={false}>
          <NavbarSimple />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <AppShell.Aside p="md">
          <CollectionsDropContainer />
        </AppShell.Aside>
        <AppShell.Footer withBorder={false}>
          <Group
            justify="space-around"
            align="center"
            // bg="orange"
            className={styles.mobile_toolbar}
            bottom="0"
            py="sm"
          >
            <Link to="/">
              <ActionIcon variant="transparent" color="white" size={60}>
                <IconHome className={styles.footer_icon} stroke="2"></IconHome>
              </ActionIcon>
            </Link>

            <Link to="/collections">
              <ActionIcon variant="transparent" color="white" size={60}>
                <IconCards
                  className={styles.footer_icon}
                  stroke="2"
                ></IconCards>
              </ActionIcon>
            </Link>
            <Link to="/search">
              <ActionIcon variant="transparent" color="white" size={60}>
                <IconSearch
                  className={styles.footer_icon}
                  stroke="2"
                ></IconSearch>
              </ActionIcon>
            </Link>
          </Group>
          {/*</Paper>*/}
        </AppShell.Footer>
      </AppShell>
    </DndContext>
  )
}
