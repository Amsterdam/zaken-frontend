import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import React, { useMemo } from "react"

type Props = {
  fine: Components.Schemas.Fine
}

const FineDetails: React.FC<Props> = ({ fine }) => {
  const values = useMemo(() => ({
    "Bedrag open post incl rente": fine.bedrag_open_post_incl_rente,
    "Bedrag open rente": fine.bedrag_open_rente,
    "Bedrag opgelegd": fine.bedrag_opgelegd,
    "Bonnummer": fine.bonnummer,
    "Code runwijze": fine.code_runwijze,
    "Dagtekening": fine.dagtekening,
    "Identificatienummer": fine.identificatienummer,
    "Indicatie bet hern bevel": fine.indicatie_bet_hern_bevel,
    "Indicatie publiekrechtelijk": fine.indicatie_publiekrechtelijk,
    "Indicatie_combi dwangbevel": fine.indicatie_combi_dwangbevel,
    "Invorderingstatus": fine.invorderingstatus,
    "Jaar": fine.jaar,
    "Kenteken": fine.kenteken,
    "Landcode": fine.landcode,
    "Notatekst": fine.notatekst,
    "Omschrijving 1": fine.omschrijving_1,
    "Omschrijving 2": fine.omschrijving_2,
    "Omschrijving run": fine.omschrijving_run,
    "Omschrijving runwijze": fine.omschrijving_runwijze,
    "Omschrijving soort vordering": fine.omschrijving_soort_vordering,
    "Omschrijving": fine.omschrijving,
    "Opgemaaktenaam opdrachtgever": fine.opgemaaktenaam_opdrachtgever,
    "Opgemaaktenaam": fine.opgemaaktenaam,
    "Reden opschorting": fine.reden_opschorting,
    "Runnr": fine.runnr,
    "Soort vordering": fine.soort_vordering,
    "Subjectnr opdrachtgever": fine.subjectnr_opdrachtgever,
    "Subjectnr": fine.subjectnr,
    "Totaalbedrag open kosten": fine.totaalbedrag_open_kosten,
    "Vervaldatum": fine.vervaldatum,
    "Vorderingnummer": fine.vorderingnummer
  }), [ fine ])

  return <DefinitionList
    numInitialVisibleRows={5}
    title={`Vordering "${ fine.vorderingnummer }"`}
    values={values}
  />
}

export default FineDetails
