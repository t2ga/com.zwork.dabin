sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("com.zwork.dabin.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.zwork.dabin",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
