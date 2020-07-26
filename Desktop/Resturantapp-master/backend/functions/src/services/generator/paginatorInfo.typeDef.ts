export default function(service: any) {
  return {
    total: {
      resolver: async (context, req, currentObject, query, args) => {
        return service.getRecords(req, {
          ...args
        }, null, true);
      }
    },
  }
};