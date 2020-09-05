import { Yongeon, Eomi, EomiType } from "./conjugation";
declare type TrieNode<T> = {
    values?: T[];
    children?: Map<string, TrieNode<T>>;
};
declare class Trie<T> {
    root: TrieNode<T>;
    constructor();
    get(key: string): T[];
    set(key: string, value: T): void;
    /**
     * Searches for all strings found in Trie that are the prefixes of `key`.
     * @param key A string to search for prefixes
     * @returns A list of pairs of values and the suffix remaining after the prefix.
     */
    allPrefixes(key: string): [T[], string][];
}
declare type YongeonForm = {
    yongeon: Yongeon;
    eomiType: EomiType | string;
    dropRieul?: boolean;
};
declare type EomiRecord = {
    eomi: Eomi;
    eomiType: EomiType;
    dropRieul: boolean;
};
/** 용언의 활용형을 어근과 어미로 분리하는 클래스. */
declare class Analyzer {
    yongeons: Trie<YongeonForm>;
    eomis: Map<string, EomiRecord[]>;
    constructor(yongeons: Yongeon[], eomis: Eomi[]);
    addYongeon(yongeon: Yongeon): void;
    addEomi(eomi: Eomi): void;
    addEomiUnit(key: string, value: EomiRecord): void;
    /** 용언의 활용형을 분석해 어근 및 어미쌍의 배열을 내놓습니다. */
    analyze(target: string): [Yongeon, Eomi][];
}
export { Analyzer };
