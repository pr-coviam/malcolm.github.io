'use strict';
var website_link = "https://pr-coviam.github.io/malcolmPush/";
self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  console.log(event);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/anchor-icon.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  return clients.openWindow("https://pr-coviam.github.io/malcolmPush/");
  event.notification.close();

});
