"use strict";
/* Utilities */
var BATCHIM_TABLE = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
function getBatchim(x) {
    var codepoint = x.charCodeAt(x.length - 1);
    var idx = (codepoint - 0xac00) % 28;
    return idx === 0 ? "" : BATCHIM_TABLE[idx - 1];
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
    var mergedSyllable = x.charCodeAt(x.length - 1) - 0xac00;
    mergedSyllable += -(mergedSyllable % 28) + newBatchim;
    mergedSyllable += 0xac00;
    return x.slice(0, -1) + String.fromCharCode(mergedSyllable) + y.slice(1);
}
/* Main Classes */
var Yongeon = /** @class */ (function () {
    function Yongeon(hada, hae, hani) {
        this.hada = hada.slice(0, -1);
        this.hae = hae;
        this.hani = hani.slice(0, -1);
        this.batchim = getBatchim(this.hada);
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
