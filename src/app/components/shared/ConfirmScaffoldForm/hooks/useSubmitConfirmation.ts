import { useState } from "react"

export default <T, U>(postMethod: (data: T) => Promise<U>) => {

  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<T>()

  const onSubmit = async (data: T) => {
    setSubmitted(true)
    setData(data)
  }

  const onSubmitConfirm = async () => {
    if (data === undefined) return
    const result = await postMethod(data)
    setSubmitted(false)
    return result
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