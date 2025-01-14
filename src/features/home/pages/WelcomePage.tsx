const logo = "./assets/images/logo.png"
import { Flex, Image } from "@mantine/core"

import SearchPage from "~/features/search/pages/SearchPage.tsx"

export default function WelcomePage() {
  return (
    <>
      <ResponsiveLogo />
      <SearchPage title="Welcome to WilderNest" />
    </>
  )
}

function ResponsiveLogo() {
  return (
    <Flex
      // mih={50}
      gap="sm"
      align={{ base: "center" }}
      justify="center"
      direction={{ base: "column" }}
    >
      <Image
        src={logo}
        alt="WilderNest logo"
        maw={{ base: "80%", sm: "30%" }}
        pb="2rem"
        style={{ filter: "drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.4))" }}
      />
    </Flex>
  )
}
