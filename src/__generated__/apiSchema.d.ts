declare namespace API {
    export type Address = {
        bag_id: string
        readonly id: number
        readonly full_address: any
        readonly street_name: string
        readonly number: number
        readonly suffix_letter: string
        readonly suffix: string
        readonly postal_code: string
        readonly lat: number // float
        readonly lng: number // float
    }
    export type Case = {
        readonly id: number
        case_type: CaseType
        address: Address
        identification?: string | null
        start_date?: string | null // date
        end_date?: string | null // date
    }
    export type CaseType = {
        readonly id: number
        name: string
    }
    export type OIDCAuthenticate = {
        code: string
    }
    export type PatchedAddress = {
        bag_id?: string
        readonly id?: number
        readonly full_address?: any
        readonly street_name?: string
        readonly number?: number
        readonly suffix_letter?: string
        readonly suffix?: string
        readonly postal_code?: string
        readonly lat?: number // float
        readonly lng?: number // float
    }
    export type PatchedCase = {
        readonly id?: number
        case_type?: PatchedCaseType
        address?: PatchedAddress
        identification?: string | null
        start_date?: string | null // date
        end_date?: string | null // date
    }
    export type PatchedCaseType = {
        readonly id?: number
        name?: string
    }
    export type Push = {
        identification: string
        case_type: string
        bag_id: string
        start_date: string // date
        end_date?: string // date
    }
    export type PushCheckAction = {
        identification: string
        check_action: boolean
    }
    export type State = {
        readonly id: number
        state_type: StateType
        case: Case
        start_date?: string | null // date
        end_date?: string | null // date
        gauge_date?: string | null // date
    }
    export type StateType = {
        readonly id: number
        name: string
    }
}
declare namespace Paths {
    namespace AddressesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: API.Address[]
            }
        }
    }
    namespace CaseTypesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: API.CaseType[]
            }
        }
    }
    namespace CasesCreate {
        export type RequestBody = API.Case;
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CasesDestroy {
        namespace Parameters {
            export type Identification = string;
        }
        export type PathParameters = {
            identification: Parameters.Identification
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace CasesFinesRetrieve {
        namespace Parameters {
            export type Identification = string;
        }
        export type PathParameters = {
            identification: Parameters.Identification
        }
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: API.Case[]
            }
        }
    }
    namespace CasesPartialUpdate {
        namespace Parameters {
            export type Identification = string;
        }
        export type PathParameters = {
            identification: Parameters.Identification
        }
        export type RequestBody = API.PatchedCase;
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Identification = string;
        }
        export type PathParameters = {
            identification: Parameters.Identification
        }
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CasesUpdate {
        namespace Parameters {
            export type Identification = string;
        }
        export type PathParameters = {
            identification: Parameters.Identification
        }
        export type RequestBody = API.Case;
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace GenerateMockRetrieve {
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace IsAuthenticatedRetrieve {
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace OidcAuthenticateCreate {
        export type RequestBody = API.OIDCAuthenticate;
        namespace Responses {
            export type $200 = API.OIDCAuthenticate;
        }
    }
    namespace PushCheckActionCreate {
        export type RequestBody = API.PushCheckAction;
        namespace Responses {
            export type $200 = API.PushCheckAction;
        }
    }
    namespace PushCreate {
        export type RequestBody = API.Push;
        namespace Responses {
            export type $200 = API.Push;
        }
    }
    namespace SchemaRetrieve {
        namespace Responses {
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace StateTypesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: API.StateType[]
            }
        }
    }
    namespace StatesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: API.State[]
            }
        }
    }
}
