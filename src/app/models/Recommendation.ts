export interface Recommendation {
    name: string;
    value: string;
}

export interface Elective {
    code: string;
    name: string;
    value: string;
}

export interface UserSubmissions {
    uceResults?: UserResults[];
    uaceResults?: UserResults[];
    gender?: string;
    admissionType?: string;
    career: string;
}

export interface UserResults {
    code: string;
    value: string;
}

export interface Combination {
    abbreviation: string;
    subjects: string[];
}

export interface ResultsModalData {
    results?: [],
    uceRecommendations? : Combination[]
    uaceRecommendations? : Program[]
    flag?: string
}

export interface Program {
    code: string;
    name: string;
    description: string;
    university: string;
    college: string;
    duration: number;
    time: string;
}

export interface ProgramCheckResults {
    check: string;
}

export interface ProgramCheck {
    program_code: string;
    uce_results: UserResults[];
    uace_results: UserResults[];
    gender: string;
    admission_type: string;
}
