import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../api/api";

const FILTERS = ["All", "Hot", "Warm", "Cold", "New"];

export default function Leads() {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLive, setIsLive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleInterest: "",
    source: "Walk-in",
    status: "New",
    assignedRep: "",
  });

  const load = async () => {
    const res = await api.getCustomers();
    setCustomers(res.data);
    setIsLive(res.live);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered =
    filter === "All" ? customers : customers.filter((c) => c.status === filter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addCustomer(form);
      setShowForm(false);
      setForm({ name: "", phone: "", email: "", vehicleInterest: "", source: "Walk-in", status: "New", assignedRep: "" });
      load();
    } catch (err) {
      // If the backend isn't running, add it to the local view so the demo keeps moving
      setCustomers((prev) => [{ ...form, _id: `local-${Date.now()}` }, ...prev]);
      setShowForm(false);
    }
  };

  return (
    <div>
      <Topbar title="Lead Management" subtitle="Track and qualify every Sangam Motors inquiry" isLive={isLive} />

      <div className="p-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filter === f
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-mute border-line hover:border-charcoal/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 rounded-lg bg-redline text-white text-sm font-semibold hover:bg-redline/90"
          >
            {showForm ? "Cancel" : "+ Add Lead"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-line rounded-xl p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <input required placeholder="Name" className="border border-line rounded-lg px-3 py-2 text-sm col-span-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required placeholder="Phone" className="border border-line rounded-lg px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Email" className="border border-line rounded-lg px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Vehicle Interest" className="border border-line rounded-lg px-3 py-2 text-sm" value={form.vehicleInterest} onChange={(e) => setForm({ ...form, vehicleInterest: e.target.value })} />
            <select className="border border-line rounded-lg px-3 py-2 text-sm" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
              {["Walk-in", "Website", "Referral", "Phone Inquiry", "Social Media"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <select className="border border-line rounded-lg px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {["New", "Hot", "Warm", "Cold"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <input placeholder="Assigned Rep" className="border border-line rounded-lg px-3 py-2 text-sm" value={form.assignedRep} onChange={(e) => setForm({ ...form, assignedRep: e.target.value })} />
            <button type="submit" className="bg-charcoal text-white rounded-lg text-sm font-semibold px-4 py-2 col-span-2 md:col-span-1">
              Save Lead
            </button>
          </form>
        )}

        <div className="bg-white border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-mute uppercase tracking-wide bg-paper border-b border-line">
                <th className="px-5 py-3 font-display">Customer</th>
                <th className="px-5 py-3 font-display">Phone</th>
                <th className="px-5 py-3 font-display">Interest</th>
                <th className="px-5 py-3 font-display">Source</th>
                <th className="px-5 py-3 font-display">Rep</th>
                <th className="px-5 py-3 font-display">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} className="border-b border-line/60 last:border-0 hover:bg-paper/60">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3 readout text-xs text-mute">{c.phone}</td>
                  <td className="px-5 py-3 text-mute">{c.vehicleInterest}</td>
                  <td className="px-5 py-3 text-mute">{c.source}</td>
                  <td className="px-5 py-3 text-mute">{c.assignedRep}</td>
                  <td className="px-5 py-3">
                    <Badge>{c.status}</Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-mute text-sm">
                    No leads in this filter yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
