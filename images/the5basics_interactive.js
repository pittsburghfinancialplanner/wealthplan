	var fullPageCreated = false;
	$(document).ready(function() {
		/* Adding meta tags for sharing this content */
		var link_img=document.createElement('meta');
		link_img.setAttribute('prefix','og: http://ogp.me/ns#');
		link_img.setAttribute('property','og:image');
		link_img.content='https://fmg-websites-custom.s3.amazonaws.com/roymayor/the5basics/images/banners/5basicsbanner.jpg';
		document.getElementsByTagName('head')[0].prepend(link_img);

		var link_img_t=document.createElement('meta');
		link_img_t.setAttribute('prefix','og: http://ogp.me/ns#');
		link_img_t.name="twitter:image:src";
		link_img_t.setAttribute('property','twitter:image:src');
		link_img_t.content='https://fmg-websites-custom.s3.amazonaws.com/roymayor/the5basics/images/banners/5basicsbanner.jpg';
		document.getElementsByTagName('head')[0].prepend(link_img_t);

		var link_desc=document.createElement('meta');
		link_desc.setAttribute('prefix','og: http://ogp.me/ns#');
		link_desc.name="description";
		link_desc.setAttribute('property','og:description');
		link_desc.content='How literate are you when it comes to your finances? Brush up with these five basics.';
		document.getElementsByTagName('head')[0].prepend(link_desc);
		var img3 = 'https://fmg-websites-custom.s3.amazonaws.com/roymayor/the5basics/images/banners/5basicsbanner.jpg';
		$('meta[property=og\\:image]').attr('content', img3);





/* Scroll Activate Animation */

$(window).scroll(function () {
    $('.rollercoasterdiv').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("rollercoaster");
        } else {
            $(this).removeClass("rollercoaster");
        }
    });

		$('.walking_mandiv').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("walking_man");
        } else {
            $(this).removeClass("walking_man");
        }
    });

		$('.handhourglassdiv').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("handhourglass");
        } else {
            $(this).removeClass("handhourglass");
        }
    });
		$('.lettersfallingdiv').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("lettersfalling");
        } else {
            $(this).removeClass("lettersfalling");
        }
    });
});

/* Slide 5. Identity theft and safety | Robber Animation */
/* Blink Script */

const red = document.querySelector('#blink_me');

function setProperty(duration) {
  red.style.setProperty('--animation-time', duration +'s');
}

function changeAnimationTime() {
  const animationDuration = Math.random();
  setProperty(animationDuration);
}

setInterval(changeAnimationTime, 1000);


/* END Blink Script */






/*
Share button
Text: Today, our thoughts are with our fallen heroes. To help us remember them, here are some reflections from a few great Americans.
Hashtag: MemorialDay

og:image
http://static.contentres.com.s3.amazonaws.com/email/campaign/emailcampaigns/holidays/memorial-day-banner.png

og:description
Today, our thoughts are with our fallen heroes. To help us remember them, here are some reflections from a few great Americans.
http://s3.amazonaws.com/static.contentres.com/email/campaign/emailcampaigns/holidays/memorial_day_asset_banner.jpg

twitter:image:src
http://static.contentres.com.s3.amazonaws.com/email/campaign/emailcampaigns/holidays/memorial-day-banner.png

*/

	/* =========================================== */
	/* == When page is opened, start fullpage.js = */
	/* =========================================== */

	if ($(window).width() <= 414) {
		console.log("Fullpage not going to start up");
		fullPageCreated = false;
		createFullpage();
	}
	else if ($(window).width() > 414) {
		console.log("Fullpage starting up");
		createFullpage();
	}
	/* Showing only the nav buttons for first section */
	// $('#fp-nav ul li').hide();

	/* makes share buttoms link to this page */
	var thisUrl = window.location.href.split('#')[0];
	var text = "How literate are you when it comes to your finances? Brush up with these five basics.";
	var hashtag = "The5BasicsOfFinancialLiteracy"
	$('.the5basics #share-buttons a.facebook').attr("href", "http://www.facebook.com/sharer.php?u=" + thisUrl);
	$('.the5basics #share-buttons a.linkedin').attr("href", "http://www.linkedin.com/shareArticle?mini=true&amp;url=" + thisUrl + "&amp;summary="+text);
	$('.the5basics #share-buttons a.twitter').attr("href", "https://twitter.com/share?url=" + thisUrl + '&text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtag));



	/* Call functions */
	loadParallaxAnimations();

	/* start at first section */
	window.location.hash="#section0";
	// window.location.hash="_";
});

