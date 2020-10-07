// Don't open the browser during development
process.env.BROWSER = 'none';

module.exports = function ({env}) {
  return {
    babel: {
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
    webpack: {
      configure: {
        resolve: {
          modules: ['node_modules', './src'],
        },
      },
    },
  };
};
