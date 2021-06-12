sap.ui.define([
    "sap/ui/core/UIComponent", 
    "sap/ui/Device",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "com/zwork/dabin/model/models"
    ],
    function (UIComponent, Device, Text, JSONModel, BindingMode, models) {
        "use strict";

        return UIComponent.extend("com.zwork.dabin.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing and create the views based on the url/hash
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this.setModel(models.createProductModel(), "products");

                // Create a text UI element that displays a hardcoded text string
		        //new Text({text: "Hi, my name is Harry Hawk"}).placeAt("content");

                var oModel = new JSONModel({
                    old: {
                        greetingText: "Hi, my name is Harry Hawk!",
                        panelHeaderText: "Data Binding Basics"
                    },
                    firstName: "Harry",
                    lastName: "Hawk",
                    enabled: true,
                    address: {
                        street: "Dietmar-Hopp-Allee 16",
                        city: "Walldorf",
                        zip: "69190",
                        country: "Germany"
                    },
                    salesAmount: 12345.6789,
                    currencyCode: "EUR", //"JPY",
                    priceThreshold: 20
                });

                // oModel.setDefaultBindingMode(BindingMode.OneWay);
                /*  There are two important points to understand about alterations to a model object's data binding mode:
                    - If you alter the default binding mode of a model (as in the example above), then unless you explicitly say otherwise, all binding instances created after that point in time will use the altered binding mode.
                    - Altering a model's default binding mode has no effect on already existing binding instances.
                */


                /*  Assign the model object to the SAPUI5 core
                    Set oModel to be the default model within the entire SAPUI5 core. 
                */

                // this.setModel(oModel, "main");
                this.setModel(oModel);
                /*  Models can be set on every control by calling setModel(). 
                    The model is then propagated to all aggregated child controls (and their children, and so on…). 
                    All child control will then have access to that model.
                */

            }
        });
    }
);
