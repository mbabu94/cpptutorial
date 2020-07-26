import * as Pusher from "pusher";

export const pusher = new Pusher({
  appId: 'APPID',
  key: 'KEY',
  secret: 'SECRET',
  cluster: 'cluster',
  useTLS: true
});