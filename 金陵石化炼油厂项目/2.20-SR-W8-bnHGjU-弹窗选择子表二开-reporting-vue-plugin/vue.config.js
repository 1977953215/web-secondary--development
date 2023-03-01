const path = require("path");
const sourceMapConfig = process.env.VUE_APP_NEEDSOURCEMAP === "false" ? {} : { devtool: "eval-source-map" };
module.exports = {
   configureWebpack: {
      ...sourceMapConfig,
   },
   devServer: {
      disableHostCheck: true,
      open: true,
      proxy: {
         "/api": {
            target: "http://10.15.70.49:18080/",
            // target: "http://10.15.111.15:12201/",
            changeOrigin: true,
            pathRewrite: {
               "/api": "",
            },
         },
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
      config.resolve.alias.set("@", resolve("./src"));
      config.module
         .rule("images")
         .use("url-loader")
         .loader("url-loader")
         .tap((options) => Object.assign(options, { limit: 10 * 100 * 1024 * 1024 }));
      config.module
         .rule("fonts")
         .use("url-loader")
         .loader("url-loader")
         .tap((options) => Object.assign(options, { limit: 10 * 100 * 1024 * 1024 }));
   },
};

function resolve(dir) {
   return path.join(__dirname, dir);
}
