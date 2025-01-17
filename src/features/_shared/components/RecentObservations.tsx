// import { useQuery } from "@tanstack/react-query"
// import { API_SERVER } from "~/features/_shared/api/constants.ts"
// import { useState } from "react"
// import { useSearchParams } from "react-router-dom"
//
// export default function RecentObservations() {
//   const [searchParams, setSearchParams] = useSearchParams("")
//   const { data, error, isLoading } = useQuery({
//     queryKey: [API_SERVER.INAT, `/observations`, `${searchParams}`],
//     // Only run query if we have searchParams
//     enabled: !!searchParams.get("q"),
//   })
// }
