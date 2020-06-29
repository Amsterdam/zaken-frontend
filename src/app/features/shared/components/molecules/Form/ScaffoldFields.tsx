import React, { ComponentProps } from "react"
import { Scaffold as AmsterdamScaffold } from "amsterdam-react-final-form"
import ScaffoldField, { Field } from "./ScaffoldField"
import { FieldRenderer } from "amsterdam-react-final-form/components/final-form/Scaffold/Scaffold"

export type Fields = Record<string, Field>

type Props = Omit<ComponentProps<typeof AmsterdamScaffold>, "fields"> & {
  fields: Fields
}

const fieldRenderer: FieldRenderer = field => <ScaffoldField field={field} />

/**
 * Scaffolds the default amsterdam-react-final-form fields, as well as custom defined fields for zaken-frontend
 */
// @ts-ignore
const ScaffoldFields: React.FC<Props> = (props) => (<AmsterdamScaffold fieldRenderer={fieldRenderer} {...props} />)

export default ScaffoldFields
