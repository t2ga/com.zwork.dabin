sap.ui.define([
    "com/zwork/dabin/controller/BaseController",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
    "sap/m/ObjectAttribute"
], function (Controller, mobileLibrary, Locale, LocaleData, Currency, ObjectAttribute) {
    "use strict";

    return Controller.extend("com.zwork.dabin.controller.Overview", {
        /*
            For a detailed description of the e-mail link format, 
            see https://developer.mozilla.org/de/docs/Web/Guide/HTML/Email_linksInformation published on non SAP site.
         
            When using formatter functions, the binding is automatically switched to "one-way".
            So you can’t use a formatter function for "two-way" scenarios.
        */
        onInit: function() {
            var oMessageManager, oView;
            oView = this.getView();
            /**
             * https://sapui5.hana.ondemand.com/#/entity/sap.ui.core.message.MessageManager/sample/sap.ui.core.sample.MessageManager.BasicMessages/code/Controller.controller.js
             * 
             */
            // set message model
			oMessageManager = sap.ui.getCore().getMessageManager();
            oView.setModel(oMessageManager.getMessageModel(), "message");

			// or just do it for the whole view
			oMessageManager.registerObject(oView, true);

        },

        formatMail: function(sFirstName, sLastName) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            return mobileLibrary.URLHelper.normalizeEmail(
                sFirstName + "." + sLastName + "@example.com",
                oBundle.getText("mailSubject", [sFirstName]),
                oBundle.getText("mailBody"));
        },

        formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
            var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
            var oLocale = new Locale(sBrowserLocale);
            var oLocaleData = new LocaleData(oLocale);
            var oCurrency =  new Currency(oLocaleData.mData.currencyFormat);
            
            return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
        },

        onItemSelected: function(oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            var sPath = oContext.getPath();
            var oProductDetailPanel = this.byId("productDetailsPanel");

            oProductDetailPanel.bindElement({
                path: sPath,
                model: "products"
            });
        },

        productListFactory : function(sId, oContext) {
			var oUIControl;

			// Decide based on the data which dependent to clone
			if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
				// The item is discontinued, so use a StandardListItem
				oUIControl = this.byId("productSimple").clone(sId);
			} else {
				// The item is available, so we will create an ObjectListItem
				oUIControl = this.byId("productExtended").clone(sId);

				// The item is temporarily out of stock, so we will add a status
				if (oContext.getProperty("UnitsInStock") < 1) {
					oUIControl.addAttribute(new ObjectAttribute({
						text : {
							path: "i18n>outOfStock"
						}
					}));
				}
			}

			return oUIControl;
		}        
    });
});
