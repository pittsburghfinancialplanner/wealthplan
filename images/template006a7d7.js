function viewport() {
    //CHECK ACTUAL VIEWPORT
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
}


equalheight = function (container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

    $(container).each(function () {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}


$(document).ready(function () {
    //TOGGLE FOR MOBILE NAV
    $('.navbar-toggle').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
        $('html').toggleClass('nav-expanded');
    });

    //// ADD CLASS TO PARENT NAV TABS WITH CHILDREN ////
    $('li').has('ul').find('> a:first-child').addClass('dropdown-text');
    $('.dropdown-text + a').addClass('dropdown-toggle');


    //// ADD CLASS OF SELECTED TO ACTIVE NAV ITEMS ////
    // create variable to hold current window url
    var url = window.location;


    // add class of 'selected' to nav items, works for relative and absolute hrefs
    $('nav .container ul li a').filter(function () {
        return this.href == url;
    }).addClass('selected');


    // add class of 'selected' to main nav item when submenu item is selected
    $('nav .container li li a.selected').parent().parent().siblings('a').addClass('selected');


    // run test on resize of the window
    checkSize();


    //POSITION FORWARD AND PREVIOUS ARROWS
    var leftArrowHeight = $('.backArrow').height();
    var rightArrowHeight = $('.forwardArrow').height();
    var heroHeight = $('#hero').height();

    var newHeight = (heroHeight - leftArrowHeight) / 2;


    $('.backArrow').css('top', newHeight);
    $('.forwardArrow').css('top', newHeight);


    //SET PARALLAX
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 50
    });


    // fade 'Back to top' image in and out on scroll
    $(window).scroll(function () {
        //$('.back-to-top').toggle($(document).scrollTop() > 100);
        $(document).scrollTop() > 100 ? $('.back-to-top:hidden').fadeIn() : $('.back-to-top:visible').fadeOut();
    });


    // animated scroll to top
    $('a[href=#top]').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });


    $('.section_Boxes .box .btn').css('visibility', 'visible');


    //VALIDATE CONTACT FORM PHONE NUMBER
    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/);
    }, "Please specify a valid phone number");


    $.validator.addMethod("customemail", function (value, element) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);

    },
        "Please specify a valid phone email");


    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });


    $('.contactForm').each(function () {
        $(this).validate({
            rules: {
                Phone: {

                    phoneUS: true
                },
                Email:
                {

                    email: true
                }
            },
            errorElement: "label",

        });
    });


    $('.signupForm').each(function () {
        $(this).validate({
            rules: {
                Phone: {

                    phoneUS: true
                },
                Email:
                {

                    email: true
                }
            },
            errorElement: "label",
        });
    });


    //BACKGROUND COLOR HOVER FOR BUTTONS
    $('section .sectionButton').each(function () {
        var backgroundColor = $(this).css('background-color'),
            borderColor = $(this).css('border-top-color'),
            ogFontColor = $(this).css('color'),
            backToTopColor = $('.back-to-top').css('background-color'),
            trimBackground = backgroundColor.replace(/[a-z()]/g, ''),
            array = trimBackground.split(','),
            backgroundHex = rgb2hex(backgroundColor),
            fontColorHex = rgb2hex(ogFontColor),
            borderHex = rgb2hex(borderColor),
            backToTopHex = rgb2hex(backToTopColor),
            white = "#ffffff",
            black = "#000000",
            darkenHex = shadeColor(backgroundHex, -20), //DARKEN BACKGROUND HEX
            newRGBA = "",
            alphaChannel = parseFloat(array[3]), //MAKE ALPHACHANNEL A FLOATED INT
            borderWidth = $(this).css('border-width'),
            borderWidthParse = parseInt(borderWidth);

        //CHECK IF COLOR HAS OPACITY
        if (array.length > 3 && alphaChannel != 1 || backgroundColor == 'transparent') {
            if (alphaChannel > 0 && alphaChannel < 1) {
                newRGBA = hex2rgba(shadeColor(backgroundHex, -20), alphaChannel);

                var fontColor = ogFontColor;
            } else {
                //NEW
                if (fontColorHex != white && borderWidthParse == 0) {
                    newRGBA = hex2rgba(fontColorHex, 1);
                    var fontColor = white;
                } else if (fontColorHex == white && borderWidthParse == 0) {
                    if (backgroundHex == black || backgroundHex == white) {
                        newRGBA = rgb2hex(navHex, 1);
                        var fontColor = white;
                    } else {
                        newRGBA = hex2rgba(backgroundHex, 1);
                        var fontColor = white;
                    }

                } else if (fontColorHex == white && borderWidthParse > 0 && borderHex != white) {
                    newRGBA = hex2rgba(borderHex, 1);
                    var fontColor = white;
                } else if (fontColorHex != white && borderWidthParse > 0) {
                    newRGBA = hex2rgba(fontColorHex, 1);
                    var fontColor = white;
                    var newBorder = hex2rgba(fontColorHex, 1);
                } else if (fontColorHex == white && borderHex == white && backgroundHex == white || backgroundHex == black) {
                    newRGBA = hex2rgba(backToTopHex, 1);
                    var fontColor = white;

                    var newBorder = rgb2hex(backToTopHex, 1);
                } else if (fontColorHex == white && borderHex == white && backgroundHex != white || backgroundHex != black) {
                    newRGBA = hex2rgba(backgroundHex, 1);
                    var fontColor = white;
                    var newBorder = hex2rgba(backgroundHex, 1);
                }
            }
        } else {
            darkenHex = shadeColor(backgroundHex, -20);

            newRGBA = hex2rgba(darkenHex, 1);

            var fontColor = ogFontColor;
            var darkenBorder = shadeColor(borderHex, -20);

            var newBorder = darkenBorder;
        }

        $(this).hover(
            function () {
                $(this).css({
                    'background': newRGBA,
                    'color': fontColor,
                    'border-top-color': newBorder,
                    'border-right-color': newBorder, 
                    'border-bottom-color': newBorder,
                    'border-left-color': newBorder
                });
            }, function () {
                $(this).css({
                    'background-color': backgroundColor,
                    'color': ogFontColor,
                    'border-top-color': borderColor,
                    'border-right-color': borderColor,
                    'border-bottom-color': borderColor,
                    'border-left-color': borderColor
                });
            }
        );
    });


    $('.sectionButtonHover').each(function () {
        var textColor = $(this).css('color'),
            textHoverColor = $(this).attr('data-hover-text-color'),

            bgColor = $(this).css('background-color'),
            bgHoverColor = $(this).attr('data-hover-bg-color'),

            borderWidth = $(this).css("border-width"),
            borderHoverWidth = $(this).attr('data-hover-border-width'),
            borderColor = $(this).css("border-color"),
            borderHoverColor = $(this).attr('data-hover-border-color');

        if (typeof textHoverColor !== typeof undefined && textHoverColor !== false) {
            $(this).on('mouseenter', function () {
                $(this).css({
                    'color': textHoverColor
                }).on('mouseleave', function () {
                    $(this).css({
                        'color': textColor
                    });
                });
            });
        }

        if (typeof bgHoverColor !== typeof undefined && bgHoverColor !== false) {
            $(this).on('mouseenter', function () {
                $(this).css({
                    'background-color': bgHoverColor
                }).on('mouseleave', function () {
                    $(this).css({
                        'background-color': bgColor
                    });
                });
            });
        }

        if (typeof borderHoverWidth !== typeof undefined && borderHoverWidth !== false) {
            $(this).on('mouseenter', function () {
                $(this).css({
                    'border-width': borderHoverWidth
                }).on('mouseleave', function () {
                    $(this).css({
                        'border-width': borderWidth
                    });
                });
            });
        }

        if (typeof borderHoverColor !== typeof undefined && borderHoverColor !== false) {
            $(this).on('mouseenter', function () {
                $(this).css({
                    'border-color': borderHoverColor
                }).on('mouseleave', function () {
                    $(this).css({
                        'border-color': borderColor
                    });
                });
            });
        }
    });
});


