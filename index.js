chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === 'RENDER_WHOIS') {
        renderWhois(message.url);
    }
});

var renderWhois = function(url) {
    var fetchWhoisData = function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handleStateChange.bind(xhr);
        var domain = getTldFromUrl();
        xhr.open('GET', 'https://jsonwhois.com/api/v1/whois?domain=' + domain, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Authorization', 'Token token=' + 'b2a0b4557211bacc425edcf47687ac36');
        xhr.send();
    };

    var handleStateChange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var formatter = new JSONFormatter(response);

            document.getElementById('domain').innerText = response.domain;
            document.getElementById('data').appendChild(formatter.render());

            document.getElementById('status').innerText = 'Completed';
        } else {
            document.getElementById('status').innerText = 'Loading...';
        }
    };

    var getTldFromUrl = function() {
        var formattedUrl = new URL(url);
        var hostParts = formattedUrl.host.split('.');
        return [hostParts[hostParts.length-2], hostParts[hostParts.length-1]].join('.');
    };

    fetchWhoisData();
};