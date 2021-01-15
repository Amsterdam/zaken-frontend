import React, { useMemo } from "react"
import { Button } from "@amsterdam/asc-ui"


import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  fields: any
  data: any
  title?: string
  onCancel?: () => void
  cancelTitle?: string
  onSubmit?: () => void
  submitTitle?: string
}

const defaultTitle = "Controleer of onderstaande gegevens kloppen"
const defaultCancelTitle = "Wijzig"
const defaultSubmitTitle = "Opslaan"
const noop = () => {}

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
  submitTitle = defaultSubmitTitle
}) => {

  const values = useMemo(() => createValuesObject(fields, data), [data, fields])

  return (
    <>
      <h1>{ title }</h1>
      <DefinitionList values={ values } />
      <Button variant="primaryInverted" onClick={ onCancel }>{ cancelTitle }</Button>
      <Button variant="secondary" onClick={ onCancel }>{ submitTitle }</Button>
    </>
  )
}
export default ConfirmScaffoldFields