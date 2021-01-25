import { useState } from "react"

const defaultMapData = (data: any) => data

export default <RequestBody>(postMethod: (data: RequestBody) => Promise<any>, mapData: (data: any) => RequestBody = defaultMapData) => {

  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<RequestBody | undefined>()

  const onSubmit = async (data: RequestBody) => {
    setSubmitted(true)
    setData(data)
  }

  const onSubmitConfirm = async () => {
    if (data === undefined) return
    await postMethod(mapData(data))
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