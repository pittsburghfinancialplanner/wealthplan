var MatterPage = {
    "init": function () {
        MatterPage.Matters.init();
    },
    "Matters": {
        "init": function () {
            $("[class^='tab']").click(function () {
                MatterPage.Matters.resetTabState();
                MatterPage.Matters.setTabState(this);
                MatterPage.Matters.resetContentState();
                MatterPage.Matters.setContentState(this);

                return false;
            });
        },
        "resetTabState": function () {
            $("[class^='tab']").each(function () {
                $(this).removeClass("selected");
            });
        },
        "setTabState": function (element) {
            $(element).addClass("selected");
        },
        "resetContentState": function () {
            $("[class^='matterContent']").each(function () {
                $(this).removeClass("selected");
            });
        },
        "setContentState": function (element) {
            var id = element.id.concat("_content");
            $("#".concat(id)).addClass("selected");
        }
    }
};

$(MatterPage.init);