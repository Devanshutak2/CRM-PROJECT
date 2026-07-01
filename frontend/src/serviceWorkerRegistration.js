// Registers /service-worker.js so the app becomes installable (PWA).
// Safe no-op in development and on unsupported browsers.

export function registerServiceWorker() {
  if (process.env.NODE_ENV !== "production") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) => {
        console.error("Service worker registration failed:", err);
      });
  });
}
