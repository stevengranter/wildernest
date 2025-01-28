import { PropsWithChildren, useEffect, useMemo, useState } from "react"

import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core"
import { useLogger } from "~/dev.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.tsx"
import { useCollections } from "~/features/_shared/hooks/useCollections.ts"

type CollectionDropdownProps = {
  userCollections?: string[]
  collectionsIncludingTaxonId?: string[]
  taxonId: string | number
  taxonName: string
  taxonCommonName?: string
  props?: PropsWithChildren
}

export function CollectionDropdown({
  collectionsIncludingTaxonId,
  taxonId,
  taxonName,
  taxonCommonName,
  ...props
}: CollectionDropdownProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  })
  const collections = useCollections()
  const collectionAction = useCollectionActions()

  const memoizedCollectionAction = useMemo(
    () => collectionAction,
    [collectionAction],
  )
  const memoizedCollections = useMemo(() => collections, [collections])

  console.log({ taxonName })

  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState<string[]>(
    collectionsIncludingTaxonId || [],
  )

  useLogger("CollectionDropdown", [selection])

  useEffect(() => {
    const newCollections =
      memoizedCollectionAction.getCollectionNamesIncludingId(taxonId)
    if (
      newCollections &&
      JSON.stringify(newCollections) !== JSON.stringify(selection)
    ) {
      setSelection(newCollections)
    }
  }, [memoizedCollectionAction, memoizedCollections, taxonId, selection])

  const exactOptionMatch = memoizedCollectionAction
    .getAllCollectionNames()
    .some((item) => item === search)

  const handleValueSelect = (val: string) => {
    console.log(`handleValueSelect(${val})`)
    setSearch("")

    if (val === "$create") {
      collectionAction.getAllCollectionNames()
      setSelection((current) => [...current, search])
      // console.log(search)
      collectionAction.addIdToCollection(
        taxonId,
        search,
        taxonName,
        taxonCommonName,
      )
    } else {
      setSelection((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      )
      return !collectionAction.isItemInCollection(taxonId, val)
        ? collectionAction.addIdToCollection(
            taxonId,
            val,
            taxonName,
            taxonCommonName,
          )
        : collectionAction.removeIdFromCollection(
            taxonId,
            val,
            // taxonName,
            taxonCommonName,
          )
    }
  }

  const handleValueRemove = (val: string) => {
    console.log(val)
    setSelection((current) => current.filter((v) => v !== val))
    collectionAction.removeIdFromCollection(
      taxonId,
      val,
      // taxonName,
      taxonCommonName,
    )
  }

  const values = selection.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ))

  const options = collectionAction
    .getAllCollectionNames()
    .filter((item) =>
      item.toString().toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={selection.includes(item)}
      >
        <Group gap="sm">
          {selection.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ))

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={true}
      position="bottom"
      transitionProps={{ duration: 200, transition: "pop" }}
      offset={0}
      {...props}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          aria-label="Choose collection"
          onClick={() => combobox.openDropdown()}
          w="100%"
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                width={100}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Type to search or create new"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex()
                  setSearch(event.currentTarget.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault()
                    handleValueRemove(selection[selection.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch &&
            search.trim().length > 0 &&
            options.length === 0 && (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
