import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../api/api";

export default function TestRides() {
  const [drives, setDrives] = useState([]);
  const [isLive, setIsLive] = useState(false);

  const load = async () => {
    const res = await api.getTestRides();
    setDrives(res.data);
    setIsLive(res.live);
  };

  useEffect(() => {
    load();
  }, []);

  const markStatus = async (drive, status) => {
    setDrives((prev) => prev.map((d) => (d._id === drive._id ? { ...d, status } : d)));
    try {
      await api.updateTestRide(drive._id, { status });
    } catch {
      // demo mode without backend — local state already updated
    }
  };

  return (
    <div>
      <Topbar title="Test Ride Scheduler" subtitle="Today's bookings across all sales reps" isLive={isLive} />

      <div className="p-8">
        <div className="bg-white border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-mute uppercase tracking-wide bg-paper border-b border-line">
                <th className="px-5 py-3 font-display">Time</th>
                <th className="px-5 py-3 font-display">Customer</th>
                <th className="px-5 py-3 font-display">Phone</th>
                <th className="px-5 py-3 font-display">Vehicle</th>
                <th className="px-5 py-3 font-display">Rep</th>
                <th className="px-5 py-3 font-display">Status</th>
                <th className="px-5 py-3 font-display">Update</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((d) => (
                <tr key={d._id} className="border-b border-line/60 last:border-0 hover:bg-paper/60">
                  <td className="px-5 py-3 readout text-xs">{d.time}</td>
                  <td className="px-5 py-3 font-medium">{d.customerName}</td>
                  <td className="px-5 py-3 readout text-xs text-mute">{d.phone}</td>
                  <td className="px-5 py-3 text-mute">{d.vehicle}</td>
                  <td className="px-5 py-3 text-mute">{d.assignedRep}</td>
                  <td className="px-5 py-3">
                    <Badge>{d.status}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={d.status}
                      onChange={(e) => markStatus(d, e.target.value)}
                      className="border border-line rounded-md text-xs px-2 py-1"
                    >
                      {["Scheduled", "In Progress", "Done", "Cancelled"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {drives.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-mute text-sm">
                    No test rides scheduled.
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
