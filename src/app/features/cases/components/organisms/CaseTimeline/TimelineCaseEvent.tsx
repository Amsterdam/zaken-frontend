import React from "react"
import styled from "styled-components"
import {  themeColor, themeSpacing, breakpoint } from "@datapunt/asc-ui"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate, displayTime } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import shouldCreateDebriefing from "app/state/workflow/shouldCreateDebriefing"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  button?: JSX.Element
}

type DLProps = {
  thread: Components.Schemas.CaseEvent
  showDate: boolean
}
type ButtonDebriefProps = {
  caseId:  number
  debriefId: number
  button?: JSX.Element
}
const Dl = styled.dl`
max-width: 800px;

&:after {
  clear: both;
  content: "";
  display: table;
}

dd, dt {
  width: 50%;
  padding: ${ themeSpacing(1) } 0;
}
dt {
  float: left;
  clear: both;
  word-wrap: break-word;
  padding-right: ${ themeSpacing(5) };
  color: ${ themeColor("tint","level6") };
  @media ${ breakpoint("min-width", "tabletM") } {
    width: 30%;
  }
}
dd {
  margin: 0;
  padding-right: 20px;
  float: right;
  clear: right;
  @media ${ breakpoint("min-width", "tabletM") } {
    width: 70%;
  }
}
`
const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
  }
`

const mapCaseType = (type: Components.Schemas.TypeEnum) => {
  switch (type) {
    case "DEBRIEFING": return "Debrief"
    case "VISIT": return "Huisbezoek(en)"
    case "CASE": return "Aanleiding"
  }
}

// const mapEventKeys = (value: string) => {
//   switch (value) {
//     case "start_time": return "Starttijd"
//     case "authors": return "Toezichthouders"
//     case "situation": return "Situatie"
//     case "observations": return "Kenmerken"
//     case "can_next_visit_go_ahead": return "Vervolgactie"
//     case "can_next_visit_go_ahead_description": return "Toelichting"
//     case "suggest_next_visit": return "Volgend bezoek"
//     case "suggest_next_visit_description": return "Toelichting"
//     case "notes": return "Toelichting"
//   }
// }

const mapEventValues = (value: string) => {
  switch (value) {
    case "malfunctioning_doorbel": return "Bel functioneert niet"
    case "intercom": return "Contact via intercom"
    case "hotel_furnished": return "Hotelmatig ingericht"
    case "vacant": return "Leegstaand"
    case "inhabited": return "Vermoedelijk bewoond" //TODO check value with back-end
    case "nobody_present": return "Niemand aanwezig"
    case "no_cooperation": return "Geen medewerking" //TODO check value with back-end
    case "access_granted": return "Toegang verleend"
  }
}

const mapArrayToUl = (list: any, doMapValue: boolean = false) => 
  <UnstyledList>
    { list.map((item: any, index: number) =>
      doMapValue 
      ? <li key={ index }>{ mapEventValues(item) }</li>
      : <li key={ index }>{ item }</li>
    )}
  </UnstyledList>

const ButtonDebrief: React.FC<ButtonDebriefProps> = ({ caseId, debriefId, button }) =>
    <ButtonWrap>
      <ButtonLink to={ to("/cases/:caseId/debriefing/:id", { caseId: caseId , id: debriefId })}>
      { button }
      </ButtonLink>
    </ButtonWrap>

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
  <Dl>
        { showDate && value.start_time && <div><dt>Datum</dt><dd>{ displayDate(value.start_time) }</dd></div> }
        { thread.type !== "VISIT" ?
          <>
            { Object.keys(thread.event_values ?? {}).map((key, index) => (
              <div key={index}>
                <dt>{key}</dt>
                <dd>{ value?.[key] }</dd>
              </div>
            ))
            }
          </>
          :
          <>
          {/* thread.type === VISIT */}
            { value.start_time &&
              <div>
                  <dt>Starttijd</dt>
                  <dd>{ displayTime(value.start_time) }</dd>
              </div>
            }
            { value.authors && 
              <div>
                <dt>Toezichthouders</dt>
                <dd>{ mapArrayToUl(value.authors) }</dd>
              </div>
            }
            { value.situation && 
              <div>
                <dt>Situatie</dt>
                <dd>{ mapEventValues(value.situation) }</dd>
              </div>
            }
            { value.situation && value.situation === "access_granted" &&
              <div>
                <dt>Toelichting</dt>
                <dd>{ value.notes }</dd>
              </div>
            }
            { value.observations &&
              <div>
                <dt>Kenmerken</dt>
                <dd>{ mapArrayToUl(value.observations, true) }</dd>
              </div>
            }
            { value.suggest_next_visit &&
              <div>
                  <dt>Volgend bezoek</dt>
                  <dd>{ value.suggest_next_visit }</dd>
              </div>
            }
            { value.suggest_next_visit && value.suggest_next_visit_description &&
              <div>
                <dt>Toelichting</dt>
                <dd>{ value.suggest_next_visit_description }</dd>
              </div>
            }
            { value.can_next_visit_go_ahead &&
              <div>
                  <dt>Vervolgactie</dt>
                  <dd>{ value.can_next_visit_go_ahead ? "Ja, doorlaten" : "Nee, tegenhouden" }</dd>
              </div>
            }
            { value.can_next_visit_go_ahead && value.can_next_visit_go_ahead_description &&
              <div>
                <dt>Toelichting</dt>
                <dd>{ value.can_next_visit_go_ahead_description }</dd>
              </div>
            }
          </>
        }
  </Dl>
  )
}

const ButtonWrap = styled.div`
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`

const CaseEvent: React.FC<Props> = ({ caseEvents, button }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { `${ getDay(thread.event_values.start_time, true) } ${ displayDate(thread.event_values.start_time) }` }
        key={thread.id}
        isDone={true}
        largeCircle={false}
        isNested={true}
      >
        <DefinitionList
          thread={ thread }
          showDate={false}
        />
        { thread.type === "DEBRIEFING" && <ButtonDebrief caseId={ thread.case } debriefId={ thread.id } button={ button } /> }
      </Timeline>
      :
      <>
        <DefinitionList
          key={ thread.id }
          thread={ thread }
          showDate={true}
        />
        { thread.type === "DEBRIEFING" && <ButtonDebrief caseId={ thread.case } debriefId={ thread.emitter_id } button={ button } /> }
      </>
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""
  const visitsDone = currentEvent.type === "VISIT" && shouldCreateDebriefing(caseEvents)

  return (
    <>
    { currentEvent &&
    <Timeline
      title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
      isDone={ currentEvent.type === "CASE" || visitsDone }
    >
      { currentEvent.type === "CASE"
        ? <p>{ currentEvent.event_values.reason }</p>
        : TimelineThread
      }
    </Timeline>
    }
    </>
  )
}

export default CaseEvent
