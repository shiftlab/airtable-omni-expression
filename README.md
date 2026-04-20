# airtable-omni-expression

This package provides a React component, `OmniExpression`, that dynamically renders animated SVG assets with customizable primary and secondary colors. It maps animation names (enum values) to bundled SVGs and replaces palette colors at runtime for flexible theming.

## Install

```bash
npm install -s git+ssh://git@github.com/shiftlab/airtable-omni-expression
```

## Usage

```typescript
import {
  OmniAnimationFileName,
  OmniExpression,
} from "@shiftlab/airtable-omni-expression";

<OmniExpression
  fileName={OmniAnimationFileName.OMNI_Expression_001_Rest}
  primaryColor="#7c37ef"
  width={96}
/>;
```

### Props

| Prop | Description |
| --- | --- |
| `fileName` | `OmniAnimationFileName` — which animation to show. |
| `primaryColor` | Theme color (hex). |
| `secondaryColor` | Optional; derived from the asset if omitted. |
| `width` / `height` | Optional size in pixels (defaults: width `96`, height proportional). |
| `prefersReducedMotion` | When `true`, renders a static snapshot instead of the animated SVG (for `prefers-reduced-motion`). |
| `shouldLoop` | Controls SMIL looping. `true`: loop like the source SVG (`repeatCount` indefinite). `false`: play once and freeze on the last frame. If omitted, **`OMNI_Greeting_*` defaults to one play**; expressions and loaders default to looping. |

`isGreetingAnimationFile(fileName)` is exported if you need the same greeting-vs-other default outside the component.

### Looping and greetings

Greeting assets are authored to finish on a resting “Omni face” frame. By default they run **once** and hold that frame; pass `shouldLoop={true}` if you need a greeting to loop indefinitely.

## Development

Build the library (outputs to `dist/`):

```bash
npm install
npm run build
```

### Local preview app (`_dev`)

A small Vite app under `_dev` links the package via `file:..` and is useful for manually checking animations and props. It is **not** published to npm.

```bash
npm install --prefix _dev   # first time only
npm run dev                   # from repo root: builds, then starts Vite (opens browser)
```

After editing library `src/`, run `npm run build` at the repo root (or use `npm run dev`, which builds first) and refresh the preview.

To run only the Vite server (skip Rollup) once `dist/` is up to date:

```bash
npm --prefix _dev run dev
```
