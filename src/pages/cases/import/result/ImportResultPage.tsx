import { useParams } from "react-router"
import {
  Alert,
  Column,
  Grid,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import { useImportStatus } from "@/api/hooks"
import type { ApiError } from "@/api/types/apiError"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import { ImportErrorsTable } from "@/pages/cases/import/ImportErrorsTable"
import { CreatedCasesTable } from "./CreatedCasesTable"

// The states of the Celery task in which it stopped without a result.
const FAILED_STATES = ["FAILURE", "REVOKED"]

/**
 * The result of importing cases. The cases are made in the background (a
 * Celery task); the page asks for its state until it is done, then shows which
 * cases were made and for which rows of the file not, and why.
 */
const ImportResultPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const status = useImportStatus(taskId)
  const state = status.data?.status
  const isFailed = state !== undefined && FAILED_STATES.includes(state)
  const isDone = state === "SUCCESS"
  const isBusy = !status.isError && !isDone && !isFailed
  const isNotFound = (status.error as ApiError | null)?.status === 404

  const rows = status.data?.result?.case_data ?? []
  const created = rows.filter(({ success }) => success)
  const failed = rows.filter(({ success }) => !success)

  // The outcome of the import as a whole: below the title, above the details.
  const alert = status.isError ? (
    isNotFound ? (
      <Alert heading="Resultaat niet gevonden" headingLevel={2} severity="error">
        <Paragraph>
          Het resultaat van een import is 24 uur te zien en alleen voor wie de
          import heeft gestart.
        </Paragraph>
      </Alert>
    ) : (
      <Alert
        heading="Het resultaat ophalen is niet gelukt"
        headingLevel={2}
        severity="error"
      >
        <Paragraph>Probeer het later opnieuw.</Paragraph>
      </Alert>
    )
  ) : isFailed ? (
    <Alert heading="Importeren is niet gelukt" headingLevel={2} severity="error">
      <Paragraph>
        Het importeren is gestopt door een fout. Mogelijk is een deel van de
        zaken al aangemaakt: kijk in het Zakenoverzicht voordat je het opnieuw
        probeert. Kom je er niet uit, neem dan contact op met de beheerder en
        noem dit nummer: {taskId}.
      </Paragraph>
    </Alert>
  ) : isDone && failed.length > 0 ? (
    <Alert
      heading={
        created.length > 0
          ? "Niet alle zaken zijn aangemaakt"
          : "Er zijn geen zaken aangemaakt"
      }
      headingLevel={2}
      severity={created.length > 0 ? "warning" : "error"}
    >
      <Paragraph>
        Voor{" "}
        <strong>
          {failed.length} van de {rows.length} adressen
        </strong>{" "}
        is geen zaak aangemaakt. In de tabel hieronder zie je waarom.
      </Paragraph>
    </Alert>
  ) : null

  return (
    <DefaultLayout>
      <PageHeading title="Zaken importeren" />
      {alert && (
        <Grid.Cell span="all" appearance="transparent">
          {alert}
        </Grid.Cell>
      )}
      <Grid.Cell span="all">
        <Column gap="large">
          <Heading level={2}>Resultaat</Heading>

          {/* Until it is done: the table of the cases, loading. */}
          {isBusy && (
            <>
              <Paragraph role="status">
                De zaken worden aangemaakt. Dat kan een paar minuten duren. Je
                ziet het resultaat hier zodra het klaar is.
              </Paragraph>
              <CreatedCasesTable loading />
            </>
          )}

          {isDone && failed.length === 0 && (
            <Paragraph>Alle {created.length} zaken zijn aangemaakt.</Paragraph>
          )}

          {isDone && failed.length > 0 && <ImportErrorsTable failed={failed} />}
          {isDone && created.length > 0 && (
            <CreatedCasesTable created={created} />
          )}
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default ImportResultPage
