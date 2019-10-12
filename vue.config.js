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
    ],
    //关闭文件过大提示，利于打包加快速度
    performance: {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    },
    //公共代码抽离和代码分割，避免单个js文件过大
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 30000,
            priority: 100
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 3,
            maxInitialRequests: 5,
            minSize: 30000,
            priority: 60
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true
          },
          runtimeChunk: {
            name: "manifest"
          }
        }
      }
    }
  },
  productionSourceMap: false, //不输出map文件
  devServer: {}
};
