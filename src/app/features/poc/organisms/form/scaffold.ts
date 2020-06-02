import React from "react"

import { Scaffold, ScaffoldAvailableFields } from "amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "amsterdam-scaffold-form/package"

const form: FormPositionerFields<ScaffoldAvailableFields> = {
  zaaknummer: {
    type: "TextField",
    props: {
      name: "zaaknummer",
      label: "Zaaknummer"
    }
  },
  ingangsreden: {
    type: "SelectField",
    props: {
      name: "ingangsreden",
      label: "Ingangsreden",
      options: { zoeklicht: "Zoeklicht", scrapelijst: "Scrapelijst" }
    }
  },
  team: {
    type: "SelectField",
    props: {
      name: "team",
      label: "Team",
      options: { vakantieverhuur: "Vakantieverhuur", leegstand: "Leegstand" }
    }
  },
  straat: {
    type: "TextField",
    props: {
      name: "straat",
      label: "Straat"
    }
  },
  huisnummer: {
    type: "NumberField",
    props: {
      name: "huisnummer",
      label: "Huisnummer"
    }
  },
  suffix: {
    type: "TextField",
    props: {
      name: "suffix",
      label: "Hsltr / Hsnmr."
    }
  },
  notities: {
    type: "TextAreaField",
    props: {
      name: "notities",
      hint: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
      label: "Notities"
    }
  },
  submit: {
    type: "SubmitButton",
    props: {
      type: "submit",
      variant: "secondary",
      label: "Opslaan"
    }
  }
}

export const scaffoldProps: React.ComponentProps<typeof Scaffold> = new FormPositioner(form)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr 1fr", [
    /* eslint-disable */
    [ "straat",       "huisnummer",   "suffix" ],
    [ "zaaknummer",   "notities",     "notities"],
    [ "ingangsreden", "notities",     "notities"],
    [ "team",         "notities",     "notities"],
    [ "submit" ]
    /* eslint-enable */
  ])
  .getScaffoldProps()
