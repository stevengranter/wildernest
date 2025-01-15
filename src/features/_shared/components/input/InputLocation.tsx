import { ActionIcon, Group, TextInput } from "@mantine/core"
import { IconRadar } from "@tabler/icons-react"
import { useGeolocated } from "react-geolocated"

export default function InputLocation() {
  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    suppressLocationOnMount: true,
    userDecisionTimeout: 5000,
  })

  return (
    <Group>
      <TextInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        value={coords && `${coords.latitude}, ${coords.longitude}`}
        rightSection={
          <ActionIcon aria-label="Use current location" onClick={getPosition}>
            <IconRadar />
          </ActionIcon>
        }
      />
    </Group>
  )
}
