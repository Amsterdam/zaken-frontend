import { Button } from "@amsterdam/design-system-react"
import { CopyIcon } from "@amsterdam/design-system-react-icons"
import { useToast } from "@/components/toasts/useToast"

type Props = {
  /** What is copied. */
  text: string
  /** The label for screen readers, e.g. "Adres kopiëren". */
  label: string
  /** The title of the toast after copying, e.g. "Adres gekopieerd". */
  copiedTitle: string
}

/**
 * Copies a text to the clipboard: only an icon, without a border, so it can
 * stand quietly next to the text it copies.
 */
export function CopyButton({ text, label, copiedTitle }: Props) {
  const { showToast } = useToast()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      showToast({ severity: "success", title: copiedTitle, description: text })
    } catch {
      // E.g. the browser doesn't allow it.
      showToast({
        severity: "error",
        title: "Kopiëren is mislukt",
        description: "Selecteer de tekst en kopieer die zelf.",
      })
    }
  }

  return (
    <Button
      variant="tertiary"
      icon={CopyIcon}
      iconOnly
      title={label}
      onClick={copy}
    >
      {label}
    </Button>
  )
}
