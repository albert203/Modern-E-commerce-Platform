/* =============================================================================
   CART.JS
   - Toggle cart drawer open/close
   - POST to /cart/update and /cart/remove
============================================================================= */

// ── Elements ───────────────────────────────────────────────────────────────────

const cartTab     = document.getElementById('cart-tab-btn');
const cartClose   = document.getElementById('cart-close-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer  = document.getElementById('cart-drawer');
const cartItems   = document.getElementById('cart-items-list');

// ── Open / Close ───────────────────────────────────────────────────────────────

function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    cartTab.classList.add('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    cartTab.classList.remove('hidden');
    document.body.style.overflow = '';
}

cartTab.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// ── Quantity & Delete ──────────────────────────────────────────────────────────

cartItems.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
        updateQuantity(qtyBtn.dataset.id, qtyBtn.dataset.action);
        return;
    }

    const deleteBtn = e.target.closest('.cart-item-delete');
    if (deleteBtn) {
        removeItem(deleteBtn.dataset.id);
    }
});

// ── API ────────────────────────────────────────────────────────────────────────

async function post(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
    return res.json();
}

async function updateQuantity(itemId, action) {
    try {
        await post('/cart/update', { itemId, action });
        window.location.reload();
    } catch (err) {
        console.error('updateQuantity error:', err);
    }
}

async function removeItem(itemId) {
    try {
        await post('/cart/remove', { itemId });
        window.location.reload();
    } catch (err) {
        console.error('removeItem error:', err);
    }
}