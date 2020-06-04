/* ==================================================== */
/* =========== Add classes for diff themes ============ */
/* ==================================================== */
var ss = document.styleSheets;
for (var i = 0, max = ss.length -1; i < max; i++) {
    if(ss[i].href == null) { continue; }
    else { 
        if ((ss[i].href == "https://fmg-websites-custom.s3.amazonaws.com/exclusive-setup/theme-23b-chelan-dev/css/fmg-style-23b.css") == true) { 
            console.log("Theme: Chelan"); 
            $('.body-container #test').closest('html').addClass('chelan');
            break; 
        } 
    }
}


$(function(){
    $('#prog-stick').affix();
})

var list;
document.addEventListener("DOMContentLoaded",load);
function load(){
    list = get("list");
    checkboxes = getTag("chkbox");
    for(var i = 0, l = checkboxes.length; i < l; i++){
        checkboxes[i].addEventListener("click", toggle);
    }
    updatePercentage();
}

function updatePercentage(){
    var checkboxes = getTag("chkbox");
    var total = checkboxes.length;
    var done = 0;
    var currentNumber;
    var currentPercentage;
    for(var i = 0, l = checkboxes.length; i < l; i++){
        if(checkboxes[i].checked){
            done++;
        }
    }
    var $ppc = $('.progress-pie-chart'),
    percent = parseInt($ppc.data('percent')),
    deg = 360*percent/100;

    currentNumber = Math.round((done/total)*10);
    currentPercentage = currentNumber * 10;

    console.log("current % = " + currentPercentage);

    if (currentNumber < 1) {
        document.getElementById("progresstxt").innerHTML = 'You\'re <span class="progresstxt-inner">'+Math.round((done/total)*10)+' steps closer </span> to retirement readiness.';
    }
    if (currentNumber > 0) {
        document.getElementById("progresstxt").innerHTML = 'Nice! You\'re <span class="progresstxt-inner">'+Math.round((done/total)*10)+' step closer </span> to retirement readiness.';
    }
    if (currentNumber > 1) {
        document.getElementById("progresstxt").innerHTML = 'Nice! You\'re <span class="progresstxt-inner">'+Math.round((done/total)*10)+' steps closer </span> to retirement readiness.';
        $('.progress').css('-webkit-box-shadow','none');
        $('.progress').css('-moz-box-shadow', 'none');
        $('.progress').css('box-shadow', 'none');
    }
    if (currentNumber > 9) {
        document.getElementById("progresstxt").innerHTML = 'Wow! You’re in great shape.<br>Well done!';
        $('.progress').css('-webkit-box-shadow', '0px 0px 5px 6px #96dce1');
        $('.progress').css('-moz-box-shadow', '0px 0px 5px 6px #96dce1');
        $('.progress').css('box-shadow', '0px 0px 5px 6px #96dce1');
    }
    $('.progress-bar').css('width', currentPercentage +'%').attr('aria-valuenow', currentPercentage);    
}

function newCheckbox(){
    var item = document.createElement('li');
    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.addEventListener("click", toggle);
    item.appendChild(chk);
    list.appendChild(item);
    updatePercentage();
}

function toggle() {
    updatePercentage();
}

function get(id){
    return document.getElementById(id);
}

function getTag(names) {
    return document.getElementsByClassName(names);
}


// Social Sharing

/* makes share buttoms link to this page */
var thisUrl = window.location.href.split('#')[0];
var text = "Pre-Retirement content goes here.";
var hashtag = "#Pre-Retirement"
$('#share-buttons a.facebook').attr("href", "http://www.facebook.com/sharer.php?u=" + thisUrl);
$('#share-buttons a.linkedin').attr("href", "http://www.linkedin.com/shareArticle?mini=true&amp;url=" + thisUrl + "&amp;summary="+text);
$('#share-buttons a.twitter').attr("href", "https://twitter.com/share?url=" + thisUrl + '&text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtag));


/* Adding meta tags for sharing this content */
var link_img=document.createElement('meta');
link_img.setAttribute('prefix','og: http://ogp.me/ns#');
link_img.setAttribute('property','og:image');
link_img.content='https://fmg-websites-custom.s3.amazonaws.com/stephanievillalobos/pre-retirement-checklist/images/pre-retirement-checklist-banner.jpg';
document.getElementsByTagName('head')[0].prepend(link_img);

var link_img_t=document.createElement('meta');
link_img_t.setAttribute('prefix','og: http://ogp.me/ns#');
link_img_t.name="twitter:image:src";
link_img_t.setAttribute('property','twitter:image:src');
link_img_t.content='https://fmg-websites-custom.s3.amazonaws.com/stephanievillalobos/pre-retirement-checklist/images/pre-retirement-checklist-banner.jpg';
document.getElementsByTagName('head')[0].prepend(link_img_t);

var link_desc=document.createElement('meta');
link_desc.setAttribute('prefix','og: http://ogp.me/ns#');
link_desc.name="description";
link_desc.setAttribute('property','og:description');
link_desc.content='Pre-Retirement content goes here.';
document.getElementsByTagName('head')[0].prepend(link_desc);
var img3 = 'https://fmg-websites-custom.s3.amazonaws.com/stephanievillalobos/pre-retirement-checklist/images/pre-retirement-checklist-banner.jpg';
$('meta[property=og\\:image]').attr('content', img3);
