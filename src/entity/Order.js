const { EntitySchema } = require("typeorm");

const Order = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    status: {
      type: "varchar",
      default: "pendiente", // puede ser "pendiente" o "pagado"
    },
  },
  relations: {
    items: {
      target: "OrderItem",
      type: "one-to-many",
      inverseSide: "order",
      cascade: true,
    },
  },
});

module.exports = { Order };
