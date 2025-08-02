const { AppDataSource } = require("../database/data-source");
const { Cart } = require("../entity/Cart");
const { CartItem } = require("../entity/CartItem");
const { Order } = require("../entity/Order");
const { OrderItem } = require("../entity/OrderItem");

const cartRepo = () => AppDataSource.getRepository("Cart");
const itemRepo = () => AppDataSource.getRepository("CartItem");
const orderRepo = () => AppDataSource.getRepository("Order");
const orderItemRepo = () => AppDataSource.getRepository("OrderItem");
const cartItemRepo = () => AppDataSource.getRepository("CartItem");

const createOrderFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await cartRepo().findOne({
      where: { id: parseInt(cartId) },
      relations: ["items", "items.product"],
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    if (!cart.items || cart.items.length === 0) return res.status(400).json({ message: "Carrito vacío" });

    // Crear orden
    const order = orderRepo().create({ userId: cart.userId });
    const savedOrder = await orderRepo().save(order);

    // Crear items
    const orderItems = cart.items.map(item =>
      orderItemRepo().create({
        order: savedOrder,
        product: item.product,
        quantity: item.quantity,
      })
    );

    await orderItemRepo().save(orderItems);

    // Eliminar carrito
    await itemRepo().delete({ cart: { id: cart.id } });
    await cartRepo().delete(cart.id);


// Obtener la orden completa con relaciones
const fullOrder = await orderRepo().findOne({
  where: { id: savedOrder.id },
  relations: ["items", "items.product", "items.product.category"], // incluye también categoría si es útil
});

res.status(201).json(fullOrder);
  } catch (error) {
    console.error("❌ Error al crear orden:", error);
    res.status(500).json({ message: "Error al crear orden", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderRepo().findOne({
    where: { id: parseInt(orderId) },
    relations: ["items", "items.product"],
  });

  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};
const payOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await orderRepo().findOneBy({ id: parseInt(orderId) });

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (order.status === "pagado") {
      return res.status(400).json({ message: "Esta orden ya fue pagada" });
    }

    order.status = "pagado";
    await orderRepo().save(order);

    res.json({ message: "Orden pagada exitosamente", orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: "Error al pagar la orden", error: error.message });
  }
};


module.exports = { createOrderFromCart, getOrderById, payOrder};
