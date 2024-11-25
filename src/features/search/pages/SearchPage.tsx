import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {
  Button,
  Flex,
  Grid,
  GridCol,
  Pagination,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLogger } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { API_SERVER } from "~/features/api/constants.ts"
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"
import { iNatTaxaResponseType } from "~/models/iNatTaxaResponseType.ts"

const defaultQueryParams = {
  per_page: "6",
}

type FormValues = {
  q?: string
  per_page: string
}

export default function SearchPage() {
  const form = useForm({ mode: "uncontrolled" })

  const [searchParams, setSearchParams] = useSearchParams()
  // const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useLogger("SearchPage", [{ searchParams }])

  const { data, error, isLoading } = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa?`, `${searchParams}`],
    // Only run query if we have searchParams
    enabled: !!searchParams.get("q"),
  })

  const iNatData = data as iNatTaxaResponseType

  // useEffect(() => {
  //   const currentParams = Object.fromEntries([...searchParams]);
  //   // console.log({currentParams});
  // }, [searchParams]);

  useEffect(() => {
    // console.log(`Data updated`);
    // console.log(data);
    if (iNatData) {
      const totalPageNumber = Math.ceil(
        iNatData.total_results / iNatData.per_page,
      )
      setTotalPages(totalPageNumber)
    }
  }, [iNatData])

  function handleSubmit(formValues: FormValues) {
    // setPageNumber(1)
    setTotalPages(0)
    console.log(formValues)
    const params = { ...formValues, ...defaultQueryParams }
    setSearchParams((prev) => {
      prev.set("per_page", params.per_page)
      if (params.q) prev.set("q", params.q)
      return prev
    })
  }

  function changePage(pageNumber: number) {
    console.log(`Page #: ${pageNumber} requested`)
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, page: pageNumber.toString() })
    console.log(searchParams.get("page"))
    // setPageNumber(pageNumber)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h1>Search</h1>
      <p>
        Type in your findings here: insect, plant, or animal. If you're not sure
        what you've found, check out our links page to some apps and smartphone
        features that can identify from a photo.
      </p>
      <p>
        Results are sorted by number of observations recorded in the
        iNaturalist.org iNatDatabase.
      </p>
      <p>
        Once you've found the plant/animal you're looking for, click the Add+
        button to add it to your nest. If you see something you're hoping to
        find later, click the star to add it to your wishlist.
      </p>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values as FormValues))}
      >
        <Flex align="flex-end">
          <TextInput
            placeholder="Enter search terms"
            key={form.key("q")}
            label="SearchPage"
            {...form.getInputProps("q")}
          />
          <Button type="submit">Submit</Button>
        </Flex>

        <div>
          {iNatData?.total_results &&
            `Total results: ${iNatData.total_results}`}
        </div>
      </form>

      {isLoading && "Loading..."}
      {iNatData && (
        <Grid>
          {iNatData.results &&
            iNatData?.results.map((result) => {
              // Find the enriched card for the current result
              // const correspondingCard = matchingCards.find(
              //   (card: WilderKindCardType) => card.taxon_id === result.id,
              // );

              return (
                <GridCol
                  span={{
                    base: 12,
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 4,
                    xl: 3,
                    xxl: 2,
                  }}
                  key={result.id}
                >
                  <WildCard dataObject={result} />
                </GridCol>
              )
            })}
        </Grid>
      )}
      {/*<div>*/}
      {/*  {iNatData && iNatData.total_results && `Page: ${pageNumber} of
       ${totalPages}`}*/}
      {/*</div>*/}
      {/*<div>{iNatData && iNatData.per_page && `Results per page:
       ${iNatData.per_page}`}</div>*/}
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          defaultValue={1}
          onChange={(page) => changePage(page)}
          key={form.key("page")}
        />
      )}
    </>
  )
}