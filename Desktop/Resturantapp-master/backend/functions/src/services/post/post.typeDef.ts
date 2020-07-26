import { Channel } from '../services'

export default {
  id: {
    mysqlOptions: {
      filterable: true
    }
  },
  author: {
    mysqlOptions: {
      addable: true,
    }
  },
  message: {
    mysqlOptions: {
      addable: true,
    }
  },
  date_created: {
    mysqlOptions: {
      addable: true,
    }
  },
  channel: {
    __typename: Channel.__typename,
    mysqlOptions: {
      addable: true,
      filterable: true,
      joinInfo: {},
    },
  },
}