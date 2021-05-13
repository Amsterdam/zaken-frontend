import React, { FC } from "react"
import styled from "styled-components"
import { usePermitDetails } from "app/state/rest"
import { DateDisplay } from "@amsterdam/wonen-ui"
import { themeColor, themeSpacing, Spinner } from "@amsterdam/asc-ui"

type Props = {
  bagId: string
}

const Details = styled.details`
  grid-column: span 2;
  justify-self: stretch;
`

const Summary = styled.summary`
  color: ${ themeColor("primary") };
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  details[open] > & {
    margin-bottom: ${ themeSpacing(4) };
  }
`

const Label = styled.label`
  color: ${ themeColor("tint", "level5") };
  font-weight: 500;
  word-break: break-word;
`
const Text = styled.span`
  word-break: break-word;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`

const TwoColumns = styled.div`
  grid-column: span 2;
  justify-self: stretch;
`

const Hr = styled.hr`
  margin: 0;
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
`

const VacationRental: FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const verhuur = data?.vakantieverhuur_meldingen

  return (
    <>
      { isBusy && <Spinner /> }
      { !isBusy &&
      <Grid>
        <Label>Nachten verhuurd</Label>
        <Text>
          <strong>{ verhuur?.rented_days_count }</strong>
        </Text>
        <Label>Vandaag verhuurd</Label>
        <Text>{ verhuur?.is_rented_today ? "Ja" : "Nee" }</Text>
        <Label>Nachten gepland</Label>
        <Text>{ verhuur?.planned_days_count }</Text>
        { verhuur?.rented_days_count && verhuur?.rented_days_count > 0 &&
        <>
          <TwoColumns>
            <Hr />
          </TwoColumns>
          <Details>
            <Summary>Alle meldingen</Summary>
            <Grid>
              {
                verhuur.meldingen.map((melding: Components.Schemas.VakantieverhuurMelding, index: number) => {
                  const checkIn = new Date(melding.check_in_date)
                  const checkOut = new Date(melding.check_out_date)
                  // TODO: Document that magic number
                  const nightsRented = (checkOut.getTime() - checkIn.getTime()) / 8.64e+7

                  return (
                    <React.Fragment key={ index }>
                      <TwoColumns>
                        <strong>
                          { melding.is_afmelding ? "Afmelding " : "Melding " }
                          { nightsRented } nachten
                        </strong>
                      </TwoColumns>
                      <Label>Check in</Label>
                      <Text><DateDisplay date={ melding.check_in_date } /></Text>
                      <Label>Check out</Label>
                      <Text><DateDisplay date={ melding.check_out_date } /></Text>
                    </React.Fragment>
                  )
                })
              }
            </Grid>
          </Details>
        </>
        }
      </Grid>
      }
    </>
  )
}

export default VacationRental
