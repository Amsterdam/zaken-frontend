declare type CaseCreate = Omit<Components.Schemas.CaseCreateUpdate, "id" | "address"> &
  { address: { bag_id: Components.Schemas.Address["bag_id"] }, ton_ids: number[] | undefined }

