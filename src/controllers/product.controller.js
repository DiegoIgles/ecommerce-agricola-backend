const { AppDataSource } = require("../database/data-source");
const { Product } = require("../entity/Product");
const { Category } = require("../entity/Category");

const productRepo = () => AppDataSource.getRepository("Product");
const categoryRepo = () => AppDataSource.getRepository("Category");

const getAllProducts = async (req, res) => {
  const categoryId = req.query.category;

  try {
    let products;
    if (categoryId) {
      products = await productRepo().find({
        where: {
          category: { id: parseInt(categoryId) },
        },
      });
    } else {
      products = await productRepo().find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err.message });
  }
};


const createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;

  try {
    const category = await categoryRepo().findOneBy({ id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const product = productRepo().create({
      name,
      description,
      price,
      stock,
      category,
    });

    await productRepo().save(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al crear producto", error: err.message });
  }
};
const uploadProductImage = async (req, res) => {
  const { id } = req.params;
  const product = await productRepo().findOneBy({ id: parseInt(id) });

  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  if (!req.file) return res.status(400).json({ message: "No se subió imagen" });

  product.imageUrl = `/uploads/${req.file.filename}`;
  await productRepo().save(product);

  res.json({ message: "Imagen subida", imageUrl: product.imageUrl });
};

module.exports = { getAllProducts, createProduct,uploadProductImage };
