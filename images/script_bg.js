var all = document.getElementsByTagName("link");
var hrefVar;

/* search all stylesheets for template name */
for (var i=0, max=all.length; i < max; i++) {
     if(all[i].getAttribute("href").search("templates/001") != -1) { hrefVar = "delmar"; } 
     else if(all[i].getAttribute("href").search("templates/002") != -1) { hrefVar = "coronado"; }  
     else if(all[i].getAttribute("href").search("templates/003") != -1) { hrefVar = "solana"; }  
     else if(all[i].getAttribute("href").search("templates/004") != -1) { hrefVar = "cardiff"; }  
     else if(all[i].getAttribute("href").search("templates/005") != -1) { hrefVar = "northpark"; }  
     else if(all[i].getAttribute("href").search("templates/006") != -1) { hrefVar = "moonlight"; }  
     else if(all[i].getAttribute("href").search("templates/007") != -1) { hrefVar = "devtheme"; } 
}
// console.log(hrefVar);
document.getElementsByTagName("html")[0].classList.add(hrefVar);