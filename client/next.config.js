module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3001/:path*' // Proxy to Backend
      }
    ]
  }
}