import App from "./App.svelte";
const app = new App({
  target: document.body,
  props: { lang: "se" },
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log(
        "💻 Service worker registered with scope:",
        registration.scope,
      );
    })
    .catch((err) => {
      console.error("❌ Service worker registration failed: ", err);
    });
}

window.addEventListener("offline", () => {
  console.log("❕Offline - cachar information");
});

window.addEventListener("online", () => {
  // Clear the "You're offline" toast, if it's open.
  console.log("⚡Online");
});

export default app;
