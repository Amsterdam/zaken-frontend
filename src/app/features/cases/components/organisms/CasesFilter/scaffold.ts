import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = {
  period: {
    type: "RadioFields",
    props: {
      label: "Periode",
      name: "period",
      options: { "Vandaag": "vandaag", "Gisteren": "gisteren" }
    }
  }
}

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .getScaffoldProps()
