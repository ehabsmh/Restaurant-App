import supabase from "./supabase";

export async function getUserCart(userId: string) {
  // Select user cart
  const { data: cart, error: errorSelect } = await supabase
    .from('cart')
    .select('*').eq("user_id", userId).single();

  if (errorSelect) throw new Error(errorSelect.message);
  if (cart) {
    console.log(cart);
    return cart;
  }

  const { data, error: errorInsert } = await supabase
    .from('cart')
    .insert([{ user_id: userId }])
    .select().single()

  console.log(data);

  if (errorInsert) throw new Error(errorInsert.message);
  return data;
}


export async function addItem(item) {
  const { data, error } = await supabase.from('cart_item').insert([item]).select()
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function getItems(cartId: number) {
  const { data: cart_item, error } = await supabase.from("cart_item")
    .select(`
  *,
  item:items (
    id, image, name
  ),
  size:sizes (id, size)
`).eq("cart_id", cartId);
  console.log(cart_item);

  if (error) throw new Error(error.message);
  return cart_item;
}

export async function incItemQuantity(cartItemId: number) {
  const { data: cartItem, error } = await supabase.from('cart_item').select('quantity, price, price_per_quantity').eq('id', cartItemId).single();

  if (error) throw new Error(error.message);

  cartItem.quantity = cartItem.quantity + 1;
  cartItem.price_per_quantity = cartItem.quantity * cartItem.price;
  await supabase
    .from('cart_item')
    .update(cartItem)
    .eq('id', cartItemId);

  console.log(cartItem);
  return cartItem;
}
export async function decItemQuantity(cartItemId: number) {
  const { data: cartItem, error } = await supabase.from('cart_item').select('quantity, price, price_per_quantity').eq('id', cartItemId).single();

  if (error) throw new Error(error.message);

  cartItem.quantity = cartItem.quantity - 1;
  cartItem.price_per_quantity = cartItem.quantity * cartItem.price;
  await supabase
    .from('cart_item')
    .update(cartItem)
    .eq('id', cartItemId);

  console.log(cartItem);
  return cartItem;
}

export async function changeItemSize(itemId: string, cartItemId: number, sizeId: number) {
  const { data: item_sizes, error } = await supabase.from('item_sizes').select('price').eq('item_id', itemId).eq('size_id', sizeId).single();

  if (error) throw new Error(error.message);

  const { data } = await supabase
    .from('cart_item')
    .update({ size_id: sizeId, price: item_sizes.price })
    .eq('id', cartItemId).select().single();

  console.log(data);
  return data;
}

export async function checkItemInCart(itemId: number) {
  const { data } = await supabase.from("cart_item").select("*").eq('item_id', itemId).single();
  if (data) return true;
  return false;
}
