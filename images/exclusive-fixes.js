var ss = document.styleSheets;
for (var i = 0, max = ss.length -1; i < max; i++) {
    if(ss[i].href == null) { continue; }
    else { 
        if ((ss[i].href == "https://fmg-websites-custom.s3.amazonaws.com/exclusive-setup/theme-9d-venice/css/theme-9d.css") == true) { 
            console.log("Theme: Venice"); 
            $('.body-container').closest('html').addClass('venice');
            break; 
        } 
    }
}