$(window).resize(function () {
    //RUN TOPBAR POSITIONING ON RESIZE
    checkSize();
});


function checkSize() {
    //POSITION NAV ACCORDING TO HEIGHT OF LOGO
    var logoHeight = $('.moonlight-header-logo img').height();

    var headerHeight = $('header .container').outerHeight();

    var nav = $('nav#main .container');

    var navHeight = $('nav#main .nav').outerHeight();

    var negNav = Math.abs(navHeight) * -1;

    var positionMath = (headerHeight - navHeight) / 2;

    var positionInt = parseInt(positionMath);

    var newTop = positionMath + navHeight;

    var negTop = Math.abs(newTop) * -1;

    if (viewport().width <= 991) {
        // if window is greater than 991px move top bar above header
        $('.top-bar').insertAfter('.moonlight-header-logo');

        nav.css({
            'position': 'relative',
            'top': '0'

        });
        $('.ScaleToFit.parallax').addClass('noParallaxMobile');
    } else if (viewport().width >= 992) {

        $('.top-bar').insertBefore('header');

        nav.css({
            'position': 'relative',
            'top': positionMath

        });

        $('.ScaleToFit.parallax').removeClass('noParallaxMobile');
    }
}


function hex2rgba(x, a) {
    var r = x.replace('#', '').match(/../g), g = [], i;

    for (i in r) { g.push(parseInt(r[i], 16)); } g.push(a);

    return 'rgba(' + g.join() + ')';
}


function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? "#" +

        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +

        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +

        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}


function Darken(hexColor, factor) {

    if (factor < 0) factor = 0;

    var c = hexColor;

    if (c.substr(0, 1) == "#") {

        c = c.substring(1);

    }

    if (c.length == 3 || c.length == 6) {

        var i = c.length / 3;

        var f;  // the relative distance from white

        var r = parseInt(c.substr(0, i), 16);

        f = (factor * r / (256 - r));

        r = Math.floor((256 * f) / (f + 1));

        r = r.toString(16);

        if (r.length == 1) r = "0" + r;

        var g = parseInt(c.substr(i, i), 16);

        f = (factor * g / (256 - g));

        g = Math.floor((256 * f) / (f + 1));

        g = g.toString(16);

        if (g.length == 1) g = "0" + g;

        var b = parseInt(c.substr(2 * i, i), 16);

        f = (factor * b / (256 - b));

        b = Math.floor((256 * f) / (f + 1));

        b = b.toString(16);

        if (b.length == 1) b = "0" + b;

        c = r + g + b;

    }

    return "#" + c;
}


function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}


function validate_Phone_Number(num) {
    var num = num;
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(num)) {
        return true;
    }
    else {
        return false;
    }
}