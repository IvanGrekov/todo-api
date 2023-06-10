module.exports = {
    plugins: ['import', 'promise'],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: ['./tsconfig.json'],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    rules: {
        'no-console':
            process.env.NODE_ENV === 'production'
                ? ['error', { allow: ['warn', 'error'] }]
                : ['warn', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any':
            process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'promise/no-nesting': 'error',
        'promise/no-callback-in-promise': 'error',
        'no-extra-boolean-cast': 'error',
        'no-useless-return': 'error',
        curly: ['error', 'all'],
        'newline-before-return': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        '@typescript-eslint/explicit-function-return-type': 'error',
        'linebreak-style': ['error', 'unix'],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: false,
                },
                'newlines-between': 'always',
            },
        ],
        'prefer-template': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        'prettier/prettier': [
            2,
            {
                semi: true,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 100,
                tabWidth: 4,
            },
        ],
    },
    ignorePatterns: ['.eslintrc.js'],
};
