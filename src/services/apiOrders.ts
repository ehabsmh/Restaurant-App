import { getItems, getUserCartByUserId } from "./apiCart";
import supabase from "./supabase";

export async function createOrder(userId: string) {
  // Get user cart
  const cart = await getUserCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  // insert user cart to the orders table
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .insert([{ user_id: cart.user_id, num_items: cart.num_items, total_price: cart.total_price }]).select().single();

  console.log(orders);

  if (ordersError) throw new Error(ordersError.message);

  // Reset user cart
  const { error: cartError } = await supabase
    .from('cart')
    .update({ num_items: 0, total_price: 0 })
    .eq('id', cart.id)
    .select()

  if (cartError) throw new Error(cartError.message);
  return orders;
}

export async function addOrderItems(cartId: number, orderId: number) {
  // Get user's cart items
  const cartItems = await getItems(cartId);

  // Map cartItems to orderItems
  const orderItems = cartItems.map(cartItem => ({
    order_id: orderId,
    item_id: cartItem.item_id,
    price: cartItem.price,
    price_per_quantity: cartItem.price_per_quantity,
    quantity: cartItem.quantity,
    size_id: cartItem.size_id
  }))

  // Insert mapped order items into order_items
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select()

  console.log(data);
  if (error) throw new Error(error.message);

  // Delete cart items
  const { error: cartItemsError } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);

  if (cartItemsError) throw new Error(cartItemsError.message);

  return data;
}
