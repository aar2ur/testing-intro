/**
 * Добавить товар в корзину или увеличить его количество
 * @param {Array} cart - текущая корзина
 * @param {Object} product - товар
 * @param {number} quantity - добавляемое количество (по умолчанию 1)
 * @returns {Array} новая или обновленная корзина
 */
function addToCart(cart, product, quantity = 1) {
  if (!product || quantity <= 0) {
    throw new RangeError('Invalid quantity');
  }
  
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    const newCart = [...cart];
    const currentItem = newCart[existingItemIndex];
    const newQuantity = currentItem.quantity + quantity;
    
    if (newQuantity > product.stock) {
      throw new RangeError('Exceeds stock');
    }
    
    newCart[existingItemIndex] = {
      ...currentItem,
      quantity: newQuantity
    };
    return newCart;
  } else {
    if (quantity > product.stock) {
      throw new RangeError('Exceeds stock');
    }
    return [...cart, { ...product, quantity }];
  }
}

/**
 * Изменить количество товара в корзине
 * @param {Array} cart - текущая корзина
 * @param {number} productId - ID товара
 * @param {number} quantity - новое количество
 * @returns {Array} обновленная корзина
 */
function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Invalid quantity');
  }

  const existingItem = cart.find(item => item.id === productId);
  if (!existingItem) return [...cart];

  if (quantity > existingItem.stock) {
    throw new RangeError('Exceeds stock');
  }

  return cart.map(item => 
    item.id === productId ? { ...item, quantity } : item
  );
}

/**
 * Удалить товар из корзины
 * @param {Array} cart - текущая корзина
 * @param {number} productId - ID товара
 * @returns {Array} обновленная корзина
 */
function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

/**
 * Посчитать стоимость товаров в корзине (субтотал)
 * @param {Array} cart - корзина
 * @returns {number} сумма в копейках
 */
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => {
    const price = item.price ?? item.product?.price ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);
}

/**
 * Посчитать итоговую сумму заказа с учетом скидки и доставки
 * @param {Array} cart - корзина
 * @param {string} promoCode - промокод
 * @returns {Object} объект с расчетами (subtotal, discount, delivery, total)
 */
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  const subtotalAfterDiscount = subtotal - discount;
  const delivery = subtotal < 50000 && subtotal > 0 ? 30000 : 0;
  const total = subtotalAfterDiscount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;