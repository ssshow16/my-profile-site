# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

순수 HTML/CSS/JS로 만든 개인 포트폴리오 사이트. 빌드 도구나 프레임워크 없이 브라우저에서 직접 실행된다.

## Running the Site

빌드 과정이 없으므로 로컬 HTTP 서버로 직접 실행한다 (`sections/` 폴더를 fetch로 불러오기 때문에 `file://` 프로토콜은 동작하지 않음):

```bash
python3 -m http.server 8080
# 또는
npx serve .
```

## Architecture

- **`index.html`** — 네비게이션과 `<main id="app">` 마운트 포인트만 포함. 섹션 HTML은 직접 포함하지 않음.
- **`js/main.js`** — 부트스트랩 진입점. `SECTIONS` 배열 순서대로 `sections/*.html`을 fetch하여 `#app`에 순차 삽입한 뒤 `initAll()`을 호출.
- **`sections/*.html`** — 각 섹션(hero, about, skills, projects, contact)의 독립 HTML 조각. 콘텐츠 수정은 여기서 한다.
- **`css/style.css`** — Tailwind CDN으로 커버되지 않는 커스텀 스타일 (스크롤 애니메이션, 타이핑 효과, 스킬 바, 카드 호버 등).

## Key Patterns

- **섹션 추가**: `SECTIONS` 배열에 이름 추가 → `sections/<name>.html` 파일 생성.
- **스킬 바 애니메이션**: `data-level` 속성(0-100)을 가진 `.skill-bar-fill` 요소가 뷰포트에 진입할 때 `IntersectionObserver`가 width를 적용함.
- **스크롤 페이드인**: `.fade-in-section` 클래스를 섹션에 추가하면 자동으로 등록됨. `.stagger` 자식 요소는 순차 딜레이로 나타남.
- **타이핑 텍스트**: `main.js`의 `TYPING_TEXTS` 배열을 수정.
- **콘텐츠 수정 위치**: 각 `sections/*.html` 파일 내 `<!-- ✏️ -->` 주석 참고.

## Styling

Tailwind CSS는 CDN(`https://cdn.tailwindcss.com`)으로 로드. 커스텀 클래스는 반드시 `css/style.css`에 추가한다. 색상 팔레트는 `sky-400`(#38bdf8)과 `indigo-500`(#6366f1) 기반.
