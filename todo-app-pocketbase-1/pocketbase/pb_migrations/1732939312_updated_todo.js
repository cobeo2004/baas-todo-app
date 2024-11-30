/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2097402128")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool1028501215",
    "name": "completed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2097402128")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool1028501215",
    "name": "isFinished",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
