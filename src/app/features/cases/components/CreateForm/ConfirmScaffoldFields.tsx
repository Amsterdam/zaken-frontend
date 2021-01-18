import React, { useMemo } from "react"
import styled from "styled-components"
import { Button, themeSpacing } from "@amsterdam/asc-ui"

import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"

type Props = {
  fields: any
  data: any
  title?: string
  onCancel?: () => void
  cancelTitle?: string
  onSubmit?: () => void
  submitTitle?: string
  showInModal?: boolean
}

const defaultTitle = "Controleer of onderstaande gegevens kloppen"
const defaultCancelTitle = "Wijzig"
const defaultSubmitTitle = "Opslaan"
const noop = () => {}

const ButtonWrap = styled.div`
  button {
    margin-right: ${ themeSpacing(4) };
  }
`

const createValuesObject = (fields: any, data: any) =>
  Object.keys(data).reduce((acc, key) => {
    const props = fields.fields[key].props
    const v = data[key]
    const value = props.options ? props.options[v] : v
    acc[key] = value
    return acc
  }, {} as Record<string, string>)

const ConfirmScaffoldFields: React.FC<Props> = ({
  fields,
  data,
  title = defaultTitle,
  onCancel = noop,
  cancelTitle = defaultCancelTitle,
  onSubmit = noop,
  submitTitle = defaultSubmitTitle,
  showInModal = false
}) => {

  const values = useMemo(() => createValuesObject(fields, data), [data, fields])

  const content = (
    <>
      { !showInModal ? <h1>{ title }</h1> : null }
      <DefinitionList values={ values } />
      <ButtonWrap>
        <Button variant="primaryInverted" onClick={ onCancel }>{ cancelTitle }</Button>
        <Button variant="secondary" onClick={ onSubmit }>{ submitTitle }</Button>
      </ButtonWrap>
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