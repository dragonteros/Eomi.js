/* Utilities */

/**
 * 초성, 중성, 종성에 해당하는 인덱스로 한글 음절을 조합한다.
 * @param x 초성 (0-18), 중성 (0-20), 종성 (0-27)으로 이루어진 정수 배열
 * @returns 조합된 한글 음절
 */
function assembleSyllable(x: number[]): string {
  const codepoint = x[0] * 588 + x[1] * 28 + x[2] + 0xac00;
  return String.fromCharCode(codepoint);
}

/**
 * 문자열의 마지막 음절을 초성, 중성, 종성에 해당하는 인덱스로 분해한다.
 * @param x 분해하고자 하는 한글 음절로 끝나는 문자열.
 * @returns 초성 (0-18), 중성 (0-20), 종성 (0-27)으로 이루어진 정수 배열.
 */
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

function startsWithSyllable(x: string): boolean {
  return "가" <= x[0] && x[0] <= "힣";
}

/**
 * 두 한글 문자열을 결합한다.
 * @param x 결합할 앞 문자열.
 * @param y 결합할 뒤 문자열. 한글 음절로 시작하지 않을 수 있다.
 * @returns 결합된 문자열.
 */
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

/** 한국어 용언 클래스. */
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
    if (
      this.hani !== "" &&
      getBatchim(this.hani[this.hani.length - 1]) !== ""
    ) {
      throw Error(
        "Yongeon expects the hani form that does not end in batchim. " +
          `Did you mean: '${this.hani}으니'?`
      );
    }
    this.hamyeon = this.batchim === "ㄹ" ? this.hada : this.hani;
  }

  /**
   * 어미를 받아 활용합니다.
   * 인수로는 어미 하나를 받거나 문자열 두 개를 받아 어미를 만듭니다.
   */
  _(eomi: Eomi | string, eomiAfterBatchim?: string): string {
    if (!(eomi instanceof Eomi)) eomi = new Eomi(eomi, eomiAfterBatchim);
    else if (eomiAfterBatchim != null)
      throw Error(
        "If the first argument is a proper Eomi, only one argument should be given."
      );

    return eomi.after(this);
  }

  recoverHae(): string {
    let jamos = disassembleSyllable(this.hada);
    if (!this.batchim) {
      if (jamos[1] === 0 || jamos[1] === 4) {
        return this.hada; // ㅏ, ㅓ
      } else if (jamos[1] === 18) {
        jamos[1] = 4; // ㅡ -> ㅓ
        return this.hada.slice(0, -1) + assembleSyllable(jamos);
      }
    }
    return this.hada + (jamos[1] === 0 || jamos[1] === 8 ? "아" : "어"); // ㅏ, ㅗ
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

/** 어미 활용을 구현한 클래스. */
class EomiUnit {
  eomiType: EomiType;
  body: string;
  dropRieul: boolean;

  constructor(eomi: string) {
    const err = new Error(`Cannot parse given string ${eomi} to EomiUnit`);
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

  /** 용언을 받아 활용합니다. */
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

/** 한국어 어미 클래스. */
class Eomi {
  eomi: EomiUnit;
  eomiAfterBatchim?: EomiUnit;
  constructor(eomi: EomiUnit | string, eomiAfterBatchim?: EomiUnit | string) {
    if (typeof eomi === "string") eomi = new EomiUnit(eomi);
    if (typeof eomiAfterBatchim === "string")
      eomiAfterBatchim = new EomiUnit(eomiAfterBatchim);
    this.eomi = eomi;
    this.eomiAfterBatchim = eomiAfterBatchim;
  }

  /** 용언을 받아 활용합니다. */
  after(yongeon: Yongeon): string {
    let eomi = this.eomi;
    if (this.eomiAfterBatchim != null && yongeon.batchim) {
      if (yongeon.batchim !== "ㄹ" || !eomi.dropRieul)
        eomi = this.eomiAfterBatchim;
    }
    return eomi.after(yongeon);
  }

  valueOf(): string {
    const after = this.eomiAfterBatchim;
    return this.eomi + (after != null ? "/" + after : "");
  }
}

export { Yongeon, Eomi, EomiType };
