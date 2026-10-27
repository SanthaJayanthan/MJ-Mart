import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext, DELIVERY_OPTIONS } from "../context/AppContext";

const BudgetTracker = () => {
  const {
    user, currency, products, cartItems,
    getCartAmount, getCartCount, navigate,
    addToCart, removeFromCart, removeItemsFromCart,
    budgetSettings, setBudgetSettings,
  } = useAppContext();
  const { pathname } = useLocation();
  const { budget, unlimited, deliveryId, distance, includeDelivery } = budgetSettings;
  const update = (patch) => setBudgetSettings((prev) => ({ ...prev, ...patch }));

  const [draft, setDraft] = useState(String(budget));
  const [selected, setSelected] = useState([]);

  // Show only on home, /products, and /products/:category (not product details)
  const segments = pathname.split("/").filter(Boolean);
  const allowedPage =
    pathname === "/" ||
    (segments[0] === "products" && segments.length <= 2);

  // Only show after login, and only on allowed pages
  if (!user || !allowedPage) return null;

  // Items in the cart
  const cartList = Object.keys(cartItems || {})
    .map((id) => {
      const product = products.find((p) => p._id === id);
      const qty = cartItems[id];
      if (!product || !qty || qty <= 0) return null;
      return { id, name: product.name, qty, price: product.offerPrice, total: product.offerPrice * qty };
    })
    .filter(Boolean);

  // Ignore selected ids that are no longer in the cart
  const selectedIds = selected.filter((id) => cartList.some((item) => item.id === id));
  const allSelected = cartList.length > 0 && selectedIds.length === cartList.length;

  const toggleItem = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () =>
    setSelected(allSelected ? [] : cartList.map((item) => item.id));

  const removeSelected = () => {
    if (selectedIds.length === 0) return toast.error("Select items to remove");
    removeItemsFromCart(selectedIds);
    setSelected([]);
    toast.success(`${selectedIds.length} item(s) removed`);
  };

  const spent = getCartAmount();
  const rate = DELIVERY_OPTIONS.find((o) => o.id === deliveryId)?.rate ?? 0;
  const deliveryFee = rate * Math.max(Number(distance) || 0, 0);
  const orderTotal = spent > 0 ? spent + deliveryFee : 0;
  const used = includeDelivery ? orderTotal : spent;
  const remaining = budget - used;
  const overBudget = !unlimited && used > budget;
  const percent = unlimited || budget <= 0 ? 0 : Math.min((used / budget) * 100, 100);
  const barColor = overBudget || percent >= 90 ? "bg-red-500" : percent >= 70 ? "bg-amber-500" : "bg-green-500";

  const money = (n) => `${currency}${Number(n).toLocaleString()}`;

  const applyBudget = () => {
    const n = Number(draft);
    if (!n || n <= 0) return toast.error("Enter a valid budget");
    update({ budget: n });
    toast.success("Budget updated");
  };

  const handleCheckout = () => {
    if (getCartCount() === 0) return toast.error("Your cart is empty");
    if (overBudget) return toast.error("You are over budget. Remove items or increase your budget.");
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  return (
    <aside className="hidden lg:block fixed right-4 top-24 z-20 w-72 max-h-[calc(100vh-7rem)] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-5">
      <h2 className="text-xl font-semibold text-gray-800">Budget Tracker</h2>

      <label className="flex items-center gap-2 mt-3 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" checked={unlimited} onChange={(e) => update({ unlimited: e.target.checked })} />
        Unlimited budget ∞
      </label>

      <div className="flex gap-2 mt-3">
        <input
          type="number"
          min="1"
          value={draft}
          disabled={unlimited}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyBudget()}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500 disabled:bg-gray-100"
        />
        <button
          onClick={applyBudget}
          disabled={unlimited}
          className="border border-gray-300 rounded-lg px-3 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
        >
          Set
        </button>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div className={`h-full transition-all duration-300 ${barColor}`} style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-3 text-sm space-y-1">
        <p className="flex justify-between text-gray-600">
          <span>Spent</span><span className="font-semibold text-gray-800">{money(used)}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span>Remaining</span>
          <span className={`font-semibold ${overBudget ? "text-red-500" : "text-gray-800"}`}>
            {unlimited ? "∞" : money(remaining)}
          </span>
        </p>
      </div>
      {overBudget && (
        <p className="text-xs text-red-500 mt-1">You are over budget by {money(Math.abs(remaining))}</p>
      )}

      <hr className="my-3 border-gray-200" />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">Items ({getCartCount()})</p>
        {cartList.length > 0 && (
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            Select all
          </label>
        )}
      </div>

      {cartList.length === 0 ? (
        <p className="text-xs text-gray-500 mt-2">No items added yet</p>
      ) : (
        <>
          <ul className="mt-2 max-h-48 overflow-y-auto space-y-3 pr-1">
            {cartList.map((item) => (
              <li key={item.id} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 cursor-pointer"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-800 truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 leading-none text-gray-700 hover:bg-gray-100 cursor-pointer"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs text-gray-800">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-6 h-6 leading-none text-gray-700 hover:bg-gray-100 cursor-pointer"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">× {money(item.price)}</span>
                  </div>
                </div>
                <span className="font-medium text-gray-800 whitespace-nowrap">{money(item.total)}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={removeSelected}
            disabled={selectedIds.length === 0}
            className="w-full mt-3 py-2 rounded-lg border border-red-300 text-red-500 text-sm hover:bg-red-50 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Remove selected{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
          </button>
        </>
      )}

      <hr className="my-3 border-gray-200" />

      <p className="text-sm font-semibold text-gray-800">Delivery</p>
      <select
        value={deliveryId}
        onChange={(e) => update({ deliveryId: e.target.value })}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 text-sm outline-indigo-500 bg-white"
      >
        {DELIVERY_OPTIONS.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>

      {rate > 0 && (
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          Distance:
          <input
            type="number"
            min="0"
            value={distance}
            onChange={(e) => update({ distance: e.target.value })}
            className="w-20 border border-gray-300 rounded-lg px-2 py-1 outline-indigo-500"
          />
          km
        </div>
      )}

      <label className="flex items-center gap-2 mt-3 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" checked={includeDelivery} onChange={(e) => update({ includeDelivery: e.target.checked })} />
        Include delivery in budget
      </label>

      <div className="mt-3 text-sm space-y-1">
        <p className="flex justify-between text-gray-600">
          <span>Delivery fee</span><span className="font-semibold text-gray-800">{money(deliveryFee)}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span>Order total</span><span className="font-semibold text-gray-800">{money(orderTotal)}</span>
        </p>
      </div>

      <hr className="my-3 border-gray-200" />

      <button
        onClick={handleCheckout}
        disabled={getCartCount() === 0 || overBudget}
        title={overBudget ? "Over budget: remove items or raise your budget" : ""}
        className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Checkout →
      </button>
      {overBudget && (
        <p className="text-xs text-red-500 mt-2 text-center">
          Checkout is blocked until you are within budget.
        </p>
      )}
    </aside>
  );
};

export default BudgetTracker;