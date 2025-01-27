import { useMantineTheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
  IconPlus,
  IconMinus,
  IconHeartFilled,
  IconStarFilled,
  IconHeart,
  IconStar,
} from "@tabler/icons-react"
import {
  Collection,
  useCollections,
} from "~/features/_shared/hooks/useCollections.ts"
import useNestActions from "~/features/_shared/hooks/useNestActions.ts"
import toTitleCase from "~/features/_shared/utils/toTitleCase.ts"
import _ from "lodash"
import { UniqueIdentifier } from "@dnd-kit/core"
import { nanoid } from "nanoid"

const notificationsQueueId = "message-queue"

function initNotifications() {
  notifications.show({
    id: notificationsQueueId,
    message: "",
    position: "top-right",
    radius: "xl",
    withBorder: true,
  })
}

export default function useCollectionActions() {
  const [state, update] = useCollections()
  const nestAction = useNestActions()
  const theme = useMantineTheme()

  // ---- Collection Management ----
  function hasCollection(name: string): boolean {
    return state.some((collection) => collection.name === name)
  }

  function hasCollectionId(
    id: string | UniqueIdentifier | undefined | null,
  ): boolean {
    return state.some((collection) => collection.id === id)
  }

  function createCollection(collectionName: string): void {
    console.log("createCollection()")
    initNotifications()
    if (getAllCollectionNames().includes(collectionName)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Collection ${collectionName} already exists`,
        color: "orange",
      })
    } else {
      if (collectionName.length === 0) {
        notifications.update({
          id: notificationsQueueId,
          message: `Collection name must be at least 1 character in length`,
          color: "orange",
        })
        return
      } else {
        update((draft) => {
          draft.push({
            name: collectionName,
            id: nanoid(),
            items: [],
          })
          notifications.update({
            id: notificationsQueueId,
            message: `Collection ${collectionName} created`,
          })
        })
      }
    }
  }

  function deleteCollection(collectionId: number | string): void {
    update((draft) => {
      _.remove(draft, function (collection: Collection) {
        return collection.id === collectionId
      })
    })
  }

  function addIdToCollectionId(
    taxonId: number | string,
    collectionId: string | UniqueIdentifier,
    taxonName?: string,
    taxonCommonName?: string,
  ): void {
    initNotifications()
    if (!nestAction.isValidId(taxonId)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot add id: ${taxonId}, not a valid id`,
      })
      return
    }

    if (!nestAction.isItemInNest(taxonId)) {
      // Add item to the Nest
      nestAction.addItemToNest(taxonId.toString())
    }

    if (!hasCollectionId(collectionId)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Collection: ${collectionId} does not exist.`,
        color: "orange",
      })
      // createCollection(collectionId)
    }

    update((draft) => {
      const reqCollection = draft.find(
        (collection) => collection.id === collectionId,
      )

      if (reqCollection) {
        if (reqCollection.items.includes(taxonId.toString())) {
          notifications.update({
            id: notificationsQueueId,
            message: `Cannot add, Collection ${collectionId} already includes id: ${taxonId}`,
            color: "orange",
          })
          return
        }

        reqCollection.items.push(taxonId.toString())
        console.log({ taxonId })
        console.log({ taxonName })

        const iconConfig = {
          icon: <IconPlus />,
          color: theme.primaryColor,
        }
        if (reqCollection.name === "Favorites") {
          iconConfig.icon = <IconHeartFilled color="red" />
          iconConfig.color = "white"
        } else if (reqCollection.name === "Wishlist") {
          iconConfig.icon = <IconStarFilled color="gold" />
          iconConfig.color = "white"
        } else {
          // iconPlus = <IconPlus />
        }

        notifications.update({
          id: notificationsQueueId,
          message: ``, //(${taxonName}, id: ${taxonId}) added
          // tto ${reqCollection.collectionId}`,
          title: `${taxonCommonName && toTitleCase(taxonCommonName)} added to ${reqCollection.name}`,

          ...iconConfig,
        })
      }
    })
  }

  function addIdToCollectionName(
    taxonId: number | string,
    name: string,
    taxonName?: string,
    taxonCommonName?: string,
  ): void {
    initNotifications()
    if (!nestAction.isValidId(taxonId)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot add id: ${taxonId}, not a valid id`,
      })
      return
    }

    if (!nestAction.isItemInNest(taxonId)) {
      // Add item to the Nest
      nestAction.addItemToNest(taxonId.toString())
    }

    if (!hasCollection(name)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Collection: ${name} does not exist, creating collection...`,
        color: "orange",
      })
      createCollection(name)
    }

    update((draft) => {
      const namedCollection = draft.find(
        (collection) => collection.name === name,
      )

      if (namedCollection) {
        if (namedCollection.items.includes(taxonId.toString())) {
          notifications.update({
            id: notificationsQueueId,
            message: `Cannot add, Collection ${name} already includes id: ${taxonId}`,
            color: "orange",
          })
          return
        }

        namedCollection.items.push(taxonId.toString())
        console.log({ taxonId })
        console.log({ taxonName })

        const iconConfig = {
          icon: <IconPlus />,
          color: theme.primaryColor,
        }
        if (namedCollection.name === "Favorites") {
          iconConfig.icon = <IconHeartFilled color="red" />
          iconConfig.color = "white"
        } else if (namedCollection.name === "Wishlist") {
          iconConfig.icon = <IconStarFilled color="gold" />
          iconConfig.color = "white"
        } else {
          // iconPlus = <IconPlus />
        }

        notifications.update({
          id: notificationsQueueId,
          message: ``, //(${taxonName}, id: ${taxonId}) added
          // tto ${namedCollection.name}`,
          title: `${taxonCommonName && toTitleCase(taxonCommonName)} added to ${namedCollection.name}`,

          ...iconConfig,
        })
      }
    })
  }

  function removeIdFromCollection(
    taxonId: number | string,
    name: string,
    // taxonName?: string,
    taxonCommonName?: string,
  ): void {
    initNotifications()
    if (!hasCollection(name)) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot remove id, Collection ${name} does not exist`,
        color: "orange",
      })
      return
    }

    const namedCollection = state.find((collection) => collection.name === name)
    if (
      !namedCollection ||
      !namedCollection.items.includes(taxonId.toString())
    ) {
      notifications.update({
        id: notificationsQueueId,
        message: `Cannot remove, ID: ${taxonId} is not in collection ${name}`,
        color: "orange",
      })
      return
    }

    const iconConfig = { icon: <IconMinus />, color: theme.primaryColor }
    if (namedCollection.name === "Favorites") {
      iconConfig.icon = <IconHeart color="teal" />
      iconConfig.color = "white"
    } else if (namedCollection.name === "Wishlist") {
      iconConfig.icon = <IconStar color="teal" />
      iconConfig.color = "white"
    } else {
      // iconPlus = <IconPlus />
    }

    update((draft) => {
      const collectionToUpdate = draft.find(
        (collection) => collection.name === name,
      )
      if (collectionToUpdate) {
        const index = collectionToUpdate.items.indexOf(taxonId.toString())
        if (index > -1) {
          collectionToUpdate.items.splice(index, 1)
          notifications.update({
            id: notificationsQueueId,
            title: `${taxonCommonName && toTitleCase(taxonCommonName)} removed from ${namedCollection.name}`,
            message: ``, //(${taxonName}, id: ${taxonId}) removed from
            // ${namedCollection.name}`,
            ...iconConfig,
          })
        }
      }
    })
  }

  function getCollectionIdByName(name: string): string | null {
    // initNotifications()
    const namedCollection = state.find((collection) => collection.name === name)
    if (!namedCollection) {
      // notifications.update({
      //   id: notificationsQueueId,
      //   message: `Collection ${name} does not exist, no corresponding id`,
      // })
      return null
    }
    return namedCollection.id
  }

  function isItemInCollection(id: number | string, name: string): boolean {
    // initNotifications()
    // if (!hasCollection(name)) {
    //   notifications.update({
    //     id: notificationsQueueId,
    //     message: `Collection ${name} does not exist`,
    //   })
    //   return false
    // }

    const namedCollection = state.find((collection) => collection.name === name)

    return !!namedCollection?.items.includes(id.toString())
  }

  function getCollectionsIncludingId(id: string | number): Collection[] | null {
    // initNotifications()
    const matchingCollections = state.filter((collection) =>
      collection.items.includes(id.toString()),
    )
    if (matchingCollections.length === 0) {
      // notifications.update({
      //   message: `id: ${id} cannot be found in any collection`,
      // })
      return null
    }
    return matchingCollections
  }

  function getCollectionNamesIncludingId(id: string | number): string[] | null {
    const matchingCollections = getCollectionsIncludingId(id)
    if (!matchingCollections) return null
    return matchingCollections.map((collection) => collection.name)
  }

  function getAllCollectionNames() {
    return state.map((collection) => collection.name)
  }

  return {
    createCollection,
    hasCollectionId,
    getCollectionNamesIncludingId,
    getCollectionIdByName,
    deleteCollection,
    getAllCollectionNames,
    addIdToCollection: addIdToCollectionName,
    addIdToCollectionId,
    removeIdFromCollection,
    isItemInCollection,
  }
}
