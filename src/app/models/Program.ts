export interface Program {
    code: string;
    name: string;
    description: string;
    university: string;
    college: string;
    duration: number;
    time: string;
    program?: {};
    cut_off_points?: {};
    program_constraints?: {};
    program_subjects?: {};
    a_level_constraints?: {};
    o_level_constraints?: {};
}
