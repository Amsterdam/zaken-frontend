declare namespace Components {
    namespace Schemas {
        export interface Action {
            id: number;
            name: string;
        }
        export interface Address {
            bag_id: string;
            id: number;
            full_address: string;
            street_name: string;
            number: number;
            suffix_letter: string;
            suffix: string;
            postal_code: string;
            lat: number; // float
            lng: number; // float
        }
        export interface Advertisement {
            id: number;
            link: string;
            date_added: string; // date-time
            related_object_id?: number | null;
            related_object_type?: number | null;
        }
        /**
         * Adds nested create feature
         */
        export interface Case {
            id: number;
            address: {
                bag_id: string;
                id: number;
                full_address: string;
                street_name: string;
                number: number;
                suffix_letter: string;
                suffix: string;
                postal_code: string;
                lat: number; // float
                lng: number; // float
            };
            bag_id: string;
            current_states: CaseWorkflowCaseDetail[];
            theme: {
                id: number;
                name: string;
                sensitive?: boolean;
                case_state_types_top?: number[];
            };
            theme_id: number;
            reason: {
                id: number;
                name: string;
                theme: number;
            };
            reason_id: number;
            schedules: Schedule[];
            project: {
                id: number;
                name: string;
                active?: boolean;
                theme: number;
            };
            project_id?: number;
            subjects: Subject[];
            subject_ids?: number[];
            citizen_reports?: CitizenReportCase[];
            advertisements?: Advertisement[];
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            description?: string | null;
            ton_ids?: number /* int64 */[] | null;
            last_updated: string; // date-time
            created: string; // date-time
        }
        /**
         * Case-address serializer for CaseUserTasks
         */
        export interface CaseAddress {
            id: number;
            address: Address;
            sensitive?: boolean;
        }
        export interface CaseClose {
            id: number;
            case_user_task_id?: string;
            description: string;
            date_added: string; // date-time
            case: number;
            reason: number;
            result?: number | null;
        }
        export interface CaseCloseReason {
            id: number;
            result: boolean;
            name: string;
            case_theme: number;
        }
        export interface CaseCloseResult {
            id: number;
            name: string;
            case_theme: number;
        }
        export interface CaseEvent {
            id: number;
            event_values: {
                [name: string]: any;
            };
            event_variables: {
                [name: string]: any;
            };
            date_created: string; // date-time
            type: CaseEventTypeEnum;
            emitter_id: number;
            case: number;
        }
        export type CaseEventTypeEnum = "DEBRIEFING" | "VISIT" | "CASE" | "CASE_CLOSE" | "SUMMON" | "GENERIC_TASK" | "SCHEDULE" | "CITIZEN_REPORT";
        export interface CaseProject {
            id: number;
            name: string;
            active?: boolean;
            theme: number;
        }
        export interface CaseReason {
            id: number;
            name: string;
            theme: number;
        }
        export interface CaseStateType {
            id: number;
            status_name: string;
            name: string;
        }
        export interface CaseTheme {
            id: number;
            name: string;
            sensitive?: boolean;
            case_state_types_top?: number[];
        }
        export interface CaseUserTask {
            id: number;
            user_has_permission: boolean;
            roles: string[];
            case: /* Case-address serializer for CaseUserTasks */ CaseAddress;
            name: string;
            due_date: string; // date-time
            created: string; // date-time
            updated: string; // date-time
            owner?: string | null; // uuid
        }
        export interface CaseUserTaskWorkdflow {
            user_has_permission: boolean;
            roles: string[];
            case_user_task_id: string;
            form: GenericFormField[];
            form_variables: {
                [name: string]: any;
            };
            task_name: string;
            name: string;
            due_date: string; // date-time
            owner?: string | null; // uuid
            case: number;
        }
        export interface CaseWorkflow {
            state: {
                id: number;
                status_name: string;
                name: string;
            };
            tasks: CaseUserTaskWorkdflow[];
            information: string;
        }
        export interface CaseWorkflowCaseDetail {
            status_name: string;
            status: number;
            start_date: string; // date-time
        }
        export interface CitizenReport {
            id: number;
            advertisement_linklist?: string;
            case_user_task_id?: string;
            reporter_name?: string | null;
            reporter_phone?: string | null;
            reporter_email?: string | null;
            identification: number;
            description_citizenreport?: string | null;
            nuisance?: boolean;
            date_added: string; // date-time
            case: number;
        }
        export interface CitizenReportCase {
            id: number;
            advertisement_linklist?: string;
            case_user_task_id?: string;
            reporter_name?: string | null;
            reporter_phone?: string | null;
            reporter_email?: string | null;
            identification: number;
            description_citizenreport?: string | null;
            nuisance?: boolean;
            date_added: string; // date-time
        }
        export interface DaySegment {
            id: number;
            name: string;
        }
        export interface DebriefingCreate {
            id: number;
            case_user_task_id?: string;
            violation?: ViolationEnum;
            violation_result?: {
                [name: string]: any;
            } | null;
            feedback: string;
            case: number;
        }
        export interface Decision {
            id: number;
            case_user_task_id?: string;
            sanction_amount?: string | null; // decimal ^\d{0,98}(\.\d{0,2})?$
            description?: string | null;
            date_added: string; // date-time
            sanction_id: string;
            case: number;
            decision_type: number;
        }
        export interface DecisionSanction {
            id: number;
            address: {
                bag_id: string;
                id: number;
                full_address: string;
                street_name: string;
                number: number;
                suffix_letter: string;
                suffix: string;
                postal_code: string;
                lat: number; // float
                lng: number; // float
            };
            theme: {
                id: number;
                name: string;
                sensitive?: boolean;
                case_state_types_top?: number[];
            };
            decision_type: {
                id: number;
                name: string;
            };
            sanction_amount?: string | null; // decimal ^\d{0,98}(\.\d{0,2})?$
            date_added: string; // date-time
            sanction_id?: string | null;
        }
        export interface DecisionType {
            id: number;
            workflow_option: string;
            name: string;
            is_sanction?: boolean;
            theme: number;
        }
        export interface DecisionTypeName {
            id: number;
            name: string;
        }
        export interface Decos {
            permits: Permit[];
            vakantieverhuur_reports: VakantieverhuurReportInformation[] | null;
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
        /**
         * Used to complete a GenericCompletedTask.
         *
         * variables example
         * {
         *     "a_field": {
         *         "value": true,
         *         "label": "Label for a field"
         *     }
         * }
         */
        export interface GenericCompletedTask {
            id: number;
            case_user_task_id: string;
            case: number;
            variables: {
                [name: string]: any;
            };
            description?: string;
            date_added: string; // date-time
        }
        export interface GenericFormField {
            name: string;
            label: string;
            options?: GenericFormFieldOption[];
            type: GenericFormFieldTypeEnum;
            tooltip?: string;
            required: boolean;
        }
        export interface GenericFormFieldOption {
            label: string;
            value: string;
        }
        export type GenericFormFieldTypeEnum = "text" | "select" | "checkbox";
        export type GeslachtsaanduidingEnum = "M" | "V" | "X";
        export type IndicatieBetHernBevelEnum = "J" | "N";
        export type IndicatieCombiDwangbevelEnum = "J" | "N" | "O";
        export type IndicatiePubliekrechtelijkEnum = "J" | "N";
        export interface OIDCAuthenticate {
            code: string;
        }
        export interface PaginatedAdvertisementList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: Advertisement[];
        }
        export interface PaginatedCaseCloseList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseClose[];
        }
        export interface PaginatedCaseCloseReasonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseCloseReason[];
        }
        export interface PaginatedCaseCloseResultList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseCloseResult[];
        }
        export interface PaginatedCaseList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: /* Adds nested create feature */ Case[];
        }
        export interface PaginatedCaseProjectList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseProject[];
        }
        export interface PaginatedCaseReasonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
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
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseStateType[];
        }
        export interface PaginatedCaseThemeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: CaseTheme[];
        }
        export interface PaginatedCaseUserTaskList {
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
            results?: CaseUserTask[];
        }
        export interface PaginatedCaseWorkflowList {
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
            results?: CaseWorkflow[];
        }
        export interface PaginatedDebriefingCreateList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
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
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: Decision[];
        }
        export interface PaginatedDecisionSanctionList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: DecisionSanction[];
        }
        export interface PaginatedDecisionTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: DecisionType[];
        }
        export interface PaginatedSubjectList {
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
            results?: Subject[];
        }
        export interface PaginatedSummonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
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
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
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
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: SupportContact[];
        }
        export interface PaginatedThemeScheduleTypesList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: ThemeScheduleTypes[];
        }
        export interface PaginatedUserList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: User[];
        }
        export interface PaginatedViolationTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: ViolationType[];
        }
        export interface PaginatedVisitList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results?: Visit[];
        }
        export interface PaginatedWorkflowOptionList {
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
            results?: WorkflowOption[];
        }
        /**
         * Adds nested create feature
         */
        export interface PatchedCase {
            id?: number;
            address?: {
                bag_id: string;
                id: number;
                full_address: string;
                street_name: string;
                number: number;
                suffix_letter: string;
                suffix: string;
                postal_code: string;
                lat: number; // float
                lng: number; // float
            };
            bag_id?: string;
            current_states?: CaseWorkflowCaseDetail[];
            theme?: {
                id: number;
                name: string;
                sensitive?: boolean;
                case_state_types_top?: number[];
            };
            theme_id?: number;
            reason?: {
                id: number;
                name: string;
                theme: number;
            };
            reason_id?: number;
            schedules?: Schedule[];
            project?: {
                id: number;
                name: string;
                active?: boolean;
                theme: number;
            };
            project_id?: number;
            subjects?: Subject[];
            subject_ids?: number[];
            citizen_reports?: CitizenReportCase[];
            advertisements?: Advertisement[];
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            description?: string | null;
            ton_ids?: number /* int64 */[] | null;
            last_updated?: string; // date-time
            created?: string; // date-time
        }
        export interface PatchedCaseUserTask {
            id?: number;
            user_has_permission?: boolean;
            roles?: string[];
            case?: /* Case-address serializer for CaseUserTasks */ CaseAddress;
            name?: string;
            due_date?: string; // date-time
            created?: string; // date-time
            updated?: string; // date-time
            owner?: string | null; // uuid
        }
        export type PermissionsEnum = "create_case" | "create_digital_surveilance_case" | "close_case" | "perform_task" | "access_personal_data_register" | "access_business_register" | "access_signals" | "access_recovery_check" | "access_sensitive_dossiers" | "access_sigital_surveillance" | "access_document_management_system";
        export interface Permit {
            permit_granted: PermitGrantedEnum;
            permit_type: string;
            raw_data: {
                [name: string]: any;
            } | null;
            details: {
                [name: string]: any;
            } | null;
        }
        export type PermitGrantedEnum = "GRANTED" | "NOT_GRANTED" | "UNKNOWN";
        export type PersonRoleEnum = "PERSON_ROLE_OWNER" | "PERSON_ROLE_RESIDENT" | "PERSON_ROLE_MIDDLEMAN" | "PERSON_ROLE_PLATFORM" | "PERSON_ROLE_HEIR";
        export interface Priority {
            id: number;
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
            id: number;
            action: Action;
            week_segment: WeekSegment;
            day_segment: DaySegment;
            priority: Priority;
            case_user_task_id?: string;
            description?: string | null;
            date_added: string; // date-time
            date_modified: string; // date-time
            visit_from_datetime?: string | null; // date-time
            case: number;
            author?: string | null; // uuid
        }
        export interface ScheduleCreate {
            action: number;
            week_segment: number;
            day_segment: number;
            priority: number;
            description?: string | null;
            case: number;
            case_user_task_id?: string;
            visit_from_datetime?: string | null; // date-time
        }
        export type SoortVorderingEnum = "PBF" | "PBN" | "PRV" | "SOC";
        export interface StartWorkflow {
            workflow_option_id: number;
        }
        export interface Subject {
            id: number;
            name: string;
            theme: number;
        }
        export interface Summon {
            id: number;
            type: number;
            type_name: string;
            case: number;
            persons: SummonedPerson[];
            case_user_task_id?: string;
            type_result?: {
                [name: string]: any;
            } | null;
            date_added: string; // date-time
            description?: string | null;
        }
        export interface SummonType {
            id: number;
            name: string;
            workflow_option?: string;
        }
        export interface SummonedPerson {
            id: number;
            first_name: string;
            preposition?: string | null;
            last_name: string;
            person_role?: PersonRoleEnum;
            summon: number;
        }
        export interface SupportContact {
            id: number;
            name: string;
            phone_number: string;
            email: string;
            title: string;
        }
        export interface ThemeScheduleTypes {
            actions: Action[];
            week_segments: WeekSegment[];
            day_segments: DaySegment[];
            priorities: Priority[];
        }
        export interface User {
            id?: string; // uuid
            email?: string; // email
            username?: string;
            first_name?: string;
            last_name?: string;
            full_name?: string;
        }
        export interface UserDetail {
            id?: string; // uuid
            email?: string; // email
            username?: string;
            first_name?: string;
            last_name?: string;
            full_name?: string;
            permissions: PermissionsEnum[];
        }
        export interface VakantieverhuurReport {
            is_cancellation: boolean;
            report_date: string; // date-time
            check_in_date: string; // date-time
            check_out_date: string; // date-time
        }
        export interface VakantieverhuurReportInformation {
            year: number;
            rented_days_count: number | null;
            planned_days_count: number | null;
            is_rented_today: boolean;
            reports: VakantieverhuurReport[];
        }
        export type ViolationEnum = "NO" | "YES" | "ADDITIONAL_RESEARCH_REQUIRED" | "ADDITIONAL_VISIT_REQUIRED" | "ADDITIONAL_VISIT_WITH_AUTHORIZATION" | "SEND_TO_OTHER_THEME" | "LIKELY_INHABITED";
        export interface ViolationType {
            key: string;
        }
        export interface Visit {
            id: number;
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
            id: number;
            name: string;
        }
        export interface WorkflowOption {
            id: number;
            name: string;
            message_name: string;
            to_directing_proccess?: boolean;
            theme: number;
        }
    }
}
declare namespace Paths {
    namespace AddressesAdvertisementsList {
        namespace Parameters {
            export type BagId = string;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedAdvertisementList;
        }
    }
    namespace AddressesCasesList {
        namespace Parameters {
            export type BagId = string;
            export type Limit = number;
            export type Offset = number;
            export type OpenCases = boolean;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
            open_cases?: Parameters.OpenCases;
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
    namespace CaseCloseCreate {
        export type RequestBody = Components.Schemas.CaseClose;
        namespace Responses {
            export type $201 = Components.Schemas.CaseClose;
        }
    }
    namespace CaseCloseList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseList;
        }
    }
    namespace CaseCloseRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseClose;
        }
    }
    namespace CasesAdvertisementsList {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedAdvertisementList;
        }
    }
    namespace CasesCitizenReportsCreate {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.CitizenReport;
        namespace Responses {
            export type $200 = Components.Schemas.CitizenReport;
        }
    }
    namespace CasesCreate {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.Case;
        namespace Responses {
            export type $201 = /* Adds nested create feature */ Components.Schemas.Case;
        }
    }
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace CasesPartialUpdate {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.PatchedCase;
        namespace Responses {
            export type $200 = /* Adds nested create feature */ Components.Schemas.Case;
        }
    }
    namespace CasesProcessesList {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedWorkflowOptionList;
        }
    }
    namespace CasesProcessesStartCreate {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.StartWorkflow;
        namespace Responses {
            export type $200 = Components.Schemas.StartWorkflow;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = /* Adds nested create feature */ Components.Schemas.Case;
        }
    }
    namespace CasesSubjectsList {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSubjectList;
        }
    }
    namespace CasesTasksList {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseWorkflowList;
        }
    }
    namespace CasesUpdate {
        namespace Parameters {
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type Reason = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = number;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.Case;
        namespace Responses {
            export type $200 = /* Adds nested create feature */ Components.Schemas.Case;
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
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
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
            export type DateAdded = string; // date-time
            export type DateAddedGt = string; // date-time
            export type DateAddedGte = string; // date-time
            export type DateAddedLt = string; // date-time
            export type DateAddedLte = string; // date-time
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            date_added?: Parameters.DateAdded /* date-time */;
            date_added__gt?: Parameters.DateAddedGt /* date-time */;
            date_added__gte?: Parameters.DateAddedGte /* date-time */;
            date_added__lt?: Parameters.DateAddedLt /* date-time */;
            date_added__lte?: Parameters.DateAddedLte /* date-time */;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionList;
        }
    }
    namespace DecisionsSanctionsList {
        namespace Parameters {
            export type Case = number;
            export type DateAdded = string; // date-time
            export type DateAddedGt = string; // date-time
            export type DateAddedGte = string; // date-time
            export type DateAddedLt = string; // date-time
            export type DateAddedLte = string; // date-time
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            date_added?: Parameters.DateAdded /* date-time */;
            date_added__gt?: Parameters.DateAddedGt /* date-time */;
            date_added__gte?: Parameters.DateAddedGte /* date-time */;
            date_added__lt?: Parameters.DateAddedLt /* date-time */;
            date_added__lte?: Parameters.DateAddedLte /* date-time */;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionSanctionList;
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
    namespace GenericTasksCompleteCreate {
        export type RequestBody = /**
         * Used to complete a GenericCompletedTask.
         *
         * variables example
         * {
         *     "a_field": {
         *         "value": true,
         *         "label": "Label for a field"
         *     }
         * }
         */
        Components.Schemas.GenericCompletedTask;
        namespace Responses {
            export interface $200 {
            }
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
    namespace PermissionsList {
        namespace Responses {
            export type $200 = string[];
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
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonList;
        }
    }
    namespace SupportContactsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSupportContactList;
        }
    }
    namespace TasksList {
        namespace Parameters {
            export type Completed = boolean;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Reason = number;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Suffix = string;
            export type Theme = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            reason?: Parameters.Reason;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseUserTaskList;
        }
    }
    namespace TasksPartialUpdate {
        namespace Parameters {
            export type Completed = boolean;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type Id = number;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type PageSize = number;
            export type Reason = number;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Theme = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page_size?: Parameters.PageSize;
            reason?: Parameters.Reason;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            theme?: Parameters.Theme;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.PatchedCaseUserTask;
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTask;
        }
    }
    namespace ThemesCaseCloseReasonsList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseReasonList;
        }
    }
    namespace ThemesCaseCloseResultsList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseResultList;
        }
    }
    namespace ThemesCaseProjectsList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseProjectList;
        }
    }
    namespace ThemesDecisionTypesList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionTypeList;
        }
    }
    namespace ThemesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseThemeList;
        }
    }
    namespace ThemesReasonsList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseReasonList;
        }
    }
    namespace ThemesScheduleTypesList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedThemeScheduleTypesList;
        }
    }
    namespace ThemesStateTypesList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStateTypeList;
        }
    }
    namespace ThemesSubjectsList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSubjectList;
        }
    }
    namespace ThemesSummonTypesList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonTypeList;
        }
    }
    namespace ThemesViolationTypesList {
        namespace Parameters {
            export type Id = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedViolationTypeList;
        }
    }
    namespace UsersList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedUserList;
        }
    }
    namespace UsersMeRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.UserDetail;
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
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedVisitList;
        }
    }
}
