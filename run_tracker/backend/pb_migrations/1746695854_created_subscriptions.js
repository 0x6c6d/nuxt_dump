/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "bool499959795",
        "name": "hasActiveSubscription",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "date2150827767",
        "max": "",
        "min": "",
        "name": "subscriptionStartDate",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "date3460203099",
        "max": "",
        "min": "",
        "name": "subscriptionEndDate",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "date2080855503",
        "max": "",
        "min": "",
        "name": "lastPaymentDate",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "bool1923961287",
        "name": "autoRenew",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_3980638064",
    "indexes": [],
    "listRule": null,
    "name": "subscriptions",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064");

  return app.delete(collection);
})
