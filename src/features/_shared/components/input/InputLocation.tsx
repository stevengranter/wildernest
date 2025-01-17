import { ActionIcon, Group, NumberInput, TextInput } from "@mantine/core"
import { IconRadar } from "@tabler/icons-react"
import { useGeolocated } from "react-geolocated"
import { useState } from "react"
import calculateBoundingBox from "~/features/_shared/utils/calculateBoundingBox.ts"

export default function InputLocation() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    { latitude: 0, longitude: 0 },
  )

  const { getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    suppressLocationOnMount: true,
    userDecisionTimeout: 5000,
    onError(error) {
      console.log("Error getting position:", error)
    },
    onSuccess(position) {
      setCoords({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      })
    },
  })

  const [distance, setDistance] = useState(100)

  function handleActionIconClick() {
    console.log("handleActionIconClick")
    getPosition()
    const bbox = calculateBoundingBox(
      coords.latitude,
      coords.longitude,
      distance,
    )
    console.log(bbox)
  }

  const handleChangeDistance = (value: number | string | null) => {
    if (value !== null) {
      setDistance(Number(value))
    }
  }

  return (
    <Group>
      <TextInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        value={`${coords.latitude},${coords.longitude}`}
        rightSection={
          <ActionIcon
            aria-label="Use current location"
            onClick={handleActionIconClick}
          >
            <IconRadar />
          </ActionIcon>
        }
      />
      <NumberInput
        value={distance}
        onChange={(value) => handleChangeDistance(value)}
      />
    </Group>
  )
}
