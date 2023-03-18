const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: "https://api.coingecko.com/api/v3",
  changeOrigin: true,
  // pathRewrite: {
  //   "/coingecko": "/",
  // },
};

module.exports = function (app) {
  app.use("/coingecko", createProxyMiddleware(proxy));
};
