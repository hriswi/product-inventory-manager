// Part A - Functions and Scope
export function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent) / 100;
}
export function applyBulkDiscount(prices, discountRate) {
    return prices.map((p) => calculateDiscount(p, discountRate));
}
export function scopeDemo() {
    for (let i = 0; i < 3; i++) {
        const squared = i * i; // 'i' and 'squared' exist only inside this loop block
        console.log(`Inside loop: i=${i}, squared=${squared}`); // prints 0,1,2
    }
    // console.log(i); // Error: Cannot find name 'i' (let is block-scoped)
    function inner() {
        var fnScoped = "I live in the whole function"; // var is function-scoped
        if (true) {
            var leaked = "var leaks out of the if-block";
        }
        console.log(fnScoped, "|", leaked); // works: var ignores block scope
    }
    inner();
    // console.log(fnScoped); // Error: not visible outside inner()
}
console.log(calculateDiscount(1000)); // 900 (default 10%)
console.log(calculateDiscount(1000, 25)); // 750
console.log(applyBulkDiscount([100, 200, 300], 20)); // [80, 160, 240]
scopeDemo();
