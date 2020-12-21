export interface Program {
    code: string;
    name: string;
    description: string;
    university: string;
    college: string;
    duration: number;
    time: string;
}

export interface CutOffPoints {
    year: number;
    points: number;
    type: string;
    gender: string;
    course: string;
}

export interface ProgramConstraints {
    essentials: number
    relevant: number;
    desirable_state: number;
    a_level_constraint: boolean;
    o_level_constraint: boolean;
    all_subjects: boolean;
    course: string;
}

export interface ProgramSubjects {
    compulsory_state: boolean;
    category: string;
    course: string;
    subject: string;
}

export interface OLevelConstraints {
    mandatory: boolean;
    maximum_grade: number;
    code: string;
    subject: string;
}

export interface ProgramDetails {
    program: Program;
    cut_off_points?: CutOffPoints[];
    program_constraints?: ProgramConstraints[];
    program_subjects?: ProgramSubjects[];
    a_level_constraints?: [];
    o_level_constraints?: OLevelConstraints[];
}
