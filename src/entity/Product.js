const { EntitySchema } = require("typeorm");

const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    price: {
      type: "decimal",
    },
    stock: {
      type: "int",
    },
    // dentro de columns:
    imageUrl: {
    type: "varchar",
    nullable: true,
    }
  },
  relations: {
    category: {
      target: "Category",
      type: "many-to-one",
      joinColumn: true,
      eager: true,
    },
  },
});

module.exports = { Product };
