///<reference path="../pb_data/types.d.ts" />

"use strict";

routerAdd("GET", "/api/hello/{name}", (e) => {
  const name = e.request?.pathValue("name");
  return e.json(200, { message: "Hello " + name });
});
