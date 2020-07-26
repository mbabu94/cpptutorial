import { User } from '../services'

export default {
  id: {
    mysqlOptions: {
      filterable: true
    }
  },
  user: {
    __typename: User.__typename,
    mysqlOptions: {
      addable: true,
      filterable: true
    }
  },
  operation: {
    mysqlOptions: {
      addable: true,
      filterable: true
    }
  },
  args: {
    mysqlOptions: {
      addable: true,
      filterable: true
    }
  },
  query: {
    mysqlOptions: {
      addable: true,
      updateable: true
    }
  },
  channel: {
    mysqlOptions: {
      addable: true,
    }
  },
}