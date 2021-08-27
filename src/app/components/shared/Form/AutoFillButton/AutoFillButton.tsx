import { useState, useCallback } from "react"
import { useForm } from "react-final-form"
import { Button } from "@amsterdam/amsterdam-react-final-form"

export type AutoFillButtonProps = React.ComponentProps<typeof Button> & {
  field: string
  target: string
}

const AutoFillButton: React.FC<AutoFillButtonProps> = ({ field, target, ...restProps }) => {
  const [ isDisabled, setIsDisabled ] = useState(false)
  const { getFieldState, change } = useForm()

  const handleClick = useCallback(() => {
    const value = [
      getFieldState(target)?.value ?? "",
      getFieldState(field)?.value ?? ""
    ].filter(_ => _ !== "").join("\n")

    change("note", value)
    setIsDisabled(true)
  }, [ getFieldState, change, field, target ])

  return <Button { ...restProps } onClick={ handleClick } disabled={ isDisabled } />
}

export default AutoFillButton
