module.exports = {
  mode: "jit",
  purge: ["./**/*.html", "./**/*.vue", "./**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
