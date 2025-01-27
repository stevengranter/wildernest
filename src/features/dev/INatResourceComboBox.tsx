import { Combobox, TextInput, useCombobox } from "@mantine/core"
import { useState } from "react"

const resources = ["search", "taxa", "observations", "places"]

export default function INatResourceComboBox({ name }: { name: string }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const [value, setValue] = useState<string | null>(null)

  const options = resources.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val)
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <TextInput
          component="input"
          name={name}
          onClick={() => combobox.toggleDropdown()}
          value={value || ""}
        />
        {/*{value || <Input.Placeholder>Pick value</Input.Placeholder>}*!/*/}

        {/*<InputBase*/}
        {/*  component="button"*/}
        {/*  type="button"*/}
        {/*  pointer*/}
        {/*  rightSection={<Combobox.Chevron />}*/}
        {/*  rightSectionPointerEvents="none"*/}
        {/*  onClick={() => combobox.toggleDropdown()}*/}
        {/*>*/}
        {/*  {value || <Input.Placeholder>Pick value</Input.Placeholder>}*/}
        {/*</InputBase>*/}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
