import { Fragment, type ReactNode } from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import { SmallSkeleton } from "@/components/SmallSkeleton/SmallSkeleton"
import styles from "./Description.module.css"

export type DescriptionItem = {
  label: ReactNode
  value: ReactNode | null | undefined
}

type Props = {
  data: DescriptionItem[]
  termsWidth?: "narrow" | "medium" | "wide"
  className?: string
  /** Shows rows of grey bars in place of the data. */
  loading?: boolean
  numLoadingRows?: number
}

/**
 * A list of labels with their values (from top-frontend-v2). Replaces the
 * wonen-ui DefinitionList. Items without a value are left out.
 */
export function Description({
  data,
  termsWidth,
  className,
  loading = false,
  numLoadingRows = 3,
}: Props) {
  if (loading) {
    return (
      <DescriptionList termsWidth={termsWidth} className={className}>
        {Array.from({ length: numLoadingRows }, (_, index) => (
          <Fragment key={index}>
            <DescriptionList.Term>
              <div className={styles.loading}>
                <SmallSkeleton maxRandomWidth={120} />
              </div>
            </DescriptionList.Term>
            <DescriptionList.Description>
              <div className={styles.loading}>
                <SmallSkeleton maxRandomWidth={220} />
              </div>
            </DescriptionList.Description>
          </Fragment>
        ))}
      </DescriptionList>
    )
  }

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
