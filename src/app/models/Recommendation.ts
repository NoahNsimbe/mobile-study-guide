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

export class UserResults {
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
