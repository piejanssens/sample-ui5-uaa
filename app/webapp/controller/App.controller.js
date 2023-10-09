sap.ui.define(
  ['sample/ui5/uaa/controller/BaseController'],
  /**
   * @param {typeof import('sample/ui5/uaa/controller/BaseController').default} BaseController
   */
  function (BaseController) {
    'use strict'
    return BaseController.extend('sample.ui5.uaa.controller.App', {
      onInit: function () {
        // apply content density mode to root view
        const appComponent = /** @type {sap.ui.eventregistration.form.AppComponent} */ (this.getOwnerComponent())
        this.getView().addStyleClass(appComponent.getContentDensityClass())
      },
    })
  },
)
