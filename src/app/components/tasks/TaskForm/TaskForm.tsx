import React, { useRef } from "react"
import styled from "styled-components"
import DOMPurify from "dompurify"
import { Button } from "@amsterdam/asc-ui"

import html from "./mock/html"

const Div = styled.div`
  button, .has-error {
    display: none;
  }
  form > div {
    margin-bottom: 24px;
  }
  label {
    font-weight: 500;
    margin-right: 12px;
  }
`

const TaskForm: React.FC = () => {
  const __html = DOMPurify.sanitize(html)
  const ref = useRef<HTMLDivElement>(null)
  const onClick = () => {
    if (ref.current == null) return
    const formData = Array.from(ref.current.querySelectorAll("input, select"))
      .reduce((acc, elem: any) => {
        const value = elem.type === "checkbox" ? elem.checked : elem.value
        return { ...acc, [elem.name]: value }
      }, {} as Record<string, any>)
    console.log(formData)
  }
  return (
    <>
      <Div ref={ ref } dangerouslySetInnerHTML={ { __html } } />
      <Button variant="secondary" onClick={ onClick }>Opslaan</Button>
    </>
  )
}

export default TaskForm