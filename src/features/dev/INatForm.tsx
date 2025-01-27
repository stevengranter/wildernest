import INatResourceComboBox from "~/features/dev/INatResourceComboBox.tsx"
import INatPlacesSearch from "~/features/dev/INatPlacesSearch.tsx"
import { Button } from "@mantine/core"

export default function INatForm() {
  const formAction = (formData: FormData) => {
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }
  }
  return (
    <>
      <form action={formAction}>
        <INatResourceComboBox name="iNatResource" />
        <INatPlacesSearch name="placeName" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
