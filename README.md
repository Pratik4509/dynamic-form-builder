# Dynamic Form Builder

React + TypeScript + Tailwind app that dynamically renders a multi-step form based on a runtime JSON schema.

Live demo: https://dynamic-form-builder-two-nu.vercel.app/ 
Repository: https://github.com/Pratik4509/dynamic-form-builder

## Features
- Fetches form schema at runtime (URL hardcoded in `src/api.ts`)
- Supports text, email, number, date, select, checkbox
- Dynamic validations: required, pattern, min, max, minLength, maxLength, minDate, maxDate
- Conditional visibility via `visibleWhen`
- Multi-step navigation (Next / Back / Submit)
- Submission persistence to `localStorage` with timestamp and summary

## Setup
```bash
git clone https://github.com/Pratik4509/dynamic-form-builder.git
cd dynamic-form-builder
npm install
npm run dev
