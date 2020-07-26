import routerHelper from "./helpers/router";

export function process(app: any, schema) {
  app.use(function(req: any, res, next) {
    //handle jql queries
    if(req.method === "POST" && req.url === "/jql") {
      if(req.body.action in schema.rootResolvers) {
        //map from action to method + url
        req.method = schema.rootResolvers[req.body.action].method;
        req.url = schema.rootResolvers[req.body.action].route;
      } else {
        req.method = req.body.method;
        req.url = req.body.path;
      }

      req.jql = req.body.query || {};
    }
    
    next();
  });
  
  app.set('json replacer', function (key, value) {
    // undefined values are set to `null`
    if (typeof value === "undefined") {
      return null;
    }
    return value;
  });
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });
  
  app.options('*', function(req, res, next){
    res.header('Access-Control-Max-Age', "86400");
    res.sendStatus(200);
  });



  //add all resolver routes
  for(const prop in schema.rootResolvers) {
    app[schema.rootResolvers[prop].method](schema.rootResolvers[prop].route, routerHelper.externalFnWrapper(schema.rootResolvers[prop].resolver));
  }
};