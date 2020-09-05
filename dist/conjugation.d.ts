/** 한국어 용언 클래스. */
declare class Yongeon {
    hada: string;
    hae: string;
    hani: string;
    hamyeon: string;
    batchim: string;
    constructor(hada: string, hae?: string, hani?: string);
    /**
     * 어미를 받아 활용합니다.
     * 인수로는 어미 하나를 받거나 문자열 두 개를 받아 어미를 만듭니다.
     */
    _(eomi: Eomi | string, eomiAfterBatchim?: string): string;
    recoverHae(): string;
    recoverHani(): string;
    valueOf(): string;
}
declare const enum EomiType {
    DIRECT = "",
    A_EO = "(\uC544/\uC5B4)",
    EU = "(\uC73C)"
}
/** 어미 활용을 구현한 클래스. */
declare class EomiUnit {
    eomiType: EomiType;
    body: string;
    dropRieul: boolean;
    constructor(eomi: string);
    /** 용언을 받아 활용합니다. */
    after(yongeon: Yongeon): string;
    valueOf(): string;
}
/** 한국어 어미 클래스. */
declare class Eomi {
    eomi: EomiUnit;
    eomiAfterBatchim?: EomiUnit;
    constructor(eomi: EomiUnit | string, eomiAfterBatchim?: EomiUnit | string);
    /** 용언을 받아 활용합니다. */
    after(yongeon: Yongeon): string;
    valueOf(): string;
}
export { Yongeon, Eomi, EomiType };
