# React Todo App 📝

현대적인 반응형 할일 관리 애플리케이션입니다. Recoil을 사용한 상태 관리, 드래그 앤 드롭 기능, 로컬 스토리지 저장 등의 기능을 제공합니다.

## 🚀 배포

**[Live Demo](https://amuz-assignment.vercel.app/)** - Vercel

## ✨ 주요 기능

- **📋 할일 관리**: 할일 추가, 수정, 삭제
- **🎯 상태 관리**: "해야 할 일", "진행 중", "완료됨" 3단계 상태
- **🎨 드래그 앤 드롭**: react-beautiful-dnd를 사용한 직관적인 할일 이동
- **🔍 검색 & 필터**: 실시간 검색 및 상태별 필터링
- **💾 저장**: 로컬 스토리지를 통한 데이터 영구 보존
- **🎭 우선순위**: 높음/보통/낮음 우선순위 설정
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **🌈 현대적 UI**: 그라디언트, 그림자, 애니메이션 효과

## 🛠️ 기술 스택

### Frontend Framework

- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안정성 보장
- **Vite** - 빠른 개발 서버 및 빌드 도구

### 상태 관리

- **Recoil** - Facebook에서 개발한 React 상태 관리 라이브러리
- **Atoms & Selectors** - 컴포넌트 간 효율적인 상태 공유

### UI & 스타일링

- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 고품질 React 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **react-beautiful-dnd** - 드래그 앤 드롭 기능

### 데이터 관리

- **Local Storage** - 브라우저 로컬 스토리지 활용

## 📁 프로젝트 구조

```
react-todo-app/
├── public/                     # 정적 파일
├── src/
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                # shadcn/ui 기본 컴포넌트
│   │   │   ├── button.tsx     # 버튼 컴포넌트
│   │   │   ├── card.tsx       # 카드 컴포넌트
│   │   │   ├── input.tsx      # 입력 필드 컴포넌트
│   │   │   ├── select.tsx     # 선택 드롭다운 컴포넌트
│   │   │   └── textarea.tsx   # 텍스트 영역 컴포넌트
│   │   ├── TodoApp.tsx        # 메인 애플리케이션 컴포넌트
│   │   ├── TodoColumn.tsx     # 할일 컬럼 (드롭 영역)
│   │   ├── TodoItem.tsx       # 개별 할일 아이템 (드래그 가능)
│   │   ├── TodoForm.tsx       # 할일 추가/수정 폼
│   │   └── SearchBar.tsx      # 검색 및 필터 컴포넌트
│   ├── store/                 # Recoil 상태 관리
│   │   └── todoAtoms.ts       # Atoms & Selectors 정의
│   ├── hooks/                 # 커스텀 훅
│   │   ├── useTodoActions.ts  # 할일 관련 액션 훅
│   │   └── use-mobile.tsx     # 모바일 감지 훅
│   ├── types/                 # TypeScript 타입 정의
│   │   └── Todo.ts           # Todo 인터페이스
│   ├── lib/                  # 유틸리티 함수
│   │   └── utils.ts          # 공통 유틸리티
│   ├── App.tsx               # 루트 컴포넌트
│   ├── main.tsx              # 애플리케이션 엔트리 포인트
│   └── globals.css           # 전역 스타일
├── index.html                # HTML 템플릿
├── vite.config.ts            # Vite 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 의존성 및 스크립트
```

## 📖 사용법

### 1. 할일 추가

- "새 할일 추가" 버튼을 클릭
- 제목, 설명, 우선순위를 입력
- "추가" 버튼을 클릭하여 저장

### 2. 할일 관리

- **수정**: 할일 카드의 "수정" 버튼 클릭
- **삭제**: 할일 카드의 "삭제" 버튼 클릭
- **상태 변경**: 드래그 앤 드롭으로 다른 컬럼으로 이동

### 3. 드래그 앤 드롭

- 할일 카드를 클릭하고 드래그
- 원하는 컬럼(해야 할 일/진행 중/완료됨)으로 드롭
- 같은 컬럼 내에서 순서 변경 가능

### 4. 검색 및 필터

- 검색창에 키워드 입력으로 실시간 검색
- 상태별 필터 버튼으로 할일 분류

### 5. 데이터 관리

- **전체 삭제**: 모든 할일을 한 번에 삭제
