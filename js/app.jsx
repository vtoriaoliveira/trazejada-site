/**
 * ============================================================
 * TRAJEZADA — APLICAÇÃO REACT PRINCIPAL
 * ============================================================
 */

const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ============================================================
// HELPERS
// ============================================================
const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const generateOrderId = () =>
  'TRZ-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();

// ============================================================
// TOAST SYSTEM
// ============================================================
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
          <i className={`fas ${t.type === 'success' ? 'fa-check-circle' : t.type === 'error' ? 'fa-times-circle' : 'fa-shopping-bag'}`}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ cartCount, onCartOpen, currentSection, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'novidades', label: 'Novidades' },
    { id: 'sale', label: 'Sale' },
    { id: 'sobre', label: 'Sobre' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={() => onNavClick('home')}>
          TRAJE<span>Z</span>ADA
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={currentSection === item.id ? 'active' : ''}
                onClick={() => onNavClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="nav-icon-btn" title="Buscar">
            <i className="fas fa-search"></i>
          </button>
          <button className="nav-icon-btn" title="Favoritos">
            <i className="fas fa-heart"></i>
          </button>
          <button className="nav-icon-btn" onClick={onCartOpen} title="Carrinho">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
          </button>

          <div
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => { onNavClick(item.id); setMenuOpen(false); }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ onShopNow }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-tag">
          <i className="fas fa-fire"></i>
          Nova Coleção 
        </div>
        <h1 className="hero-title">
          <span className="line1">O SEU</span>
          <span className="line2">MELHOR KIT,</span>
          <span className="line3">ESTA AQUI</span>
        </h1>
        <p className="hero-subtitle">
          
            Peças exclusivas com identidade única — feito pra quem tem estilo e autenticidade
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onShopNow}>
            <i className="fas fa-shopping-bag"></i>
            Ver Coleção
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
            Nossa História
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">2K+</span>
            <span className="stat-label">Clientes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">Peças</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">estilo</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <img
            src= ""
            alt="Look 1"
          />
        </div>
        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=320&q=80"
            alt="Look 2"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE BANNER
