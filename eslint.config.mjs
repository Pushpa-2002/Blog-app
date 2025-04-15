import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    // For Next.js-specific rules:
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      // Disable specific rules:
      "@next/next/no-img-element": "off",       // Allows `<img>` tags
      "react/no-unescaped-entities": "off",     // Allows apostrophes
      "react-hooks/exhaustive-deps": "warn",    // Downgrade to warning
    },
  },
];
