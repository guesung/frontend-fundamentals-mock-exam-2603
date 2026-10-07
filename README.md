# 토스 Frontend Developer 면접 과제 🔥

## Getting started

```sh
yarn start
```

## Testing

아래 명령어로 더미 데이터에 기반한 구현을 테스트할 수 있습니다.

```sh
yarn test
```

## 수정 필요한 부분

### 코드

1. 페이지 컴포넌트에 정보가 너무 많다. -> 구조가 눈에 보이지 않는다.

### UX

1. 새로고침 시 CLS
2. 당일 외 예약 후 돌아오면, 예약 현황에 안보임
3. 시작 시간 - 잘 안눌림 (화살표 부분)
4. 툴팁 - 바깥에 눌럿을 때 안없어짐 (예약 블록을 다시 눌러야함)

### 버그

1. 참석 인원 - 일의 자리 입력 불가

### 기능

1. 내 예약이 과거인 경우, 날짜 선택이 안됨.

### 기술 부채

1. typescript - deprecated 오류
2. tsconfig 파일 - 자동완성
3. 'constants'에서 import하면 이상한 타입으로 가네?

## 고민

1. formatDate의 위치

- '포매팅이 필요한가' -> input의 value에는 string | number만 들어갈 수 있음. 즉, Date 객체가 그대로 못들어감 -> 타입 변환이 필욯마 -> formateDate는 필요함.
- 위치 : formatDate의 반환값은 yyyy-mm-dd로, 범용적으로 쓸 수 있는 형태임 -> src/utils
