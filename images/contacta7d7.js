window.Global = window.Global || {};
window.Global.FormSubmit = window.Global.FormSubmit || {};

if (typeof jQuery == "undefined") {
    throw "this page is missing the jquery javascript library.";
}

$.extend(Global.FormSubmit, {
    "init": function () {
        $("form#newsletterSignup :disabled").removeAttr("disabled");
        $("form#newsletterSignup button.disabled").removeClass("disabled");
        $("form#newsletterSignup").submit(Global.FormSubmit.submit);
    },
    "submit": function () {
        var form = $(this);
        form.find(".loading").show();
        form.find(".msg.formError").hide();
        form.find(".msg.formSuccess").hide();

        var formData = form.serialize().concat("&IsNotSpam=true");

        form.find("input").attr("disabled", "disabled");
        form.find("button[type='submit']").attr("disabled", "disabled").addClass("disabled");

        var url = this.action + "?" + formData;

        $.getJSON(url + "&callback=?", function (data) {
            if (data.success) {
                form.find("input").filter(":visible").val("");
                form.find(".msg.formSuccess").show();
            } else {
                if (typeof data.message != "undefined") {
                    form.find(".msg.formError").html(data.message).show();
                }
            }

            form.find(".loading").hide();
            form.find(":disabled").removeAttr("disabled");
            form.find("button[type='submit']").removeClass("disabled");
        });

        return false;
    }
});

