// Copy of code with two intentional type errors
function calculateDiscount(price: number, discountPercent: number = 10): number {
  return price - (price * discountPercent) / 100;
}

let price: number = "ten";                    // Error 1: string assigned to number
const result = calculateDiscount(100, 10, 5); // Error 2: too many arguments
