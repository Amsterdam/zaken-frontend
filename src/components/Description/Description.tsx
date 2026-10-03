import { Fragment, type ReactNode } from "react"
import { DescriptionList } from "@amsterdam/design-system-react"

export type DescriptionItem = {
  label: ReactNode
  value: ReactNode | null | undefined
}

type Props = {
  data: DescriptionItem[]
  termsWidth?: "narrow" | "medium" | "wide"
  className?: string
}

/**
 * A list of labels with their values (from top-frontend-v2). Replaces the
 * wonen-ui DefinitionList. Items without a value are left out.
 */
export function Description({ data, termsWidth, className }: Props) {
  return (
    <DescriptionList termsWidth={termsWidth} className={className}>
      {data.map((item, index) => {
        if (item.value === null || item.value === undefined) {
          return null
        }
        return (
          <Fragment key={index}>
            <DescriptionList.Term>{item.label}</DescriptionList.Term>
            <DescriptionList.Description>
              {item.value}
            </DescriptionList.Description>
          </Fragment>
        )
      })}
    </DescriptionList>
  )
}

export default Description
