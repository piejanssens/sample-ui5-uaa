const proxy = require('@sap/cds-odata-v2-adapter-proxy')
const cds = require('@sap/cds')

cds.on('bootstrap', (app) => {
  app.use(proxy())
  app.get('/favicon.ico', (req, res) => res.status(204))
})

module.exports = cds.server
