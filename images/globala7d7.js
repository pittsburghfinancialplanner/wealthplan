(function ($) {
  window.Global = window.Global || {};
  $.extend(Global, {
    Weather: {
      init: function () {
        $(".weather").each(function () {
          var zip = $(this).find("code").text();
          if (zip) {
            var url = "//www.service-res.com/weather/v2/" + zip + "/?callback=?";
            var scope = $(this);
            $.getJSON(url, "", function (data) {
              if (data) {
                scope.find(".degree").html(data.Temperature);
                scope.find(".condition").html(data.Description);
                scope.find("img").addClass(data.Image);
                scope.show();
              };
            });
          }
        });
      }
    },
    LeavingSiteDisclaimer: {
      headerHtml: '<div class="leavingSite"><div class="header">Leaving Site Disclaimer</div>',
      footerHtml: '<div class="footer"><a class="disclaimerProceed" href="#" target="_blank">Click here to proceed</a></div></div>',
      init: function () {
        if (!$.fancybox || !FMG || !FMG.RootLocation || !FMG.LeavingSiteDisclaimer) return;
        $("body").on("click", "a", function () {
          if ($(this).hasClass("disclaimerProceed") || $(this).hasClass('fmg-bypass-disclaimer')) {
            $.fancybox.close();
            return;
          }

          var href = $(this).prop("href");
          if (href && (href.indexOf("http://") == 0 || href.indexOf("https:///") == 0)) {
            if (href.indexOf(FMG.RootLocation) == -1) {
              $.fancybox({
                content: Global.LeavingSiteDisclaimer.headerHtml + FMG.LeavingSiteDisclaimer + Global.LeavingSiteDisclaimer.footerHtml.replace("#", $(this).prop("href"))
              });
              return false;
            }
          }
        });
      }
    },
    Mobile: {
      init: function () {
        window.Global.Mobile.refreshWindow();
        $(window).resize(window.Global.Mobile.refreshWindow);

        $("nav #navButton").click(function () {
          if ($("nav ul:visible").size() == 0) {
            $("nav>.container>ul,nav>ul").show();
          } else {
            $("nav>.container>ul,nav>ul").hide();
          }
        });

        $("nav .subnavButton").click(function () {
          if ($(this).parent().siblings("ul:visible").size() == 0) {
            $(this).addClass("down");
            $(this).parent().siblings("ul").show();
          } else {
            $(this).removeClass("down");
            $(this).parent().siblings("ul").hide();
          }
        });
      },
      refreshWindow: function () {
        if ($(window).width() < 480) {
          if ($(".video-player").size()) {
            $(".video-player, .video-player embed").attr("width", "315px");
            $(".video-player, .video-player embed").attr("height", "177px");
          }
          if ($("#calcContent").size()) {
            $(".responsive").show();
            $("#calcFrame").hide()
          }
        } else {
          if ($(".video-player").size()) {
            $(".video-player, .video-player embed").attr("width", "630px");
            $(".video-player, .video-player embed").attr("height", "354px");
          }
          if ($("#calcContent").size()) {
            $(".responsive").hide();
            $("#calcFrame").show()
          }
        }
      }
    },
    Blog: {
      init: function () {
        $('a.show-all').click(function () {
          $('div.show-all').show();
          $('a.show-all').hide();
          return false;
        });
      },
    },
    FmgTokenReplacer: {
      init: function () {
        $(".fmg-token-replacer").each(function () {
          var el = $(this);
          var src = el.data("iframe-src");
          if (src) {
            src = src.replace("{PublicIdentifier}", FMG.PartyPublicIdentifier)
              .replace("{RootLocation}", encodeURIComponent(FMG.RootLocation))
              .replace("{PageURL}", encodeURIComponent(document.location));
            el.attr("src", src);
          }
        });
      },
    }
  });

  $(window.Global.Weather.init);
  $(window.Global.LeavingSiteDisclaimer.init);
  $(window.Global.Mobile.init);
  $(window.Global.Blog.init);
  $(window.Global.FmgTokenReplacer.init);

})(jQuery);

$('input.awesomplete').on('awesomplete-selectcomplete', function () {
    //
    // This selector used to use the contains keyword in a concatinated string:
    //     var selectedLi = $(".c-team-search__list--hidden li:contains('" + inputVal + "')");
    // Names with aprostrophes in them are failing because of obvious reason so I rewrote the logic
    // Moreover, the names in the list sometimes contain trailing space so I added the trim on 
    // both sides of the compare.
    //

    var inputVal = $(this).val();

    var lis = $(".c-team-search__list--hidden li");
    var selectedLi = lis.filter(function () { return $.text([this]).trim() === inputVal.trim(); });
    var newData = selectedLi.data('url');
    window.location.href = newData;
});


// REG EX
$(document).ready(function () {
    $.validator.addMethod("phoneNA", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1 ?[_\-\*/\\,\.]? ?)?\(?[2-9a-zA-Z][0-9a-zA-Z]{2}\)? ?[_\-\*/\\,\.]? ?[0-9a-zA-Z]{3} ?[_\-\*/\\,\.]? ?[0-9a-zA-Z]{4}[ a-wyzA-WYZ]{0,5}( ?(x|e|ex|ext)\.? ?\d{1,7})?$/);
    }, "Please specify a valid phone number");
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

    if (typeof textHoverColor !== typeof undefined && textColor !== false) {
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