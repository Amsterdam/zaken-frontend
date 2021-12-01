// We override the address key here. Because the generated type expects a complete Address instead of just a bag_id
declare type CaseCreate = Omit<Components.Schemas.CaseCreateUpdate, "id" | "address"> &
  { address: { bag_id: Components.Schemas.Address["bag_id"] }, nuisance: boolean }

