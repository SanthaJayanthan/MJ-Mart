import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext, DELIVERY_OPTIONS } from "../context/AppContext";

const BudgetTracker = () => {
  const { user, currency, getCartAmount, getCartCount, navigate, budgetSettings, setBudgetSettings } = useAppContext();
  const { budget, unlimited, deliveryId, distance, includeDelivery } = budgetSettings;
  const update = (patch) => setBudgetSettings((prev) => ({ ...prev, ...patch }));

  const [draft, setDraft] = useState(String(budget));

  // Only show after login
  if (!user) return null;

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
        onClick={() => { navigate("/cart"); scrollTo(0, 0); }}
        disabled={getCartCount() === 0 || overBudget}
        className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Checkout →
      </button>
    </aside>
  );
};

export default BudgetTracker;