import React, { useCallback, useState } from "react"
import { Button } from "@datapunt/asc-ui"
import Spinner from "@datapunt/asc-ui/lib/components/Spinner"

type Props = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  onClick: () => Promise<any>
}

const SpinnerButton: React.FC<Props> = ({ onClick, ...restProps }) => {
  const [isSpinning, setIsSpinning] = useState(false)

  const handleClick = useCallback(async () => {
    setIsSpinning(true)
    await onClick()
    setIsSpinning(false)
  }, [ onClick ])

  return (
    <Button onClick={handleClick} icon={ isSpinning ? <Spinner /> : undefined } {...restProps} />
  )
}

export default SpinnerButton
