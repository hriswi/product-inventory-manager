import { products, getAvailableProducts, applyDiscountToProducts } from "./src/models";
console.log("Available products:", getAvailableProducts(products));
console.log("After 15% discount:", applyDiscountToProducts(products, 15));
