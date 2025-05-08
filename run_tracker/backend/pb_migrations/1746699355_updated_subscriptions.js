/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1689669068",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "userId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool499959795",
    "name": "hasActiveSubscription",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2242645766",
    "maxSelect": 1,
    "name": "subscriptionType",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "free",
      "basic",
      "premium"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select212635077",
    "maxSelect": 1,
    "name": "subscriptionStatus",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "active",
      "expired",
      "cancelled",
      "trial"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1689669068",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "userId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool499959795",
    "name": "hasActiveSubscription",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2242645766",
    "maxSelect": 1,
    "name": "subscriptionType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "free",
      "basic",
      "premium"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select212635077",
    "maxSelect": 1,
    "name": "subscriptionStatus",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "active",
      "expired",
      "cancelled",
      "trial"
    ]
  }))

  return app.save(collection)
})
