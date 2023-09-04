# README

Requires

- BTP subaccount with Cloud Foundry enabled (trial is sufficient)
- CF CLI: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg
- CF CLI plugin "MultiApps": https://github.com/cloudfoundry/multiapps-cli-plugin
- CF CLI plugin "DefaultEnv": https://github.com/saphanaacademy/DefaultEnv

## Deploy

```sh
cf api <CF trial API link, e.g. https://api.cf.us10-001.hana.ondemand.com/>
cf login
npm run build
npm run deploy
```

## Setup your default-env files

```sh
cf default-env sample-ui5-uaa-app && mv default-env.json ./app
cf default-env sample-ui5-uaa-srv
```

## Run locally, cds/ui5 in parallel

Delete the `cds-plugin-ui5` dev depencency.

```sh
npm run watch
cd app && npm run serve
```

## Run locally, using `cds-plugin-ui`

```sh
npm run watch
```
