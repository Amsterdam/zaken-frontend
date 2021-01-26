import { useState } from "react"

export default <RequestBody>(postMethod: (data: RequestBody) => Promise<unknown>) => {

  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<RequestBody>()

  const onSubmit = async (data: RequestBody) => {
    setSubmitted(true)
    setData(data)
  }

  const onSubmitConfirm = async () => {
    if (data === undefined) return
    await postMethod(data)
    setSubmitted(false)
  }

  const onCancelConfirm = () => {
    setSubmitted(false)
  }

  return {
    isSubmitted,
    data,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  }
}