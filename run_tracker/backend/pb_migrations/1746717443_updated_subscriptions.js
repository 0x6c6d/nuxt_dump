/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // remove field
  collection.fields.removeById("bool499959795")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool499959795",
    "name": "hasActiveSubscription",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
