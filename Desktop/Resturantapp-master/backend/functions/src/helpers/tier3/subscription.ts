import { pusher } from '../tier1/pusher';

import { JqlSubscription } from '../../services/services'

import resolverHelper from '../../helpers/tier2/resolver';

export function handleWebhook(req, res) {
  req.body.events.forEach(event => {
    if(event.name === "channel_vacated") {
      //delete table rows where channel == channel
      resolverHelper.deleteTableRow(JqlSubscription.__typename, {}, [
        {
          fields: {
            channel: { value: event.channel.replace(/^private-/, '') }
          }
        }
      ])
    }
  });

  res.send({});
}

export function handlePusherAuth(req: any, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  let presenceData = <any> null;

  if(channel.match(/^presence-/)) {
    if(req.user) {
      presenceData = {
        user_id: req.user.id,
        user_info: {
          name: 'Mr Channels',
          twitter_id: '@pusher'
        }
      };
    }
  }
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
}