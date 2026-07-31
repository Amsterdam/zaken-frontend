import { DateDisplay } from "@amsterdam/wonen-ui";

export default (fine: components["schemas"]["Fine"]) => {

  const { identificatienummer, invorderingstatus, dagtekening } = fine;

  const values = [
    ["Kenmerk", identificatienummer],
    ["Status", invorderingstatus !== undefined ? "Opgepakt" : "Onbekend"],
    ["Datum", <DateDisplay date={ dagtekening } emptyText="-" />],
  ];

  return Object.fromEntries(values);
};
