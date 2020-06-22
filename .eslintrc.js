module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'rules': {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            { 'avoidEscape': true }
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    'overrides': [{
        'files': ['**/*.spec.js'],
        'env': {
            'jest': true
        },
        'plugins': ['jest'],
        'extends': ['plugin:jest/recommended']
    }]
};
