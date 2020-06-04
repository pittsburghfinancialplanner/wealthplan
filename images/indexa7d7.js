var Page = {
    "init": function () {
        Page.Matters.init();
        Page.Heros.init();
    },
    "Heros": {
        "__slideshowInterval": 7000,
        "__intervalId": null,
        "Elements": [],
        "Selected": 0,
        "init": function () {
            $("a[id^='hero']").each(function (index, element) {
                var text = "#".concat(element.id.concat("_wrapper"));
                var Element = { Image: $(element), Text: $(text) };
                Page.Heros.Elements.push(Element);
            });
            
            if (Page.Heros.Elements.length > 1) {
                $("#nextHero").click(Page.Heros.next);
                $("#previousHero").click(Page.Heros.previousArrow);
            } else {
                $("#nextHero").hide();
                $("#previousHero").hide();
            }

            if (Page.Heros.Elements.length > 1) {
                this.setInterval();
            }
            if (Page.Heros.Elements.length != 0) {
              $next = this.Elements[this.Selected].Image;
              Page.Heros.setBackgroundImage($next);
            }

        },
        "previousArrow": function (event) {
            Page.Heros.resetElementStates();
            var heroId = Page.Heros.Selected;
            var lastHeroId = Page.Heros.Elements.length - 1;
            var isFirst = heroId == 0;
            var previous;

            if (isFirst) {
                Page.Heros.setElementSelected(lastHeroId);
                Page.Heros.Selected = lastHeroId;

                previous = Page.Heros.Elements[Page.Heros.Selected].Image;
                Page.Heros.setBackgroundImage(previous);

                return false;
            }
            Page.Heros.Selected = (heroId - 1);
            Page.Heros.setElementSelected(Page.Heros.Selected);

            previous = Page.Heros.Elements[Page.Heros.Selected].Image;
            Page.Heros.setBackgroundImage(previous);

            Page.Heros.setInterval();
            return false;
        },
        "next": function (event) {
            Page.Heros.setInterval();
            Page.Heros.resetElementStates();
            Page.Heros.setNextHeroState(this);
            return false;
        },
        "resetElementStates": function () {
            $(Page.Heros.Elements).each(function () {
                this.Image.removeClass("selected");
                this.Text.removeClass("selected");
            });
        },
        "setNextHeroState": function (element) {
            var $this = this.Elements[this.Selected].Image;
            var $next;

            var heroId = (Number($this.attr("id").replace("hero", "")));
            var lastHeroId = this.Elements.length;
            var isLast = (heroId == lastHeroId);

            if (isLast) {
                this.setElementSelected(0);
                this.Selected = 0;

                $next = this.Elements[this.Selected].Image;
                Page.Heros.setBackgroundImage($next);

                return false;
            }

            this.setElementSelected(heroId);
            this.Selected = heroId;

            $next = this.Elements[this.Selected].Image;
            Page.Heros.setBackgroundImage($next);
        },
        "setElementSelected": function (id) {
            this.Elements[id].Image.addClass("selected");
            this.Elements[id].Text.addClass("selected");
        },
        "setInterval": function () {
            Page.Heros.clearInterval();

            this.__intervalId = setInterval(this.next, this.__slideshowInterval);
        },
        "clearInterval": function () {
            if (this.__intervalId != null) {
                this.__intervalId = clearInterval(this.__intervalId);
            }
        },
        "setBackgroundImage": function ($this) {
            $this.parents('.heroBackground').css('background-image', 'url(' + $this.find('img').attr('src') + ')');
        }
    },
    "Matters": {
        "init": function () {
            $("[class^='tab']").click(function () {
                Page.Matters.resetTabState();
                Page.Matters.setTabState(this);
                Page.Matters.resetContentState();
                Page.Matters.setContentState(this);

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

$(Page.init);