/* ============================================ */
/* =       everytime window is resized,       = */
/* =       checks if its mobile               = */
/* = (dont want fullpage.js on mobile, buggy) = */
/* ============================================ */
$(window).resize(function checkIfFullPageJS() {
	if ($(window).width() <= 414) {
		console.log("Resize function: Fullpage Destroyed");
		fullPageCreated = false;
		createFullpage();
	}

	if ($(window).width() > 414) {
		console.log("Resize function: Window big enough for fullpage to exist");
		createFullpage();
	}


	/* Slide 0: Menu */
	if ($(window).width() > 991) {
	  $('#section0 .front-img').parallaxYBackwards("0%", -0.3);
	} else {
	  $('#section0 .front-img').parallaxYBackwards("15%", -0.3);
	}
	if ($(window).width() <= 414) {
	  $('#section0 .front-img').parallaxYBackwards("15%", -0.3);
	}


	/* Slide 1. Credit and debt  */
	if ($(window).width() <= 767) {
	  $('#section1 .background2').parallaxYBackwards("100%", -0.3, true, 1000, true);
	} else {
	  $('#section1 .background2').parallaxYBackwards("100%", -0.3, true, -50, true);
	}

});


/* ========================================== */
/* = FMG INTERACTIVE CODER: EDIT HERE!!!!!! = */
/* ========================================== */
/* ================================================ */
/* = Put section background colors and names here = */
/* ================================================ */
function createFullpage() {
	if((fullPageCreated === false) && ($(window).width() > 414)) {
		console.log("Fullpage Created");
		fullPageCreated = true;
		$('#fullpage').fullpage({
			// can remove anchors if you dont URL to end in #firstPage
			//anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage', '8thPage'],
			sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
			navigation: true,
			navigationPosition: 'bottom',
			navigationTooltips: ['Start', 'Credit and Debt', 'Interest', 'The Value of Time' , 'Inflation', 'Identity Theft and Safety' , 'Share This' , 'Sources'],
			fitToSection: false,
			autoScrolling: false,
			scrollOverflow: true
		});
	}
	else {
		console.log("Fullpage Already exisits");
	}
}

/* =========================================== */
/* == Destroys use of fullpage.js on mobile == */
/* =========================================== */
function destroyFullpage() {
	/* Distroy fullpage */
	$.fn.fullpage.destroy('all');
}

/* ============================================= */
/* == checks if should change overflow scroll, = */
/* == this is called everytime page is resized = */
/* ============================================= */
// EDIT: Don't think we need this anymore
function CheckScrollOverflow () {
	if ($('#fullpage').width() < 992) { // check the width (window.width() or other method)
		$.fn.fullpage.setScrollOverflow(false);
	} else {
		$.fn.fullpage.setScrollOverflow(true);
	}
}

function loadParallaxAnimations () {
	/* Slide 1: Cover */
	$('#section0 .cover-cityscape').parallax("50%", 0.1);
	if ($(window).width() > 991) { $('#section0 .front-img').parallaxYBackwards("0%", -0.3); }
	else { $('#section0 .front-img').parallaxYBackwards("15%", -0.3); }
	if ($(window).width() <= 414) { 	$('#section0 .front-img').parallaxYBackwards("15%", -0.3);	}


}
