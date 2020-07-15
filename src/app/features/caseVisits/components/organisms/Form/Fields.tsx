import React from "react"
import { useForm } from "react-final-form"
import createScaffold from "./scaffold"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import type { CaseVisit } from "../../../hooks/useCaseVisits"

type Props = {
  initialValues?: CaseVisit
}

const Fields: React.FC<Props> = ({ initialValues }) => {
  const { getFieldState, change } = useForm()
  const onClickNoteButton = (field: string) => (event: any) => {
    const currentValue = getFieldState("note")?.value ?? ""
    const note = getFieldState(field)?.value ?? ""
    const value = [currentValue, note].filter(_ => _ !== "").join("\n")
    change("note", value)
    event.target.disabled = true
  }
  const scaffoldProps = createScaffold(initialValues, onClickNoteButton)
  return <ScaffoldFields { ...scaffoldProps } />
}

export default Fields