// ============================================================
function MarqueeBanner() {
  const items = ['NOVA COLEÇÃO', 'STREETWEAR', 'ESTILO ÚNICO', 'FRETE GRÁTIS ACIMA R$299', 'URBAN CULTURE', 'EDIÇÕES LIMITADAS', 'TRAJEZADA 2025'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PRODUCT CARD
// ============================================================
function ProductCard({ product, onAddToCart, onOpenModal }) {
  const [addedBtn, setAddedBtn] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const availableSize = product.sizes.find((s) => s.available);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const size = selectedSize || (availableSize ? availableSize.label : null);
    if (!size) {
      onOpenModal(product);
      return;
    }
    onAddToCart(product, size, 1);
    setAddedBtn(true);
    setTimeout(() => setAddedBtn(false), 1500);
  };

  const isSale = product.discount && product.discount > 0;

  return (
    <div className="product-card fade-in" onClick={() => onOpenModal(product)}>
      <div className="product-image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
        {product.badges.length > 0 && (
          <div className="product-badges">
            {product.badges.map((badge) => (
              <span key={badge} className={`badge badge-${badge}`}>
                {badge === 'new' ? 'Novo' : badge === 'sale' ? `- ${product.discount}%` : badge === 'hot' ? '🔥 Hot' : 'Limitado'}
              </span>
            ))}
          </div>
        )}
        <div className="product-quick-add" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-primary btn-full btn-sm"
            onClick={handleQuickAdd}
          >
            <i className={`fas ${addedBtn ? 'fa-check' : 'fa-cart-plus'}`}></i>
            {addedBtn ? 'Adicionado!' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <div className="product-name">{product.name}</div>

        {product.sizes.length > 1 && (
          <div className="product-sizes" onClick={(e) => e.stopPropagation()}>
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s.label}
                className={`size-dot ${!s.available ? 'unavailable' : ''} ${selectedSize === s.label ? 'selected' : ''}`}
                onClick={() => s.available && setSelectedSize(s.label)}
              >
                {s.label}
              </span>
            ))}
          </div>
        )}

        <div className="product-footer">
          <div className="product-price">
            {product.originalPrice && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
            <span className={`price-current ${isSale ? 'sale' : ''}`}>
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            className={`add-to-cart-btn ${addedBtn ? 'added' : ''}`}
            onClick={handleQuickAdd}
            title="Adicionar ao carrinho"
          >
            <i className={`fas ${addedBtn ? 'fa-check' : 'fa-plus'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleAdd = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    const size = selectedSize || product.sizes[0]?.label;
    onAddToCart(product, size, qty);
    onClose();
  };

  const isSale = product.discount && product.discount > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-section">
          <img src={product.images[0]} alt={product.name} />
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          {product.badges.length > 0 && (
            <div className="product-badges" style={{ top: 56, left: 16 }}>
              {product.badges.map((badge) => (
                <span key={badge} className={`badge badge-${badge}`}>
                  {badge === 'new' ? 'Novo' : badge === 'sale' ? `- ${product.discount}%` : badge === 'hot' ? '🔥 Hot' : 'Limitado'}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <div>
            <div className="modal-brand">{product.brand} • SKU: {product.sku}</div>
            <h2 className="modal-name">{product.name}</h2>
          </div>

          <div className="modal-price-wrap">
            <span className={`modal-price ${isSale ? 'sale' : ''}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="modal-price-original">{formatPrice(product.originalPrice)}</span>
            )}
            {product.discount && (
              <span className="modal-discount">-{product.discount}%</span>
            )}
          </div>

          <p className="modal-description">{product.description}</p>

          {product.sizes.length > 0 && (
            <div>
              <div className="modal-section-label">
                Tamanho{selectedSize ? ` — Selecionado: ${selectedSize}` : ''}
              </div>
              <div className="sizes-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    className={`size-btn ${!s.available ? 'unavailable' : ''} ${selectedSize === s.label ? 'selected' : ''}`}
                    onClick={() => s.available && setSelectedSize(s.label)}
                    disabled={!s.available}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="modal-section-label">Quantidade</div>
            <div className="qty-selector">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>
                <i className="fas fa-minus"></i>
              </button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(Math.min(product.stock, qty + 1))}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
              <i className="fas fa-shopping-bag"></i>
              Adicionar ao Carrinho
            </button>
            <button
              className={`wishlist-btn ${wishlist ? 'active' : ''}`}
              onClick={() => setWishlist(!wishlist)}
              title="Favoritar"
            >
              <i className={`fa${wishlist ? 's' : 'r'} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CART ITEM
// ============================================================
function CartItemRow({ item, onUpdateQty, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.product.images[0]} alt={item.product.name} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-name">{item.product.name}</div>
        <div className="cart-item-meta">
          <span>{item.size}</span>
          <span>{item.product.brand}</span>
        </div>
        <div className="cart-item-actions">
          <div className="cart-qty-btns">
            <button onClick={() => onUpdateQty(item.cartId, item.qty - 1)}>
              <i className="fas fa-minus"></i>
            </button>
            <span>{item.qty}</span>
            <button onClick={() => onUpdateQty(item.cartId, item.qty + 1)}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <span className="cart-item-price">{formatPrice(item.product.price * item.qty)}</span>
        </div>
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(item.cartId)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

// ============================================================
// CART SIDEBAR
// ============================================================
function CartSidebar({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const shipping = subtotal >= 299 ? 0 : 29.90;
  const discount = coupon?.type === 'percent' ? subtotal * (coupon.discount / 100) : 0;
  const freeShipping = coupon?.type === 'free_shipping';
  const total = subtotal - discount + (freeShipping ? 0 : shipping);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    setCouponError('');
    try {
      const result = await window.API.mock.validateCoupon(couponCode);
      setCoupon(result);
    } catch (err) {
      setCouponError('Cupom inválido ou expirado.');
      setCoupon(null);
    } finally {
      setApplyingCoupon(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div>
            <div className="cart-title">Carrinho</div>
            <div className="cart-count-label">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</div>
          </div>
          <button className="cart-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <i className="fas fa-shopping-bag"></i>
            <p>Seu carrinho está vazio.<br />Adicione alguns produtos!</p>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Ver Catálogo
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <CartItemRow
                key={item.cartId}
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-coupon">
              <input
                type="text"
                placeholder="Código do cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
              />
              <button
                className="btn btn-outline btn-sm"
                onClick={handleApplyCoupon}
                disabled={applyingCoupon}
              >
                {applyingCoupon ? '...' : 'Aplicar'}
              </button>
            </div>
            {coupon && (
              <div style={{ fontSize: '0.75rem', color: '#00e676' }}>
                <i className="fas fa-tag"></i> {coupon.description}
              </div>
            )}
            {couponError && (
              <div style={{ fontSize: '0.75rem', color: '#ff4444' }}>{couponError}</div>
            )}

            <div className="cart-totals">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="totals-row discount">
                  <span>Desconto ({coupon.discount}%)</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Frete</span>
                <span>
                  {(freeShipping || shipping === 0)
                    ? <span style={{ color: '#00e676' }}>Grátis</span>
                    : formatPrice(shipping)
                  }
                </span>
              </div>
              <div className="totals-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {shipping > 0 && !freeShipping && (
              <div style={{ fontSize: '0.72rem', color: '#666', textAlign: 'center' }}>
                Falta {formatPrice(299 - subtotal)} para frete grátis!
              </div>
            )}

            <button
              className="checkout-btn"
              onClick={() => onCheckout({ subtotal, discount, shipping: freeShipping ? 0 : shipping, total, coupon })}
            >
              <i className="fas fa-lock"></i>
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function CheckoutModal({ cart, totals, onClose, onOrderSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', cpf: '',
    cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
    payment: 'pix',
  });

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCEP = async () => {
    if (form.cep.replace(/\D/g, '').length !== 8) return;
    try {
      const addr = await window.API.shipping.lookupCEP(form.cep);
      setForm((prev) => ({
        ...prev,
        street: addr.logradouro,
        neighborhood: addr.bairro,
        city: addr.localidade,
        state: addr.uf,
      }));
    } catch {/* silencioso */}
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.cep) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      const orderPayload = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          cpf: form.cpf,
        },
        shipping_address: {
          cep: form.cep,
          street: form.street,
          number: form.number,
          complement: form.complement,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
        },
        payment_method: form.payment,
        items: cart.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          sku: item.product.sku,
          size: item.size,
          qty: item.qty,
          unit_price: item.product.price,
          subtotal: item.product.price * item.qty,
        })),
        totals: totals,
      };

      // 🔗 Integração futura: const order = await window.API.orders.create(orderPayload);
      const order = await window.API.mock.createOrder(orderPayload);
      onOrderSuccess(order);

    } catch (err) {
      alert('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const paymentIcons = {
    pix: 'fa-qrcode',
    credit: 'fa-credit-card',
    boleto: 'fa-barcode',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>CHECKOUT</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: step === s ? 'var(--accent)' : step > s ? '#00e676' : 'var(--gray-300)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => s < step && setStep(s)}
              >
                {step > s ? <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i> : s}
              </div>
            ))}
            <button className="cart-close" onClick={onClose} style={{ marginLeft: 8 }}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="checkout-body">
          {step === 1 && (
            <>
              <div>
                <h3 style={{ fontFamily: 'var(--font-alt)', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                  Dados Pessoais
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nome completo *</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail *</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="(11) 99999-9999" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CPF</label>
                    <input className="form-input" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-alt)', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                  Endereço de Entrega
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">CEP *</label>
                    <input
                      className="form-input"
                      name="cep"
                      value={form.cep}
                      onChange={handleChange}
                      onBlur={handleCEP}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Número</label>
                    <input className="form-input" name="number" value={form.number} onChange={handleChange} placeholder="123" />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Rua</label>
                    <input className="form-input" name="street" value={form.street} onChange={handleChange} placeholder="Logradouro" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Complemento</label>
                    <input className="form-input" name="complement" value={form.complement} onChange={handleChange} placeholder="Apto, bloco..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bairro</label>
                    <input className="form-input" name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="Bairro" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cidade</label>
                    <input className="form-input" name="city" value={form.city} onChange={handleChange} placeholder="Cidade" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estado</label>
                    <select className="form-select" name="state" value={form.state} onChange={handleChange}>
                      <option value="">UF</option>
                      {['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'].map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-full" onClick={() => setStep(2)}>
                Continuar para Pagamento <i className="fas fa-arrow-right"></i>
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h3 style={{ fontFamily: 'var(--font-alt)', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                  Forma de Pagamento
                </h3>
                <div className="payment-methods">
                  {[
                    { id: 'pix', label: 'PIX', icon: 'fa-qrcode' },
                    { id: 'credit', label: 'Crédito', icon: 'fa-credit-card' },
                    { id: 'boleto', label: 'Boleto', icon: 'fa-barcode' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      className={`payment-option ${form.payment === m.id ? 'selected' : ''}`}
                      onClick={() => setForm((p) => ({ ...p, payment: m.id }))}
                    >
                      <i className={`fas ${m.icon}`}></i>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="checkout-summary">
                <h3>Resumo do Pedido</h3>
                {cart.map((item) => (
                  <div key={item.cartId} className="summary-item">
                    <span>{item.product.name} ({item.size}) x{item.qty}</span>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                ))}
                <div className="summary-item">
                  <span>Frete</span>
                  <span>{totals.shipping === 0 ? 'Grátis' : formatPrice(totals.shipping)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="summary-item" style={{ color: '#00e676' }}>
                    <span>Desconto</span>
                    <span>- {formatPrice(totals.discount)}</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>{formatPrice(totals.total)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>
                  <i className="fas fa-arrow-left"></i> Voltar
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading
                    ? <><i className="fas fa-spinner fa-spin"></i> Processando...</>
                    : <><i className="fas fa-lock"></i> Confirmar Pedido — {formatPrice(totals.total)}</>
                  }
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ORDER SUCCESS MODAL
// ============================================================
function OrderSuccessModal({ order, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="order-success">
          <div className="success-icon">
            <i className="fas fa-check"></i>
          </div>
          <h2>PEDIDO CONFIRMADO!</h2>
          <div className="order-number">{order.id}</div>
          <p>
            Seu pedido foi realizado com sucesso! Você receberá um e-mail de confirmação
            em breve com todos os detalhes e o rastreio da entrega.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={onClose}>
              <i className="fas fa-shopping-bag"></i> Continuar Comprando
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
            Guarde o número do seu pedido para consultas futuras.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CATALOG SECTION
// ============================================================
function CatalogSection({ onAddToCart, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? window.MOCK_PRODUCTS
      : window.MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'new') list = [...list].filter((p) => p.badges.includes('new'));
    else if (sortBy === 'sale') list = [...list].filter((p) => p.discount > 0);

    return list;
  }, [activeCategory, sortBy]);

  return (
    <section className="section" id="catalogo">
      <div className="section-header">
        <div>
          <h2 className="section-title">CATÁ<span>LOGO</span></h2>
          <div className="section-sub">{filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ minWidth: 160, padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="new">Novidades</option>
            <option value="sale">Promoções</option>
          </select>
        </div>
      </div>

      <div className="categories-bar">
        {window.MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
          <i className="fas fa-box-open" style={{ fontSize: '3rem', opacity: 0.3, display: 'block', marginBottom: 16 }}></i>
          Nenhum produto encontrado nessa categoria.
        </div>
      )}
    </section>
  );
}

// ============================================================
// FEATURED BANNER
// ============================================================
function FeaturedBanner({ onShopNow }) {
  return (
    <div className="featured-banner">
      <div className="featured-banner-bg"></div>
      <div className="featured-banner-content">
        <div className="featured-tag">
          <i className="fas fa-fire"></i>
          Destaque da Semana
        </div>
        <h2 className="featured-banner-title">
          NOVOS<br /><span> DROPS</span>
        </h2>
        <p className="featured-banner-sub">
          Blusas, moletons e peças exclusivas para você 
          
          <p>Não perde seu tempo, corra!</p>
        </p>
        <button className="btn btn-primary" onClick={onShopNow}>
          Ver Coleção <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <div className="featured-visual">
        <img
          src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80"
          alt="Featured 1"
        />
        <img
          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80"
          alt="Featured 2"
        />
      </div>
    </div>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  return (
    <section className="section" id="sobre" style={{ background: 'var(--gray-100)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          NOSSA <span>HISTÓRIA</span>
        </h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '1rem', lineHeight: 2, marginBottom: 32 }}>
          A <strong style={{ color: 'var(--white)' }}>Trajezada</strong> nasceu nas ruas, do amor pela cultura urbana, grafite, skate e música. 
          Criada por um coletivo de artistas e designers apaixonados por streetwear autêntico, 
          cada peça conta uma história — da rua, para a rua.
        </p>
        <p style={{ color: 'var(--gray-400)', fontSize: '1rem', lineHeight: 2, marginBottom: 40 }}>
          Não somos apenas uma loja. Somos um movimento. Cada coleção é uma colaboração com 
          artistas locais, um manifesto visual para quem não tem medo de se expressar. 
          Vista atitude. Vista Trajezada.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[
            { icon: 'fa-leaf', label: 'Algodão Sustentável' },
            { icon: 'fa-paint-brush', label: 'Arte Exclusiva' },
            { icon: 'fa-heart', label: 'Feito com Paixão' },
            { icon: 'fa-map-marker-alt', label: 'Raiz Brasileira' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(255,60,0,0.12)', border: '1px solid rgba(255,60,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', fontSize: '1.3rem',
              }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-400)', letterSpacing: 1 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BRANDS SECTION
// ============================================================
function BrandsSection() {
  const brands = ['STÜSSY', 'SUPREME', 'OFF-WHITE', 'CARHARTT', 'VANS', 'NEW ERA'];
  return (
    <div className="brands-section">
      <p className="brands-label">Inspirados pelas maiores marcas do streetwear mundial</p>
      <div className="brands-logos">
        {brands.map((b) => (
          <span key={b} className="brand-logo">{b}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo">TRAJE<span>Z</span>ADA</span>
          <p>Streetwear autêntico para quem vive a cultura urbana. Roupas que falam por você, desde as ruas até o mundo.</p>
          <div className="social-links">
            {[
              { icon: 'fa-instagram', href: '#' },
              { icon: 'fa-tiktok', href: '#' },
              { icon: 'fa-youtube', href: '#' },
              { icon: 'fa-twitter', href: '#' },
            ].map((s) => (
              <a key={s.icon} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className={`fab ${s.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Loja</h4>
          <ul>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#novidades">Novidades</a></li>
            <li><a href="#sale">Promoções</a></li>
            <li><a href="#">Lookbook</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Suporte</h4>
          <ul>
            <li><a href="#">Rastrear Pedido</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
            <li><a href="#">Tabela de Medidas</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li><a href="mailto:oi@trajezada.com.br">oi@trajezada.com.br</a></li>
            <li><a href="https://wa.me/5511999999999" target="_blank">WhatsApp</a></li>
            <li><a href="#">Instagram DM</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Trajezada. Todos os direitos reservados.</span>
        <div className="payment-icons">
          <i className="fab fa-pix" title="PIX" style={{ fontSize: '1.1rem' }}></i>
          <i className="fab fa-cc-visa" title="Visa"></i>
          <i className="fab fa-cc-mastercard" title="Mastercard"></i>
          <i className="fab fa-cc-paypal" title="PayPal"></i>
        </div>
        <span>CNPJ: 00.000.000/0001-00</span>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const { toasts, addToast, removeToast } = useToast();

  // Loading splash
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (!loading) {
      const saved = localStorage.getItem('trajezada_cart');
      if (saved) {
        try { setCart(JSON.parse(saved)); } catch {}
      }
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem('trajezada_cart', JSON.stringify(cart));
  }, [cart]);

  // Adicionar ao carrinho
  const handleAddToCart = useCallback((product, size, qty = 1) => {
    const cartId = `${product.id}_${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { cartId, product, size, qty }];
    });
    addToast(`${product.name} adicionado ao carrinho!`, 'success');
  }, [addToast]);

  // Atualizar quantidade
  const handleUpdateQty = useCallback((cartId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setCart((prev) =>
        prev.map((i) => i.cartId === cartId ? { ...i, qty: newQty } : i)
      );
    }
  }, []);

  // Remover item
  const handleRemoveItem = useCallback((cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    addToast('Item removido do carrinho.', 'info');
  }, [addToast]);

  // Checkout
  const handleCheckout = useCallback((totals) => {
    setCartOpen(false);
    setCheckoutData(totals);
  }, []);

  // Order success
  const handleOrderSuccess = useCallback((order) => {
    setCheckoutData(null);
    setCart([]);
    setCompletedOrder(order);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="logo-loading">TRAJE<span>Z</span>ADA</div>
        <div className="loading-bar">
          <div className="loading-bar-inner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        currentSection={currentSection}
        onNavClick={setCurrentSection}
      />

      <main>
        <Hero onShopNow={scrollToCatalog} />
        <MarqueeBanner />

        <FeaturedBanner onShopNow={scrollToCatalog} />

        <div style={{ height: 80 }} />

        <CatalogSection
          onAddToCart={handleAddToCart}
          onOpenModal={setSelectedProduct}
        />

        <BrandsSection />
        <AboutSection />
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, size, qty) => {
            handleAddToCart(product, size, qty);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Checkout Modal */}
      {checkoutData && (
        <CheckoutModal
          cart={cart}
          totals={checkoutData}
          onClose={() => setCheckoutData(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order Success Modal */}
      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
