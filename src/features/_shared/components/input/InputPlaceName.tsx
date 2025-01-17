import { Autocomplete } from "@mantine/core"

export default function InputPlaceName() {
  return (
    <Autocomplete
      label="Location"
      placeholder="Type your location"
      data={["Quebec", "Newfoundland and Labrador", "New Brunswick", "Ontario"]}
    />
  )
}
