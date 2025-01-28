import React, { PropsWithChildren, useState } from "react"
import type { Collection } from "~/features/_shared/hooks/useCollections.ts"
import { useLogger } from "~/dev.ts"
import { ComboboxItem, Select } from "@mantine/core"

export function CollectionsSelectDropdown({
  collections,
  handleSelect,
}: {
  collections: PropsWithChildren<Collection[]>
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (collectionId: string) => void
}) {
  const [value, setValue] = useState<ComboboxItem | null>({
    value: "",
    label: "",
  })
  const data = collections.map((collection) => ({
    value: collection.id,
    label: collection.name,
  }))

  useLogger("CollectionsSelect", [value])

  return (
    <Select
      data={data}
      value={value ? value.value : null}
      // onChange={handleSelect}
      onChange={(_value, option) => {
        setValue(option)
        return handleSelect && option ? handleSelect(option.value) : null
      }}
      mb="xs"
      radius="lg"
      size="md"
    />
  )
}
