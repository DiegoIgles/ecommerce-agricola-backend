const { AppDataSource } = require("../database/data-source");
const { Cart } = require("../entity/Cart");
const { CartItem } = require("../entity/CartItem");
const { Product } = require("../entity/Product");

const cartRepo = () => AppDataSource.getRepository("Cart");
const itemRepo = () => AppDataSource.getRepository("CartItem");
const productRepo = () => AppDataSource.getRepository("Product");

const createCart = async (req, res) => {
  const { userId } = req.body;
  const cart = cartRepo().create({ userId });
  await cartRepo().save(cart);
  res.status(201).json(cart);
};

const addToCart = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  const cart = await cartRepo().findOneBy({ id: parseInt(cartId) });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  const product = await productRepo().findOneBy({ id: productId });
  if (!product) return res.status(404).json({ message: "Producto no existe" });

  const item = itemRepo().create({ cart, product, quantity });
  await itemRepo().save(item);

  res.status(201).json(item);
};

const getCart = async (req, res) => {
  const { cartId } = req.params;
  const cart = await cartRepo().findOne({
    where: { id: parseInt(cartId) },
    relations: ["items", "items.product"],
  });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  await itemRepo().delete(itemId);
  res.json({ message: "Producto eliminado del carrito" });
};

module.exports = { createCart, addToCart, getCart, removeFromCart };
