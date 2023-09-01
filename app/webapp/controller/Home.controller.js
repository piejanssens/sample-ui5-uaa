sap.ui.define(
  [
    'sample/ui5/uaa/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/odata/v4/ODataModel',
  ],
  /**
   * @param {typeof import('sample/ui5/uaa/controller/BaseController').default} BaseController
   * @param {typeof import('sap/ui/model/Filter').default} Filter
   * @param {typeof import('sap/ui/model/FilterOperator').default} FilterOperator
   * @param {typeof import('sap/ui/model/json/JSONModel').default} JSONModel
   * @param {typeof import('sap/ui/model/odata/v4/ODataModel').default} ODataModel
   */
  function (BaseController, Filter, FilterOperator, JSONModel, ODataModel) {
    'use strict'

    return BaseController.extend('sample.ui5.uaa.controller.Home', {
      onInit: function () {
        const oView = this.getView()

        this._viewModel = new JSONModel({
          users: [],
        })

        oView.setModel(this._viewModel, 'view')

        this._employeeList = this.getView().byId('EmployeeList')

        const oModel = new ODataModel({
          operationMode: 'Server',
          synchronizationMode: 'None',
          groupId: '$direct',
          serviceUrl: '/ci/',
        })

        this._listBinding = oModel.bindList('/User')
        this._listBinding.requestContexts().then((aContexts) => {
          const aUsers = []

          for (const context of aContexts) {
            const oUser = context.getObject()

            aUsers.push({
              firstName: oUser.firstName,
              lastName: oUser.lastName,
              userId: oUser.userId,
            })
          }

          this._viewModel.setProperty('/users', aUsers)
        })
      },

      onSearch: function (oEvent) {
        const oFilter = new Filter({
          path: 'lastName',
          caseSensitive: false,
          operator: FilterOperator.StartsWith,
          value1: this.getView().byId('EmployeeSearch').getValue(),
        })
        this._employeeList.getBinding('items').filter([oFilter])
      },

      onClear: function (oEvent) {
        this._employeeList.getBinding('items').filter()
      },
    })
  },
)
