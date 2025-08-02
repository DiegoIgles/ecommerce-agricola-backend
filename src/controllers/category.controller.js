const { AppDataSource } = require("../database/data-source");
const { Category } = require("../entity/Category");

const categoryRepo = () => AppDataSource.getRepository("Category");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = categoryRepo().create({ name });
    await categoryRepo().save(category);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: "Error al crear categoría", error: err.message });
  }
};

const getCategories = async (req, res) => {
  const categories = await categoryRepo().find();
  res.json(categories);
};
const uploadCategoryImage = async (req, res) => {
  const { id } = req.params;
  const category = await categoryRepo().findOneBy({ id: parseInt(id) });

  if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
  if (!req.file) return res.status(400).json({ message: "No se subió imagen" });

  category.imageUrl = `/uploads/${req.file.filename}`;
  await categoryRepo().save(category);

  res.json({ message: "Imagen subida", imageUrl: category.imageUrl });
};

module.exports = { createCategory, getCategories,uploadCategoryImage };
