import { useCorporations } from "app/state/rest"

type Props = {
  id?: number
}

const DisplayCorporation = ({ id }: Props) => {
  const [data] = useCorporations()
  let corpName: any = "-"
  if (id && data?.results) {
    corpName = data.results.find((corp) => corp.id === id)?.name
  }

  return (
    <>{ corpName }</>
  )
}

export default DisplayCorporation
