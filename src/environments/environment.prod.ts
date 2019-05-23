export const environment = {
  production: true,
  keyPressBufferTimeInMillis: 250,
  hideTimeTravelTimeOutInMillis: 10000,
  apiUrl: 'https://conference-service.herokuapp.com/api',
  roomEndPoint: '/room',
  scheduleEndPoint: '/schedule',
  authEndPoint: '/authentication',
  settingsEndPoint: '/settings',
  notificationsEndPoint: '/notifications',
  clientEndPoint: '/client',
  heartbeat: 10,
  connectionTimer: 5,
  carouselAnimationSpeedInMillis: 750,
  carouselIntervalInMillis: 3000,
  retrieveMessageIntervalInMinutes: 1,
  roomOccupancyApiUrl: 'https://conference-service.herokuapp.com/api/rooms',
  retrieveRoomOccupancyIntervalInSeconds: 5
};
