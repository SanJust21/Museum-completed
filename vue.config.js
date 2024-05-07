module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // Configuration for Vuetify plugin options
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devServer = {
        allowedHosts: ['.aksharammuseum.com']
      };
    }
  }
};
