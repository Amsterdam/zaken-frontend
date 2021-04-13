import { useState, useMemo } from "react"
import styled from "styled-components"
import { Heading, Button } from "@amsterdam/asc-ui"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { Field } from "../Form/ScaffoldField"
import createValuesObject from "./utils/createValuesObject"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import SpinnerWrap from "./components/SpinnerWrap"

export type RequestBody = Record<string, unknown>
export type NamedFields<T> = Record<keyof T, Field>
type Props<RequestBody> = {
  fields: NamedFields<RequestBody>
  data: RequestBody | undefined
  showFields?: string[]
  title?: string
  onCancel?: () => void
  cancelTitle?: string
  onSubmit?: () => Promise<unknown>
  submitTitle?: string
  showInModal?: boolean
}

const defaultTitle = "Controleer of onderstaande gegevens kloppen"
const defaultCancelTitle = "Wijzig"
const defaultSubmitTitle = "Opslaan"
const noop = () => {}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`
const Wrap = styled.div`
  position: relative;
`

const ConfirmScaffoldFields = <T extends RequestBody>(props: Props<T>) => {
  const {
    fields,
    data,
    showFields = [],
    title = defaultTitle,
    onCancel = noop,
    cancelTitle = defaultCancelTitle,
    onSubmit = noop,
    submitTitle = defaultSubmitTitle,
    showInModal = false
  } = props
  const [isSubmitting, setSubmitting] = useState(false)
  const values = useMemo(() => createValuesObject<T>(fields, data, showFields), [data, fields, showFields])

  const onSubmitWrap = async () => {
    setSubmitting(true)
    await onSubmit()
    // TODO: Fix this. When the `onSubmit` handler causes this component to be removed. It throws a warning.
    //setSubmitting(false)
  }

  const content = (
    <>
      { showInModal === false &&
        <Heading>{ title }</Heading>
      }
      <Wrap>
        <DefinitionList values={ values } />
        <ButtonWrap>
          <Button variant="primaryInverted" onClick={ onCancel }>{ cancelTitle }</Button>
          <Button variant="secondary" onClick={ onSubmitWrap }>{ submitTitle }</Button>
        </ButtonWrap>
        { isSubmitting &&
          <SpinnerWrap />
        }
      </Wrap>
    </>
  )

  return showInModal ?
    <Modal title={ title } isOpen={ true } onClose={ onCancel }>
      <ModalBlock>
        { content }
      </ModalBlock>
    </Modal> :
    content
}

export default ConfirmScaffoldFields