// Only run autoprefixer in PostCSS for now. Tailwind is provided via CDN during dev.
module.exports = {
  plugins: {
    autoprefixer: {},
  }
}
