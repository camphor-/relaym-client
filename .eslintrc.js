module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-undef': 'off',
    'no-console': 'warn',
    // cf) http://fpg.hateblo.jp/entry/2019/04/14/155041
    'no-restricted-globals': [
      'error',
      {
        name: 'Map',
        message: 'Use standard object.'
      }
    ]
  }
}
