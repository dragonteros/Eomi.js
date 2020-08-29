"use strict";
/* Utilities */
function assembleSyllable(x) {
    var codepoint = x[0] * 588 + x[1] * 28 + x[2] + 0xac00;
    return String.fromCharCode(codepoint);
}
function disassembleSyllable(x) {
    var codepoint = x.charCodeAt(x.length - 1) - 0xac00;
    var choseong = (codepoint / 588) | 0;
    var jungseong = ((codepoint % 588) / 28) | 0;
    var jongseong = codepoint % 28;
    return [choseong, jungseong, jongseong];
}
var BATCHIM_TABLE = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
function getBatchim(x) {
    var idx = disassembleSyllable(x)[2];
    return idx === 0 ? "" : BATCHIM_TABLE[idx - 1];
}
function isPositiveMoeum(x) {
    var moeum = disassembleSyllable(x)[1];
    if (0 <= moeum && moeum <= 3)
        return true; // ㅏ ㅐ ㅑ ㅒ
    if (8 <= moeum && moeum <= 12)
        return true; // ㅗ ㅘ ㅙ ㅚ ㅛ
    return false;
}
function startsWithSyllable(x) {
    return "가" <= x[0] && x[0] <= "힣";
}
// joins two possibly non-syllabic Hangeul strings
function concatHangeul(x, y) {
    var err = new Error("Cannot concatenate '" + x + "' and '" + y + "'");
    if (!x || !y || startsWithSyllable(y))
        return x + y;
    var table = [
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
    var newBatchim = table.indexOf(getBatchim(x) + y[0]);
    if (newBatchim === -1) {
        if (getBatchim(x))
            throw err;
        newBatchim = BATCHIM_TABLE.indexOf(y[0]) + 1;
        if (newBatchim === 0)
            throw err;
    }
    var merged = disassembleSyllable(x);
    merged[2] = newBatchim;
    return x.slice(0, -1) + assembleSyllable(merged) + y.slice(1);
}
/* Main Classes */
var Yongeon = /** @class */ (function () {
    function Yongeon(hada, hae, hani) {
        this.hada = hada.slice(0, -1);
        this.batchim = getBatchim(this.hada);
        this.hae = hae || this.recoverHae();
        this.hani = hani ? hani.slice(0, -1) : this.recoverHani();
        this.hamyeon = this.batchim === "ㄹ" ? this.hada : this.hani;
    }
    Yongeon.prototype._ = function (eomi, eomiAfterBatchim) {
        if (typeof eomi === "string")
            eomi = new Eomi(eomi);
        if (eomiAfterBatchim != null && this.batchim) {
            if (typeof eomiAfterBatchim === "string")
                eomiAfterBatchim = new Eomi(eomiAfterBatchim);
            if (this.batchim !== "ㄹ" || !eomi.dropRieul)
                eomi = eomiAfterBatchim;
        }
        return eomi.after(this);
    };
    Yongeon.prototype.recoverHae = function () {
        if (!this.batchim) {
            var jamos = disassembleSyllable(this.hada);
            if (jamos[1] === 0 || jamos[1] === 4) {
                return this.hada; // ㅏ, ㅓ
            }
            else if (jamos[1] === 18) {
                jamos[1] = 4; // ㅡ -> ㅓ
                return this.hada.slice(0, -1) + assembleSyllable(jamos);
            }
        }
        return this.hada + (isPositiveMoeum(this.hada) ? "아" : "어");
    };
    Yongeon.prototype.recoverHani = function () {
        var jamos = disassembleSyllable(this.hada);
        if (this.batchim === "ㄹ") {
            // ㄹ 탈락
            jamos[2] = 0;
            return this.hada.slice(0, -1) + assembleSyllable(jamos);
        }
        var haeLast = this.hae.slice(-1);
        if ("아어".indexOf(haeLast) !== -1) {
            // 받침 있는 규칙 | ㄷ ㅅ 불규칙
            return this.hae.slice(0, -1) + (this.batchim && "으");
        }
        else if ("와워".indexOf(haeLast) !== -1) {
            // ㅂ 불규칙
            return this.hae.slice(0, -1) + "우";
        }
        else if (this.batchim === "ㅎ") {
            // ㅎ 불규칙
            jamos[2] = 0;
            return this.hada.slice(0, -1) + assembleSyllable(jamos);
        }
        return this.hada; // 받침 없는 규칙 | 르, 러, 우, 여 불규칙
    };
    Yongeon.prototype.valueOf = function () {
        return this.hada + "다";
    };
    return Yongeon;
}());
var Eomi = /** @class */ (function () {
    function Eomi(eomi) {
        var err = new Error("Cannot parse given string " + eomi + " to Eomi");
        if (eomi[0] === "-")
            eomi = eomi.slice(1);
        var infTest = eomi.match(/^[(]?([아-앟어-엏])(?:[/]([아-앟어-엏]))?[)]?(.*)$/);
        var seqTest = eomi.match(/^[(]?([으-읗])[)]?(.*)$/);
        var batchimTest = eomi.match(/^([ㄱ-ㅎ].*)$/);
        if (infTest !== null) {
            var med1 = infTest[1], med2 = infTest[2], rest = infTest[3];
            if (med2 && getBatchim(med1) !== getBatchim(med2))
                throw err;
            this.body = getBatchim(med1) + rest;
            this.eomiType = "(\uC544/\uC5B4)" /* A_EO */;
        }
        else if (seqTest !== null) {
            var med = seqTest[1], rest = seqTest[2];
            this.body = getBatchim(med) + rest;
            this.eomiType = "(\uC73C)" /* EU */;
        }
        else if (batchimTest !== null) {
            this.body = batchimTest[1];
            this.eomiType = "(\uC73C)" /* EU */;
        }
        else {
            this.body = eomi;
            this.eomiType = "" /* DIRECT */;
        }
        if (startsWithSyllable(this.body)) {
            var choseong = ((this.body.charCodeAt(0) - 0xac00) / 588) | 0;
            this.dropRieul = [2, 9, 11].indexOf(choseong) !== -1; // [ㄴ, ㅅ, ㅇ]
        }
        else {
            this.dropRieul = "ㄴㄹㅂ".indexOf(this.body[0]) !== -1;
        }
    }
    Eomi.prototype.after = function (yongeon) {
        var stem = yongeon.hada;
        if (this.eomiType === "(\uC544/\uC5B4)" /* A_EO */) {
            stem = yongeon.hae;
        }
        else if (this.eomiType === "(\uC73C)" /* EU */) {
            stem = this.dropRieul ? yongeon.hani : yongeon.hamyeon;
        }
        else if (this.dropRieul && yongeon.batchim === "ㄹ") {
            stem = yongeon.hani;
        }
        return concatHangeul(stem, this.body);
    };
    Eomi.prototype.valueOf = function () {
        return "-" + this.eomiType + this.body;
    };
    return Eomi;
}());
module.exports.Yongeon = Yongeon;
module.exports.V = Yongeon;
module.exports.Eomi = Eomi;
module.exports.E = Eomi;
