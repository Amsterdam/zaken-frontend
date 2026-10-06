import { useSearchParams } from "react-router"
import { Tabs } from "@amsterdam/design-system-react"
import HelpContact from "./HelpContact"
import HelpExplanation from "./HelpExplanation"

// The open tab lives in the URL, so the explanation can be linked to.
const TAB_PARAM = "tab"
const CONTACT_TAB = "contact"
const EXPLANATION_TAB = "uitleg"

const HelpContent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab =
    searchParams.get(TAB_PARAM) === EXPLANATION_TAB
      ? EXPLANATION_TAB
      : CONTACT_TAB

  const onTabChange = (tab: string) =>
    setSearchParams(
      (params) => {
        // The first tab is the default: it stays out of the URL.
        if (tab === CONTACT_TAB) params.delete(TAB_PARAM)
        else params.set(TAB_PARAM, tab)
        return params
      },
      // Switching tabs is no step in the history.
      { replace: true },
    )

  return (
    <Tabs activeTab={activeTab} onTabChange={onTabChange}>
      <Tabs.List>
        <Tabs.Button aria-controls={CONTACT_TAB}>Contact</Tabs.Button>
        <Tabs.Button aria-controls={EXPLANATION_TAB}>Uitleg</Tabs.Button>
      </Tabs.List>
      <Tabs.Panel id={CONTACT_TAB}>
        <HelpContact />
      </Tabs.Panel>
      <Tabs.Panel id={EXPLANATION_TAB}>
        <HelpExplanation />
      </Tabs.Panel>
    </Tabs>
  )
}

export default HelpContent
