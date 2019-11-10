export default function(Query, Service, GetServiceName, FindServiceName) {
  Object.assign(Query, {
    [`${GetServiceName}`]: (root, args, context) => {
      return Service.find(Object.assign({}, context, { query: args })).then(result => result[0]);
    },
  });
  Object.assign(Query, {
    [`${FindServiceName}`]: (root, args, context) => {
      const { limit, skip } = args;
      return Service.find(
        Object.assign({}, context, { query: { $limit: limit, $skip: skip } })
      ).then(result => {
        return { total: result.length, items: result };
      });
    },
  });
}
