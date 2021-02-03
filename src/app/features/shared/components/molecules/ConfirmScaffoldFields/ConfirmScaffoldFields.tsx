import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { Heading, Button, Spinner } from "@amsterdam/asc-ui"

import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import { Field } from "../Form/ScaffoldField"
import ArrayFieldList from "./ArrayFieldList"

type RequestBody = Record<string, unknown>
type NamedFields<T> = Record<keyof T, Field>
type Props<RequestBody> = {
  fields: NamedFields<RequestBody>
  data: RequestBody | undefined
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
const SpinnerWrap = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const createValuesObject = <T extends RequestBody>(fields: NamedFields<T>, data?: T) => {
  if (data === undefined) return {}
  return (Object.keys(data) as Array<keyof T>).reduce((acc, key) => {
    if (fields.hasOwnProperty(key) === false) return acc
    const { type, props } = fields[key]
    const { label } = props
    // TODO: Use field.name property vs key to access data
    const v = data[key]
    const value =
      type === "ArrayField" ?
      <ArrayFieldList fields={ v as Array<Record<string, string>> } /> :
      props.hasOwnProperty("options") ?
      (props as { options: Record<string, unknown> }).options[v as string] :
      v
    acc[(label ?? key) as string] = value as React.ReactNode
    return acc
  }, {} as Record<string, React.ReactNode>)
}

const ConfirmScaffoldFields = <T extends RequestBody>(props: Props<T>) => {
  const {
    fields,
    data,
    title = defaultTitle,
    onCancel = noop,
    cancelTitle = defaultCancelTitle,
    onSubmit = noop,
    submitTitle = defaultSubmitTitle,
    showInModal = false
  } = props
  const [isSubmitting, setSubmitting] = useState(false)
  const values = useMemo(() => createValuesObject<T>(fields, data), [data, fields])

  const onSubmitWrap = () => {
    setSubmitting(true)
    onSubmit()
    setSubmitting(false)
  }

  const content = (
    <>
      { !showInModal ? <Heading>{ title }</Heading> : null }
      <Wrap>
        <DefinitionList values={ values } />
        <ButtonWrap>
          <Button variant="primaryInverted" onClick={ onCancel }>{ cancelTitle }</Button>
          <Button variant="secondary" onClick={ onSubmitWrap }>{ submitTitle }</Button>
        </ButtonWrap>
        { isSubmitting &&
          <SpinnerWrap>
            <Spinner size={ 36 } />
          </SpinnerWrap>
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