// Part B - Product Inventory Manager (browser app)
import { products as seed, getAvailableProducts, applyDiscountToProducts } from "./models.js";
const KEY = "inventory-hriswi";
let items = load();
function load() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [...seed];
    }
    catch {
        return [...seed];
    }
}
function save() {
    try {
        localStorage.setItem(KEY, JSON.stringify(items));
    }
    catch { /* storage unavailable */ }
}
function el(id) {
    return document.getElementById(id);
}
function nextId() {
    return items.length ? Math.max(...items.map((p) => p.id)) + 1 : 1;
}
function esc(s) {
    return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
function render() {
    const q = el("search").value.trim().toLowerCase();
    const only = el("onlyStock").checked;
    let list = only ? getAvailableProducts(items) : items;
    list = list.filter((p) => !q || p.name.toLowerCase().includes(q) || (p.tags ?? []).some((t) => t.toLowerCase().includes(q)));
    el("rows").innerHTML = list.length
        ? list.map((p) => `
      <tr>
        <td>${p.id}</td><td>${esc(p.name)}</td><td>${p.price.toFixed(2)}</td>
        <td class="${p.inStock ? "in" : "out"}">${p.inStock ? "In stock" : "Out of stock"}</td>
        <td>${(p.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</td>
        <td><button class="sm" data-toggle="${p.id}">Toggle</button> <button class="sm del" data-del="${p.id}">Delete</button></td>
      </tr>`).join("")
        : `<tr><td colspan="6">No products found.</td></tr>`;
    const avail = getAvailableProducts(items).length;
    const total = items.reduce((sum, p) => sum + p.price, 0);
    el("stats").innerHTML = `
    <div class="stat"><b>${items.length}</b>Total products</div>
    <div class="stat"><b>${avail}</b>In stock</div>
    <div class="stat"><b>${items.length - avail}</b>Out of stock</div>
    <div class="stat"><b>Rs.${total.toFixed(0)}</b>Total price value</div>`;
}
el("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = el("name").value.trim();
    const price = Number(el("price").value);
    const err = el("error");
    if (!name || isNaN(price) || price < 0) {
        err.textContent = "Enter a valid name and price.";
        return;
    }
    if (items.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
        err.textContent = "Product already exists.";
        return;
    }
    err.textContent = "";
    const tags = el("tags").value.split(",").map((t) => t.trim()).filter(Boolean);
    items.push({ id: nextId(), name, price, inStock: el("stock").checked, ...(tags.length ? { tags } : {}) });
    e.target.reset();
    el("stock").checked = true;
    save();
    render();
});
el("rows").addEventListener("click", (e) => {
    const t = e.target;
    const del = t.dataset.del, tog = t.dataset.toggle;
    if (del)
        items = items.filter((p) => p.id !== Number(del));
    if (tog)
        items = items.map((p) => (p.id === Number(tog) ? { ...p, inStock: !p.inStock } : p));
    if (del || tog) {
        save();
        render();
    }
});
el("search").addEventListener("input", render);
el("onlyStock").addEventListener("change", render);
el("applyDisc").addEventListener("click", () => {
    const pct = Number(el("disc").value);
    if (isNaN(pct) || pct < 0 || pct > 100)
        return;
    // DiscountedProduct -> Product (drop discountPercent) after discount applied
    items = applyDiscountToProducts(items, pct).map(({ discountPercent, ...p }) => p);
    save();
    render();
});
render();
