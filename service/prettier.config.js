module.exports = {
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'auto',
    arrowParens: 'avoid',
    bracketSpacing: true,
    overrides: [
      {
        files: '*.json',
        options: {
          printWidth: 200,
        },
      },
    ],
  };