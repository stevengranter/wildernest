import { CollectionsSelectDropdown } from "~/features/card/CollectionsSelectDropdown.tsx"
import {
  Collection,
  useCollections,
} from "~/features/_shared/hooks/useCollections.ts"
import CardGrid from "~/features/card/CardGrid.tsx"
import { useCallback, useEffect, useState } from "react"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"
import { useLogger } from "~/dev.ts"
import { useSearchParams } from "react-router-dom"

export default function CollectionsView2() {
  const [collections] = useCollections()
  const collectionAction = useCollectionActions()
  const [searchParams, setSearchParams] = useSearchParams()

  const collectionId =
    searchParams.get("collectionId") || (collections?.[0]?.id ?? null)

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null)

  const cards = selectedCollection ? selectedCollection.items : []

  useEffect(() => {
    if (!searchParams.get("collectionId")) {
      console.warn("No collectionID specified in URL")
    }

    if (collectionAction.hasCollectionId(searchParams.get("collectionId"))) {
      console.info(
        `Collection specified in URL: ${searchParams.get("collectionId")}}`,
      )
      const verifiedCollection = collections.find(
        (collection) => collection.id === searchParams.get("collectionId"),
      )
      if (verifiedCollection) setSelectedCollection(verifiedCollection)
    }
  }, [searchParams])

  // Memoize handleSelect to prevent unnecessary re-renders
  const handleSelect = useCallback(
    (newCollectionId: string) => {
      if (
        !collectionAction.hasCollectionId(newCollectionId) ||
        !newCollectionId
      ) {
        console.log(
          `No collection selected, or collection with id ${newCollectionId} not found`,
        )
        return
      }
      // setCollectionId(newCollectionId)

      // Update the search params in the URL
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev)
        newSearchParams.set("collectionId", newCollectionId)
        return newSearchParams
      })
    },
    [collectionAction, setSearchParams],
  )

  useLogger("CollectionsView2", [cards])
  return (
    <>
      <CollectionsSelectDropdown
        collections={collections}
        handleSelect={handleSelect}
      />
      <CardGrid cards={cards} collectionId={collectionId} />
    </>
  )
}
