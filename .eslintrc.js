const exportSortRules = [
    // Packages. `react` related packages come first.
    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
    ['^react', '^@?\\w'],
    // For custom namespaced packages, add more groups here if needed
    ['^@interfaces?\\w'],
    ['^@components?\\w'],
    ['^@hooks?\\w'],
    ['^@layouts?\\w'],
    ['^@utils?\\w'],
    ['^@common?\\w'],
    ['^@config?\\w'],
    ['^@contexts?\\w'],
];

// eslint-disable-next-line import/no-commonjs
module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        sessionStorage: true,
        localStorage: false,
        google: true,
        gapi: true,
        dataLayer: true,
        window: true,
        document: true,
        fetch: false,
        it: true,
        expect: true,
        cExpect: true,
        assert: true,
        describe: true,
    },
    extends: ['airbnb-base', 'prettier', 'plugin:react/jsx-runtime'],
    plugins: ['prettier', 'import', 'simple-import-sort', 'react', 'react-hooks'],
    rules: {
        curly: ['error', 'all'],
        'no-shadow': [
            'error',
            {
                allow: ['props'],
            },
        ],
        'import/extensions': [
            'error',
            'never',
            {
                svg: 'always',
                css: 'always',
                mdx: 'always',
                json: 'always',
                style: 'always',
                component: 'always',
                element: 'always',
                po: 'po',
                decorator: 'always',
                entity: 'always',
                service: 'always',
                module: 'always',
                repository: 'always',
                controller: 'always',
                dto: 'always',
                util: 'always',
                pipe: 'always',
                strategy: 'always',
                constants: 'always',
                interface: 'always',
                guard: 'always',
                serializer: 'always',
                context: 'always',
            },
        ],
        'import/no-cycle': [2, { maxDepth: 1 }],
        'import/no-unresolved': 'off',
        'import/no-commonjs': [
            2,
            {
                allowRequire: true,
                allowPrimitiveModules: true,
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/named': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'sort-imports': 'off',
        'no-const-assign': 'warn',
        'no-this-before-super': 'warn',
        'no-undef': 'error',
        'no-unreachable': 'warn',
        'no-underscore-dangle': [
            'error',
            {
                allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '_allPostsMeta'],
            },
        ],
        'no-unused-vars': [
            'error',
            {
                vars: 'local',
                args: 'none',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        'constructor-super': 'warn',
        'valid-typeof': 'warn',
        'comma-spacing': 'warn',
        'computed-property-spacing': 'warn',
        'class-methods-use-this': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'quote-props': [1, 'as-needed'],
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        'no-trailing-spaces': [
            'warn',
            {
                skipBlankLines: true,
            },
        ],
        'no-use-before-define': ['off'],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
            {
                blankLine: 'always',
                prev: [
                    'multiline-const',
                    'multiline-let',
                    'multiline-var',
                    'multiline-expression',
                    'multiline-block-like',
                ],
                next: '*',
            },
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var', 'expression', 'multiline-block-like'],
                next: ['export'],
            },
            {
                blankLine: 'always',
                prev: 'directive',
                next: '*',
            },
            {
                blankLine: 'any',
                prev: 'directive',
                next: 'directive',
            },
            {
                blankLine: 'always',
                prev: 'block-like',
                next: '*',
            },
            {
                blankLine: 'always',
                prev: 'expression',
                next: '*',
            },
            {
                blankLine: 'always',
                prev: ['case', 'default'],
                next: '*',
            },
        ],
        'prefer-destructuring': [
            'error',
            {
                object: true,
                array: false,
            },
        ],
        'prefer-const': ['error'],
        'prefer-rest-params': ['error'],
        'prefer-spread': ['off'],
        'prettier/prettier': [
            'warn',
            {
                printWidth: 120,
                singleQuote: true,
                tabWidth: 4,
                semi: true,
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
        semi: ['error', 'always'],
        'func-names': [
            'error',
            'always',
            {
                generators: 'as-needed',
            },
        ],
        'import/prefer-default-export': 'off',
        'spaced-comment': 'error',
        'simple-import-sort/imports': [
            'error',
            {
                groups: exportSortRules,
            },
        ],
        'no-useless-constructor': 'off',
        'no-empty-function': [
            'error',
            {
                allow: ['constructors'],
            },
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/state-in-constructor': 'off',
        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',
        // "react/jsx-filename-extension": [1, { "allow": "as-needed", extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react/no-unescaped-entities': 'off',
        'arrow-parens': ['off', 'as-needed'],
        camelcase: 'off',
        complexity: 'off',
        'dot-notation': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined',
        ],
        'id-match': 'error',
        'max-classes-per-file': ['error', 1],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'jest/unbound-method': 'off',
        radix: 'error',
        'use-isnan': 'error',
        'require-await': ['off'],
        'no-var': ['error'],
        'no-array-constructor': ['off'],
    },
};
