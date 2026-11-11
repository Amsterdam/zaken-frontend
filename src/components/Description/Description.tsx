import type { ReactNode } from "react"
import { DataList, Skeleton } from "@amsterdam/design-system-react"
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
  className,
  loading = false,
  numLoadingRows = 3,
}: Props) {
  if (loading) {
    return (
      <DataList className={className}>
        {Array.from({ length: numLoadingRows }, (_, index) => (
          <DataList.Item key={index}>
            <DataList.Key>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            </DataList.Key>
            <DataList.Value>
              <Skeleton>
                <Skeleton.Paragraph lines={1} />
              </Skeleton>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList>
    )
  }

  return (
    <DataList className={className}>
      {data.map((item, index) => {
        if (item.value === null || item.value === undefined) {
          return null
        }
        return (
          <DataList.Item key={index}>
            <DataList.Key>{item.label}</DataList.Key>
            <DataList.Value className={styles.value}>
              {item.value}
            </DataList.Value>
          </DataList.Item>
        )
      })}
    </DataList>
  )
}
