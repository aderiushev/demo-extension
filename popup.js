var refreshButton = document.getElementById('refresh');

refreshButton.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
};

var handleStateChange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.warn(response);

        var formatter = new JSONFormatter(response);
        document.getElementById('domain').innerText = response.domain;
        document.getElementById('data').appendChild(formatter.render());

        refreshButton.parentNode.removeChild(refreshButton);
    } else {
        refreshButton.setAttribute('disabled', 'disabled');
        refreshButton.innerText = 'Loading...';
    }
}

var getWhoisData = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange.bind(xhr);
    var url = new URL(url);
    var domain = url.protocol + '//' + url.host;
    xhr.open('GET', 'https://jsonwhois.com/api/v1/whois?domain=' + domain, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Token token=' + 'b2a0b4557211bacc425edcf47687ac36');
    xhr.send();
}

chrome.webNavigation.onCompleted.addListener(
    function(details) {
        if (details.frameId === 0) {
            getWhoisData(details.url);
        }
    }
)

