(function() {
  'use strict';

  /*global chrome, console*/
  chrome.contextMenus.create({
    title: 'Reload this Image',
    contexts: ['image'],
    id: 'one'
  });

  chrome.contextMenus.create({
    title: 'In this Tab',
    contexts: ['page'],
    id: 'all'
  });

  chrome.contextMenus.create({
    title: 'In all Tabs',
    contexts: ['page'],
    id: 'all_window'
  });

  function send(id, str) {
    chrome.tabs.sendMessage(id, {
      info: str
    });
  }

  function Handler(info, tab) {
    var id = info.menuItemId;
    switch (id) {
      case 'one':
      case 'all':
        send(tab.id, id);
        break;
      case 'all_window':
        chrome.tabs.query(
          {
            windowId: chrome.windows.WINDOW_ID_CURRENT
          },
          function(tabs) {
            var i = 0;
            for (i; i < tabs.length; i = i + 1) {
              send(tabs[i].id, 'all');
            }
          }
        );
        break;
    }
  }

  chrome.contextMenus.onClicked.addListener(Handler);
})();
