// REASON
export const reasonLabelsMap = {
  "start_date": "Datum",
  "author": "Projectmedewerker",
  "reason": "Aanleiding",
  "description": "Toelichting"
} as Record<string, string>

// DEBRIEF
export const debriefLabelsMap = {
  "date_added": "Datum",
  "author": "Projecthandhaver",
  "violation": "Overtreding",
  "feedback": "Terugkoppeling"
}

export const debriefViolationMap = {
  "YES": "Ja, overtreding",
  "NO": "Nee, geen overtreding",
  "ADDITIONAL_RESEARCH_REQUIRED": "Nader intern onderzoek nodig",
  "ADDITIONAL_VISIT_REQUIRED": "Aanvullend huisbezoek nodig"
} as Record<string, string>

// SUMMON
export const summonLabelsMap = {
  "date_added": "Datum",
  "author": "Projecthandhaver",
  "persons": "Ontvanger(s)",
  "description": "Toelichting"
}

// GENERIC EVENT
export const genericLabelsMap = {
  "date_added": "Datum",
  "author": "Uitvoerder"
}

// VISIT
export const visitLabelsMap = {
  "date": "Datum",
  "start_time": "Starttijd",
  "authors": "Toezichthouders",
  "situation": "Situatie",
  "observations": "Kenmerken",
  "can_next_visit_go_ahead": "Vervolgactie",
  "can_next_visit_go_ahead_description": "Toelichting",
  "suggest_next_visit": "Volgend bezoek",
  "suggest_next_visit_description": "Toelichting",
  "notes": "Toelichting"
}

export const visitEventValuesMap = {
  "malfunctioning_doorbel": "Bel functioneert niet",
  "intercom": "Contact via intercom",
  "hotel_furnished": "Hotelmatig ingericht",
  "vacant": "Leegstaand",
  "likely_inhabited": "Vermoedelijk bewoond",
  "nobody_present": "Niemand aanwezig",
  "no_cooperation": "Geen medewerking",
  "access_granted": "Toegang verleend",
  "daytime": "Overdag",
  "weekend": "Weekend",
  "evening": "'s Avonds",
  "unknown": "Niet meer uitzetten"
} as Record<string, string>

export const visit_go_ahead = {
  "true": "Ja, doorlaten",
  "false": "Nee, tegenhouden"
} as Record<string, string>

