import React, { useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"

import {
  ActionIcon,
  Anchor,
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  CardProps,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  Overlay,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import {
  IconArrowForwardUp,
  IconHeart,
  IconHeartFilled,
  IconMaximize,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useLogger } from "~/dev.ts"
import { API_SERVER } from "~/features/_shared/api/constants.ts"
import FoundItButton from "~/features/card/components/FoundItButton.tsx"
import ToggleCollectionButton from "~/features/card/components/ToggleCollectionButton.tsx"
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "~/models/iNatTaxaResponseType.ts"
import { WilderKindCardType } from "~/models/WilderKindCardType.ts"
import { Interweave } from "interweave"

import styles from "./WildCard.module.css"
import Draggable from "~/features/card/components/DndKit/Draggable.tsx"
import { useDisclosure } from "@mantine/hooks"

type WildCardProps = {
  taxonId?: number | string
  dataObject?: iNatTaxonRecord | undefined
  restProps?: CardProps | undefined
}

// const cardImagePath = "./assets/images/cards/"

export function WildCard({ taxonId, dataObject, restProps }: WildCardProps) {
  const [cardId, setCardId] = useState(taxonId)
  const [iNatData, setINatData] = useState(dataObject)
  const [isFlipped, setIsFlipped] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)

  useLogger("WildCard", [taxonId, dataObject])

  const iNatQuery = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa`, `/${cardId}`],
    enabled: !!cardId,
  })

  useEffect(() => {
    if (iNatQuery.data) {
      const { results } = iNatQuery.data as iNatTaxaResponseType
      setINatData(results[0])
    }
  }, [iNatQuery.data])

  function handleFlip(e: React.MouseEvent) {
    e.preventDefault()
    if (iNatData && iNatData.id) setCardId(iNatData.id)
    setIsFlipped((prevState) => !prevState)
  }

  function handleZoom() {
    open()
  }

  if (!iNatData) return null

  const dragStyles = {
    scale: `0.6`,
    rotate: `-10deg`,
    transition: `scale 250ms, rotate 100ms`,
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="md"
        // fullScreen
        bg="black"
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <WildCard_Front
            iNatdata={iNatData}
            // isLoading={iNatQuery.isLoading}
            // wilderNestData={wilderNestData}
            onFlip={(e: React.MouseEvent) => handleFlip(e)}
            onZoom={handleZoom}
            {...restProps}
          />

          <WildCard_Back
            iNatdata={iNatData}
            isLoading={iNatQuery.isLoading}
            onFlip={(e: React.MouseEvent) => handleFlip(e)}
            {...restProps}
          />
        </ReactCardFlip>
      </Modal>
      {/*<div ref={setNodeRef} style={style} {...listeners} {...attributes}>*/}
      <Draggable id={taxonId?.toString()} style={dragStyles}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <WildCard_Front
            iNatdata={iNatData}
            // isLoading={iNatQuery.isLoading}
            // wilderNestData={wilderNestData}
            onFlip={(e: React.MouseEvent) => handleFlip(e)}
            onZoom={handleZoom}
            {...restProps}
          />

          <WildCard_Back
            iNatdata={iNatData}
            isLoading={iNatQuery.isLoading}
            onFlip={(e: React.MouseEvent) => handleFlip(e)}
            {...restProps}
          />
        </ReactCardFlip>
      </Draggable>
      {/*</div>*/}
    </>
  )
}

function WildCard_Front({
  iNatdata,
  // isLoading,
  onZoom,
  onFlip,
  // wilderNestData,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  // isLoading: boolean
  // eslint-disable-next-line no-unused-vars
  onFlip?: (e: React.MouseEvent) => void
  onZoom?: () => void
  wilderNestData?: WilderKindCardType | null
}) {
  // const theme = useMantineTheme()
  if (!iNatdata) return null
  // console.log(iNatdata)

  return (
    <Card
      key={iNatdata.id}
      // withBorder
      radius={"lg"}
      shadow="md"
      className={styles.wildcard}
      pb="md"
      {...restProps}
    >
      <Card.Section>
        {/*{iNatdata.default_photo && (*/}
        <AspectRatio ratio={1}>
          <BackgroundImage
            src={
              iNatdata.default_photo
                ? iNatdata.default_photo?.medium_url
                : "assets/images/ui/no-photo-beaver-01.jpg"
            }
          >
            <Group justify="space-between">
              <Group justify="flex-start">
                {" "}
                <Tooltip label="Zoom card">
                  <ActionIcon
                    radius="xl"
                    size="lg"
                    onClick={onZoom}
                    m="xs"
                    aria-label="Zoom"
                  >
                    <IconMaximize />
                  </ActionIcon>
                </Tooltip>
              </Group>
              <Group justify="flex-end">
                <Tooltip label="Flip card">
                  <ActionIcon
                    radius="xl"
                    size="lg"
                    onClick={onFlip}
                    m="xs"
                    aria-label="Flip card"
                    // opacity="75%"
                  >
                    <IconArrowForwardUp />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </BackgroundImage>
        </AspectRatio>
        {/*)}*/}
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
    </Card>
  )
}

function WildCard_Back({
  iNatdata,
  isLoading,
  onFlip,
  onZoom,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  isLoading: boolean
  // eslint-disable-next-line no-unused-vars
  onFlip?: (e: React.MouseEvent) => void
  onZoom?: () => void
  _wilderNestData?: WilderKindCardType | null
}) {
  // const theme = useMantineTheme()
  if (!iNatdata) return null

  return (
    <Card
      key={iNatdata.id}
      // withBorder
      radius={"lg"}
      className={styles.wildcard}
      {...restProps}
    >
      <Card.Section>
        <AspectRatio ratio={1}>
          <BackgroundImage
            src={
              iNatdata.default_photo
                ? iNatdata.default_photo?.medium_url
                : "assets/images/ui/no-photo-beaver-01.jpg"
            }
          >
            <AspectRatio ratio={1}>
              <Overlay p="md" color="#000" backgroundOpacity={0.4} blur={12}>
                <Card.Section>
                  <Group justify="flex-end">
                    <ActionIcon
                      radius="xl"
                      size="lg"
                      onClick={onFlip}
                      m="xs"
                      aria-label="Flip card"
                    >
                      <IconArrowForwardUp />
                    </ActionIcon>
                  </Group>
                </Card.Section>
                <Stack justify="space-between">
                  {isLoading ? (
                    <Center>
                      <Loader color="white" type="bars" />
                    </Center>
                  ) : iNatdata.wikipedia_summary ? (
                    <Text
                      size="xs"
                      lineClamp={8}
                      c="white"
                      style={{ textShadow: "0px 0px 3px #000" }}
                    >
                      <Interweave content={iNatdata.wikipedia_summary} />
                    </Text>
                  ) : (
                    <Stack align="center">
                      <Image
                        src="assets/images/ui/sorry-owl.png"
                        alt="Sorry!"
                        h="auto"
                        w={"70%"}
                      />
                      <Text
                        size="md"
                        c="white"
                        style={{ textShadow: "0px 0px 3px #000" }}
                        fw={700}
                      >
                        Sorry, no description available
                      </Text>
                    </Stack>
                  )}

                  {iNatdata.wikipedia_url && (
                    <Box>
                      <Text
                        size="xs"
                        fs="italic"
                        lineClamp={2}
                        mt="xs"
                        c="white"
                      >
                        Source:{" "}
                        <Anchor href={iNatdata.wikipedia_url}>
                          {iNatdata.name} / Wikipedia{" "}
                        </Anchor>
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Overlay>
            </AspectRatio>
          </BackgroundImage>
        </AspectRatio>
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
    </Card>
  )
}

function WildCardFooter({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  return (
    <>
      <Card.Section className={styles.header} inheritPadding>
        <Flex justify="space-between" my="md" wrap="nowrap">
          <div>
            <Title
              order={3}
              size="h4"
              lineClamp={1}
              pb={0}
              mb={0}
              style={{ textTransform: "capitalize" }}
            >
              {iNatdata?.preferred_common_name || iNatdata?.english_common_name}
            </Title>
            <Text size="xs" lineClamp={1} mt={0} pt={0}>
              {iNatdata.name}
            </Text>
          </div>
          {iNatdata.id && (
            <Flex justify="center" align="flex-start" gap="xs" wrap="nowrap">
              <CollectionToggleButtons iNatdata={iNatdata} />
            </Flex>
          )}
        </Flex>
      </Card.Section>

      <Group justify="space-between" align="flex-end">
        {iNatdata.id && iNatdata.name && (
          <FoundItButton
            size="lg"
            mb={0}
            data={{
              taxonId: iNatdata.id,
              taxonName: iNatdata.name,
              taxonCommonName: iNatdata.preferred_common_name,
            }}
          />
        )}
      </Group>
    </>
  )
}

function CollectionToggleButtons({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  const theme = useMantineTheme()
  return (
    <>
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Wishlist"
        TrueIconComponent={
          <IconStarFilled
            color="yellow"
            style={{ stroke: "orange", strokeWidth: "2" }}
          />
        }
        FalseIconComponent={<IconStar />}
        variant="transparent"
      />
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Favorites"
        TrueIconComponent={
          <IconHeartFilled
            color="red"
            style={{
              stroke: theme.colors.red[9],
              strokeWidth: "2",
            }}
          />
        }
        FalseIconComponent={<IconHeart />}
        variant="transparent"
      />
    </>
  )
}
