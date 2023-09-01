sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent',
    'sap/m/Dialog',
    'sap/m/MessageBox',
    'sap/m/Text',
    'sap/m/Button',
    'sap/m/DialogType',
  ],
  /**
   * @param {typeof import('sap/ui/core/mvc/Controller').default} Controller
   * @param {typeof import('sap/ui/core/routing/History').default} History
   * @param {typeof import('sap/ui/core/UIComponent').default} UIComponent
   * @param {typeof import('sap/m/Dialog').default} Dialog
   * @param {typeof import('sap/m/MessageBox').default} MessageBox
   * @param {typeof import('sap/m/Text').default} Text
   * @param {typeof import('sap/m/Button').default} Button
   * @param {typeof import('sap/m/DialogType').default} DialogType
   */
  function (Controller, History, UIComponent, Dialog, MessageBox, Text, Button, DialogType) {
    'use strict'

    return Controller.extend('sample.ui5.uaa.controller.BaseController', {
      getRouter: function () {
        return UIComponent.getRouterFor(this)
      },

      onNavBack: function (oEvent) {
        const oHistory = History.getInstance()
        const sPreviousHash = oHistory.getPreviousHash()
        if (sPreviousHash !== undefined) {
          window.history.go(-1)
        } else {
          this.getCurrentRouteInfo().arguments && this.getCurrentRouteInfo().arguments.mode
            ? this.getRouter().navTo(
                'employees',
                { mode: this.getCurrentRouteInfo().arguments.mode },
                true /* no history */,
              )
            : window.history.go(-1)
        }
      },

      getModel: function (sName) {
        // ... instead of
        return this.getView().getModel(sName)
      },

      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName)
      },

      getResourceBundle: function () {
        return this.getOwnerComponent().getModel('i18n').getResourceBundle()
      },

      openSFDeeplink: function (oEvent, sAbsPath, bNewTab = false) {
        // List of deeplinks: https://help.sap.com/docs/SAP_SUCCESSFACTORS_PLATFORM/5c6733335c434d6f81210378bbea6405/6d149a28c77a4f3da92fdc0f5dde9079.html?locale=en-US
        window.open(window.pageHeaderJsonData.defaultBaseUrl + sAbsPath, bNewTab ? '_blank' : '_self')
      },

      _handleError(oError) {
        if (oError.statusCode === 401) {
          new Dialog({
            title: 'Session Expired',
            content: new Text({
              text: 'Your login session has expired, please reload.',
            }),
            type: DialogType.Message,
            buttons: [
              new Button({
                type: 'Emphasized',
                text: 'Reload',
                press: () => {
                  location.reload()
                },
              }),
            ],
            escapeHandler: () => {},
          }).open()
        } else {
          console.log(oError)

          const oReponseError = JSON.parse(oError.responseText)
          if (oReponseError) {
            MessageBox.show(
              oReponseError.error.message.value,
              MessageBox.Icon.ERROR,
              'An error occurred, please try again and report the issue if it persists.',
            )
          } else {
            MessageBox.show(
              oError.responseText,
              MessageBox.Icon.ERROR,
              'An error occurred, please try again and report the issue if it persists.',
            )
          }
        }
      },
    })
  },
)
