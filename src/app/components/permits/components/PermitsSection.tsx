import { type ReactNode } from "react"
import {
  Alert,
  Column,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"

type Props = {
  title: string
  /** The number behind the title; left out while loading. */
  count?: number
  isPending: boolean
  isError: boolean
  errorText: string
  emptyText: string
  /** Made-up data is shown (outside production only). */
  isDummyData?: boolean
  children: ReactNode
}

/**
 * A part of the permits tab: its heading with the number of items, and what
 * to show when loading failed or there is nothing.
 */
export function PermitsSection({
  title,
  count = 0,
  isPending,
  isError,
  errorText,
  emptyText,
  isDummyData = false,
  children,
}: Props) {
  return (
    <Column gap="small">
      <Heading level={2}>
        {title}
        {isPending || isError ? "" : ` (${count})`}
      </Heading>
      {isDummyData && (
        <Paragraph size="small">
          Voorbeeldgegevens: voor dit adres is niets gevonden. Dit zie je alleen
          op test en acceptatie.
        </Paragraph>
      )}
      {isError ? (
        <Alert heading="Niet gelukt" headingLevel={3} severity="error">
          <Paragraph>{errorText}</Paragraph>
        </Alert>
      ) : !isPending && count === 0 ? (
        <Paragraph>{emptyText}</Paragraph>
      ) : (
        children
      )}
    </Column>
  )
}

export default PermitsSection
