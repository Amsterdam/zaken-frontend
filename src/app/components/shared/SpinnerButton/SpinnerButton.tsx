import React, { useCallback, useState } from "react"
import { Button } from "@amsterdam/asc-ui"
import Spinner from "@amsterdam/asc-ui/lib/components/Spinner"
import useIsMounted from "app/hooks/useIsMounted/useIsMounted"

type Props = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  onClick: () => Promise<any>
}

const SpinnerButton: React.FC<Props> = ({ onClick, ...restProps }) => {
  const isMounted = useIsMounted()
  const [isSpinning, setIsSpinning] = useState(false)

  const handleClick = useCallback(async () => {
    setIsSpinning(true)
    await onClick()
    if (isMounted.current) {
      setIsSpinning(false)
    }
  }, [ onClick, isMounted ])

  return (
    <Button onClick={handleClick} icon={ isSpinning ? <Spinner /> : undefined } {...restProps} />
  )
}

export default SpinnerButton
