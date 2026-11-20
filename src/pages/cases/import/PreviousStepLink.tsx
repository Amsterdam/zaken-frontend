import { useNavigate } from "react-router"
import { StandaloneLink } from "@amsterdam/design-system-react"
import { ChevronBackwardIcon } from "@amsterdam/design-system-react-icons"
import type { ImportLocationState } from "@/pages/cases/import/importLocationState"

type Props = {
  /** The path of the previous step. */
  to: string
  /** What the previous step gets back, so what you chose there is still chosen. */
  state: ImportLocationState
}

/**
 * "Vorige stap", above the heading of a step of importing cases: navigation,
 * not an action of the form, so a link and not a button next to the submit
 * button. A plain click goes back with the state; opening it in a new tab
 * starts at that step without it.
 */
export const PreviousStepLink: React.FC<Props> = ({ to, state }) => {
  const navigate = useNavigate()

  return (
    <StandaloneLink
      href={to}
      icon={ChevronBackwardIcon}
      onClick={(event) => {
        event.preventDefault()
        navigate(to, { state })
      }}
    >
      Vorige stap
    </StandaloneLink>
  )
}
