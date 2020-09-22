


chrome.storage.local.get("quickgmails", function (result) {
        console.log('Value currently is ' + JSON.stringify(result));
        let box = document.getElementById("gmails-box");
        if(result.quickgmails){
            for (var i =0;i<result.quickgmails.length;i++){
                    box.innerHTML = box.innerHTML + "<a class='urls' data-url="+result.quickgmails[i][1]+">" + result.quickgmails[i][0] + "</a>"
            }
        }
        else{
            box.innerHTML = "<p class='error'>There are no signed in Gmail accounts or This is your first time here <a class='error-url' href='https://mail.google.com/mail/'>Click here to start</a></p>"
        }
    });

    document.addEventListener('click',function(e) {
        chrome.tabs.create({url : e.target.getAttribute("data-url") } );        
    });


