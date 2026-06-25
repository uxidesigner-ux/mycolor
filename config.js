window.MOI_CONFIG = {
  analysisEndpoint: ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "/api/analyze"
    : "",
  demoMode: ["localhost", "127.0.0.1"].includes(window.location.hostname),
  appVersion: "0.1.2"
};
