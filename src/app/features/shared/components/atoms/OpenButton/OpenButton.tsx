import React from "react"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

type ButtonProps = {
  href: string
  text: string
}

const OpenButton: React.FC<ButtonProps> = ({ href, text }) =>
  <ButtonLink to={href}>
    <Button as="span" variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>{ text }</Button>
  </ButtonLink>
export default OpenButton
