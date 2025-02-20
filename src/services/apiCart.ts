import supabase from "./supabase";

export async function getUserCartByUserId(userId: string) {
  // Select user cart
  const { data: cart, error: errorSelect } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (errorSelect) throw new Error(errorSelect.message);
  if (cart) {
    return cart;
  }

  const { data, error: errorInsert } = await supabase
    .from("cart")
    .insert([{ user_id: userId }])
    .select()
    .single();


  if (errorInsert) throw new Error(errorInsert.message);
  return data;
}

export async function getUserCartByCartId(cartId: number) {
  // Select user cart
  const { data: cart, error: errorSelect } = await supabase
    .from("cart")
    .select("*")
    .eq("id", cartId)
    .single();

  if (errorSelect) throw new Error(errorSelect.message);

  return cart;
}

type FieldsType = {
  num_items?: number;
  total_price: number;
}

export async function updateCart(cartId: number, fields: FieldsType) {
  const { error } = await supabase
    .from("cart")
    .update(fields)
    .eq("id", cartId)
    .select();

  if (error) throw new Error(error.message);
}

type itemType = {
  cart_id: number;
  created_at?: string;
  id?: number;
  item_id: number;
  price: number;
  price_per_quantity: number;
  quantity: number;
  size_id: number;
}


export async function addItem(item: itemType) {
  // Insert cart item
  const { data: cartItem, error: cartItemError } = await supabase
    .from("cart_items")
    .insert([item])
    .select()
    .single();
  if (cartItemError) throw new Error(cartItemError.message);

  // update user cart
  const cart = await getUserCartByCartId(item.cart_id);

  await updateCart(item.cart_id, {
    num_items: cart.num_items + 1,
    total_price: cart.total_price + cartItem.price_per_quantity,
  });

  return cartItem;
}

export async function getItems(cartId: number) {
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(
      `
  *,
  item:items (
    id, image, name
  ),
  size:sizes (id, size)
`,
    )
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);
  return cartItems;
}

export async function incItemQuantity(cartItemId: number) {
  const { data: cartItem, error } = await supabase
    .from("cart_items")
    .select("quantity, price, price_per_quantity, cart_id")
    .eq("id", cartItemId)
    .single();

  if (error) throw new Error(error.message);

  if (cartItem.quantity === 10) return cartItem;

  cartItem.quantity = cartItem.quantity + 1;
  cartItem.price_per_quantity = cartItem.quantity * cartItem.price;
  await supabase.from("cart_items").update(cartItem).eq("id", cartItemId);

  const cart = await getUserCartByCartId(cartItem.cart_id);

  await updateCart(cart.id, { total_price: cart.total_price + cartItem.price });

  return cartItem;
}
export async function decItemQuantity(cartItemId: number) {
  const { data: cartItem, error } = await supabase
    .from("cart_items")
    .select("quantity, price, price_per_quantity, cart_id")
    .eq("id", cartItemId)
    .single();

  if (error) throw new Error(error.message);

  if (cartItem.quantity === 1) return cartItem;

  cartItem.quantity = cartItem.quantity - 1;
  cartItem.price_per_quantity = cartItem.quantity * cartItem.price;
  await supabase.from("cart_items").update(cartItem).eq("id", cartItemId);

  const cart = await getUserCartByCartId(cartItem.cart_id);

  await updateCart(cart.id, {
    total_price: Math.abs(cart.total_price - cartItem.price),
  });
  return cartItem;
}

export async function changeItemSize(
  itemId: number,
  cartItemId: number,
  sizeId: number,
) {
  const { data: itemSizes, error } = await supabase
    .from("item_sizes")
    .select("price")
    .eq("item_id", itemId)
    .eq("size_id", sizeId)
    .single();

  if (error) throw new Error(error.message);

  const { data: cartItem2, error: errorCartItems } = await supabase
    .from("cart_items")
    .select("price, quantity, cart_id")
    .eq("id", cartItemId)
    .single();

  if (errorCartItems) throw new Error(errorCartItems.message);


  const cart = await getUserCartByCartId(cartItem2.cart_id);

  if (cartItem2.price < itemSizes.price) {
    const priceDifference =
      (itemSizes.price - cartItem2.price) * cartItem2?.quantity;
    await updateCart(cart.id, {
      total_price: cart.total_price + priceDifference,
    });
  } else {
    const priceDifference =
      (cartItem2.price - itemSizes.price) * cartItem2?.quantity;
    await updateCart(cart.id, {
      total_price: cart.total_price - priceDifference,
    });
  }

  const { data, error: errorCartItem } = await supabase
    .from("cart_items")
    .update({ size_id: sizeId, price: itemSizes.price })
    .eq("id", cartItemId)
    .select()
    .single();

  if (errorCartItem) throw new Error(errorCartItem.message);

  const { data: cartItem } = await supabase
    .from("cart_items")
    .update({ price_per_quantity: data?.price * data?.quantity })
    .eq("id", cartItemId)
    .select()
    .single();


  return cartItem;
}

export async function checkItemInCart(cartId: number, itemId: number) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId).eq('item_id', itemId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data) return true;
  return false;
}

export async function deleteCartItem(id: number) {
  const { data: deletedCartItem, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const cart = await getUserCartByCartId(deletedCartItem?.cart_id);

  await updateCart(cart.id, {
    num_items: cart.num_items - 1,
    total_price: cart.total_price - deletedCartItem?.price_per_quantity,
  });
}
