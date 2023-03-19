// const { createProxyMiddleware } = require("http-proxy-middleware");
//
// const proxy = {
//   target: "https://api.coingecko.com",
//   changeOrigin: true,
//   headers: {
//     Connection: "keep-alive",
//   },
//   // pathRewrite: {
//   //   "/coingecko": "/",
//   // },
// };
//
// module.exports = function (app) {
//   app.use("/coingecko", createProxyMiddleware(proxy));
// };
