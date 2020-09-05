var assert = require("assert");
var { V, E, Analyzer } = require("../dist/eomi");

describe("Analyzer test", function () {
  var yongeons = [
    new V("이르다", "일러"),
    new V("일다"),
    new V("일하다", "일해"),
    new V("이루다", "이뤄"),
  ];
  var eomis = [
    new E("다"),
    new E("ㄴ다", "는다"),
    new E("ㄴ"),
    new E("는"),
    new E("으니"),
    new E("다니"),
  ];
  var analyzer = new Analyzer(yongeons, eomis);
  for (let v of yongeons) {
    it("", function () {
      eomis.forEach((eomi) =>
        assert.deepEqual(analyzer.analyze(eomi.after(v)), [[v, eomi]])
      );
    });
  }
});
