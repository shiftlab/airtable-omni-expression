# airtable-omni-expression

This package provides a React component, `OmniExpression`, that dynamically renders animated SVG assets with customizable primary, secondary, and tertiary colors. It's designed to be used in projects that want to display animated "Omni" character expressions and greetings. The package maps animation names (provided as enum values) to SVG files and replaces the SVG fill and gradient colors at runtime, allowing for flexible theming. Simply select an animation, set your desired colors, and embed the resulting animated component in your React app.

## Install

```bash
npm install -s git+ssh://git@github.com/shiftlab/airtable-omni-expression
```

## Usage

To use it in your React project:

```typescript
import { OmniExpression } from "@shiftlab/airtable-omni-expression";

<OmniExpression fileName="file.svg" primaryColor="#7c37ef" width={96} />;
```

## Development

```bash
npm install
npm run build
```
