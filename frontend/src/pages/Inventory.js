import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { api } from "../api/api";

function stockStatus(v) {
  if (v.stock <= v.criticalStockThreshold) return "Critical";
  if (v.stock <= v.lowStockThreshold) return "Low";
  return "Healthy";
}

const DOT = {
  Healthy: "bg-success",
  Low: "bg-amber",
  Critical: "bg-redline",
};

const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Inventory() {
  const [vehicles, setVehicles] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.getVehicles();
      setVehicles(res.data);
      setIsLive(res.live);
    })();
  }, []);

  return (
    <div>
      <Topbar title="Vehicle Inventory" subtitle="Real-time stock across the Sangam Motors showroom" isLive={isLive} />

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((v) => {
          const status = stockStatus(v);
          return (
            <div key={v._id} className="bg-white border border-line rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink">{v.model}</h3>
                  <p className="text-sm text-mute">{v.variant} · {v.color}</p>
                </div>
                <span className="text-3xl">{v.imageEmoji || "🚗"}</span>
              </div>

              <p className="readout text-xl text-ink">{formatPrice(v.price)}</p>

              <div className="flex items-center justify-between pt-2 border-t border-line">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${DOT[status]}`} />
                  <span className="text-xs text-mute">{status} stock</span>
                </div>
                <span className="readout text-sm text-ink">{v.stock} units</span>
              </div>
            </div>
          );
        })}
        {vehicles.length === 0 && (
          <p className="text-mute text-sm col-span-full">No vehicles in inventory yet.</p>
        )}
      </div>
    </div>
  );
}
