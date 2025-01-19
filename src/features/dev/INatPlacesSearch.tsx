import { useQuery } from "@tanstack/react-query"
import { API_SERVER } from "~/features/_shared/api/constants.ts"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Autocomplete } from "@mantine/core"

type ApiResponse = {
  results?: Array<{ uuid: string; name: string }>
}

export default function INatPlacesSearch() {
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebouncedValue(value, 500)

  const {
    data: responseData,
    error,
    isLoading,
  } = useQuery<ApiResponse>({
    queryKey: [API_SERVER.INAT, `/places/autocomplete?q=`, debouncedValue],
    enabled: !!value,
  })

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <Autocomplete
      label="Place"
      placeholder="Begin typing name for results"
      value={value}
      onChange={(value) => setValue(value)}
      data={
        responseData && !isLoading && !error && responseData.results
          ? responseData.results.map((result) => {
              return { value: result.uuid, label: result.name }
            })
          : []
      }
    ></Autocomplete>
  )
}
