# README

Requires

- BTP subaccount with Cloud Foundry enabled (trial is sufficient)
- CF CLI: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg
- CF CLI plugin "MultiApps": https://github.com/cloudfoundry/multiapps-cli-plugin
- CF CLI plugin "DefaultEnv": https://github.com/saphanaacademy/DefaultEnv

## Deploy

```console
cf api <CF trial API link, e.g. https://api.cf.us10-001.hana.ondemand.com/>
cf login
npm run build
npm run deploy
```

## Run locally

- From root of your project:
  ```sh
  cf default-env sample-ui5-uaa-app && mv default-env.json ./app
  cf default-env sample-ui5-uaa-srv
  ```
- Open a new terminal and run `npm run watch`
- Open an additional terminal and `cd app && npm run serve`

## Workaround 401 errors

- Open the link in a new tab (this will send the request without "X-Requested-With:
  XMLHttpRequest" header and let the @sap/approuter kick off its auth flow)
- Once the UAA session exists, change the port back to 8080
