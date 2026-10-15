// The generated type for GET /cases/{id}/ is incomplete, so we extend it with the fields the backend also sends
declare type CaseItem = components["schemas"]["CaseCreate"] &
  Pick<
    components["schemas"]["CaseDetail"],
    "has_open_sensitive_case_on_address"
  >
