module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyanAccent: '#00f2ff'
      },
      boxShadow: {
        'cyber-sm': '0 0 15px rgba(0,242,255,0.25)',
        'cyber-md': '0 0 30px rgba(0,242,255,0.4)'
      }
    }
  },
  plugins: [],
}
