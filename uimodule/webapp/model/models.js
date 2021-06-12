sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        createProductModel: function () {
            var oProductModel = new JSONModel();
            oProductModel.loadData("./model/Products.json");
            return oProductModel;
        }
    };
});
