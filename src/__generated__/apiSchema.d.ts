declare namespace Components {
    namespace Schemas {
        export interface Address {
            bag_id: string;
            readonly id: number;
            readonly full_address: any;
            readonly street_name: string;
            readonly number: number;
            readonly suffix_letter: string;
            readonly suffix: string;
            readonly postal_code: string;
            readonly lat: number; // float
            readonly lng: number; // float
        }
        export interface Case {
            readonly id: number;
            case_type: CaseType;
            address: Address;
            readonly states: State[];
            identification?: string | null;
            start_date?: string | null; // date
            end_date?: string | null; // date
        }
        export interface CaseTimeline {
            readonly id: number;
            readonly casetimelinethread_set: CaseTimelineThread[];
            subject: string;
            is_done?: boolean;
        }
        export interface CaseTimelineReaction {
            readonly id: number;
            comment: string;
            readonly date: string; // date
            timeline_item: number;
            author: string; // uuid
        }
        export interface CaseTimelineThread {
            readonly id: number;
            readonly castetimelinereaction_set: CaseTimelineReaction[];
            readonly date: string; // date
            parameters?: string;
            notes?: string | null;
            subject: number;
            authors: string /* uuid */[];
        }
        export interface CaseType {
            readonly id: number;
            name: string;
        }
        export interface Fine {
            identificatienummer: string;
            vorderingnummer: number;
            jaar: number;
            soort_vordering: SoortVorderingEnum;
            omschrijving_soort_vordering: string;
            indicatie_publiekrechtelijk: IndicatiePubliekrechtelijkEnum;
            subjectnr: number; // int64
            opgemaaktenaam: string;
            subjectnr_opdrachtgever: number;
            opgemaaktenaam_opdrachtgever: string;
            runnr: number;
            omschrijving_run: string;
            code_runwijze: string;
            omschrijving_runwijze: string;
            dagtekening: string; // date-time
            vervaldatum: string; // date-time
            indicatie_combi_dwangbevel: IndicatieCombiDwangbevelEnum;
            notatekst: string | null;
            omschrijving: string | null;
            invorderingstatus: string;
            indicatie_bet_hern_bevel: IndicatieBetHernBevelEnum;
            landcode: string | null;
            kenteken: string | null;
            bonnummer: string | null;
            bedrag_opgelegd: string; // decimal
            bedrag_open_post_incl_rente: string; // decimal
            totaalbedrag_open_kosten: string; // decimal
            bedrag_open_rente: string; // decimal
            reden_opschorting: string | null;
            omschrijving_1: string | null;
            omschrijving_2: string | null;
        }
        export interface FineList {
            items: Fine[];
            states_with_fines: Fine[];
        }
        export type GeslachtsaanduidingEnum = "M" | "V" | "X";
        export type IndicatieBetHernBevelEnum = "J" | "N";
        export type IndicatieCombiDwangbevelEnum = "J" | "N" | "O";
        export type IndicatiePubliekrechtelijkEnum = "J" | "N";
        export interface OIDCAuthenticate {
            code: string;
        }
        export interface PatchedAddress {
            bag_id?: string;
            readonly id?: number;
            readonly full_address?: any;
            readonly street_name?: string;
            readonly number?: number;
            readonly suffix_letter?: string;
            readonly suffix?: string;
            readonly postal_code?: string;
            readonly lat?: number; // float
            readonly lng?: number; // float
        }
        export interface PatchedCase {
            readonly id?: number;
            case_type?: PatchedCaseType;
            address?: PatchedAddress;
            readonly states?: State[];
            identification?: string | null;
            start_date?: string | null; // date
            end_date?: string | null; // date
        }
        export interface PatchedCaseTimeline {
            readonly id?: number;
            readonly casetimelinethread_set?: CaseTimelineThread[];
            subject?: string;
            is_done?: boolean;
        }
        export interface PatchedCaseTimelineReaction {
            readonly id?: number;
            comment?: string;
            readonly date?: string; // date
            timeline_item?: number;
            author?: string; // uuid
        }
        export interface PatchedCaseTimelineThread {
            readonly id?: number;
            readonly castetimelinereaction_set?: CaseTimelineReaction[];
            readonly date?: string; // date
            parameters?: string;
            notes?: string | null;
            subject?: number;
            authors?: string /* uuid */[];
        }
        export interface PatchedCaseType {
            readonly id?: number;
            name?: string;
        }
        export interface Push {
            identification: string;
            case_type: string;
            bag_id: string;
            start_date: string; // date
            end_date?: string; // date
            states?: PushState[];
        }
        export interface PushCheckAction {
            identification: string;
            check_action: boolean;
        }
        export interface PushState {
            name: string;
            start_date: string; // date
            end_date?: string | null; // date
            gauge_date?: string | null; // date
            invoice_identification: string;
        }
        export interface Resident {
            geboortedatum: string; // date-time
            geslachtsaanduiding: GeslachtsaanduidingEnum;
            geslachtsnaam: string;
            voorletters: string;
            voornamen: string;
            voorvoegsel_geslachtsnaam?: string;
            datum_begin_relatie_verblijadres: string; // date-time
        }
        export interface Residents {
            items: Resident[];
        }
        export type SoortVorderingEnum = "PBF" | "PBN" | "PRV" | "SOC";
        export interface State {
            readonly id: number;
            state_type: StateType;
            start_date?: string | null; // date
            end_date?: string | null; // date
            gauge_date?: string | null; // date
            invoice_identification?: string | null;
            case: number;
        }
        export interface StateType {
            readonly id: number;
            name: string;
            invoice_available?: boolean;
        }
    }
}
declare namespace Paths {
    namespace AddressesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.Address[];
            }
        }
    }
    namespace CaseTimelineReactionsCreate {
        export type RequestBody = Components.Schemas.CaseTimelineReaction;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineReaction;
        }
    }
    namespace CaseTimelineReactionsDestroy {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CaseTimelineReactionsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.CaseTimelineReaction[];
            }
        }
    }
    namespace CaseTimelineReactionsPartialUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCaseTimelineReaction;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineReaction;
        }
    }
    namespace CaseTimelineReactionsRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineReaction;
        }
    }
    namespace CaseTimelineReactionsUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CaseTimelineReaction;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineReaction;
        }
    }
    namespace CaseTimelineThreadsCreate {
        export type RequestBody = Components.Schemas.CaseTimelineThread;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineThread;
        }
    }
    namespace CaseTimelineThreadsDestroy {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CaseTimelineThreadsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.CaseTimelineThread[];
            }
        }
    }
    namespace CaseTimelineThreadsPartialUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCaseTimelineThread;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineThread;
        }
    }
    namespace CaseTimelineThreadsRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineThread;
        }
    }
    namespace CaseTimelineThreadsUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CaseTimelineThread;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimelineThread;
        }
    }
    namespace CaseTimelinesCreate {
        export type RequestBody = Components.Schemas.CaseTimeline;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimeline;
        }
    }
    namespace CaseTimelinesDestroy {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CaseTimelinesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.CaseTimeline[];
            }
        }
    }
    namespace CaseTimelinesPartialUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCaseTimeline;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimeline;
        }
    }
    namespace CaseTimelinesRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimeline;
        }
    }
    namespace CaseTimelinesUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CaseTimeline;
        namespace Responses {
            export type $200 = Components.Schemas.CaseTimeline;
        }
    }
    namespace CaseTypesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.CaseType[];
            }
        }
    }
    namespace CasesCreate {
        export type RequestBody = Components.Schemas.Case;
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesDestroy {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CasesFinesRetrieve {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FineList;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.Case[];
            }
        }
    }
    namespace CasesPartialUpdate {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        export type RequestBody = Components.Schemas.PatchedCase;
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesResidentsRetrieve {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Residents;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesUpdate {
        namespace Parameters {
            export type Identification = string;
        }
        export interface PathParameters {
            identification: Parameters.Identification;
        }
        export type RequestBody = Components.Schemas.Case;
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace GenerateMockRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace IsAuthenticatedRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace OidcAuthenticateCreate {
        export type RequestBody = Components.Schemas.OIDCAuthenticate;
        namespace Responses {
            export type $200 = Components.Schemas.OIDCAuthenticate;
        }
    }
    namespace PermitsGetPermitCheckmarksRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export interface QueryParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PermitsListDocumentsRetrieve {
        namespace Parameters {
            export type Query = string;
        }
        export interface QueryParameters {
            query: Parameters.Query;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PermitsListSwaggerRetrieve {
        namespace Parameters {
            export type Query = string;
        }
        export interface QueryParameters {
            query: Parameters.Query;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PermitsRetrieve {
        namespace Parameters {
            export type BookId = string;
            export type Query = string;
        }
        export interface QueryParameters {
            book_id: Parameters.BookId;
            query: Parameters.Query;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PushCheckActionCreate {
        export type RequestBody = Components.Schemas.PushCheckAction;
        namespace Responses {
            export type $200 = Components.Schemas.PushCheckAction;
        }
    }
    namespace PushCreate {
        export type RequestBody = Components.Schemas.Push;
        namespace Responses {
            export type $200 = Components.Schemas.Push;
        }
    }
    namespace SchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
            export type Lang = "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            lang?: Parameters.Lang;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
        }
    }
    namespace StateTypesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.StateType[];
            }
        }
    }
    namespace StatesList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.State[];
            }
        }
    }
}
