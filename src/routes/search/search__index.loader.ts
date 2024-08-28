import { INAT_API_URL } from "utils/constants";

export default async function searchIndexLoader(
  queryString: undefined | string | null,
) {
  if (!queryString) return "Please enter a search term";

  return fetch(`${INAT_API_URL}/taxa/?rank=species&q=${queryString}`).then(
    (res) => res.json(),
  );
}