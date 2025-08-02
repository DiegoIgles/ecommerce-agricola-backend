const { EntitySchema } = require("typeorm");

const Cart = new EntitySchema({
  name: "Cart",
  tableName: "carts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "varchar",
    },
  },
  relations: {
    items: {
      target: "CartItem",
      type: "one-to-many",
      inverseSide: "cart",
      cascade: true,
      onDelete: "CASCADE" 
    },
  },
});

module.exports = { Cart };
