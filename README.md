# Eomi.js
한국어 용언(동사, 형용사) 활용을 편리하게 구현하는 자바스크립트 라이브러리입니다.

## 설치
```shell
npm install eomi-js
```

## 사용법
### 불러오기
```javascript
const { Yongeon, Eomi } = require('eomi-js') // 용언 및 어미 클래스
const { V, E } = require('eomi-js') // 위와 동일함

const { Analyzer } = require('eomi-js') // 활용형 분석기
```

### 용언
용언을 만들 때 첫번째 인수는 기본형 ('-다'), 두번째 인수는 ('-아/어'), 세번째 인수는 ('-으니') 꼴을 적어줍니다.

세번째 인수는 생략할 수 있습니다.

규칙 용언이면 두번째 인수도 생략할 수 있습니다.
```javascript
const colors = [
    new Yongeon('푸르다', '푸르러', '푸르니'),
    new Yongeon('붉다', '붉어', '붉으니'),
    new Yongeon('노랗다', '노래' /* 세번째 인수는 생략 가능 */),
    new Yongeon('하얗다', '하얘'),
    new Yongeon('검다' /* 두번째 인수도 생략 가능 */),
]
```

### 어미
어미를 만들 때 첫번째 인수는 용언의 받침이 없을 때, 두번째 인수는 용언의 받침이 있을 때의 꼴입니다.

첫번째 인수가 두 경우를 모두 포괄하는 경우 두번째 인수는 생략할 수 있습니다.
```javascript
const polite = [
    new Eomi('-ㅂ니다', '-습니다'), // 차례로 받침이 없을 때, 받침이 있을 때
    new Eomi('-(으)ㅂ시다'), // 두 경우를 모두 포괄
    new Eomi('-(아/어)요'),
]
const intimate = [
    new Eomi('ㄴ다', '는다'),
    new Eomi('자'),
    new Eomi('어'),
]
```

### 활용
용언의 메소드 `_`에 어미를 인수로 넣으면 활용형을 문자열로 얻습니다.
```javascript
polite.map(e => new V('뵙다', '뵈어', '뵈니')._(e))
// ['뵙습니다', '뵙시다', '뵈어요']
intimate.map(e => new V('보다')._(e))
// ['본다', '보자', '보아']
```

인수로 문자열을 바로 넣는 경우 해당 인수를 사용해 어미를 생성합니다.
```javascript
console.log(`${colors[0]._('-었던')} 하늘이 어느새 ${colors[1]._('-ㅂ니다', '-습니다')}.`)
console.log(`${colors[2]._('고')} ${colors[3]._('-ㄴ')} 꽃들이 장관을 이루던 언덕도 ${colors[4]._('-은')} 그림자가 드리웁니다.`)
// 푸르렀던 하늘이 어느새 붉습니다.
// 노랗고 하얀 꽃들이 장관을 이루던 언덕도 검은 그림자가 드리웁니다.
```

### 활용형 분석
용언의 배열과 어미의 배열로 활용형 분석기를 생성합니다.

`analyze` 메소드는 문자열을 어간과 어미로 분석하여 해당하는 용언과 어미를 담은 배열들을 내놓습니다.
```javascript
const analyzer = new Analyzer(colors, polite)

analyzer.analyze('푸르러요')  // [ [푸르다, (아/어)요], ]
analyzer.analyze('붉습니다')  // [ [붉다, ㅂ니다/습니다], ]
```


## 라이센스
Eomi.js는 MIT 라이센스 아래 자유롭게 배포 가능합니다.
