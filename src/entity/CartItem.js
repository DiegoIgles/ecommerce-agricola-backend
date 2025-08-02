const { EntitySchema } = require("typeorm");

const CartItem = new EntitySchema({
  name: "CartItem",
  tableName: "cart_items",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quantity: {
      type: "int",
      default: 1,
    },
  },
  relations: {
    cart: {
      target: "Cart",
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

module.exports = { CartItem };
