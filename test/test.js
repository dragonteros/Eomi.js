var assert = require("assert");
var EOMI = require("../dist/index");
var V = EOMI.V;
var E = EOMI.E;

describe("받침 없는 규칙 활용", function () {
  var verbs = [
    new V("가다", "가", "가니"),
    new V("얽매다", "얽매", "얽매니"),
    new V("서다", "서", "서니"),
    new V("둘러메다", "둘러메", "둘러메니"),
    new V("쏘다", "쏴", "쏘니"),
    new V("되다", "돼", "되니"),
    new V("주다", "줘", "주니"),
    new V("꿰다", "꿰", "꿰니"),
    new V("틀어쥐다", "틀어쥐어", "틀어쥐니"),
    new V("치다", "쳐", "치니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["가고", "가기", "가나", "가니", "가다", "가다가", "가되", "가자"],
      [
        "얽매고",
        "얽매기",
        "얽매나",
        "얽매니",
        "얽매다",
        "얽매다가",
        "얽매되",
        "얽매자",
      ],
      ["서고", "서기", "서나", "서니", "서다", "서다가", "서되", "서자"],
      [
        "둘러메고",
        "둘러메기",
        "둘러메나",
        "둘러메니",
        "둘러메다",
        "둘러메다가",
        "둘러메되",
        "둘러메자",
      ],
      ["쏘고", "쏘기", "쏘나", "쏘니", "쏘다", "쏘다가", "쏘되", "쏘자"],
      ["되고", "되기", "되나", "되니", "되다", "되다가", "되되", "되자"],
      ["주고", "주기", "주나", "주니", "주다", "주다가", "주되", "주자"],
      ["꿰고", "꿰기", "꿰나", "꿰니", "꿰다", "꿰다가", "꿰되", "꿰자"],
      [
        "틀어쥐고",
        "틀어쥐기",
        "틀어쥐나",
        "틀어쥐니",
        "틀어쥐다",
        "틀어쥐다가",
        "틀어쥐되",
        "틀어쥐자",
      ],
      ["치고", "치기", "치나", "치니", "치다", "치다가", "치되", "치자"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["가", "갔다", "갔었다", "가도", "가라", "가서", "가야"],
      ["얽매", "얽맸다", "얽맸었다", "얽매도", "얽매라", "얽매서", "얽매야"],
      ["서", "섰다", "섰었다", "서도", "서라", "서서", "서야"],
      [
        "둘러메",
        "둘러멨다",
        "둘러멨었다",
        "둘러메도",
        "둘러메라",
        "둘러메서",
        "둘러메야",
      ],
      ["쏴", "쐈다", "쐈었다", "쏴도", "쏴라", "쏴서", "쏴야"],
      ["돼", "됐다", "됐었다", "돼도", "돼라", "돼서", "돼야"],
      ["줘", "줬다", "줬었다", "줘도", "줘라", "줘서", "줘야"],
      ["꿰", "뀄다", "뀄었다", "꿰도", "꿰라", "꿰서", "꿰야"],
      [
        "틀어쥐어",
        "틀어쥐었다",
        "틀어쥐었었다",
        "틀어쥐어도",
        "틀어쥐어라",
        "틀어쥐어서",
        "틀어쥐어야",
      ],
      ["쳐", "쳤다", "쳤었다", "쳐도", "쳐라", "쳐서", "쳐야"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "ㅂ니다",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "간",
        "갈",
        "감",
        "갈는지",
        "갑니다",
        "갈까",
        "가니",
        "가셨다",
        "가세요",
        "가면",
      ],
      [
        "얽맨",
        "얽맬",
        "얽맴",
        "얽맬는지",
        "얽맵니다",
        "얽맬까",
        "얽매니",
        "얽매셨다",
        "얽매세요",
        "얽매면",
      ],
      [
        "선",
        "설",
        "섬",
        "설는지",
        "섭니다",
        "설까",
        "서니",
        "서셨다",
        "서세요",
        "서면",
      ],
      [
        "둘러멘",
        "둘러멜",
        "둘러멤",
        "둘러멜는지",
        "둘러멥니다",
        "둘러멜까",
        "둘러메니",
        "둘러메셨다",
        "둘러메세요",
        "둘러메면",
      ],
      [
        "쏜",
        "쏠",
        "쏨",
        "쏠는지",
        "쏩니다",
        "쏠까",
        "쏘니",
        "쏘셨다",
        "쏘세요",
        "쏘면",
      ],
      [
        "된",
        "될",
        "됨",
        "될는지",
        "됩니다",
        "될까",
        "되니",
        "되셨다",
        "되세요",
        "되면",
      ],
      [
        "준",
        "줄",
        "줌",
        "줄는지",
        "줍니다",
        "줄까",
        "주니",
        "주셨다",
        "주세요",
        "주면",
      ],
      [
        "꿴",
        "꿸",
        "뀀",
        "꿸는지",
        "뀁니다",
        "꿸까",
        "꿰니",
        "꿰셨다",
        "꿰세요",
        "꿰면",
      ],
      [
        "틀어쥔",
        "틀어쥘",
        "틀어쥠",
        "틀어쥘는지",
        "틀어쥡니다",
        "틀어쥘까",
        "틀어쥐니",
        "틀어쥐셨다",
        "틀어쥐세요",
        "틀어쥐면",
      ],
      [
        "친",
        "칠",
        "침",
        "칠는지",
        "칩니다",
        "칠까",
        "치니",
        "치셨다",
        "치세요",
        "치면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("받침 있는 규칙 활용", function () {
  var verbs = [
    new V("앉다", "앉아", "앉으니"),
    new V("밟다", "밟아", "밟으니"),
    new V("맺다", "맺어", "맺으니"),
    new V("뒤섞다", "뒤섞어", "뒤섞으니"),
    new V("벗다", "벗어", "벗으니"),
    new V("옮다", "옮아", "옮으니"),
    new V("뵙다", "뵈어", "뵈니"),
    new V("줄다", "줄어", "주니"),
    new V("꿇다", "꿇어", "꿇으니"),
    new V("끌다", "끌어", "끄니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["앉고", "앉기", "앉나", "앉니", "앉다", "앉다가", "앉되", "앉자"],
      ["밟고", "밟기", "밟나", "밟니", "밟다", "밟다가", "밟되", "밟자"],
      ["맺고", "맺기", "맺나", "맺니", "맺다", "맺다가", "맺되", "맺자"],
      [
        "뒤섞고",
        "뒤섞기",
        "뒤섞나",
        "뒤섞니",
        "뒤섞다",
        "뒤섞다가",
        "뒤섞되",
        "뒤섞자",
      ],
      ["벗고", "벗기", "벗나", "벗니", "벗다", "벗다가", "벗되", "벗자"],
      ["옮고", "옮기", "옮나", "옮니", "옮다", "옮다가", "옮되", "옮자"],
      ["뵙고", "뵙기", "뵙나", "뵙니", "뵙다", "뵙다가", "뵙되", "뵙자"],
      ["줄고", "줄기", "주나", "주니", "줄다", "줄다가", "줄되", "줄자"],
      ["꿇고", "꿇기", "꿇나", "꿇니", "꿇다", "꿇다가", "꿇되", "꿇자"],
      ["끌고", "끌기", "끄나", "끄니", "끌다", "끌다가", "끌되", "끌자"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["앉아", "앉았다", "앉았었다", "앉아도", "앉아라", "앉아서", "앉아야"],
      ["밟아", "밟았다", "밟았었다", "밟아도", "밟아라", "밟아서", "밟아야"],
      ["맺어", "맺었다", "맺었었다", "맺어도", "맺어라", "맺어서", "맺어야"],
      [
        "뒤섞어",
        "뒤섞었다",
        "뒤섞었었다",
        "뒤섞어도",
        "뒤섞어라",
        "뒤섞어서",
        "뒤섞어야",
      ],
      ["벗어", "벗었다", "벗었었다", "벗어도", "벗어라", "벗어서", "벗어야"],
      ["옮아", "옮았다", "옮았었다", "옮아도", "옮아라", "옮아서", "옮아야"],
      ["뵈어", "뵈었다", "뵈었었다", "뵈어도", "뵈어라", "뵈어서", "뵈어야"],
      ["줄어", "줄었다", "줄었었다", "줄어도", "줄어라", "줄어서", "줄어야"],
      ["꿇어", "꿇었다", "꿇었었다", "꿇어도", "꿇어라", "꿇어서", "꿇어야"],
      ["끌어", "끌었다", "끌었었다", "끌어도", "끌어라", "끌어서", "끌어야"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "앉은",
        "앉을",
        "앉음",
        "앉을는지",
        "앉을까",
        "앉으니",
        "앉으셨다",
        "앉으세요",
        "앉으면",
      ],
      [
        "밟은",
        "밟을",
        "밟음",
        "밟을는지",
        "밟을까",
        "밟으니",
        "밟으셨다",
        "밟으세요",
        "밟으면",
      ],
      [
        "맺은",
        "맺을",
        "맺음",
        "맺을는지",
        "맺을까",
        "맺으니",
        "맺으셨다",
        "맺으세요",
        "맺으면",
      ],
      [
        "뒤섞은",
        "뒤섞을",
        "뒤섞음",
        "뒤섞을는지",
        "뒤섞을까",
        "뒤섞으니",
        "뒤섞으셨다",
        "뒤섞으세요",
        "뒤섞으면",
      ],
      [
        "벗은",
        "벗을",
        "벗음",
        "벗을는지",
        "벗을까",
        "벗으니",
        "벗으셨다",
        "벗으세요",
        "벗으면",
      ],
      [
        "옮은",
        "옮을",
        "옮음",
        "옮을는지",
        "옮을까",
        "옮으니",
        "옮으셨다",
        "옮으세요",
        "옮으면",
      ],
      ["뵌", "뵐", "뵘", "뵐는지", "뵐까", "뵈니", "뵈셨다", "뵈세요", "뵈면"],
      ["준", "줄", "줆", "줄는지", "줄까", "주니", "주셨다", "주세요", "줄면"],
      [
        "꿇은",
        "꿇을",
        "꿇음",
        "꿇을는지",
        "꿇을까",
        "꿇으니",
        "꿇으셨다",
        "꿇으세요",
        "꿇으면",
      ],
      ["끈", "끌", "끎", "끌는지", "끌까", "끄니", "끄셨다", "끄세요", "끌면"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("ㄷ 불규칙 활용", function () {
  var verbs = [
    new V("걷다", "걸어", "걸으니"),
    new V("깨닫다", "깨달아", "깨달으니"),
    new V("듣다", "들어", "들으니"),
    new V("싣다", "실어", "실으니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["걷고", "걷기", "걷나", "걷니", "걷다", "걷다가", "걷되", "걷자"],
      [
        "깨닫고",
        "깨닫기",
        "깨닫나",
        "깨닫니",
        "깨닫다",
        "깨닫다가",
        "깨닫되",
        "깨닫자",
      ],
      ["듣고", "듣기", "듣나", "듣니", "듣다", "듣다가", "듣되", "듣자"],
      ["싣고", "싣기", "싣나", "싣니", "싣다", "싣다가", "싣되", "싣자"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["걸어", "걸었다", "걸었었다", "걸어도", "걸어라", "걸어서", "걸어야"],
      [
        "깨달아",
        "깨달았다",
        "깨달았었다",
        "깨달아도",
        "깨달아라",
        "깨달아서",
        "깨달아야",
      ],
      ["들어", "들었다", "들었었다", "들어도", "들어라", "들어서", "들어야"],
      ["실어", "실었다", "실었었다", "실어도", "실어라", "실어서", "실어야"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "걸은",
        "걸을",
        "걸음",
        "걸을는지",
        "걸을까",
        "걸으니",
        "걸으셨다",
        "걸으세요",
        "걸으면",
      ],
      [
        "깨달은",
        "깨달을",
        "깨달음",
        "깨달을는지",
        "깨달을까",
        "깨달으니",
        "깨달으셨다",
        "깨달으세요",
        "깨달으면",
      ],
      [
        "들은",
        "들을",
        "들음",
        "들을는지",
        "들을까",
        "들으니",
        "들으셨다",
        "들으세요",
        "들으면",
      ],
      [
        "실은",
        "실을",
        "실음",
        "실을는지",
        "실을까",
        "실으니",
        "실으셨다",
        "실으세요",
        "실으면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("ㅂ 불규칙 활용", function () {
  var verbs = [
    new V("돕다", "도와", "도우니"),
    new V("눕다", "누워", "누우니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["돕고", "돕기", "돕나", "돕니", "돕다", "돕다가", "돕되", "돕자"],
      ["눕고", "눕기", "눕나", "눕니", "눕다", "눕다가", "눕되", "눕자"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["도와", "도왔다", "도왔었다", "도와도", "도와라", "도와서", "도와야"],
      ["누워", "누웠다", "누웠었다", "누워도", "누워라", "누워서", "누워야"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "도운",
        "도울",
        "도움",
        "도울는지",
        "도울까",
        "도우니",
        "도우셨다",
        "도우세요",
        "도우면",
      ],
      [
        "누운",
        "누울",
        "누움",
        "누울는지",
        "누울까",
        "누우니",
        "누우셨다",
        "누우세요",
        "누우면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("ㅅ 불규칙 활용", function () {
  var verbs = [
    new V("낫다", "나아", "나으니"),
    new V("가로젓다", "가로저어", "가로저으니"),
    new V("붓다", "부어", "부으니"),
    new V("눈물짓다", "눈물지어", "눈물지으니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["낫고", "낫기", "낫나", "낫니", "낫다", "낫다가", "낫되", "낫자"],
      [
        "가로젓고",
        "가로젓기",
        "가로젓나",
        "가로젓니",
        "가로젓다",
        "가로젓다가",
        "가로젓되",
        "가로젓자",
      ],
      ["붓고", "붓기", "붓나", "붓니", "붓다", "붓다가", "붓되", "붓자"],
      [
        "눈물짓고",
        "눈물짓기",
        "눈물짓나",
        "눈물짓니",
        "눈물짓다",
        "눈물짓다가",
        "눈물짓되",
        "눈물짓자",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["나아", "나았다", "나았었다", "나아도", "나아라", "나아서", "나아야"],
      [
        "가로저어",
        "가로저었다",
        "가로저었었다",
        "가로저어도",
        "가로저어라",
        "가로저어서",
        "가로저어야",
      ],
      ["부어", "부었다", "부었었다", "부어도", "부어라", "부어서", "부어야"],
      [
        "눈물지어",
        "눈물지었다",
        "눈물지었었다",
        "눈물지어도",
        "눈물지어라",
        "눈물지어서",
        "눈물지어야",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "나은",
        "나을",
        "나음",
        "나을는지",
        "나을까",
        "나으니",
        "나으셨다",
        "나으세요",
        "나으면",
      ],
      [
        "가로저은",
        "가로저을",
        "가로저음",
        "가로저을는지",
        "가로저을까",
        "가로저으니",
        "가로저으셨다",
        "가로저으세요",
        "가로저으면",
      ],
      [
        "부은",
        "부을",
        "부음",
        "부을는지",
        "부을까",
        "부으니",
        "부으셨다",
        "부으세요",
        "부으면",
      ],
      [
        "눈물지은",
        "눈물지을",
        "눈물지음",
        "눈물지을는지",
        "눈물지을까",
        "눈물지으니",
        "눈물지으셨다",
        "눈물지으세요",
        "눈물지으면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("르 불규칙 활용", function () {
  var verbs = [
    new V("가르다", "갈라", "가르니"),
    new V("벼르다", "별러", "벼르니"),
    new V("날아오르다", "날아올라", "날아오르니"),
    new V("휘두르다", "휘둘러", "휘두르니"),
    new V("무찌르다", "무찔러", "무찌르니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      [
        "가르고",
        "가르기",
        "가르나",
        "가르니",
        "가르다",
        "가르다가",
        "가르되",
        "가르자",
      ],
      [
        "벼르고",
        "벼르기",
        "벼르나",
        "벼르니",
        "벼르다",
        "벼르다가",
        "벼르되",
        "벼르자",
      ],
      [
        "날아오르고",
        "날아오르기",
        "날아오르나",
        "날아오르니",
        "날아오르다",
        "날아오르다가",
        "날아오르되",
        "날아오르자",
      ],
      [
        "휘두르고",
        "휘두르기",
        "휘두르나",
        "휘두르니",
        "휘두르다",
        "휘두르다가",
        "휘두르되",
        "휘두르자",
      ],
      [
        "무찌르고",
        "무찌르기",
        "무찌르나",
        "무찌르니",
        "무찌르다",
        "무찌르다가",
        "무찌르되",
        "무찌르자",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["갈라", "갈랐다", "갈랐었다", "갈라도", "갈라라", "갈라서", "갈라야"],
      ["별러", "별렀다", "별렀었다", "별러도", "별러라", "별러서", "별러야"],
      [
        "날아올라",
        "날아올랐다",
        "날아올랐었다",
        "날아올라도",
        "날아올라라",
        "날아올라서",
        "날아올라야",
      ],
      [
        "휘둘러",
        "휘둘렀다",
        "휘둘렀었다",
        "휘둘러도",
        "휘둘러라",
        "휘둘러서",
        "휘둘러야",
      ],
      [
        "무찔러",
        "무찔렀다",
        "무찔렀었다",
        "무찔러도",
        "무찔러라",
        "무찔러서",
        "무찔러야",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "가른",
        "가를",
        "가름",
        "가를는지",
        "가를까",
        "가르니",
        "가르셨다",
        "가르세요",
        "가르면",
      ],
      [
        "벼른",
        "벼를",
        "벼름",
        "벼를는지",
        "벼를까",
        "벼르니",
        "벼르셨다",
        "벼르세요",
        "벼르면",
      ],
      [
        "날아오른",
        "날아오를",
        "날아오름",
        "날아오를는지",
        "날아오를까",
        "날아오르니",
        "날아오르셨다",
        "날아오르세요",
        "날아오르면",
      ],
      [
        "휘두른",
        "휘두를",
        "휘두름",
        "휘두를는지",
        "휘두를까",
        "휘두르니",
        "휘두르셨다",
        "휘두르세요",
        "휘두르면",
      ],
      [
        "무찌른",
        "무찌를",
        "무찌름",
        "무찌를는지",
        "무찌를까",
        "무찌르니",
        "무찌르셨다",
        "무찌르세요",
        "무찌르면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("러 불규칙 활용", function () {
  var verbs = [
    new V("푸르다", "푸르러", "푸르니"),
    new V("이르다", "이르러", "이르니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      [
        "푸르고",
        "푸르기",
        "푸르나",
        "푸르니",
        "푸르다",
        "푸르다가",
        "푸르되",
        "푸르자",
      ],
      [
        "이르고",
        "이르기",
        "이르나",
        "이르니",
        "이르다",
        "이르다가",
        "이르되",
        "이르자",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      [
        "푸르러",
        "푸르렀다",
        "푸르렀었다",
        "푸르러도",
        "푸르러라",
        "푸르러서",
        "푸르러야",
      ],
      [
        "이르러",
        "이르렀다",
        "이르렀었다",
        "이르러도",
        "이르러라",
        "이르러서",
        "이르러야",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      [
        "푸른",
        "푸를",
        "푸름",
        "푸를는지",
        "푸를까",
        "푸르니",
        "푸르셨다",
        "푸르세요",
        "푸르면",
      ],
      [
        "이른",
        "이를",
        "이름",
        "이를는지",
        "이를까",
        "이르니",
        "이르셨다",
        "이르세요",
        "이르면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("우 불규칙 활용", function () {
  var verbs = [new V("푸다", "퍼", "푸니")];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["푸고", "푸기", "푸나", "푸니", "푸다", "푸다가", "푸되", "푸자"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [["퍼", "펐다", "펐었다", "퍼도", "퍼라", "퍼서", "퍼야"]];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      ["푼", "풀", "품", "풀는지", "풀까", "푸니", "푸셨다", "푸세요", "푸면"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("여 불규칙 활용", function () {
  var verbs = [
    new V("하다", "해", "하니"),
    new V("일하다", "일하여", "일하니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되", "-자"];
    var answers = [
      ["하고", "하기", "하나", "하니", "하다", "하다가", "하되", "하자"],
      [
        "일하고",
        "일하기",
        "일하나",
        "일하니",
        "일하다",
        "일하다가",
        "일하되",
        "일하자",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["해", "했다", "했었다", "해도", "해라", "해서", "해야"],
      [
        "일하여",
        "일하였다",
        "일하였었다",
        "일하여도",
        "일하여라",
        "일하여서",
        "일하여야",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      ["한", "할", "함", "할는지", "할까", "하니", "하셨다", "하세요", "하면"],
      [
        "일한",
        "일할",
        "일함",
        "일할는지",
        "일할까",
        "일하니",
        "일하셨다",
        "일하세요",
        "일하면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(verbs[i]._(endings[j]), answer))
    );
  });
});

describe("ㅎ 불규칙 활용", function () {
  var adjs = [
    new V("하얗다", "하얘", "하야니"),
    new V("허옇다", "허예", "허여니"),
  ];
  it("바로 붙는 어미", function () {
    var endings = ["고", "-기", "나", "-니", "다", "-다가", "되"];
    var answers = [
      ["하얗고", "하얗기", "하얗나", "하얗니", "하얗다", "하얗다가", "하얗되"],
      ["허옇고", "허옇기", "허옇나", "허옇니", "허옇다", "허옇다가", "허옇되"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(adjs[i]._(endings[j]), answer))
    );
  });

  it("-(아/어)", function () {
    var endings = [
      "-(아/어)",
      "(아/어)ㅆ다",
      "-(았/었)었다",
      "(어)도",
      "-아라",
      "(아)서",
      "-어야",
    ];
    var answers = [
      ["하얘", "하얬다", "하얬었다", "하얘도", "하얘라", "하얘서", "하얘야"],
      ["허예", "허옜다", "허옜었다", "허예도", "허예라", "허예서", "허예야"],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(adjs[i]._(endings[j]), answer))
    );
  });

  it("-(으)", function () {
    var endings = [
      "-(으)ㄴ",
      "-을",
      "-ㅁ",
      "(으)ㄹ는지",
      "을까",
      "-(으)니",
      "-으셨다",
      "(으)세요",
      "으면",
    ];
    var answers = [
      ["하얀", "하얄", "하얌", "하얄는지", "하얄까", "하야니", "하야셨다", "하야세요", "하야면"],
      [
        "허연",
        "허열",
        "허염",
        "허열는지",
        "허열까",
        "허여니",
        "허여셨다",
        "허여세요",
        "허여면",
      ],
    ];
    answers.forEach((arr, i) =>
      arr.forEach((answer, j) => assert.equal(adjs[i]._(endings[j]), answer))
    );
  });
});
