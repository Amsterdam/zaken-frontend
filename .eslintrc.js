module.exports = {
  plugins: ["unused-imports"],
  extends: [
    "react-app",
    "airbnb"
  ],
  rules: {
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
