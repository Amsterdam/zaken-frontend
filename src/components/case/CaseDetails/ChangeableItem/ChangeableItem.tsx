import { IconButton, Row } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"

type Props = {
  name?: string
  /** What the button does, e.g. "Wijzig het onderwerp". */
  titleAccess?: string
  onClick?: () => void
}

/**
 * A value that who may perform tasks can change: the value as plain text,
 * with a button (a pencil) next to it that opens the form.
 */
const ChangeableItem = ({ name = "-", titleAccess = "", onClick }: Props) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

  return (
    <Row gap="small" alignVertical="center" wrap>
      {name}
      {hasPermission && (
        <IconButton label={titleAccess} svg={PencilIcon} onClick={onClick} />
      )}
    </Row>
  )
}

export default ChangeableItem
