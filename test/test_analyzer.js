var assert = require("assert");
var { V, E, Analyzer } = require("../dist/eomi");

describe("분석기 검사", function () {
  it("README.md", function () {
    const colors = [
      new V("푸르다", "푸르러", "푸르니"),
      new V("붉다", "붉어" /* 세번째 인수는 생략 가능 */),
      new V("노랗다", "노래"),
      new V("하얗다", "하얘"),
      new V("검다" /* 두번째 인수도 생략 가능 */),
    ];
    const polite = [
      new E("-ㅂ니다", "-습니다"), // 차례로 받침이 없을 때, 받침이 있을 때
      new E("-(으)ㅂ시다"), // 두 경우를 모두 포괄
      new E("-어요"),
    ];
    var analyzer = new Analyzer(colors, polite);

    assert.deepEqual(analyzer.analyze("푸르러요"), [[colors[0], polite[2]]]);
    assert.deepEqual(analyzer.analyze("붉습니다"), [[colors[1], polite[0]]]);
  });

  it("비슷하게 시작하는 용언", function () {
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
      eomis.forEach((eomi) =>
        assert.deepEqual(analyzer.analyze(eomi.after(v)), [[v, eomi]])
      );
    }
  });

  it("두 가지 형태로 활용하는 용언", function () {
    var yongeons = [new V("하얗다", "하얘"), new V("허옇다", "허예")];
    var eomis = [new E("ㅂ니다", "습니다")];
    var analyzer = new Analyzer(yongeons, eomis);

    ["하얍니다", "하얗습니다"].forEach((s) =>
      assert.deepEqual(analyzer.analyze(s), [[yongeons[0], eomis[0]]])
    );
    ["허엽니다", "허옇습니다"].forEach((s) =>
      assert.deepEqual(analyzer.analyze(s), [[yongeons[1], eomis[0]]])
    );
  });

  it("복사", function () {
    var yongeons = [new V("가다")];
    var eomis = [new E("ㅂ니다", "습니다")];
    var analyzer = new Analyzer(yongeons, eomis);

    var v = new V("가누다");
    var e = new E("아라");
    var cloned = analyzer.clone();
    cloned.addYongeon(v);
    cloned.addEomi(e);

    assert.deepEqual(analyzer.analyze("가라"), []);
    assert.deepEqual(cloned.analyze("가라"), [[yongeons[0], e]]);
    assert.deepEqual(analyzer.analyze("가눕니다"), []);
    assert.deepEqual(cloned.analyze("가눕니다"), [[v, eomis[0]]]);
  });
});
