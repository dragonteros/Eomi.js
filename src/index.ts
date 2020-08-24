/* Utilities */

const BATCHIM_TABLE = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

function getBatchim(x: string): string {
  const codepoint = x.charCodeAt(x.length - 1);
  const idx = (codepoint - 0xac00) % 28;
  return idx === 0 ? "" : BATCHIM_TABLE[idx - 1];
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

  let mergedSyllable = x.charCodeAt(x.length - 1) - 0xac00;
  mergedSyllable += -(mergedSyllable % 28) + newBatchim;
  mergedSyllable += 0xac00;
  return x.slice(0, -1) + String.fromCharCode(mergedSyllable) + y.slice(1);
}

/* Main Classes */

class Yongeon {
  hada: string;
  hae: string;
  hani: string;
  hamyeon: string;
  batchim: string;

  constructor(hada: string, hae: string, hani: string) {
    this.hada = hada.slice(0, -1);
    this.hae = hae;
    this.hani = hani.slice(0, -1);

    this.batchim = getBatchim(this.hada);
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
