const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = [
  "js",
  "css",
  "svg",
  "woff",
  "ttf",
  "json",
  "html"
];

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
  outputDir: "dist", //打包目录
  indexPath: "index.html",
  configureWebpack: {
    plugins: [
      //开启gzip压缩
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8, //压缩率大于0.8的才压缩
        deleteOriginalAssets: false //是否删除原文件
      })
    ]
  },
  productionSourceMap: false, //不输出map文件
  devServer: {}
};
