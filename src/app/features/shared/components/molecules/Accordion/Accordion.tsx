import { ChevronDown } from "@datapunt/asc-assets"
import React, { useCallback, useEffect, useState } from "react"
import { useUID } from "react-uid"
// import { ButtonStyleProps } from "@datapunt/asc-ui/es/components/Button/ButtonStyle"
import { Theme } from "@datapunt/asc-ui/es/types/Theme"

import {
  AccordionButton,
  AccordionButtonContent,
  AccordionContent,
  ButtonContentProps,
  Props as StyleProps
} from "./AccordionStyle"

type Props = {
  onToggle?: (open: boolean) => void
} & StyleProps &
  ButtonContentProps

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "primaryInverted"
  | "textButton"
  | "blank"
  | "application"


  type ButtonStyleProps = {
    /**
     * @deprecated Use variant instead. Pass the theme-color.
     */
    color?: Theme.ColorType
    /**
     * @deprecated Use size to create a button with equal width and height
     */
    square?: boolean
    /**
     * Set an equal height and width
     */
    size?: number
    /**
     * A variant, usually different background-color and color of a button
     */
    variant?: ButtonVariant
    /**
     * Add narrow arrow on the right side of the secondary button
     */
    taskflow?: boolean
  }

const Accordion: React.FC<
  Props &
    ButtonStyleProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({
  children,
  title,
  id: idProp,
  isOpen,
  onToggle,
  noMultiline,
  ...otherProps
}) => {
  const uid = useUID()
  const id = idProp || uid
  const [open, setOpen] = useState(isOpen ?? false)

  useEffect(() => {
    if (isOpen !== undefined && isOpen !== open) {
      setOpen(isOpen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleClick = useCallback(() => {
    const newOpenState = !open
    if (onToggle) {
      onToggle(newOpenState)
    }
    setOpen(newOpenState)
  }, [open, onToggle])

  return (
    <>
      <AccordionButton
        aria-controls={id}
        aria-expanded={open}
        id={`label-${ id }`}
        type="button"
        variant="tertiary"
        iconRight={<ChevronDown />}
        isOpen={open}
        title={title}
        onClick={handleClick}
        {...otherProps}
      >
        <AccordionButtonContent noMultiline={noMultiline}>
          {title}
        </AccordionButtonContent>
      </AccordionButton>
      <AccordionContent isOpen={open} aria-labelledby={`label-${ id }`} id={id}>
        {children}
      </AccordionContent>
    </>
  )
}

export default Accordion
