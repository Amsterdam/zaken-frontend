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
            district: District;
            housing_corporation?: number | null;
        }
        export interface AddressTiny {
            bag_id: string;
            street_name: string;
            number: number;
            suffix_letter: string;
            suffix: string;
            postal_code: string;
            lat: number; // float
            lng: number; // float
            district: District;
            housing_corporation: HousingCorporation;
        }
        export interface Advertisement {
            id: number;
            link: string;
            date_added: string; // date-time
        }
        export interface Case {
            id: number;
            address: {
                bag_id: string;
                street_name: string;
                number: number;
                suffix_letter: string;
                suffix: string;
                postal_code: string;
                lat: number; // float
                lng: number; // float
                district: District;
                housing_corporation: HousingCorporation;
            };
            reason: {
                id: number;
                name: string;
            };
            schedules: Schedule[];
            workflows: CaseWorkflowBase[];
            theme: {
                id: number;
                name: string;
            };
            advertisements?: Advertisement[];
            subjects: Subject[];
            project: {
                id: number;
                name: string;
            };
            start_date?: string | null; // date
            end_date?: string | null; // date
            ton_ids?: string[] | null;
            last_updated: string; // date-time
            tags?: number[];
        }
        /**
         * Case-address serializer for CaseUserTasks
         */
        export interface CaseAddress {
            id: number;
            address: Address;
            sensitive?: boolean;
            start_date?: string | null; // date
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
        /**
         * Adds nested create feature
         */
        export interface CaseCreate {
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
                district: District;
                housing_corporation?: number | null;
            };
            bag_id: string;
            theme: {
                id: number;
                name: string;
            };
            theme_id: number;
            reason: {
                id: number;
                name: string;
            };
            reason_id: number;
            project: {
                id: number;
                name: string;
            };
            project_id?: number;
            subjects: Subject[];
            subject_ids?: number[];
            tags: Tag[];
            tag_ids?: (number | null)[];
            citizen_reports?: CitizenReportCase[];
            advertisements?: Advertisement[];
            housing_corporation?: number;
            state: string;
            workflows: CaseWorkflow[];
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            mma_number?: number | null;
            description?: string | null;
            ton_ids?: string[] | null;
            last_updated: string; // date-time
            created: string; // date-time
            is_enforcement_request?: boolean;
            /**
             * This is the case that can be found in openzaak.
             */
            case_url?: string | null; // uri
            /**
             * This field determines if the case is deleted in openzaak.
             */
            case_deleted?: boolean;
            previous_case?: number | null;
        }
        export interface CaseData {
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
                district: District;
                housing_corporation?: number | null;
            };
            state: string;
            workflows: CaseWorkflow[];
            subjects: Subject[];
            project: {
                id: number;
                name: string;
            };
            theme: {
                id: number;
                name: string;
            };
            reason: {
                id: number;
                name: string;
            };
            schedules: ScheduleData[];
            advertisements: Advertisement[];
            identification?: string | null;
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            is_legacy_bwv?: boolean;
            is_legacy_camunda?: boolean;
            legacy_bwv_case_id?: string | null;
            mma_number?: number | null;
            description?: string | null;
            ton_ids?: string[] | null;
            last_updated: string; // date-time
            created: string; // date-time
            is_enforcement_request?: boolean;
            /**
             * This is the case that can be found in openzaak.
             */
            case_url?: string | null; // uri
            /**
             * This field determines if the case is deleted in openzaak.
             */
            case_deleted?: boolean;
            previous_case?: number | null;
            author?: string | null; // uuid
            tags?: number[];
        }
        export interface CaseDetail {
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
                district: District;
                housing_corporation?: number | null;
            };
            state: string;
            workflows: CaseWorkflow[];
            subjects: Subject[];
            tags: Tag[];
            project: {
                id: number;
                name: string;
            };
            theme: {
                id: number;
                name: string;
            };
            reason: {
                id: number;
                name: string;
            };
            schedules: Schedule[];
            advertisements: Advertisement[];
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            mma_number?: number | null;
            description?: string | null;
            ton_ids?: string[] | null;
            last_updated: string; // date-time
            is_enforcement_request?: boolean;
            previous_case?: number | null;
        }
        export interface CaseDocument {
            id: number;
            document_url: string; // uri
            document_content: string; // uri
            case_document_connection_url?: string; // uri
            connected?: boolean;
            case: number;
        }
        export interface CaseDocumentUpload {
            file: string; // uri
            documenttype_url?: string; // uri
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
        }
        export interface CaseReason {
            id: number;
            name: string;
        }
        export interface CaseState {
            id: number;
            status?: StatusEnum;
            created: string; // date-time
            last_updated: string; // date-time
            case: number;
        }
        export interface CaseStateType {
            name: string;
        }
        export interface CaseTheme {
            id: number;
            name: string;
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
        export interface CaseUserTaskTaskName {
            name: string;
            roles?: string[] | null;
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
                name: string;
            };
            tasks: CaseUserTaskWorkdflow[];
            information: string;
        }
        export interface CaseWorkflowBase {
            state: {
                name: string;
            };
        }
        export interface CitizenReport {
            id: number;
            advertisements?: Advertisement[];
            case_user_task_id?: string;
            reporter_name?: string | null;
            reporter_phone?: string | null;
            reporter_email?: string | null;
            identification: number;
            advertisement_linklist?: string[] | null;
            description_citizenreport?: string | null;
            nuisance?: boolean;
            date_added: string; // date-time
            case: number;
        }
        export interface CitizenReportAnonomized {
            id: number;
            case_user_task_id?: string;
            identification: number;
            advertisement_linklist?: string[] | null;
            nuisance?: boolean;
            date_added: string; // date-time
            case: number;
        }
        export interface CitizenReportCase {
            id: number;
            advertisements?: Advertisement[];
            case_user_task_id?: string;
            reporter_name?: string | null;
            reporter_phone?: string | null;
            reporter_email?: string | null;
            identification: number;
            advertisement_linklist?: string[] | null;
            description_citizenreport?: string | null;
            nuisance?: boolean;
            date_added: string; // date-time
        }
        export interface DaySegment {
            id: number;
            name: string;
        }
        export interface Debriefing {
            id: number;
            case_user_task_id?: string;
            date_added: string; // date-time
            date_modified: string; // date-time
            violation?: ViolationEnum;
            violation_result?: {
                [name: string]: any;
            } | null;
            feedback: string;
            nuisance_detected?: boolean;
            case: number;
            author: string; // uuid
        }
        export interface DebriefingCreate {
            id: number;
            nuisance_detected?: boolean;
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
            active?: boolean;
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
                district: District;
                housing_corporation?: number | null;
            };
            theme: {
                id: number;
                name: string;
            };
            decision_type: {
                id: number;
                name: string;
            };
            sanction_amount?: string | null; // decimal ^\d{0,98}(\.\d{0,2})?$
            date_added: string; // date-time
            sanction_id?: string | null;
            active?: boolean;
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
            decos_folders: {
                [name: string]: any;
            } | null;
        }
        export interface District {
            id: number;
            name: string;
        }
        export interface DocumentType {
            omschrijving: string;
            url: string; // uri
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
        export interface GenericCompletedTask {
            id: number;
            case_user_task_id?: string;
            date_added: string; // date-time
            task_name: string;
            description: string;
            variables?: {
                [name: string]: any;
            } | null;
            case: number;
            author: string; // uuid
        }
        export interface GenericCompletedTaskCreate {
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
        export interface HousingCorporation {
            id: number;
            name: string;
        }
        export type IndicatieBetHernBevelEnum = "J" | "N";
        export type IndicatieCombiDwangbevelEnum = "J" | "N" | "O";
        export type IndicatiePubliekrechtelijkEnum = "J" | "N";
        export interface Meldingen {
            pageNumber: number;
            pageSize: number;
            totalPages: number;
            totalRecords: number;
            data: {
                startDatum: string;
                eindDatum: string;
                nachten: number;
                gasten: number;
                isAangepast: Boolean;
                isVerwijderd: Boolean;
            }[];
        }
        export interface OIDCAuthenticate {
            code: string;
        }
        export interface PaginatedActionList {
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
            results?: Action[];
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
        export interface PaginatedCaseDataList {
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
            results?: CaseData[];
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
            results?: Case[];
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
        export interface PaginatedCaseStateList {
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
            results?: CaseState[];
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
        export interface PaginatedCaseUserTaskTaskNameList {
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
            results?: CaseUserTaskTaskName[];
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
        export interface PaginatedCitizenReportAnonomizedList {
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
            results?: CitizenReportAnonomized[];
        }
        export interface PaginatedDaySegmentList {
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
            results?: DaySegment[];
        }
        export interface PaginatedDebriefingList {
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
            results?: Debriefing[];
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
        export interface PaginatedDistrictList {
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
            results?: District[];
        }
        export interface PaginatedDocumentTypeList {
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
            results?: DocumentType[];
        }
        export interface PaginatedGenericCompletedTaskList {
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
            results?: GenericCompletedTask[];
        }
        export interface PaginatedHousingCorporationList {
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
            results?: HousingCorporation[];
        }
        export interface PaginatedMeldingenList {
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
            results?: Meldingen[];
        }
        export interface PaginatedPriorityList {
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
            results?: Priority[];
        }
        export interface PaginatedScheduleCreateList {
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
            results?: ScheduleCreate[];
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
        export interface PaginatedSummonedPersonAnonomizedList {
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
            results?: SummonedPersonAnonomized[];
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
        export interface PaginatedTagList {
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
            results?: Tag[];
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
        export interface PaginatedWeekSegmentList {
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
            results?: WeekSegment[];
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
        export interface PatchedAddress {
            bag_id?: string;
            id?: number;
            full_address?: string;
            street_name?: string;
            number?: number;
            suffix_letter?: string;
            suffix?: string;
            postal_code?: string;
            lat?: number; // float
            lng?: number; // float
            district?: District;
            housing_corporation?: number | null;
        }
        /**
         * Adds nested create feature
         */
        export interface PatchedCaseCreate {
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
                district: District;
                housing_corporation?: number | null;
            };
            bag_id?: string;
            theme?: {
                id: number;
                name: string;
            };
            theme_id?: number;
            reason?: {
                id: number;
                name: string;
            };
            reason_id?: number;
            project?: {
                id: number;
                name: string;
            };
            project_id?: number;
            subjects?: Subject[];
            subject_ids?: number[];
            tags?: Tag[];
            tag_ids?: (number | null)[];
            citizen_reports?: CitizenReportCase[];
            advertisements?: Advertisement[];
            housing_corporation?: number;
            state?: string;
            workflows?: CaseWorkflow[];
            start_date?: string | null; // date
            end_date?: string | null; // date
            sensitive?: boolean;
            mma_number?: number | null;
            description?: string | null;
            ton_ids?: string[] | null;
            last_updated?: string; // date-time
            created?: string; // date-time
            is_enforcement_request?: boolean;
            /**
             * This is the case that can be found in openzaak.
             */
            case_url?: string | null; // uri
            /**
             * This field determines if the case is deleted in openzaak.
             */
            case_deleted?: boolean;
            previous_case?: number | null;
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
        export interface PriorityTiny {
            weight: number; // float
        }
        export interface Residents {
            /**
             *  links
             */
            _links: {
                [name: string]: any;
            };
            /**
             *  embedded
             */
            _embedded: {
                [name: string]: any;
            };
        }
        export interface Schedule {
            priority: PriorityTiny;
        }
        export interface ScheduleCreate {
            action: number;
            case: number;
            case_user_task_id?: string;
            date_added: string; // date-time
            day_segment: number;
            description?: string | null;
            priority: number;
            visit_from_datetime?: string | null; // date-time
            week_segment: number;
            housing_corporation_combiteam?: boolean;
        }
        export interface ScheduleData {
            id: number;
            action: Action;
            week_segment: WeekSegment;
            day_segment: DaySegment;
            priority: PriorityTiny;
            case_user_task_id?: string;
            description?: string | null;
            date_added: string; // date-time
            date_modified: string; // date-time
            visit_from_datetime?: string | null; // date-time
            housing_corporation_combiteam?: boolean;
            case: number;
            author?: string | null; // uuid
        }
        export type SoortVorderingEnum = "PBF" | "PBN" | "PRV" | "SOC";
        export interface StartWorkflow {
            workflow_option_id: number;
        }
        export type StatusEnum = "TOEZICHT" | "HANDHAVING" | "AFGESLOTEN";
        export interface Subject {
            id: number;
            name: string;
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
            first_name?: string | null;
            preposition?: string | null;
            last_name?: string | null;
            person_role?: PersonRoleEnum;
            summon: number;
            entity_name?: string | null;
            function?: string | null;
        }
        export interface SummonedPersonAnonomized {
            id: number;
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
        export interface Tag {
            id: number;
            name: string;
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
            role: string;
        }
        export type ViolationEnum = "NO" | "YES" | "ADDITIONAL_RESEARCH_REQUIRED" | "ADDITIONAL_VISIT_REQUIRED" | "ADDITIONAL_VISIT_WITH_AUTHORIZATION" | "SEND_TO_OTHER_THEME" | "LIKELY_INHABITED";
        export interface ViolationType {
            key: string;
            value: string;
        }
        export interface Visit {
            id: number;
            authors?: User[];
            author_ids?: string /* uuid */[];
            completed?: boolean;
            start_time: string; // date-time
            situation?: string | null;
            observations?: string[] | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: string | null;
            suggest_next_visit_description?: string | null;
            notes?: string | null;
            top_visit_id: number; // int64
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
            enabled_on_case_closed?: boolean;
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
    namespace AddressesDistrictsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDistrictList;
        }
    }
    namespace AddressesHousingCorporationsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedHousingCorporationList;
        }
    }
    namespace AddressesMeldingenList {
        namespace Parameters {
            export type BagId = string;
            export type EndDate = string; // date
            export type Limit = number;
            export type Offset = number;
            export type StartDate = string; // date
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        export interface QueryParameters {
            end_date?: Parameters.EndDate /* date */;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
            start_date?: Parameters.StartDate /* date */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedMeldingenList;
        }
    }
    namespace AddressesPartialUpdate {
        namespace Parameters {
            export type BagId = string;
        }
        export interface PathParameters {
            bag_id: Parameters.BagId;
        }
        export type RequestBody = Components.Schemas.PatchedAddress;
        namespace Responses {
            export type $200 = Components.Schemas.Address;
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
    namespace CaseCloseReasonsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseReasonList;
        }
    }
    namespace CaseCloseResultsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseResultList;
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
    namespace CaseStatesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStateList;
        }
    }
    namespace CasesAdvertisementsList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedAdvertisementList;
        }
    }
    namespace CasesCitizenReportsCreate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.CitizenReport;
        namespace Responses {
            export type $200 = Components.Schemas.CitizenReport;
        }
    }
    namespace CasesCountRetrieve {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesCreate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.CaseCreate;
        namespace Responses {
            export type $201 = /* Adds nested create feature */ Components.Schemas.CaseCreate;
        }
    }
    namespace CasesDataList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseDataList;
        }
    }
    namespace CasesDistrictNamesList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export interface $200 {
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
                results?: string[];
            }
        }
    }
    namespace CasesDocumentTypesList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDocumentTypeList;
        }
    }
    namespace CasesDocumentsCreateCreate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.CaseDocumentUpload;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace CasesDocumentsList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export interface $200 {
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
                results?: {
                    [name: string]: any;
                }[];
            }
        }
    }
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace CasesPartialUpdate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.PatchedCaseCreate;
        namespace Responses {
            export type $200 = /* Adds nested create feature */ Components.Schemas.CaseCreate;
        }
    }
    namespace CasesProcessesList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedWorkflowOptionList;
        }
    }
    namespace CasesProcessesStartCreate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.StartWorkflow;
        namespace Responses {
            export type $200 = Components.Schemas.StartWorkflow;
        }
    }
    namespace CasesReasonNamesList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export interface $200 {
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
                results?: string[];
            }
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseDetail;
        }
    }
    namespace CasesSubjectsList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSubjectList;
        }
    }
    namespace CasesUpdate {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type PageSize = number;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page_size?: Parameters.PageSize;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = /* Adds nested create feature */ Components.Schemas.CaseCreate;
        namespace Responses {
            export type $200 = /* Adds nested create feature */ Components.Schemas.CaseCreate;
        }
    }
    namespace CasesWorkflowsList {
        namespace Parameters {
            export type District = number;
            export type DistrictName = string;
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type PostalCodeRange = string;
            export type Priority = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type ScheduleDaySegment = number;
            export type ScheduleFromDateAdded = string; // date
            export type ScheduleHousingCorporationCombiteam = boolean;
            export type ScheduleVisitFrom = string; // date
            export type ScheduleWeekSegment = number;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StateTypesName = string;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Task = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            postal_code_range?: Parameters.PostalCodeRange;
            priority?: Parameters.Priority;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            schedule_day_segment?: Parameters.ScheduleDaySegment;
            schedule_from_date_added?: Parameters.ScheduleFromDateAdded /* date */;
            schedule_housing_corporation_combiteam?: Parameters.ScheduleHousingCorporationCombiteam;
            schedule_visit_from?: Parameters.ScheduleVisitFrom /* date */;
            schedule_week_segment?: Parameters.ScheduleWeekSegment;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            state_types__name?: Parameters.StateTypesName;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            task?: Parameters.Task;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseWorkflowList;
        }
    }
    namespace CitizenReportsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCitizenReportAnonomizedList;
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
            export type $200 = Components.Schemas.PaginatedDebriefingList;
        }
    }
    namespace DecisionTypesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDecisionTypeList;
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
    namespace DocumentTypesRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DocumentsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DocumentsDownloadRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace DocumentsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
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
        namespace Parameters {
            export type Case = number;
            export type CaseReason = number;
            export type CaseTheme = number;
            export type Description = string;
            export type FromDateAdded = string; // date
            export type TaskName = string;
            export type ToDateAdded = string; // date
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            case__reason?: Parameters.CaseReason;
            case__theme?: Parameters.CaseTheme;
            description?: Parameters.Description;
            from_date_added?: Parameters.FromDateAdded /* date */;
            task_name?: Parameters.TaskName;
            to_date_added?: Parameters.ToDateAdded /* date */;
        }
        export type RequestBody = Components.Schemas.GenericCompletedTaskCreate;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GenericTasksList {
        namespace Parameters {
            export type Case = number;
            export type CaseProject = string[];
            export type CaseReason = number;
            export type CaseTheme = number;
            export type Description = string;
            export type FromDateAdded = string; // date
            export type OpenCases = boolean;
            export type Page = number;
            export type PageSize = number;
            export type TaskName = string;
            export type ToDateAdded = string; // date
        }
        export interface QueryParameters {
            case?: Parameters.Case;
            case__project?: Parameters.CaseProject;
            case__reason?: Parameters.CaseReason;
            case__theme?: Parameters.CaseTheme;
            description?: Parameters.Description;
            from_date_added?: Parameters.FromDateAdded /* date */;
            open_cases?: Parameters.OpenCases;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            task_name?: Parameters.TaskName;
            to_date_added?: Parameters.ToDateAdded /* date */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedGenericCompletedTaskList;
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
    namespace OpenzaakCallbacksCreate {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PermissionsList {
        namespace Responses {
            export type $200 = string[];
        }
    }
    namespace ScheduleActionsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedActionList;
        }
    }
    namespace ScheduleDaysegmentsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDaySegmentList;
        }
    }
    namespace SchedulePrioritiesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedPriorityList;
        }
    }
    namespace ScheduleWeeksegmentsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedWeekSegmentList;
        }
    }
    namespace SchedulesCreate {
        export type RequestBody = Components.Schemas.ScheduleCreate;
        namespace Responses {
            export type $201 = Components.Schemas.ScheduleCreate;
        }
    }
    namespace SchedulesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedScheduleCreateList;
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
    namespace SummonTypesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonTypeList;
        }
    }
    namespace SummonedPersonsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSummonedPersonAnonomizedList;
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
    namespace TasksDistrictNamesList {
        namespace Parameters {
            export type Completed = boolean;
            export type District = number;
            export type DistrictName = string;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Name = string;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            name?: Parameters.Name;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export interface $200 {
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
                results?: string[];
            }
        }
    }
    namespace TasksList {
        namespace Parameters {
            export type Completed = boolean;
            export type District = number;
            export type DistrictName = string;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Name = string;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            name?: Parameters.Name;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseUserTaskList;
        }
    }
    namespace TasksPartialUpdate {
        namespace Parameters {
            export type Completed = boolean;
            export type District = number;
            export type DistrictName = string;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type Id = number;
            export type IsEnforcementRequest = boolean;
            export type Name = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type PageSize = number;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type Subject = number;
            export type SubjectName = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            name?: Parameters.Name;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page_size?: Parameters.PageSize;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        export type RequestBody = Components.Schemas.PatchedCaseUserTask;
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTask;
        }
    }
    namespace TasksReasonNamesList {
        namespace Parameters {
            export type Completed = boolean;
            export type District = number;
            export type DistrictName = string;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Name = string;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            name?: Parameters.Name;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export interface $200 {
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
                results?: string[];
            }
        }
    }
    namespace TasksTaskNamesList {
        namespace Parameters {
            export type Completed = boolean;
            export type District = number;
            export type DistrictName = string;
            export type DueDate = string; // date
            export type FromStartDate = string; // date
            export type HousingCorporation = number;
            export type IsEnforcementRequest = boolean;
            export type Name = string;
            export type Number = string;
            export type OpenCases = boolean;
            export type Ordering = string;
            export type Owner = string;
            export type Page = number;
            export type PageSize = number;
            export type PostalCode = string;
            export type Project = number;
            export type ProjectName = string;
            export type Reason = number;
            export type ReasonName = string;
            export type Role = string;
            export type Sensitive = boolean;
            export type StartDate = string; // date
            export type StateTypes = number;
            export type StreetName = string;
            export type Subject = number;
            export type SubjectName = string;
            export type Suffix = string;
            export type Theme = number;
            export type ThemeName = string;
            export type TonIds = number;
        }
        export interface QueryParameters {
            completed?: Parameters.Completed;
            district?: Parameters.District;
            district_name?: Parameters.DistrictName;
            due_date?: Parameters.DueDate /* date */;
            from_start_date?: Parameters.FromStartDate /* date */;
            housing_corporation?: Parameters.HousingCorporation;
            is_enforcement_request?: Parameters.IsEnforcementRequest;
            name?: Parameters.Name;
            number?: Parameters.Number;
            open_cases?: Parameters.OpenCases;
            ordering?: Parameters.Ordering;
            owner?: Parameters.Owner;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            postal_code?: Parameters.PostalCode;
            project?: Parameters.Project;
            project_name?: Parameters.ProjectName;
            reason?: Parameters.Reason;
            reason_name?: Parameters.ReasonName;
            role?: Parameters.Role;
            sensitive?: Parameters.Sensitive;
            start_date?: Parameters.StartDate /* date */;
            state_types?: Parameters.StateTypes;
            street_name?: Parameters.StreetName;
            subject?: Parameters.Subject;
            subject_name?: Parameters.SubjectName;
            suffix?: Parameters.Suffix;
            theme?: Parameters.Theme;
            theme_name?: Parameters.ThemeName;
            ton_ids?: Parameters.TonIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseUserTaskTaskNameList;
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
    namespace ThemesTagsList {
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
            export type $200 = Components.Schemas.PaginatedTagList;
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
