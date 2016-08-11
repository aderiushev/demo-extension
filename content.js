var iframeEl = top.document.getElementById('whois-iframe');

if (iframeEl) {
    switch (iframeEl.style.display) {
        case 'none':
            iframeEl.style.display = 'block';
            break;
        case 'block':
            iframeEl.style.display = 'none';
            break;
    }
} else {
    iframeEl = document.createElement('iframe');
    iframeEl.id = 'whois-iframe';
    iframeEl.src = chrome.extension.getURL('index.html');
    top.document.getElementsByTagName('body')[0].appendChild(iframeEl);
    iframeEl.style.display = 'block';


}
