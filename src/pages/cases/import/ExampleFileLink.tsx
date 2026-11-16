import { StandaloneLink } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"

// In public/: a file with the columns the backend reads (BulkCaseImporter).
const EXAMPLE_FILE = "/downloads/voorbeeld-zaken-importeren.xlsx"

/**
 * The example Excel file for importing cases. At step 1, so you can make your
 * file before you start; at step 2, where you correct it after the check.
 */
export const ExampleFileLink: React.FC = () => (
  <StandaloneLink href={EXAMPLE_FILE} download icon={DownloadIcon}>
    Download het voorbeeldbestand
  </StandaloneLink>
)
