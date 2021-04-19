import { FC } from "react"
import { Alert, FormTitle } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import { useAuthors, useVisitsCreate } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

export type VisitData = Omit<Components.Schemas.Visit, "author_ids"> & { author1: Components.Schemas.User, author2: Components.Schemas.User }
const filterUndefined = <T extends unknown>(arr: Array<T | undefined>) => arr.filter((item): item is T => item !== undefined)
const mapData = (data: VisitData) => ({ ...data, author_ids: filterUndefined([data.author1?.id, data.author2?.id]) })

const VisitForm: FC<Props> = ({ caseId }) => {

  const [data] = useAuthors()
  const authors = data?.results ?? []

  const [, { execPost }] = useVisitsCreate()
  const { addSuccessFlashMessage } = useFlashMessages()

  const showSpinner = data === undefined

  const onSubmit = async (data: VisitData) => {
    await execPost(mapData(data))
    const id = data.case
    const path = `/zaken/${ id }`
    addSuccessFlashMessage(path, "Succes", "Het resultaat huisbezoek is succesvol verwerkt")
    navigateTo("/zaken/:id", { id })
  }

  const initialValues = { case: caseId, start_time: "2021-01-01T12:34", observations: [] }

  return (
    <>
      <Alert level="warning">Dit formulier niet gebruiken! Het huisbezoek wordt door de toezichthouder in de TOP app verwerkt, waarna deze taak automatisch wordt opgepakt.</Alert>
      <FormTitle>Gebruik dit formulier om een huisbezoek aan te maken</FormTitle>
      <ScaffoldForm
        showSpinner={ showSpinner }
        onSubmit={ onSubmit }
        initialValues={ initialValues }
      >
        <ScaffoldFields { ...createScaffoldProps(caseId, authors) } />
      </ScaffoldForm>
    </>
  )
}

export default VisitForm
