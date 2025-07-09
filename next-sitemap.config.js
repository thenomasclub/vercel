module.exports = {
  siteUrl: 'https://thenomasclub.com',
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
    await config.transform(config, '/builder'), // manually include homepage
  ],
};
