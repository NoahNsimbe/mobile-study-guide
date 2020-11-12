export interface Recommendation {
    name: string;
    value: string;
}

export class UserSubmissions {
    uce_results?: any;
    uace_results?: any;
    career: string;
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
