const { EntitySchema } = require("typeorm");

const Category = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
    imageUrl: {
    type: "varchar",
    nullable: true,
    }
  },
  relations: {
    products: {
      target: "Product",
      type: "one-to-many",
      inverseSide: "category",
    },
  },
});

module.exports = { Category };