$(function () {
    $("form.contactForm").submit(function () {
        var form = $(this);
        form.validate();
        if (form.valid() === false) return false;

        var url = this.action + "?" + form.serialize() + "&isNotSpam=true";

        form.find(".loading").show();
        form.find(".msg.formError").hide();
        form.find(".msg.formSuccess").hide();
        form.find(".submit").attr("disabled", true).addClass("disabled");

        $.getJSON(url + "&callback=?", function (e) {
            form.find(".loading").hide();
            if (e.success) {
                form.find(".msg.formSuccess").show();
                form.find(".submit").hide();
            }
            else {
                form.find(".msg.formError").show();
                form.find(".submit").removeAttr("disabled").removeClass("disabled");

                if (e.robot) {
                    alert(e.message);
                }
            }
        });
        return false;
    });

    $("form.requestPrivacyForm").submit(function () {
        var form = $(this);
        form.validate();
        if (form.valid() === false) return false;

        var url = this.action + "?" + form.serialize() + "&isNotSpam=true";

        form.find(".loading").show();
        form.find(".msg.formError").hide();
        form.find(".msg.formSuccess").hide();
        form.find(".submit").attr("disabled", true).addClass("disabled");

        $.getJSON(url + "&callback=?", function (e) {
            form.find(".loading").hide();
            if (e.success) {
                form.find(".msg.formSuccess").show();
                form.find(".submit").hide();
            }
            else {
                form.find(".msg.formError").show();
                form.find(".submit").removeAttr("disabled").removeClass("disabled");

                if (e.robot) {
                    alert(e.message);
                }
            }
        });

        return false;
    });

    $("form.c-referralCampaign-form").submit(function () {
        var form = $(this);
        form.validate();
        if (form.valid() === false) return false;

        var url = this.action + "?" + form.serialize() + "&isNotSpam=true";

        form.find(".o-circle__loading-animation").show();
        form.find('.c-referral__form').addClass('u-opacity-40');
        form.find(".msg.formError").hide();
        form.find(".msg.formSuccess").hide();
        form.find(".submit").attr("disabled", true).addClass("disabled");

        $.getJSON(url + "&callback=?", function (data) {
            form.find(".o-circle__loading-animation").hide();
            if (data.success) {
                form.hide();
                $().append('.c-referral__container');
                $('.c-referral__success').show();

                $('.c-referral__download').click(function () {
                    window.location = $(this).data('contenturl');
                });
            }
            else {
                form.find('.c-referral__form').removeClass('u-opacity-40');
                $('<div class="u-submission__error"><i class="c-icn__remove-x js-msg__close"></i> Sorry. We are unable to process your request at this time.</div>').prependTo('.c-referralCampaign-form');
                $(".u-submission__error").show();

                $('.js-msg__close').click(function () {

                    $(this).parent().slideUp("normal", function () {
                        $(this).remove();
                    });
                });
                //form[0].reset();
                form.find(".submit").removeAttr("disabled").removeClass("disabled");

                if (data.robot) {
                    alert(data.message);
                }
            }
        });

        return false;
    });

    // Regular expression for phone matching was taken from FMG.ContactService.IsPhoneValid so that everything matches properly.
    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1 ?[_\-\*/\\,\.]? ?)?\(?[2-9a-zA-Z][0-9a-zA-Z]{2}\)? ?[_\-\*/\\,\.]? ?[0-9a-zA-Z]{3} ?[_\-\*/\\,\.]? ?[0-9a-zA-Z]{4}[ a-wyzA-WYZ]{0,5}( ?(x|e|ex|ext)\.? ?\d{1,7})?$/);
    }, "Please enter a valid phone number");

    jQuery.validator.addMethod("require_from_group", function (value, element, options) {
        var validator = this;
        var minRequired = options[0];
        var selector = options[1];
        var validOrNot = jQuery(selector, element.form).filter(function () {
            return validator.elementValue(this);
        }).length >= minRequired;

        // remove all events in namespace require_from_group
        jQuery(selector, element.form).off('.require_from_group');

        //add the required events to trigger revalidation if setting is enabled in the validator
        if (this.settings.onkeyup) {
            jQuery(selector, element.form).on({
                'keyup.require_from_group': function (e) {
                    jQuery(selector, element.form).valid();
                }
            });
        }

        if (this.settings.onfocusin) {
            jQuery(selector, element.form).on({
                'focusin.require_from_group': function (e) {
                    jQuery(selector, element.form).valid();
                }
            });
        }

        if (this.settings.click) {
            jQuery(selector, element.form).on({
                'click.require_from_group': function (e) {
                    jQuery(selector, element.form).valid();
                }
            });
        }

        if (this.settings.onfocusout) {
            jQuery(selector, element.form).on({
                'focusout.require_from_group': function (e) {
                    jQuery(selector, element.form).valid();
                }
            });
        }

        return validOrNot;
    }, jQuery.validator.format("Please fill at least {0} of these fields."));

    $('.c-referralCampaign-form').each(function () {
        $(this).validate({
            groups: {
                referralInfo: "referralPhone referralEmail"
            },
            rules: {
                referralPhone: {
                    require_from_group: [1, '.js-contact-info-group'],
                    phoneUS: { required: '.c-referral-email: blank', required: true }
                },
                referralEmail:
                {
                    require_from_group: [1, '.js-contact-info-group'],
                    email: { required: '.c-referral-phone: blank', email: true, required: true },
                },
                referredByEmail:
                {
                    email: { email: true, required: true },
                }
            },
            messages: {
                referredByName: "Please enter your name",
                referredByEmail: {
                    required: "Please enter your email",
                    email: "Your email address does not look valid"
                },
                referralName: "Please enter your friend's name",
                referralEmail: {
                    require_from_group: "Please enter your friend's email or phone number",
                    email: "Your friend's email does not look valid"
                },
                referralPhone: {
                    require_from_group: "Please enter your friend's email or phone number"
                }
            },
            errorContainer: ".u-form__error",
            errorLabelContainer: ".u-form__error ul",
            wrapper: "li",
            errorElement: "label"
        });
    });

});

$(function () {
    $("form#unsubscribe").submit(function () {
        var form = $(this);

        var url = this.action + "&isNotSpam=true";

        form.find(".loading").show();
        form.find(".msg.formError").hide();
        form.find(".msg.formSuccess").hide();
        form.find(".submit").attr("disabled", true).addClass("disabled");

        $.getJSON(url + "&callback=?", function (e) {
            form.find(".loading").hide();
            if (e.success) {
                form.find(".msg.formSuccess").show();
            }
            else {
                form.find(".msg.formError").show();
                form.find(".submit").removeAttr("disabled").removeClass("disabled");

                if (e.robot) {
                    alert(e.message);
                }
            }
        });
        return false;
    });
});

$(Global.FormSubmit.init);