
window.onload = function (){

let gmailids = document.getElementsByClassName("gb_7b");
let gmailurls = document.getElementsByClassName("gb_Qb");


    let emails = [];
    for (var i = 0; i < gmailids.length; i++) {
        emails.push([gmailids[i].innerHTML,gmailurls[i].href]);
        console.log(gmailurls.href);
    }

    chrome.storage.local.set({
        "quickgmails": emails
    }, function () {
        console.log('Value is set to ' + JSON.stringify(emails));
    });

   

}
//document.getElementsByClassName("gb_Qb")[1].href
//document.getElementsByClassName("gb_7b")[2].textContent
