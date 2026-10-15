import { type Control, type FieldValues } from "react-hook-form"

export const YES = "yes"
export const NO = "no"
type YesNo = "" | typeof YES | typeof NO

/** The report of a citizen (a SIG report), as filled in. */
export type ReportValues = {
  reporter_anonymous: YesNo
  reporter_name: string
  reporter_phone: string
  reporter_email: string
  identification: string
  description_citizenreport: string
  nuisance: boolean
}

/** The advertisements of an address, as filled in. */
export type AdvertisementValues = {
  advertisement: YesNo
  advertisements: { link: string }[]
}

export const emptyReportValues: ReportValues = {
  reporter_anonymous: "",
  reporter_name: "",
  reporter_phone: "",
  reporter_email: "",
  identification: "",
  description_citizenreport: "",
  nuisance: false,
}

export const emptyAdvertisementValues: AdvertisementValues = {
  advertisement: "",
  advertisements: [{ link: "" }],
}

/**
 * The control of a form that has these fields among its own, for the shared
 * fields below (a control is tied to all the fields of its form).
 */
export const controlOf = <Part extends FieldValues, All extends Part>(
  control: Control<All>,
): Control<Part> => control as unknown as Control<Part>

/** The text when there is one, else the field is left out. */
const optional = <Key extends string>(key: Key, value: string) =>
  (value.trim() !== "" ? { [key]: value.trim() } : {}) as {
    [K in Key]?: string
  }

/** The report as the backend takes it. */
export const toCitizenReport = (values: ReportValues) => ({
  // Who reported it, as far as known, unless the reporter is anonymous.
  ...(values.reporter_anonymous === NO && {
    ...optional("reporter_name", values.reporter_name),
    ...optional("reporter_phone", values.reporter_phone),
    ...optional("reporter_email", values.reporter_email),
  }),
  identification: Number(values.identification),
  description_citizenreport: values.description_citizenreport,
  nuisance: values.nuisance,
})

/** The links of the advertisements as the backend takes them. */
export const toAdvertisements = (values: AdvertisementValues) =>
  values.advertisements.map(({ link }) => ({ link: link.trim() }))
