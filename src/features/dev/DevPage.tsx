import INatForm from "~/features/dev/INatForm.tsx"
import DefaultPaper from "~/features/_shared/components/DefaultPaper.tsx"
import { Title } from "@mantine/core"

export default function DevPage() {
  return (
    <DefaultPaper>
      <Title order={2}>Development stuff</Title>

      <INatForm />
    </DefaultPaper>
  )
}
