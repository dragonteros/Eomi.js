import { Yongeon, Eomi, EomiType } from "./conjugation";

/* Trie */

type TrieNode<T> = { values?: T[]; children?: Map<string, TrieNode<T>> };

class Trie<T> {
  root: TrieNode<T>;
  constructor() {
    this.root = {};
  }

  get(key: string): T[] {
    let node = this.root;
    for (let k of key) {
      if (!node.children) return []
      let child = node.children.get(k);
      if (!child) return [];
      node = child;
    }
    return node.values || [];
  }

  set(key: string, value: T): void {
    let node = this.root;
    for (let k of key) {
      if (!node.children) node.children = new Map();
      let child = node.children.get(k);
      if (!child) {
        child = {};
        node.children.set(k, child);
      }
      node = child;
    }
    if (!node.values) node.values = [value];
    else node.values.push(value);
  }

  /**
   * Searches for all strings found in Trie that are the prefixes of `key`.
   * @param key A string to search for prefixes
   * @returns A list of pairs of values and the suffix remaining after the prefix.
   */
  allPrefixes(key: string): [T[], string][] {
    let results: [T[], string][] = [];
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      if (!node.children) break
      let child = node.children.get(key[i]);
      if (!child) break;
      if (child.values && child.values.length) results.push([child.values, key.slice(i + 1)]);
      node = child;
    }
    return results;
  }
}

/* Analyzer */

/**
 * 호환용 한글 자모 중 자음을 한글 자모 중 종성으로 변환합니다.
 * @param x 길이가 1인 문자열.
 * @returns 변환된 문자열. 해당되지 않으면 그대로 돌려받습니다.
 */
function compatToJongseong(x: string) {
  if (x < "ㄱ" || "ㅎ" < x) return x;
  const skip = ["ㄸ", "ㅃ", "ㅉ"];
  if (skip.indexOf(x[0]) !== -1) return x;

  let codepoint = x.charCodeAt(0) - "ㄱ".charCodeAt(0);
  skip.forEach((c) => (codepoint -= x > c ? 1 : 0));
  return String.fromCharCode(codepoint + 0x11a8);
}

/**
 * 한글 문자열을 자모로 분리합니다.
 * @param x 한글 문자열. 음절 또는 자모로 구성됩니다.
 */
function N(x: string) {
  return x.split("").map(compatToJongseong).join("").normalize("NFD");
}

type YongeonForm = {
  yongeon: Yongeon;
  eomiType: EomiType | string;  // hack;
  dropRieul?: boolean;
};
type EomiRecord = { eomi: Eomi; eomiType: EomiType; dropRieul: boolean };

/** 용언의 활용형을 어근과 어미로 분리하는 클래스. */
class Analyzer {
  yongeons: Trie<YongeonForm>;
  eomis: Map<string, EomiRecord[]>;
  constructor(yongeons: Yongeon[], eomis: Eomi[]) {
    this.yongeons = new Trie();
    yongeons.forEach((yongeon) => this.addYongeon(yongeon));

    this.eomis = new Map();
    eomis.forEach((eomi) => this.addEomi(eomi));
  }

  addYongeon(yongeon: Yongeon): void {
    let dropRieul = yongeon.batchim === "ㄹ" ? false : undefined;
    this.yongeons.set(N(yongeon.hada), {
      yongeon,
      eomiType: "",
      dropRieul,
    });
    this.yongeons.set(N(yongeon.hae), { yongeon, eomiType: "(아/어)" });
    this.yongeons.set(N(yongeon.hamyeon), {
      yongeon,
      eomiType: "(으)",
      dropRieul,
    });
    if (yongeon.batchim === "ㄹ") {
      this.yongeons.set(N(yongeon.hani), {
        yongeon,
        eomiType: "",
        dropRieul: true,
      });
      this.yongeons.set(N(yongeon.hani), {
        yongeon,
        eomiType: "(으)",
        dropRieul: true,
      });
    }
  }

  addEomi(eomi: Eomi): void {
    this.addEomiUnit(N(eomi.eomi.body), {
      eomi,
      eomiType: eomi.eomi.eomiType,
      dropRieul: eomi.eomi.dropRieul,
    });
    if (eomi.eomiAfterBatchim) {
      this.addEomiUnit(N(eomi.eomiAfterBatchim.body), {
        eomi,
        eomiType: eomi.eomiAfterBatchim.eomiType,
        dropRieul: eomi.eomiAfterBatchim.dropRieul,
      });
    }
  }

  addEomiUnit(key: string, value: EomiRecord): void {
    let dest = this.eomis.get(key);
    if (dest) dest.push(value);
    else this.eomis.set(key, [value]);
  }

  /** 용언의 활용형을 분석해 어근 및 어미쌍의 배열을 내놓습니다. */
  analyze(target: string): [Yongeon, Eomi][] {
    let results: [Yongeon, Eomi][] = [];
    for (let [forms, suffix] of this.yongeons.allPrefixes(N(target))) {
      for (let { eomi, eomiType, dropRieul } of this.eomis.get(suffix) || []) {
        for (let form of forms) {
          if (eomiType !== form.eomiType) continue;
          if (form.dropRieul != null && dropRieul !== form.dropRieul) continue;
          results.push([form.yongeon, eomi]);
        }
      }
    }
    return results;
  }
}

export { Analyzer };
