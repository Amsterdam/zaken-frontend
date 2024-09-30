export default (benkAggAddress?: BAGBenkAggAddress) => {
  if (!benkAggAddress) return
  
  const { 
    gebruiksdoelOmschrijvingen, verblijfsobjectOppervlakte, verblijfsobjectAantalBouwlagen, 
    toegangOmschrijvingen, verblijfsobjectAantalKamers 
  } = benkAggAddress

  const values = [
    ["Gebruiksdoel", gebruiksdoelOmschrijvingen ? gebruiksdoelOmschrijvingen.join(", ") : undefined],
    ["Oppervlakte", verblijfsobjectOppervlakte ? `${ verblijfsobjectOppervlakte }m²` : undefined],
    ["Bouwlagen", verblijfsobjectAantalBouwlagen],
    ["Toegang", toegangOmschrijvingen ? toegangOmschrijvingen.join(", ") : undefined],
    ["Aantal kamers", verblijfsobjectAantalKamers ]
  ]

  return Object.fromEntries(values)
}