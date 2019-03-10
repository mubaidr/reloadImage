;(function() {
  'use strict'
  /*global chrome, console*/
  var clickedEl = null

  function checkSrc(src) {
    return src.indexOf('data:image') !== -1
      ? false
      : src.indexOf('?') === -1 ? '?' : '&'
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var append = 'reload=' + Math.random(),
      imgs = [],
      i = 0,
      res

    if (request.info === 'one') {
      imgs[0] = clickedEl
    } else {
      imgs = document.getElementsByTagName('img')
    }

    for (i; i < imgs.length; i = i + 1) {
      res = checkSrc(imgs[i].src)
      if (res) {
        imgs[i].src += res + append
      }
    }

    append = imgs = clickedEl = res = null
  })

  document.addEventListener(
    'mousedown',
    function(event) {
      if (event.button === 2 && event.target.tagName === 'IMG') {
        clickedEl = event.target
      }
    },
    true
  )
})()
