import { User } from '../services'

export default {
  id: {
    mysqlOptions: {
      filterable: true
    }
  },
  name: {
    mysqlOptions: {
      addable: true,
      updateable: true
    }
  },
  created_by: {
    __typename: User.__typename,
    mysqlOptions: {
      addable: true,
      filterable: true,
      joinInfo: {},
    },
  },
}