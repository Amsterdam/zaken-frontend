export default (tasks?: Components.Schemas.CamundaTaskList[]) =>
  tasks?.map((task: Components.Schemas.CamundaTaskList) => {
    const { name, due_date, case: { address: { full_address }, id } } = task
    return [
      full_address ?? "-",
      name,
      due_date ?? undefined,
      id
    ]
  })
