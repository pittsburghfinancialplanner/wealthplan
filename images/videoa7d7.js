var Video = {
  init: function () {
    Video.setClickEvent();
  },
  setClickEvent: function () {
    $("h3>a.video,section>a.video,a.introVideo").each(function (i) {
      var element = $(this);
      if (element.attr("data-id")) {
        element.click(function () {

            $.fancybox.showActivity();
            if (FMG.HtTrack) {
              $.fancybox($("div#video_" + $(this).attr("data-id")).html());
              return false;
            }

            var options = {
              url: FMG.RootLocation.concat("http://www.pfpria.com/resource-center/cms-srv/CmsContentService/GetAssetVideo/").concat(element.attr("data-id")),
              processData: false,
              datatype: "text",
              success: function (result) {
                $.fancybox(result);
              }
            };
            $.ajax(options);
            return false;
          
        });
      }
    });
  }
}
$(Video.init) ;