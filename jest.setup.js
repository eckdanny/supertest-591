function getApp() {
  if (process.env.DO_IT_LIVE) {
    const https = require("https");
    const httpProxy = require("http-proxy");
    const proxy = httpProxy.createProxyServer({});
    const app = (req, res) => {
      proxy.web(req, res, {
        target: "https://swapi.co",
        agent: https.globalAgent,
        followRedirects: true,
        changeOrigin: true,
        secure: false
      });
    };
    return app;
  } else {
    const app = require("./server");
    return app;
  }
}

global.app = getApp();
