import { Badge, IconButton, Row } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"

type Props = {
  tags: components["schemas"]["Tag"][]
  titleAccess?: string
  onClick?: () => void
}

/** The tags of a case as badges; who may perform tasks can change them. */
const CaseTags: React.FC<Props> = ({
  tags = [],
  titleAccess = "Wijzig tag",
  onClick,
}) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

  return (
    <Row gap="small" alignVertical="center" wrap>
      {tags.map((tag) => (
        <Badge key={tag.id} label={tag.name} color="azure" />
      ))}
      {!hasPermission && tags.length === 0 && "-"}
      {hasPermission && (
        <IconButton label={titleAccess} svg={PencilIcon} onClick={onClick} />
      )}
    </Row>
  )
}

export default CaseTags
