module.exports = {
  extends: "traitify",
  rules: {
    "import/no-unresolved": "off",
    "jsx-a11y/label-has-associated-control": ["error", {}],
    "jsx-a11y/media-has-caption": "off",
    "keyword-spacing": ["error", {
      after: false,
      before: false,
      overrides: {
        as: {before: true, after: true},
        case: {before: true, after: true},
        catch: {before: true, after: false},
        const: {before: true, after: true},
        default: {before: true, after: true},
        else: {before: true, after: true},
        export: {before: true, after: true},
        from: {before: true, after: true},
        import: {before: true, after: true},
        let: {before: true, after: true},
        new: {before: true, after: true}, // Only actual change
        return: {before: true, after: true},
        this: {before: true, after: true},
        try: {before: true, after: true}
      }
    }], // Whitespace - Preference
    "no-alert": "off",
    "react/no-unescaped-entities": "off"
  }
}
