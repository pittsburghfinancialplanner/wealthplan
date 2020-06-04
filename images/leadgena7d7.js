$(document).ready(function () {

    //VALIDATE CONTACT FORM EMAIL
    $.validator.addMethod("customemail", function (value, element) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, "Please specify a valid email");

    $(".leadgen-submit").click(function () {
        var self = $(this);
        //self.attr("disabled", "disabled");
        var form = self.parent("form");
        if (form.valid()) {
            // Get parent div
            var parent = self.parent();
            var error = parent.find(".formError");
            error.html("");

            var firstName = parent.find(".leadgen-fname");
            var lastName = parent.find(".leadgen-lname");
            var email = parent.find(".leadgen-email");
            var address = parent.find(".leadgen-Address");
            var sourceUrl = parent.find(".leadgen-sourceUrl");
            var leadType = parent.find(".leadgen-leadType");
            var leadTitle = parent.find(".leadgen-leadTitle");
            
            var postData = {
                firstName: firstName.val(),
                lastName: lastName.val(),
                email: email.val(),
                sourceUrl: sourceUrl.val(),
                address: address.val(),
                leadType: leadType.val(),
                leadTitle: leadTitle.val(),
                IsNotSpam: true
            };
            var url = self.data("submiturl") + "?" + $.param(postData);
            $.getJSON(url + "&callback=?", function (data) {
                self.removeAttr("disabled");
                if (data.success) {
                    if (postData.leadType === "quizLeadGenForm") {
                        $('html').addClass('u-no-scroll');
                        var quizContent = "";
                        var quizWrapper = self.parent('.c-leadGen-form').parent().find("#quiz-modal");
                        quizContent = quizWrapper.html();

                        $('.c-modal__wrapper').fadeIn();
                    }
                    else {
                        window.location = self.data("contenturl");
                        self.after('<span class="msg formSuccess" style="display: inline;">Thank you!</span>');
                        self.hide();
                    }
                    error.html("");
                    self.parent('.c-leadGen-form').validate();
                    self.parent('.c-leadGen-form')[0].reset();
                } else {
                    error.html(data.message);
                }
            });
        }
    });

    $('.c-leadGen-form').each(function () {
        $(this).validate({
            rules: {
                Email:
                {

                    customemail: true
                }
            },
            errorElement: "label",
        });
    });

    $('.c-modal__wrapper').click(function (event) {
        if ($(event.target).is('.c-modal--close')) {
            $('html').removeClass('u-no-scroll')
            event.preventDefault();
            $(this).fadeOut(function () { $(this).remove(); });
        }
    });
});