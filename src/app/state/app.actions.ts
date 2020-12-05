export class SetSubjects {
    static readonly type = '[subjects] set subjects';
}

export class SetUceSubjects {
    static readonly type = '[subjects] set uce subjects';
    constructor(public force?: boolean) {
        if(force === undefined)
            this.force = false;
    }
}

export class SetUaceSubjects {
    static readonly type = '[subjects] set uace subjects';
    constructor(public force?: boolean) {
        if(force === undefined)
            this.force = false;
    }
}

export class SetCareers {
    static readonly type = '[careers] set careers';
    constructor(public force?: boolean) {
        if(force === undefined)
            this.force = false;
    }
}

export class SetPrograms {
    static readonly type = '[programs] set programs';
    constructor(public force?: boolean) {
        if(force === undefined)
            this.force = false;
    }
}

