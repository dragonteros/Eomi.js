/* Utilities */

function assembleSyllable(x: number[]): string {
  const codepoint = x[0] * 588 + x[1] * 28 + x[2] + 0xac00;
  return String.fromCharCode(codepoint);
}

function disassembleSyllable(x: string): number[] {
  const codepoint = x.charCodeAt(x.length - 1) - 0xac00;
  const choseong = (codepoint / 588) | 0;
  const jungseong = ((codepoint % 588) / 28) | 0;
  const jongseong = codepoint % 28;
  return [choseong, jungseong, jongseong];
}

const BATCHIM_TABLE = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
function getBatchim(x: string): string {
  const idx = disassembleSyllable(x)[2];
  return idx === 0 ? "" : BATCHIM_TABLE[idx - 1];
}

function isPositiveMoeum(x: string): boolean {
  const moeum = disassembleSyllable(x)[1];
  if (0 <= moeum && moeum <= 3) return true; // ㅏ ㅐ ㅑ ㅒ
  if (8 <= moeum && moeum <= 12) return true; // ㅗ ㅘ ㅙ ㅚ ㅛ
  return false;
}

function startsWithSyllable(x: string): boolean {
  return "가" <= x[0] && x[0] <= "힣";
}

// joins two possibly non-syllabic Hangeul strings
function concatHangeul(x: string, y: string): string {
  const err = new Error(`Cannot concatenate '${x}' and '${y}'`);
  if (!x || !y || startsWithSyllable(y)) return x + y;
  const table = [
    ,
    ,
    "ㄱㄱ",
    "ㄱㅅ",
    ,
    "ㄴㅈ",
    "ㄴㅎ",
    ,
    ,
    "ㄹㄱ",
    "ㄹㅁ",
    "ㄹㅂ",
    "ㄹㅅ",
    "ㄹㅌ",
    "ㄹㅍ",
    "ㄹㅎ",
    ,
    ,
    "ㅂㅅ",
    ,
    "ㅅㅅ",
  ];
  let newBatchim = table.indexOf(getBatchim(x) + y[0]);
  if (newBatchim === -1) {
    if (getBatchim(x)) throw err;
    newBatchim = BATCHIM_TABLE.indexOf(y[0]) + 1;
    if (newBatchim === 0) throw err;
  }

  let merged: number[] = disassembleSyllable(x);
  merged[2] = newBatchim;
  return x.slice(0, -1) + assembleSyllable(merged) + y.slice(1);
}

/* Main Classes */

class Yongeon {
  hada: string;
  hae: string;
  hani: string;
  hamyeon: string;
  batchim: string;

  constructor(hada: string, hae?: string, hani?: string) {
    this.hada = hada.slice(0, -1);
    this.batchim = getBatchim(this.hada);

    this.hae = hae || this.recoverHae();
    this.hani = hani ? hani.slice(0, -1) : this.recoverHani();
    this.hamyeon = this.batchim === "ㄹ" ? this.hada : this.hani;
  }

  _(eomi: Eomi | string, eomiAfterBatchim?: Eomi | string): string {
    if (typeof eomi === "string") eomi = new Eomi(eomi);
    if (eomiAfterBatchim != null && this.batchim) {
      if (typeof eomiAfterBatchim === "string")
        eomiAfterBatchim = new Eomi(eomiAfterBatchim);
      if (this.batchim !== "ㄹ" || !eomi.dropRieul) eomi = eomiAfterBatchim;
    }
    return eomi.after(this);
  }

  recoverHae(): string {
    if (!this.batchim) {
      let jamos = disassembleSyllable(this.hada);
      if (jamos[1] === 0 || jamos[1] === 4) {
        return this.hada; // ㅏ, ㅓ
      } else if (jamos[1] === 18) {
        jamos[1] = 4; // ㅡ -> ㅓ
        return this.hada.slice(0, -1) + assembleSyllable(jamos);
      }
    }
    return this.hada + (isPositiveMoeum(this.hada) ? "아" : "어");
  }

  recoverHani(): string {
    let jamos = disassembleSyllable(this.hada);
    if (this.batchim === "ㄹ") {
      // ㄹ 탈락
      jamos[2] = 0;
      return this.hada.slice(0, -1) + assembleSyllable(jamos);
    }

    const haeLast = this.hae.slice(-1);
    if ("아어".indexOf(haeLast) !== -1) {
      // 받침 있는 규칙 | ㄷ ㅅ 불규칙
      return this.hae.slice(0, -1) + (this.batchim && "으");
    } else if ("와워".indexOf(haeLast) !== -1) {
      // ㅂ 불규칙
      return this.hae.slice(0, -1) + "우";
    } else if (this.batchim === "ㅎ") {
      // ㅎ 불규칙
      jamos[2] = 0;
      return this.hada.slice(0, -1) + assembleSyllable(jamos);
    }
    return this.hada; // 받침 없는 규칙 | 르, 러, 우, 여 불규칙
  }

  valueOf(): string {
    return this.hada + "다";
  }
}

const enum EomiType {
  DIRECT = "",
  A_EO = "(아/어)",
  EU = "(으)",
}

class Eomi {
  eomiType: EomiType;
  body: string;
  dropRieul: boolean;

  constructor(eomi: string) {
    const err = new Error(`Cannot parse given string ${eomi} to Eomi`);
    if (eomi[0] === "-") eomi = eomi.slice(1);

    const infTest = eomi.match(
      /^[(]?([아-앟어-엏])(?:[/]([아-앟어-엏]))?[)]?(.*)$/
    );
    const seqTest = eomi.match(/^[(]?([으-읗])[)]?(.*)$/);
    const batchimTest = eomi.match(/^([ㄱ-ㅎ].*)$/);

    if (infTest !== null) {
      const [, med1, med2, rest] = infTest;
      if (med2 && getBatchim(med1) !== getBatchim(med2)) throw err;
      this.body = getBatchim(med1) + rest;
      this.eomiType = EomiType.A_EO;
    } else if (seqTest !== null) {
      const [, med, rest] = seqTest;
      this.body = getBatchim(med) + rest;
      this.eomiType = EomiType.EU;
    } else if (batchimTest !== null) {
      this.body = batchimTest[1];
      this.eomiType = EomiType.EU;
    } else {
      this.body = eomi;
      this.eomiType = EomiType.DIRECT;
    }

    if (startsWithSyllable(this.body)) {
      const choseong = ((this.body.charCodeAt(0) - 0xac00) / 588) | 0;
      this.dropRieul = [2, 9, 11].indexOf(choseong) !== -1; // [ㄴ, ㅅ, ㅇ]
    } else {
      this.dropRieul = "ㄴㄹㅂ".indexOf(this.body[0]) !== -1;
    }
  }

  after(yongeon: Yongeon): string {
    let stem: string = yongeon.hada;
    if (this.eomiType === EomiType.A_EO) {
      stem = yongeon.hae;
    } else if (this.eomiType === EomiType.EU) {
      stem = this.dropRieul ? yongeon.hani : yongeon.hamyeon;
    } else if (this.dropRieul && yongeon.batchim === "ㄹ") {
      stem = yongeon.hani;
    }
    return concatHangeul(stem, this.body);
  }

  valueOf(): string {
    return "-" + this.eomiType + this.body;
  }
}

module.exports.Yongeon = Yongeon;
module.exports.V = Yongeon;
module.exports.Eomi = Eomi;
module.exports.E = Eomi;
