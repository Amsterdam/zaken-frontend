import { Fragment, type ReactNode } from "react"
import { DescriptionList, Skeleton } from "@amsterdam/design-system-react"
import styles from "./Description.module.css"

export type DescriptionItem = {
  label: ReactNode
  value: ReactNode | null | undefined
}

type Props = {
  data: DescriptionItem[]
  termsWidth?: "narrow" | "medium" | "wide"
  className?: string
  /** Puts the rows closer together. */
  dense?: boolean
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
  className: classNameProp,
  dense = false,
  loading = false,
  numLoadingRows = 3,
}: Props) {
  const className =
    [dense ? styles.dense : "", classNameProp ?? ""].join(" ").trim() ||
    undefined

  if (loading) {
    return (
      <DescriptionList termsWidth={termsWidth} className={className}>
        {Array.from({ length: numLoadingRows }, (_, index) => (
          <Fragment key={index}>
            <DescriptionList.Term>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            </DescriptionList.Term>
            <DescriptionList.Description>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
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
