import { SimpleGrid } from "@mantine/core"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"
import React from "react"

export default function CardGrid({
  cards = [],
}: {
  cards: string[]
  collectionId?: string
}) {
  // const nodeRef = useRef(null)
  return (
    <>
      <SimpleGrid
        cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
        spacing={{ base: "lg" }}
        verticalSpacing={{ base: "lg" }}
        mt={"md"}
        className="transition-grid"
      >
        <TransitionGroup>
          {cards.length > 0 &&
            cards?.map((taxon_id) => {
              // const itemKey = `${taxon_id}-${selectedCollectionId}-${Date.now()}`
              return (
                <CSSTransition
                  key={taxon_id}
                  classNames="card"
                  timeout={500}
                  // nodeRef={nodeRef}
                  // unmountOnExit
                >
                  <WildCard taxonId={taxon_id} />
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      </SimpleGrid>
    </>
  )
}
