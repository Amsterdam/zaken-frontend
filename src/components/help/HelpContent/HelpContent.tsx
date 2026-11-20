import { Column, Heading } from "@amsterdam/design-system-react"
import HelpContact from "./HelpContact"
import HelpExplanation from "./HelpExplanation"

const HelpContent: React.FC = () => (
  <Column gap="x-large">
    <div>
      <Heading level={2} className="ams-mb-s">
        Uitleg
      </Heading>
      <HelpExplanation />
    </div>

    <div>
      <Heading level={2} className="ams-mb-s">
        Contact
      </Heading>
      <HelpContact />
    </div>
  </Column>
)

export default HelpContent
