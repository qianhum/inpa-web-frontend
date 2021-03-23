module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
