// Part B - Product Inventory Manager (browser app)
import { Product, products as seed, getAvailableProducts, applyDiscountToProducts } from "./models.js";

const KEY = "inventory-hriswi";
let items: Product[] = load();

function load(): Product[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [...seed];
  } catch {
    return [...seed];
  }
}
function save(): void {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
}
function el<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}
function nextId(): number {
  return items.length ? Math.max(...items.map((p) => p.id)) + 1 : 1;
}
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function render(): void {
  const q = el<HTMLInputElement>("search").value.trim().toLowerCase();
  const only = el<HTMLInputElement>("onlyStock").checked;
  let list = only ? getAvailableProducts(items) : items;
  list = list.filter((p) => !q || p.name.toLowerCase().includes(q) || (p.tags ?? []).some((t) => t.toLowerCase().includes(q)));

  el<HTMLElement>("rows").innerHTML = list.length
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
  el<HTMLElement>("stats").innerHTML = `
    <div class="stat"><b>${items.length}</b>Total products</div>
    <div class="stat"><b>${avail}</b>In stock</div>
    <div class="stat"><b>${items.length - avail}</b>Out of stock</div>
    <div class="stat"><b>Rs.${total.toFixed(0)}</b>Total price value</div>`;
}

el<HTMLFormElement>("addForm").addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const name = el<HTMLInputElement>("name").value.trim();
  const price = Number(el<HTMLInputElement>("price").value);
  const err = el<HTMLElement>("error");
  if (!name || isNaN(price) || price < 0) { err.textContent = "Enter a valid name and price."; return; }
  if (items.some((p) => p.name.toLowerCase() === name.toLowerCase())) { err.textContent = "Product already exists."; return; }
  err.textContent = "";
  const tags = el<HTMLInputElement>("tags").value.split(",").map((t) => t.trim()).filter(Boolean);
  items.push({ id: nextId(), name, price, inStock: el<HTMLInputElement>("stock").checked, ...(tags.length ? { tags } : {}) });
  (e.target as HTMLFormElement).reset();
  el<HTMLInputElement>("stock").checked = true;
  save(); render();
});

el<HTMLElement>("rows").addEventListener("click", (e: Event) => {
  const t = e.target as HTMLElement;
  const del = t.dataset.del, tog = t.dataset.toggle;
  if (del) items = items.filter((p) => p.id !== Number(del));
  if (tog) items = items.map((p) => (p.id === Number(tog) ? { ...p, inStock: !p.inStock } : p));
  if (del || tog) { save(); render(); }
});

el<HTMLInputElement>("search").addEventListener("input", render);
el<HTMLInputElement>("onlyStock").addEventListener("change", render);
el<HTMLButtonElement>("applyDisc").addEventListener("click", () => {
  const pct = Number(el<HTMLInputElement>("disc").value);
  if (isNaN(pct) || pct < 0 || pct > 100) return;
  // DiscountedProduct -> Product (drop discountPercent) after discount applied
  items = applyDiscountToProducts(items, pct).map(({ discountPercent, ...p }) => p);
  save(); render();
});

render();
