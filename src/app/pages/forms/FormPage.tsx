import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import TaskForm from "app/components/tasks/TaskForm/TaskForm"

const FormPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <TaskForm />
    </RowWithColumn>
  </DefaultLayout>
)

export default FormPage