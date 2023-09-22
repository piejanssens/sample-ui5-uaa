const cds = require('@sap/cds')
const LOG = cds.log('sf-extension-base')
const fs = require('fs')

class SampleUI5Uaa extends cds.ApplicationService {
  async init() {
    this.on('READ', 'User', async (req) => {
      LOG.info(`READ User`)

      const rawdata = await fs.readFileSync(`${__dirname}/users.json`, {
        encoding: 'utf8',
        flag: 'r',
      })

      const users = JSON.parse(rawdata)

      return users.User
    })

    return super.init()
  }
}

module.exports = { SampleUI5Uaa }
