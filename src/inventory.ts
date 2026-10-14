// Part A - Basic Types and Variables
// Name: Hriswi

let productName: string = "Wireless Mouse";
let price: number = 799;
let inStock: boolean = true;
let tags: string[] = ["electronics", "accessories", "wireless"];
let productId: number | string = "P-1001"; // union type

export function printProductInfo(): void {
  const status: string = inStock ? "in stock" : "out of stock";
  console.log(
    `Product #${productId}: "${productName}" costs Rs.${price}, is currently ${status} and is tagged [${tags.join(", ")}].`
  );
}

// Q3: 'any' vs specific type
let quantityBefore: any = 10;
quantityBefore = "ten"; // compiler allows this silently - a bug waiting to happen

let quantity: number = 10;
// quantity = "ten"; // Error: Type 'string' is not assignable to type 'number'
// Refactored version is safer because the compiler rejects wrong-typed values at compile time instead of failing at runtime.

printProductInfo();
console.log(quantity, quantityBefore);
