window.Global = window.Global || {};
window.Global.PopupForm = window.Global.PopupForm || {};

function getCurrentScrollPercentage() {
    var h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";

    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

function openPopup() {
    var popup = $(".js-popup");

    popup.addClass("is-visible");
    $("html").css("overflow", "hidden");
}

if (typeof jQuery == "undefined") {
    throw "This page is missing the jQuery Javascript library.";
}

$.extend(Global.PopupForm, {
    "init": function () {
        var popup = $(".js-popup");

        // Email validator
        $.validator.addMethod("customemail", function (value, element) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
        }, "Please specify a valid email");

        $(".js-popup-form").each(function () {
            var icon = "<span class='c-validation-icon fa-stack'><i class='fa fa-fw fa-circle fa-stack-1x'></i><i class='fa fa-fw fa-times fa-stack-1x'></i></span>";

            $(this).validate({
                rules: {
                    FirstName:
                    {
                        required: true
                    },
                    LastName:
                    {
                        required: true
                    },
                    Email:
                    {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    FirstName: {
                        required: icon + "Please enter a first name"
                    },
                    LastName: {
                        required: icon + "Please enter a last name"
                    },
                    Email: {
                        required: icon + "Please enter an email address",
                        email: icon + "Please enter a valid email address"
                    }
                },
                errorElement: "label"
            });
        });

        $(".js-popup-form").on("submit", Global.PopupForm.submit);

        //$(".js-popup-close").on("click", Global.PopupForm.close);
    },
    "close": function (event) {
        event.preventDefault();
        
        var popup = $(event.currentTarget).parents(".js-popup");

        popup.css("overflow", "hidden").removeClass("is-visible");

        $("html").css("overflow", "auto");

        var popupModal = popup.find(".c-popup__modal");

        popupModal.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
            setTimeout(function () {
                popup.remove();
            }, 250);
        });
    },
    "submit": function () {
        var form = $(this);

        if (form.valid() === false) {
            return false;
        }

        form.find(".c-loading__wrapper").show();

        form.find(".msg.formError").hide();

        form.find(".msg.formSuccess").hide();

        var formAction = form.attr("action");

        var formData = form.serialize().concat("&isNotSpam=true");

        var leadGenType = form.find(".js-lead-type").val() || "";

        if (leadGenType === "Quiz" || leadGenType === "Ebook") {
            formData = formData.concat("&isPopup=true");
        }

        form.find("input").attr("disabled", "disabled");

        form.find("input[type='submit']").attr("disabled", "disabled").addClass("disabled");

        form.parents(".js-popup").find(".js-popup-close").unbind("click");

        $.getJSON(formAction + "?" + formData + "&callback=?", function (data) {
            if (data.success) {
                if (leadGenType === "Quiz") {
                    $(".js-quiz-popup").fadeIn();
                }
                else if (leadGenType === "Ebook") {
                    var ebookUrl = form.find("input[type='submit']").data("contenturl");

                    window.open(ebookUrl, "_blank");
                }

                var popup = form.parents(".js-popup");

                popup.css("overflow", "hidden").removeClass("is-visible");

                $("html").css("overflow", "auto");

                var popupModal = popup.find(".c-popup__modal");

                popupModal.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
                    setTimeout(function () {
                        popup.remove();
                    }, 250);
                });

                form.find("input").filter(":visible").val("");

                form.find(".msg.formSuccess").show();
            } else {
                if (typeof data.message !== "undefined") {
                    form.find(".msg.formError").html(data.message).show();
                }
            }

            form.find(".c-loading__wrapper").hide();

            form.find(":disabled").prop("disabled", false);

            form.find("button[type='submit']").removeClass("disabled");
        });

        return false;
    }
});

$(Global.PopupForm.init);

(function ($) {
    var timeDelay = window.Global.PopupForm.OpenOnTimeDelay,
        scrollPercentage = window.Global.PopupForm.OpenOnScrollPercentage,
        exitIntent = window.Global.PopupForm.OpenOnExitIntent;

    var popup = $(".js-popup");

    if (popup.length > 0) {
        if (timeDelay !== null && timeDelay >= 0) {
            setTimeout(function () {
                openPopup();
            }, timeDelay);
        }
        else if (scrollPercentage !== null && scrollPercentage >= 0) {
            $(document).on("scroll", function (event) {
                var percentage = getCurrentScrollPercentage();

                if (percentage >= scrollPercentage) {
                    openPopup();

                    $(event.currentTarget).off("scroll");
                }
            });
        }
        else if (exitIntent) {
            $(document).on("mouseleave", function (event) {
                if (!event.toElement && !event.relatedTarget) {
                    openPopup();

                    $(event.currentTarget).off("mouseleave");
                }
            });
        }
        else {
            openPopup();
        }
    }
})(jQuery);