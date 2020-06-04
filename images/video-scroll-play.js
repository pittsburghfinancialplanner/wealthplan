$(document).ready(function() {
    // Get media - with autoplay disabled (audio or video)
    var media = $('.js-video-autoplay').not("[autoplay='autoplay']");
    var tolerancePixel = 200;

    function checkMedia() {

        // Get current browser top and bottom
        var scrollTop = $(window).scrollTop() + tolerancePixel;
        var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

        //if ($(window).scrollTop() > $(window).height() - 10) {
        media.each(function(index, el) {

        	//see if video ended
        	$(this).on('ended', function() {
            	//console.log('Video has ended!');
            	$(this).addClass('ended');
        	});



            var yTopMedia = $(this).offset().top;
            var yBottomMedia = $(this).height() + yTopMedia;

            if (scrollTop < yBottomMedia && scrollBottom > yTopMedia) {

            	if (!$(this).hasClass('ended')) {
            		$(this).get(0).play();
            	}
                
            } else {
                $(this).get(0).pause();
            }
        });

        //}
    }
    $(document).on('scroll', checkMedia);
});