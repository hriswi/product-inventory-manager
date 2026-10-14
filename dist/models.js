// Part A - Interfaces and Objects
export const products = [
    { id: 1, name: "Wireless Mouse", price: 799, inStock: true, tags: ["electronics"] },
    { id: 2, name: "Mechanical Keyboard", price: 3499, inStock: false, tags: ["electronics", "gaming"] },
    { id: 3, name: "USB-C Cable", price: 299, inStock: true },
    { id: 4, name: "Laptop Stand", price: 1599, inStock: true, tags: ["office"] },
];
export function getAvailableProducts(products) {
    return products.filter((p) => p.inStock);
}
export function applyDiscountToProducts(products, discountPercent = 15) {
    return products.map((p) => ({
        ...p,
        price: Math.round(p.price * (1 - discountPercent / 100)),
        discountPercent,
    }));
}
