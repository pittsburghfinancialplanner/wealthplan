
var PresentationLoad = {
  PresentationContent: "",
  init: function () {
    PresentationLoad.setClickEvent();
    PresentationLoad.Fancybox.init();
  },
  setClickEvent: function () {
    $("a.presentation-btn").each(function (i) {
      var element = $(this);
      if (element.attr("data-id")) {
        element.click(function () {
            $.fancybox.showActivity();

            if (FMG.HtTrack) {
              if (!PresentationLoad.PresentationContent) {
                PresentationLoad.PresentationContent = $("#presentationBody").html().replace(/..\/..\/..\/..\//g, ".." + "/" + ".." + "/");
                $("#presentationBody").html("");
              }
              $.fancybox({
                'content': PresentationLoad.PresentationContent,
                'speedOut': 200,
                'overlayShow': false,
                'hideOnOverlayClick': true,
                'overlayShow': true,
                'overlayOpacity': 0.8,
                'overlayColor': '#000',
                'padding': 0,
                'margin': 10
              });
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = ".." + "/" + ".." + "/static.contentres.com/site/templates/global/js/presentation" + ".js";
              document.body.appendChild(script);
              return false;
            }

            $.ajax({
              url: FMG.RootLocation.concat("http://www.pfpria.com/resource-center/cms-srv/CmsContentService/GetAssetPresentation/").concat(element.attr("data-id")),
              processData: false,
              datatype: "text",
              success: function (result) {
                $.fancybox({
                  'content': result,
                  'speedOut': 200,
                  'overlayShow': false,
                  'hideOnOverlayClick': true,
                  'overlayShow': true,
                  'overlayOpacity': 0.8,
                  'overlayColor': '#000',
                  'padding': 0,
                  'margin': 10
                });
              }
            });
            return false;
        });
      }
    });
  },
  "Fancybox": {
    "init": function () {
      $("a.video").fancybox({
        'speedOut': 200,
        'overlayShow': false,
        'hideOnOverlayClick': true,
        'overlayShow': true,
        'overlayOpacity': 0.8,
        'overlayColor': '#000'
      });
    }
  }
}
$(PresentationLoad.init);