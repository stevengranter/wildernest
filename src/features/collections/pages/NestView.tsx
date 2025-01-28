import { useEffect, useState } from "react"

import { useLogger } from "~/dev.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"
import {
  Collection,
  useCollections,
} from "~/features/_shared/hooks/useCollections.ts"
import useNest from "~/features/_shared/hooks/useNest.ts"
import CollectionView from "~/features/card/CollectionView.tsx"

export default function NestView() {
  // Initialize nestState and collectionState for NestContext and
  // CollectionContext access
  const [nestState] = useNest()
  const [collectionsState] = useCollections()

  // Initialize nestAction for accessing nest management functions
  // const nestAction = useNestActions()

  // Initialize collectionActions for collection management functions
  const collectionAction = useCollectionActions()

  const [dropdownDataArray, setDropdownDataArray] = useState<
    { value: string; label: string }[]
  >([])
  const [itemIdsArray, setItemIdsArray] = useState<string[]>([])
  // const [collectionIdsArray, setCollectionIdsArray] = useState<string[]>([])
  const [collectionDescription, setCollectionDescription] = useState<
    string | null
  >(null)
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null)

  function formatDropdownData(collectionsArray: Collection[]) {
    if (!collectionsArray) return
    return collectionsArray.map((collection) => {
      return { value: collection.id, label: collection.name }
    })
  }

  useLogger("NestView", [
    // nestState,
    // collectionsState,
    // { collectionNames: dropdownDataArray },
    { selectedCollectionId },
    { itemIdsArray },
  ])

  // // on initial mount, set selectedCollectionId to the Starter Pack id
  useEffect(() => {
    const starterPackId = collectionAction.getCollectionIdByName("Starter Pack")
    setSelectedCollectionId(starterPackId)
  }, [])

  // if collectionsState has changed, update the dropDownDataArray
  useEffect(() => {
    console.log("collectionsState.length has changed")
    if (!collectionsState) {
      return // setDropdownDataArray([{ value: "2", label: "group" }])
    } else {
      const formattedData = formatDropdownData(collectionsState)
      if (formattedData) {
        setDropdownDataArray(formattedData)
      }
    }
    if (selectedCollectionId) {
      if (
        !dropdownDataArray.find(
          (collection) => collection.value == selectedCollectionId,
        )
      ) {
        console.log("selectedCollectionId is not in dropdownData")
      }
    }
  }, [collectionsState])

  // if selectedCollectionId has changed, update the itemIdsArray that's
  // passed to CardCollection component
  useEffect(() => {
    //TODO: Have nest ids and set in SelectBox if no collection is selected
    if (!selectedCollectionId) return
    const selectedCollection = collectionsState.find(
      (collection) => collection.id === selectedCollectionId,
    )
    if (!selectedCollection) return
    setItemIdsArray(selectedCollection.items)
    console.log({ selectedCollection })
    setCollectionDescription(selectedCollection.description || "")
  }, [selectedCollectionId, collectionsState])

  // TODO: Fix for choosing current option (errors with null value)
  function handleSelect(selectedValue: string) {
    console.log({ selectedValue })
    const starterPackId = collectionAction.getCollectionIdByName("Starter Pack")
    if (!selectedValue) {
      console.log("selectedValue is undefined")
      setSelectedCollectionId(starterPackId)
    }
    if (selectedValue) setSelectedCollectionId(selectedValue)
    console.log(selectedValue)
  }

  return (
    <>
      <CollectionsInitializer />
      <CollectionView />
    </>
  )

  // return collectionsState && collectionsState.length > 0 ? (
  //   <>
  //     <CollectionsInitializer />
  //     <CollectionView />
  //     {/*<CollectionSelectBox*/}
  //     {/*  data={dropdownDataArray}*/}
  //     {/*  value={selectedCollectionId}*/}
  //     {/*  defaultValue={selectedCollectionId}*/}
  //     {/*  handleSelectFn={handleSelect}*/}
  //     {/*/>*/}
  //
  //     {/*<CardCollection*/}
  //     {/*  itemIdArray={itemIdsArray}*/}
  //     {/*  collectionId={selectedCollectionId}*/}
  //     {/*  description={collectionDescription}*/}
  //     {/*/>*/}
  //   </>
  // ) : (
  //   <>
  //     <Text>No collections found</Text>
  //     <CardCollection
  //       itemIdArray={itemIdsArray}
  //       collectionId={selectedCollectionId}
  //       description={collectionDescription}
  //     />
  //   </>
  // )
}

// Initialize the Favorites collection if it doesn't exist
function CollectionsInitializer() {
  const collectionAction = useCollectionActions()

  useEffect(() => {
    // if (!collectionAction.getAllCollectionNames().includes("Favorites")) {
    //   collectionAction.createCollection("Favorites")
    // }
    // if (!collectionAction.getAllCollectionNames().includes("Starter Pack")) {
    //   collectionAction.createCollection("Starter Pack")
    // }
  }, [collectionAction])

  return null // This component doesn't render anything
}
