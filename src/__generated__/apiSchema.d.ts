declare namespace Components {
    namespace Schemas {
        export interface Action {
            readonly id: number;
            name: string;
        }
        export interface Address {
            bag_id: string;
            readonly id: number;
            readonly full_address: string;
            readonly street_name: string;
            readonly number: number;
            readonly suffix_letter: string;
            readonly suffix: string;
            readonly postal_code: string;
            readonly lat: number; // float
            readonly lng: number; // float
        }
        /**
         * Case-address serializer for camunda tasks
         */
        export interface CamundaCaseAddress {
            readonly id: number;
            address: Address;
        }
        export interface CamundaDateUpdate {
            camunda_task_id: string;
            date: string; // date-time
        }
        export interface CamundaEndStateWorker {
            state_identification: number;
        }
        export interface CamundaMessager {
            message_name: string;
            process_variables?: {
                [name: string]: any;
            };
            case_identification: string;
        }
        export interface CamundaProcess {
            readonly id: number;
            name: string;
            camunda_message_name: string;
        }
        export interface CamundaStartProcess {
            camunda_process_id: number;
        }
        /**
         * Serializer for Worker Data
         */
        export interface CamundaStateWorker {
            state: string;
            case_identification: string;
        }
        /**
         * Serializer for Camunda tasks
         */
        export interface CamundaTask {
            camunda_task_id: string;
            task_name_id: string;
            name: string;
            due_date: string; // date
            readonly roles: any[];
            form: {
                [name: string]: any;
            };
            render_form: string;
            form_variables: {
                [name: string]: any;
            };
        }
        /**
         * Used to complete a task in Camunda.
         *
         * variables example
         * {
         *     "a_field": {
         *         "value": true,
         *         "label": "Label for a field"
         *     }
         * }
         */
        export interface CamundaTaskComplete {
            camunda_task_id: string;
            case: number;
            variables: {
                [name: string]: any;
            };
        }
        /**
         * Camunda task serializer for the list-endpoint
         */
        export interface CamundaTaskList {
            camunda_task_id: string;
            task_name_id: string;
            name: string;
            due_date: string; // date
            readonly roles: any[];
            case: /* Case-address serializer for camunda tasks */ CamundaCaseAddress;
            process_instance_id: string;
        }
        export interface Case {
            readonly id: number;
            address: Address;
            case_states: CaseState[];
            readonly current_states: CaseState[];
            team: CaseTeam;
            reason: CaseReason;
            readonly schedules: Schedule[];
            identification?: string | null;
            start_date?: string | null; // date
            end_date?: string | null; // date
            is_legacy_bwv?: boolean;
            camunda_ids?: string[] | null;
            description?: string | null;
            author?: string | null; // uuid
        }
        export interface CaseCreateUpdate {
            readonly id: number;
            address: Address;
            team: number;
            reason: number;
            description?: string | null;
        }
        export interface CaseEvent {
            readonly id: number;
            event_values: {
                [name: string]: any;
            };
            readonly date_created: string; // date-time
            type: TypeEnum;
            emitter_id: number;
            case: number;
        }
        export interface CaseReason {
            readonly id: number;
            name: string;
            team: number;
        }
        export interface CaseState {
            readonly id: number;
            case: number;
            readonly status_name: string;
            status: number;
            start_date: string; // date
            end_date?: string | null; // date
            users: string /* uuid */[];
        }
        export interface CaseStateType {
            readonly id: number;
            name: string;
            team?: number;
        }
        export interface CaseTeam {
            readonly id: number;
            name: string;
        }
        export interface DaySegment {
            readonly id: number;
            name: string;
        }
        export interface DebriefingCreate {
            readonly id: number;
            violation?: ViolationEnum;
            feedback: string;
            case: number;
        }
        export interface Decision {
            readonly id: number;
            sanction_amount?: string | null; // decimal ^\d{0,98}(\.\d{0,2})?$
            description?: string | null;
            readonly date_added: string; // date-time
            case: number;
            decision_type: number;
        }
        export interface DecisionType {
            readonly id: number;
            camunda_option: string;
            name: string;
            is_sanction?: boolean;
            team: number;
        }
        export interface Decos {
            permits: DecosPermit[];
            vakantieverhuur_meldingen: {
                rented_days_count: null | number;
                planned_days_count: null | number;
                is_rented_today: boolean;
                meldingen: VakantieverhuurMelding[];
            } | null;
        }
        export interface DecosPermit {
            permit_granted: PermitGrantedEnum;
            permit_type: string;
            decos_join_web_url?: string; // uri
            raw_data?: {
                [name: string]: any;
            } | null;
            details?: {
                [name: string]: any;
            } | null;
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
            bedrag_opgelegd: string; // decimal ^\d{0,10}(\.\d{0,2})?$
            bedrag_open_post_incl_rente: string; // decimal ^\d{0,10}(\.\d{0,2})?$
            totaalbedrag_open_kosten: string; // decimal ^\d{0,10}(\.\d{0,2})?$
            bedrag_open_rente: string; // decimal ^\d{0,10}(\.\d{0,2})?$
            reden_opschorting: string | null;
            omschrijving_1: string | null;
            omschrijving_2: string | null;
        }
        export interface FineList {
            items: Fine[];
        }
        export type GeslachtsaanduidingEnum = "M" | "V" | "X";
        export type IndicatieBetHernBevelEnum = "J" | "N";
        export type IndicatieCombiDwangbevelEnum = "J" | "N" | "O";
        export type IndicatiePubliekrechtelijkEnum = "J" | "N";
        export interface OIDCAuthenticate {
            code: string;
        }
        export interface PaginatedCamundaProcessList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CamundaProcess[];
        }
        export interface PaginatedCamundaTaskList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: /* Serializer for Camunda tasks */ CamundaTask[];
        }
        export interface PaginatedCaseList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Case[];
        }
        export interface PaginatedCaseReasonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CaseReason[];
        }
        export interface PaginatedCaseStateTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CaseStateType[];
        }
        export interface PaginatedCaseTeamList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CaseTeam[];
        }
        export interface PaginatedDebriefingCreateList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: DebriefingCreate[];
        }
        export interface PaginatedDecisionList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Decision[];
        }
        export interface PaginatedDecisionTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: DecisionType[];
        }
        export interface PaginatedSummonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Summon[];
        }
        export interface PaginatedSummonTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: SummonType[];
        }
        export interface PaginatedSupportContactList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: SupportContact[];
        }
        export interface PaginatedTeamScheduleTypesList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: TeamScheduleTypes[];
        }
        export interface PaginatedUserList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: User[];
        }
        export interface PaginatedVisitList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Visit[];
        }
        export type PermitGrantedEnum = "GRANTED" | "NOT_GRANTED" | "UNKNOWN";
        export interface Priority {
            readonly id: number;
            name: string;
            weight: number; // float
        }
        export interface Push {
            identification: string;
            case_type: string;
            bag_id: string;
            start_date: string; // date
            end_date?: string; // date
            states?: /* Serializer for State pushed from Top (this is legacy Stadia data) */ PushState[];
        }
        export interface PushCaseState {
            user_emails: string /* email */[];
        }
        /**
         * Serializer for State pushed from Top (this is legacy Stadia data)
         */
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
            datum_begin_relatie_verblijfadres: string; // date-time
        }
        export interface Residents {
            results: Resident[];
        }
        export interface Schedule {
            readonly id: number;
            action: Action;
            week_segment: WeekSegment;
            day_segment: DaySegment;
            priority: Priority;
            readonly date_added: string; // date-time
            readonly date_modified: string; // date-time
            case: number;
        }
        export interface ScheduleCreate {
            action: number;
            week_segment: number;
            day_segment: number;
            priority: number;
            case: number;
        }
        export type SoortVorderingEnum = "PBF" | "PBN" | "PRV" | "SOC";
        export interface Summon {
            readonly id: number;
            type: number;
            readonly type_name: string;
            case: number;
            persons: SummonedPerson[];
            readonly date_added: string; // date-time
            description?: string | null;
        }
        export interface SummonType {
            readonly id: number;
            name: string;
        }
        export interface SummonedPerson {
            readonly id: number;
            first_name: string;
            preposition?: string | null;
            last_name: string;
            readonly summon: number;
        }
        export interface SupportContact {
            readonly id: number;
            name: string;
            phone_number: string;
            email: string;
            title: string;
        }
        export interface TeamScheduleTypes {
            actions: Action[];
            week_segments: WeekSegment[];
            day_segments: DaySegment[];
            priorities: Priority[];
        }
        export type TypeEnum = "DEBRIEFING" | "VISIT" | "CASE" | "SUMMON" | "GENERIC_TASK" | "SCHEDULE";
        export interface User {
            id?: string; // uuid
            email?: string; // email
            username?: string;
            first_name?: string;
            last_name?: string;
            full_name?: string;
        }
        export interface VakantieverhuurMelding {
            is_afmelding: boolean;
            melding_date: string; // date-time
            check_in_date: string; // date-time
            check_out_date: string; // date-time
        }
        export interface VakantieverhuurRentalInformation {
            rented_days_count: null | number;
            planned_days_count: null | number;
            is_rented_today: boolean;
            meldingen: VakantieverhuurMelding[];
        }
        export type ViolationEnum = "NO" | "YES" | "ADDITIONAL_RESEARCH_REQUIRED" | "ADDITIONAL_VISIT_REQUIRED";
        export interface Visit {
            readonly id: number;
            authors?: User[];
            author_ids?: string /* uuid */[];
            start_time: string; // date-time
            situation?: string | null;
            observations?: string[] | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: string | null;
            suggest_next_visit_description?: string | null;
            notes?: string | null;
            case: number;
        }
        export interface WeekSegment {
            readonly id: number;
            name: string;
        }
    }
}
declare namespace Paths {
    namespace AddressesCasesList {
        namespace Parameters {
            export type BagId = string;
            export type OpenCases = boolean;
            export type Page = number;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        export interface QueryParameters {
            open_cases?: Parameters.OpenCases;
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace AddressesPermitsRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Decos;
        }
    }
    namespace AddressesResidentsRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Residents;
        }
    }
    namespace AuthorsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedUserList;
        }
    }
    namespace CamundaTaskCompleteCreate {
        export type RequestBody = /**
         * Used to complete a task in Camunda.
         *
         * variables example
         * {
         *     "a_field": {
         *         "value": true,
         *         "label": "Label for a field"
         *     }
         * }
         */
        Components.Schemas.CamundaTaskComplete;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CamundaTaskDateCreate {
        export type RequestBody = Components.Schemas.CamundaDateUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.CamundaDateUpdate;
        }
    }
    namespace CamundaWorkerEndStateCreate {
        export type RequestBody = Components.Schemas.CamundaEndStateWorker;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CamundaWorkerSendMessageStartProcessCreate {
        export type RequestBody = Components.Schemas.CamundaMessager;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CamundaWorkerStateCreate {
        export type RequestBody = /* Serializer for Worker Data */ Components.Schemas.CamundaStateWorker;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CaseStatesUpdateFromTopCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PushCaseState;
        namespace Responses {
            export type $200 = Components.Schemas.PushCaseState;
        }
    }
    namespace CasesCreate {
        export type RequestBody = Components.Schemas.CaseCreateUpdate;
        namespace Responses {
            export type $201 = Components.Schemas.CaseCreateUpdate;
        }
    }
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesGenerateMockCreate {
        export type RequestBody = Components.Schemas.Case;
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type Date = string; // date
            export type NoPagination = boolean;
            export type OpenCases = boolean;
            export type OpenStatus = string;
            export type Page = number;
            export type Reason = number;
            export type StartDate = string; // date
            export type Team = number;
        }
        export interface QueryParameters {
            date?: Parameters.Date /* date */;
            noPagination?: Parameters.NoPagination;
            openCases?: Parameters.OpenCases;
            openStatus?: Parameters.OpenStatus;
            page?: Parameters.Page;
            reason?: Parameters.Reason;
            startDate?: Parameters.StartDate /* date */;
            team?: Parameters.Team;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace CasesProcessesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCamundaProcessList;
        }
    }
    namespace CasesProcessesStartCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CamundaStartProcess;
        namespace Responses {
            export type $200 = Components.Schemas.CamundaStartProcess;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesSearchList {
        namespace Parameters {
            export type Page = number;
            export type PostalCode = string;
            export type StreetName = string;
            export type StreetNumber = string;
            export type Suffix = string;
            export type Team = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            postalCode?: Parameters.PostalCode;
            streetName?: Parameters.StreetName;
            streetNumber?: Parameters.StreetNumber;
            suffix?: Parameters.Suffix;
            team?: Parameters.Team;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace CasesTasksList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCamundaTaskList;
        }
    }
    namespace DebriefingsCreate {
        export type RequestBody = Components.Schemas.DebriefingCreate;
        namespace Responses {
            export type $201 = Components.Schemas.DebriefingCreate;
        }
    }
    namespace DebriefingsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDebriefingCreateList;
        }
    }
    namespace DecisionsCreate {
        export type RequestBody = Components.Schemas.Decision;
        namespace Responses {
            export type $201 = Components.Schemas.Decision;
        }
    }
    namespace DecisionsList {
        namespace Parameters {
            export type Case = number;
            export type Page = number;
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionList;
        }
    }
    namespace FinesRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FineList;
        }
    }
    namespace IsAuthorizedRetrieve {
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
    namespace PushCreate {
        export type RequestBody = Components.Schemas.Push;
        namespace Responses {
            export type $201 = Components.Schemas.Push;
        }
    }
    namespace SchedulesCreate {
        export type RequestBody = Components.Schemas.ScheduleCreate;
        namespace Responses {
            export type $201 = Components.Schemas.ScheduleCreate;
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
    namespace SummonsCreate {
        export type RequestBody = Components.Schemas.Summon;
        namespace Responses {
            export type $201 = Components.Schemas.Summon;
        }
    }
    namespace SummonsList {
        namespace Parameters {
            export type Case = number;
            export type Page = number;
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonList;
        }
    }
    namespace SupportContactsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSupportContactList;
        }
    }
    namespace TasksList {
        namespace Parameters {
            export type Role = string;
        }
        export interface QueryParameters {
            role?: Parameters.Role;
        }
        namespace Responses {
            export type $200 = /* Camunda task serializer for the list-endpoint */ Components.Schemas.CamundaTaskList[];
        }
    }
    namespace TeamsDecisionTypesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionTypeList;
        }
    }
    namespace TeamsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseTeamList;
        }
    }
    namespace TeamsReasonsList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseReasonList;
        }
    }
    namespace TeamsScheduleTypesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedTeamScheduleTypesList;
        }
    }
    namespace TeamsStateTypesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStateTypeList;
        }
    }
    namespace TeamsSummonTypesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonTypeList;
        }
    }
    namespace VisitsCreate {
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $201 = Components.Schemas.Visit;
        }
    }
    namespace VisitsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedVisitList;
        }
    }
}
