import React from "react"
import { Divider, Button } from "@datapunt/asc-ui"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CreateDebriefingLink: React.FC<Props> = ({ id }) => (
  <>
    <Divider />
    <p>Verwerken uitkomst debrief door projecthandhaver</p>
    <ButtonLink to={ to("/cases/:id/debriefing", { id })}>
      <Button variant="primary" as="span">Debrief verwerken</Button>
    </ButtonLink>
  </>
)
export default CreateDebriefingLink
