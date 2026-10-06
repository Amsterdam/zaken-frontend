import {
  Heading,
  Icon,
  type IconProps,
  Row,
} from "@amsterdam/design-system-react"

type Props = {
  label: string
  svg: IconProps["svg"]
  level?: 1 | 2 | 3 | 4
}

/** A heading with an icon in front of it, of the heading's size (after top-frontend-v2). */
export function HeadingWithIcon({ label, svg, level = 1 }: Props) {
  return (
    <Row gap="small" alignVertical="center">
      <Icon svg={svg} size={`heading-${level}` as IconProps["size"]} />
      <Heading level={level}>{label}</Heading>
    </Row>
  )
}
