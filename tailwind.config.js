/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        light: "FiraCode_300Light",
        base: "FiraCode_400Regular",
        medium: "FiraCode_500Medium",
        semi: "FiraCode_600SemiBold",
        stronger: "FiraCode_700Bold",
      },
      boxShadow: {
        "3xl": "2px -4px 2px 2px rgb(101 163 13)",
      },
    },
  },
  plugins: [],
}
