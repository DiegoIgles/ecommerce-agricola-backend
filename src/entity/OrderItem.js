const { EntitySchema } = require("typeorm");

const OrderItem = new EntitySchema({
  name: "OrderItem",
  tableName: "order_items",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quantity: {
      type: "int",
    },
  },
  relations: {
    order: {
      target: "Order",
      type: "many-to-one",
      joinColumn: true,
    },
    product: {
      target: "Product",
      type: "many-to-one",
      eager: true,
      joinColumn: true,
    },
  },
});

module.exports = { OrderItem };
