chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: 'content.js'
    }, function() {
        if (chrome.runtime.lastError) {
            console.warn('Cannont insert js on this page. Error', chrome.runtime.lastError);
        } else {
            chrome.tabs.insertCSS(tab.id, {
                file: 'content.css'
            }, function () {
                if (chrome.runtime.lastError) {
                    console.warn('Cannont insert css on this page. Error', chrome.runtime.lastError);
                } else {
                    chrome.tabs.sendMessage(tab.id, {action: 'RENDER_WHOIS', url: tab.url});
                }
            });
        }
    });
});
