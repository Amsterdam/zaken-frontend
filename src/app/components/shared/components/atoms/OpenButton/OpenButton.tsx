import React from "react"
import { Button } from "@amsterdam/asc-ui"
import { ChevronRight } from "app/components/shared/components/atoms/Icons"
import ButtonLink from "app/components/shared/components/atoms/ButtonLink/ButtonLink"

type ButtonProps = {
  href: string
  text: string
}

const OpenButton: React.FC<ButtonProps> = ({ href, text }) =>
  <ButtonLink to={href}>
    <Button as="span" variant="textButton" iconSize={24} iconLeft={<ChevronRight />}>{ text }</Button>
  </ButtonLink>
export default OpenButton
