import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Gauge from "../components/Gauge";
import Funnel from "../components/Funnel";
import MiniBarChart from "../components/MiniBarChart";
import Badge from "../components/Badge";
import { api } from "../api/api";
import { mockMonthlySales, monthlyTarget } from "../data/mockData";

function stockStatus(v) {
  if (v.stock <= v.criticalStockThreshold) return "Critical";
  if (v.stock <= v.lowStockThreshold) return "Low";
  return "Healthy";
}

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [testRides, setTestRides] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    (async () => {
      const c = await api.getCustomers();
      const v = await api.getVehicles();
      const t = await api.getTestRides();
      setCustomers(c.data);
      setVehicles(v.data);
      setTestRides(t.data);
      setIsLive(c.live && v.live && t.live);
    })();
  }, []);

  const totalStock = vehicles.reduce((sum, v) => sum + v.stock, 0);
  const hotLeads = customers.filter((c) => c.status === "Hot").length;
  const todaysTestRides = testRides.length;
  const lowStockCount = vehicles.filter((v) => stockStatus(v) !== "Healthy").length;

  const funnelStages = [
    { label: "New", count: customers.filter((c) => c.status === "New").length || 6 },
    { label: "Warm", count: customers.filter((c) => c.status === "Warm").length || 4 },
    { label: "Hot", count: customers.filter((c) => c.status === "Hot").length || 2 },
    { label: "Won", count: customers.filter((c) => c.status === "Won").length || 1 },
  ];

  const thisMonthUnits = mockMonthlySales[mockMonthlySales.length - 1].units;

  return (
    <div>
      <Topbar
        title="Dashboard"
        subtitle="Live overview across leads, inventory, test rides and service"
        isLive={isLive}
      />

      <div className="p-8 flex flex-col gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Leads" value={customers.length} suffix="leads" />
          <StatCard label="Hot Leads" value={hotLeads} suffix="ready to close" accent="redline" />
          <StatCard label="Vehicles in Stock" value={totalStock} suffix="units" accent="success" />
          <StatCard label="Test Rides Today" value={todaysTestRides} suffix="booked" accent="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gauge — signature element */}
          <div className="bg-white border border-line rounded-xl p-6 flex flex-col items-center justify-center tick-bg">
            <Gauge value={thisMonthUnits} max={monthlyTarget} label="Monthly Sales Target" unitLabel="units sold" />
            <p className="text-xs text-mute mt-2 text-center">
              {monthlyTarget - thisMonthUnits > 0
                ? `${monthlyTarget - thisMonthUnits} units to reach target`
                : "Target reached"}
            </p>
          </div>

          {/* Lead funnel */}
          <div className="bg-white border border-line rounded-xl p-6">
            <h3 className="font-display text-sm uppercase tracking-widest text-mute mb-4">
              Lead Funnel
            </h3>
            <Funnel stages={funnelStages} />
          </div>

          {/* Sales trend */}
          <div className="bg-white border border-line rounded-xl p-6">
            <h3 className="font-display text-sm uppercase tracking-widest text-mute mb-4">
              6-Month Sales Trend
            </h3>
            <MiniBarChart data={mockMonthlySales} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent leads */}
          <div className="bg-white border border-line rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm uppercase tracking-widest text-mute">
                Recent Leads
              </h3>
              {lowStockCount > 0 && (
                <span className="text-xs text-amber">{lowStockCount} model(s) low on stock</span>
              )}
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-mute uppercase tracking-wide border-b border-line">
                  <th className="pb-2 font-display">Name</th>
                  <th className="pb-2 font-display">Interest</th>
                  <th className="pb-2 font-display">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.slice(0, 5).map((c) => (
                  <tr key={c._id} className="border-b border-line/60 last:border-0">
                    <td className="py-2.5">{c.name}</td>
                    <td className="py-2.5 text-mute">{c.vehicleInterest}</td>
                    <td className="py-2.5">
                      <Badge>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Today's test rides */}
          <div className="bg-white border border-line rounded-xl p-6">
            <h3 className="font-display text-sm uppercase tracking-widest text-mute mb-4">
              Today's Test Rides
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-mute uppercase tracking-wide border-b border-line">
                  <th className="pb-2 font-display">Time</th>
                  <th className="pb-2 font-display">Customer</th>
                  <th className="pb-2 font-display">Vehicle</th>
                  <th className="pb-2 font-display">Status</th>
                </tr>
              </thead>
              <tbody>
                {testRides.map((t) => (
                  <tr key={t._id} className="border-b border-line/60 last:border-0">
                    <td className="py-2.5 readout text-xs">{t.time}</td>
                    <td className="py-2.5">{t.customerName}</td>
                    <td className="py-2.5 text-mute">{t.vehicle}</td>
                    <td className="py-2.5">
                      <Badge>{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
