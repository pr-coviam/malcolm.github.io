'use strict';
self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  /*
  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
    fetch(API_ENDPOINT).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }
  */


  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/anchor-icon.png';
  var tag = 'simple-push-demo-notification-tag';
  var data = {
    doge: {
        wow: 'such amaze notification data'
    },
    url: "https://pr-coviam.github.io/malcolmPush/"
  };
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data:data
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  if (Notification.prototype.hasOwnProperty('data')) {
    var url = event.notification.data.url;
    console.log(url);
    event.waitUntil(clients.openWindow(url));
  } else {
    event.waitUntil(getIdb().get(KEY_VALUE_STORE_NAME,
event.notification.tag).then(function(url) {
      // At the moment you cannot open third party URL's, a simple trick
      // is to redirect to the desired URL from a URL on your domain
      var redirectUrl = '/redirect.html?redirect=' +
        url;
      return clients.openWindow(redirectUrl);
    }));
  }

});
