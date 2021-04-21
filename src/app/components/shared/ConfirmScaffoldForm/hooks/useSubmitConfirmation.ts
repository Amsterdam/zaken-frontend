import { useState } from "react"

const defaultMapData = (data: any) => data

export default <T, U>(postMethod: (data: T) => Promise<U>, mapData: (data: any) => T = defaultMapData) => {

  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<T>()

  const onSubmit = async (data: T) => {
    setSubmitted(true)
    setData(data)
  }

  const onSubmitConfirm = async () => {
    if (data === undefined) return
    const result = await postMethod(mapData(data))
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