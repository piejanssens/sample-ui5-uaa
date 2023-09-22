sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/Device',
    './model/models',
    'sap/ui/core/ComponentSupport', // https://github.com/SAP/ui5-tooling/issues/381
  ],
  /**
   * @param {typeof import('sap/ui/core/UIComponent').default} UIComponent
   * @param {typeof import('sap/ui/Device').default} Device
   * @param {OverSampleType.ui5.uaa.models} models
   */
  function (UIComponent, Device, models) {
    'use strict'

    return UIComponent.extend('sample.ui5.uaa.Component', {
      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function (...args) {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, args)

        // set the device model
        this.setModel(models.createDeviceModel(), 'device')

        // create the views based on the url/hash
        this.getRouter().initialize()
      },

      /**
       * The component is destroyed by UI5 automatically.
       * In this method, the ErrorHandler is destroyed.
       * @public
       * @override
       */
      destroy: function (...args) {
        // call the base component's destroy function
        UIComponent.prototype.destroy.apply(this, args)
      },

      /**
       * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
       * design mode class should be set, which influences the size appearance of some controls.
       * @public
       * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
       */
      getContentDensityClass: function () {
        if (this._sContentDensityClass === undefined) {
          // check whether FLP has already set the content density class; do nothing in this case
          if (
            document.body.classList.contains('sapUiSizeCozy') ||
            document.body.classList.contains('sapUiSizeCompact')
          ) {
            this._sContentDensityClass = ''
            // @ts-ignore Device.support is not defined in the types even tough it exists; with ES module imports in regular TypeScript the named export "support" can be used - but not in JavaScript with sap.ui.define(...)
          } else if (!Device.support.touch) {
            // apply "compact" mode if touch is not supported
            this._sContentDensityClass = 'sapUiSizeCompact'
          } else {
            // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
            this._sContentDensityClass = 'sapUiSizeCozy'
          }
        }
        return this._sContentDensityClass
      },
    })
  },
)
