import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../api/api";

export default function Service() {
  const [jobs, setJobs] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.getServices();
      setJobs(res.data);
      setIsLive(res.live);
    })();
  }, []);

  const markStatus = async (job, status) => {
    setJobs((prev) => prev.map((j) => (j._id === job._id ? { ...j, status } : j)));
    try {
      await api.updateService(job._id, { status });
    } catch {
      // demo mode without backend — local state already updated
    }
  };

  return (
    <div>
      <Topbar title="Service Center" subtitle="Active job cards in the workshop" isLive={isLive} />

      <div className="p-8">
        <div className="bg-white border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-mute uppercase tracking-wide bg-paper border-b border-line">
                <th className="px-5 py-3 font-display">Customer</th>
                <th className="px-5 py-3 font-display">Vehicle No.</th>
                <th className="px-5 py-3 font-display">Model</th>
                <th className="px-5 py-3 font-display">Service Type</th>
                <th className="px-5 py-3 font-display">Technician</th>
                <th className="px-5 py-3 font-display">Status</th>
                <th className="px-5 py-3 font-display">Update</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j._id} className="border-b border-line/60 last:border-0 hover:bg-paper/60">
                  <td className="px-5 py-3 font-medium">{j.customerName}</td>
                  <td className="px-5 py-3 readout text-xs text-mute">{j.vehicleNumber}</td>
                  <td className="px-5 py-3 text-mute">{j.vehicleModel}</td>
                  <td className="px-5 py-3 text-mute">{j.serviceType}</td>
                  <td className="px-5 py-3 text-mute">{j.technician}</td>
                  <td className="px-5 py-3">
                    <Badge>{j.status}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={j.status}
                      onChange={(e) => markStatus(j, e.target.value)}
                      className="border border-line rounded-md text-xs px-2 py-1"
                    >
                      {["Awaiting Parts", "In Progress", "Done"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-mute text-sm">
                    No active service jobs.
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
