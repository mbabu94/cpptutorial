import { Post, User, Channel } from './services/services'

export { typeDefs } from './services/typeDefs'

/*
params: {
  methods: ["get", "getMultiple", "delete", "update", "add"]
}
*/

export function generateRootResolvers(service: any, params: any) {
  const resolvers = {};
  const capitalizedClass = service.__typename.charAt(0).toUpperCase() + service.__typename.slice(1);
  params.methods.forEach((method) => {
    switch(method) {
      case "get":
        resolvers[method + capitalizedClass] = {
          method: "get",
          route: "/" + service.__typename + "/:id",
          resolver: (req) => service.getRecord(req, {
            ...req.query,
            ...req.params,
            ...req.jql?.__args
          }, req.jql)
        }
        break;
      case "getMultiple":
        resolvers[method + capitalizedClass] = {
          method: "get",
          route: "/" + service.__typename,
          resolver: (req) => service.paginator.getRecord(req, {
            ...req.query,
            ...req.params,
            ...req.jql?.__args
          }, req.jql)
        }
        break;
      case "delete":
        resolvers[method + capitalizedClass] = {
          method: "delete",
          route: "/" + service.__typename + "/:id",
          resolver: (req) => service.deleteRecord(req, {
            ...req.params,
            ...req.jql?.__args
          }, req.jql)
        }
        break;
      case "update":
        resolvers[method + capitalizedClass] = {
          method: "put",
          route: "/" + service.__typename + "/:id",
          resolver: (req) => service.updateRecord(req, {
            ...req.body,
            ...req.params,
            ...req.jql?.__args
          }, req.jql)
        }
        break;
      case "add":
        resolvers[method + capitalizedClass] = {
          method: "post",
          route: "/" + service.__typename,
          resolver: (req) => service.addRecord(req, {
            ...req.body,
            ...req.params,
            ...req.jql?.__args
          }, req.jql)
        }
        break;
    }
  });
  return resolvers;
};

export const rootResolvers = {
  ...generateRootResolvers(User, {
    methods: ["get", "getMultiple", "delete", "update", "add"]
  }),

  ...generateRootResolvers(Post, {
    methods: ["get", "getMultiple", "delete", "update", "add"]
  }),

  ...generateRootResolvers(Channel, {
    methods: ["get", "getMultiple", "delete", "update", "add"]
  }),
}