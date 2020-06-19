// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [ 'warn', 4 ],
        'quotes': [ 'warn', 'single' ],
        'semi': [ 'warn', 'always' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'brace-style': [ 'warn' ],
        'computed-property-spacing': [ 'warn', 'never' ],
        'comma-style': [ 'warn' ]
    }
};
