import { FC } from "react"
import styled from "styled-components"
import { themeSpacing, Spinner } from "@amsterdam/asc-ui"

import { usePermitDetails } from "app/state/rest"
import PermitDetails from "./PermitDetails"

type Props = {
  bagId: string
}

const Ul = styled.ul`
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(14) };
  }
`

const PermitDetailsList: FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId)
  const listItems = data?.map((detail) =>

    <li key={detail.permit_type}>
      <PermitDetails detail={ detail } />
    </li>
  )

  return (
    <>
        { isBusy && <Spinner /> }
        { !isBusy &&
          <Ul>
            {listItems}
          </Ul>
        }
    </>
  )
}
export default PermitDetailsList
