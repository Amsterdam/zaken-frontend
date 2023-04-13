module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "arrow-body-style": ["error", "as-needed"],
      "block-spacing": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "import/no-anonymous-default-export": "off",
      "no-multiple-empty-lines": ["error"],
      "object-curly-spacing": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }],
      "space-unary-ops": ["error"],
      "space-infix-ops": ["error"],
      "semi": ["error", "never"],
      "template-curly-spacing": ["error", "always"],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-indent" : ["error", 2],
      "react/jsx-key": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "none",
          requireLast: true
        },
        singleline: {
          delimiter: "comma",
          requireLast: false
        }
      }],
      "@typescript-eslint/type-annotation-spacing": ["error", {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } }
      }]
    }
}
