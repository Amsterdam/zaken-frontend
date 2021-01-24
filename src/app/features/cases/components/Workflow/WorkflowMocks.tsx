import { Button, Icon } from "@amsterdam/asc-ui"
import Lock from "@material-ui/icons/Lock"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

export const workflowDebrief = (caseId: Components.Schemas.Case["id"]) => (
    [
      { itemList:
        [ <Icon size={32}>{ <Lock /> }</Icon> , 
          "Verwerken Debrief", 
          "ProjectHandhaver", 
          "-",
          <ButtonLink to={ to("/cases/:id/debriefing", { id: caseId })}>
            <Button variant="primary" as="span">Debrief verwerken</Button>
          </ButtonLink>
        ]
      }
    ]
  )
  
  export const workflowVisit = (caseId: Components.Schemas.Case["id"]) => (
    [{ itemList: [ 
      <Icon size={32}>{ <Lock /> }</Icon> , 
      "Huisbezoek afleggen", 
      "Toezichthouders", 
      "-", 
      <ButtonLink to={ to("/cases/:id/visits", { id: caseId })}>
        <Button variant="primary" as="span">Huisbezoek toevoegen</Button>
    </ButtonLink> 
    ] }]
  )
  
  export const workflowViolation = (
    [
      { itemList: [ <Icon size={32}>{ <Lock /> }</Icon> , "Opstellen beeldverslag", "Toezichthouder", "-", "-" ] },
      { itemList: [ <Icon size={32}>{ <Lock /> }</Icon> , "Opstellen rapport van bevindingen", "Toezichthouder", "-", "-" ] },
      { itemList: [ <Icon size={32}>{ <Lock /> }</Icon> , "Opstellen aanschrijving", "Projecthandhaver", "-", "-" ] }
    ]
  )
  
  export const workflowCloseCase = (
    [
      { itemList: [ <Icon size={32}>{ <Lock /> }</Icon> , "Opstellen buitendienst rapport", "Toezichthouder", "-", "-" ] },
      { itemList: [ <Icon size={32}>{ <Lock /> }</Icon> , "Afsluiten zaak", "Projectmederker", "-", "-" ] }
    ]
  )
  
  export const workflowOpinion = (caseId: Components.Schemas.Case["id"]) => (
    [
      { itemList:
        [ <Icon size={32}>{ <Lock /> }</Icon> , "Beoordelen zienswijze", "ProjectHandhaver", "-",
          <ButtonLink to={ to("/cases/:id/opinion", { id: caseId })}>
            <Button variant="primary" as="span">Uitkomst zienswijze</Button>
          </ButtonLink>
        ]
      }
    ]
  )
  
  export const workflowSummon = (caseId: Components.Schemas.Case["id"]) => (
    [
      { itemList:
        [ <Icon size={32}>{ <Lock /> }</Icon>, "Verwerken aanschrijving", "ProjectHandhaver", "28-02-2021",
          <ButtonLink to={ to("/cases/:id/summon", { id: caseId })}>
            <Button variant="primary" as="span">Aanschrijving</Button>
          </ButtonLink>
        ]
      }
    ]
  )
  
  export const workflowDecision = (caseId: Components.Schemas.Case["id"]) => (
    [
      { itemList:
        [ <Icon size={32}>{ <Lock /> }</Icon>, "Verwerken besluit", "ProjectHandhaver", "28-02-2021",
          <ButtonLink to={ to("/cases/:id/decision", { id: caseId })}>
            <Button variant="primary" as="span">Besluit</Button>
          </ButtonLink>
        ]
      }
    ]
  )
  