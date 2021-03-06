module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  outputDir: process.env.OUTPUT_DIR || 'dist',

  assetsDir: 'assets',

  css: {
    sourceMap: true,
  },
};
