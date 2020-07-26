import generatePaginatorTypeDef from './generator/paginator.typeDef'

import { User, Channel, Post } from './services'

import user from './user/user.typeDef'
import channel from './channel/channel.typeDef'
import post from './post/post.typeDef'

import jqlSubscription from './core/jqlSubscription.typeDef'

export const typeDefs = {
  channel,
  channelPaginator: generatePaginatorTypeDef(Channel),
  post,
  postPaginator: generatePaginatorTypeDef(Post),
  user,
  userPaginator: generatePaginatorTypeDef(User),
  jqlSubscription,
}