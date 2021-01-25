import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"


const Scaffold = () => {
  const fields = {
    submit: {
      type: "SubmitButton",
      variant: "primary",
      props: {
        label: "Taak afronden"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr", [
      ["submit"]
    ])
    .getScaffoldProps()
}

export default Scaffold