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

export interface Program {
    code: string;
    name: string;
    description: string;
    university: string;
    college: string;
    duration: number;
    time: string;
}

export interface ProgramCheck {
    program_code: string;
    uce_results: string;
    uace_results: string;
    gender: string;
    admission_type: string;
}
