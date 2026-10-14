# Product Inventory Manager (TypeScript)


## Project structure
| File | Purpose |
|---|---|
| `src/inventory.ts` | Part A - basic types, `printProductInfo()`, `any` refactor |
| `src/functions.ts` | Part A - `calculateDiscount`, `applyBulkDiscount`, scope demo |
| `src/models.ts` | Part A - `Product`, `DiscountedProduct`, filtering and discount functions |
| `src/app.ts` | Part B - browser Inventory Manager (add, delete, toggle stock, search, filter, bulk discount) |
| `errors/errors.ts` | Intentional type errors (not part of the build) |
| `dist/` | Compiled JavaScript used by `index.html` |
| `docs/` | Compiler outputs and screenshots |
| `demo.ts` | Runs the Product functions to show output |

## Build
```
npm install -g typescript
tsc          # reads tsconfig.json, outputs to dist/
```

## Compilation output (success)
```
tsc exit code: 0   (no errors; dist/ generated)
```

## Intentional errors and fixes
```
errors/errors.ts(6,5): error TS2322: Type 'string' is not assignable to type 'number'.
errors/errors.ts(7,43): error TS2554: Expected 1-2 arguments, but got 3.
```
- **TS2322** means a string ("ten") was assigned to a variable declared as `number`; fixed by assigning a numeric value (`let price: number = 10;`).
- **TS2554** means the function was called with 3 arguments but it only accepts 1-2; fixed by removing the extra argument (`calculateDiscount(100, 10)`).

## tsconfig.json explained
- **target** (`ES2020`) sets which JavaScript version the compiler outputs, so the code runs in modern browsers.
- **strict** (`true`) turns on all strict type checks (no implicit `any`, null checks, etc.), catching many bugs at compile time.
- **outDir** (`./dist`) tells `tsc` where to place the generated `.js` files, keeping them separate from the `.ts` sources.

## Why `number` is safer than `any`
`any` switches off type checking, while `number` makes the compiler reject wrong-typed values before the code runs.

## Live page
https://hriswi.github.io/product-inventory-manager
