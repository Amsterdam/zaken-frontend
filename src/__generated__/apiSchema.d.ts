declare namespace API {
    export type Case = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly uuid: string
        readonly identificatie: string
        omschrijving: string
        toelichting?: string
        startdatum: string // date
        einddatum?: string // date
        readonly status: {
            [name: string]: any
        }
        readonly bronorganisatie: string
        readonly verantwoordelijkeOrganisatie: string
        zaaktype: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly debug: {
            [name: string]: any
        }
    }
    export type CaseObject = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly uuid: string
        readonly zaakUuid: string
        zaak: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        object: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        objectType: string
    }
    export type CaseType = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly uuid: string
        readonly omschrijving: string
        readonly doel: string
        readonly aanleiding: string
        readonly onderwerp: string
    }
    export type Catalog = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly uuid: string
    }
    export type Push = {
        identificatie: string
        omschrijving: string
        toelichting: string
        startdatum: string // date
        einddatum?: string // date
    }
    export type PushCheckAction = {
        identificatie: string
        check_actie: boolean
    }
    export type State = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        readonly uuid: string
        readonly datumStatusGezet: string // date
        zaak: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        statustype: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        statustoelichting?: string
    }
    export type StateType = {
        readonly url: string // uri ^(?:[a-z0-9\.\-\+]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:\.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
        statustekst: string
        omschrijving: string
        readonly uuid: string
        zaaktype: string
        volgnummer: number
    }
}
declare namespace Paths {
    namespace CaseObjectsCreate {
        export type RequestBody = API.CaseObject;
        namespace Responses {
            export type $200 = API.CaseObject;
        }
    }
    namespace CaseObjectsList {
        namespace Responses {
            export type $200 = API.CaseObject[];
        }
    }
    namespace CaseObjectsRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.CaseObject;
        }
    }
    namespace CaseTypesList {
        namespace Responses {
            export type $200 = API.CaseType[];
        }
    }
    namespace CaseTypesRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.CaseType;
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
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace CasesList {
        namespace Responses {
            export type $200 = API.Case[];
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CasesUpdate {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        export type RequestBody = API.Case;
        namespace Responses {
            export type $200 = API.Case;
        }
    }
    namespace CatalogsList {
        namespace Responses {
            export type $200 = API.Catalog[];
        }
    }
    namespace CatalogsRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.Catalog;
        }
    }
    namespace GenerateMockDeleteDestroy {
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace GenerateMockList {
        namespace Responses {
            export type $200 = {
                [name: string]: any
            }[];
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
        namespace Responses {
            export type $200 = API.StateType[];
        }
    }
    namespace StateTypesRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.StateType;
        }
    }
    namespace StatesCreate {
        export type RequestBody = API.State;
        namespace Responses {
            export type $200 = API.State;
        }
    }
    namespace StatesList {
        namespace Responses {
            export type $200 = API.State[];
        }
    }
    namespace StatesRetrieve {
        namespace Parameters {
            export type Uuid = string;
        }
        export type PathParameters = {
            uuid: Parameters.Uuid
        }
        namespace Responses {
            export type $200 = API.State;
        }
    }
}
