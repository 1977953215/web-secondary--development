const path = require("path");
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://10.15.111.6:8088/",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: "Vue",
      "element-ui": "ELEMENT",
    },
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.optimization.splitChunks(false);
      config.plugins.delete("extract-css");

      ["postcss", "scss", "css", "sass", "less", "stylus"].forEach((element) => {
        ["vue-modules", "vue", "normal-modules", "normal"].forEach((m) => {
          config.module
            .rule(element)
            .oneOf(m)
            .uses.delete("extract-css-loader")
            .end()
            .use("vue-style-loader")
            .loader("vue-style-loader")
            .options({
              sourceMap: false,
              shadowMode: false,
            })
            .before("css-loader");
        });
      });
    });
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 1000 * 100 * 1024 * 1024 }));
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 1024 * 100 * 1024 * 1024 }));
  },
};
