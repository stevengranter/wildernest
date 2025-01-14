import { Alert, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom"
import { IconAlertTriangle } from "@tabler/icons-react"

export default function WelcomeText() {
  return (
    <Text>
      <Title order={1}>Welcome to WilderNest!</Title>
      <Text py="xs">
        Interested in the natural world? 🌱 Need a way to keep track of all your
        awesome discoveries? Add plants, an️imals, insects and your favorites
        ❤️, or group them into your own{" "}
        <Link to="/collections">collections</Link>.
      </Text>
      <Text py="xs">
        Hoping to see some rare, exotic creatures on an upcoming trip?{" "}
        <Link to="/search">Search 🔍</Link>, then add them to your wishlist so
        you remember to look for them! ⭐
      </Text>
      <Alert
        variant="light"
        color="orange"
        radius="md"
        // title="Note"
        icon={<IconAlertTriangle />}
      >
        All data entered is stored in your web browser settings on your own
        device. No user data is stored or backed up online.
      </Alert>
    </Text>
  )
}
