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
  ```console
  cf default-env sample-ui5-uaa-app && mv default-env.json ./app``
  cf default-env sample-ui5-uaa-srv
  ```
- Open a new terminal and run `npm run watch`
- Open an additional terminal and `cd app && npm run serve`

## Workaround 401 errors

- Open the link in a new tab (this will send the request without "XMLHTTPX-Requested-With:
  XMLHttpRequest" header and let the @sap/approuter kick off its auth flow)
- Once the UAA session exists, change the port back to 8080

## BTP / SF prerequisite setup

- new subaccount with name of SF company ID (convention) (one subaccount per SF instance)
- new CF environment including name of SF company ID
- new space in CF env called 'main' (convention)
- register the SF system in the BTP global account
- entitlements to subaccount for:
  - Cloud Foundry Runtime
  - SAP SuccessFactors Extensibility
  - Application Logging
- Register SF metadata in BTP subaccount (under Trust)
- Create SF Extensibility service instance with service plan 'sso'
- Create SF Extensibility service instance with service plan 'api' and use instance name 'app-end-user' (target the correct SF instance!)
- Add the app url to the xs-security.json oauth redirect endpoints

## Update security

```console
cf update-service sample-ui5-uaa-uaa -c xs-security.json
```
