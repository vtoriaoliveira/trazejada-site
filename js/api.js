/**
 * ============================================================
 * TRAJEZADA — API SERVICE LAYER
 * ============================================================
 * Arquivo pronto para integração com backend real.
 * Substitua BASE_URL pela URL da sua API quando disponível.
 * Todos os métodos retornam Promises.
 * ============================================================
 */

const API_CONFIG = {
  BASE_URL: 'https://api.trajezada.com.br/v1', // ⚡ Substitua pela URL da sua API
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Descomente após autenticação
  },
};

// ============================================================
// UTILITÁRIOS
// ============================================================

/**
 * Faz uma requisição HTTP com timeout e tratamento de erros
 */
async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: { ...API_CONFIG.HEADERS, ...options.headers },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) return null;
    return await response.json();

  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new ApiError('Tempo de requisição esgotado', 408);
    }
    throw error;
  }
}

class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// ============================================================
// PRODUTOS
// ============================================================
const ProductsAPI = {
  /**
   * Listar todos os produtos com filtros
   * @param {Object} params - { category, search, sort, page, limit }
   */
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/products${query ? '?' + query : ''}`);
  },

  /** Buscar produto por ID */
  getById: (id) => apiRequest(`/products/${id}`),

  /** Buscar produtos em destaque */
  getFeatured: () => apiRequest('/products/featured'),

  /** Buscar produtos em promoção */
  getOnSale: () => apiRequest('/products/sale'),

  /** Buscar produtos por categoria */
  getByCategory: (slug) => apiRequest(`/products/category/${slug}`),

  /** Pesquisar produtos */
  search: (query) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),
};

// ============================================================
// CATEGORIAS
// ============================================================
const CategoriesAPI = {
  getAll: () => apiRequest('/categories'),
  getById: (id) => apiRequest(`/categories/${id}`),
};

// ============================================================
// CARRINHO / PEDIDOS
// ============================================================
const OrdersAPI = {
  /**
   * Criar pedido
   * @param {Object} orderData - { customer, items, shipping, payment }
   */
  create: (orderData) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  /** Buscar pedido por ID ou código */
  getById: (id) => apiRequest(`/orders/${id}`),

  /** Listar pedidos do cliente (requer auth) */
  getMyOrders: () => apiRequest('/orders/my'),

  /** Cancelar pedido */
  cancel: (id) =>
    apiRequest(`/orders/${id}/cancel`, { method: 'PATCH' }),
};

// ============================================================
// CEP / FRETE
// ============================================================
const ShippingAPI = {
  /**
   * Calcular frete
   * @param {Object} params - { cep, items }
   */
  calculate: (params) =>
    apiRequest('/shipping/calculate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  /** Buscar endereço por CEP (usando ViaCEP gratuito) */
  lookupCEP: async (cep) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) throw new Error('CEP inválido');
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();
    if (data.erro) throw new Error('CEP não encontrado');
    return data;
  },
};

// ============================================================
// CUPONS DE DESCONTO
// ============================================================
const CouponsAPI = {
  /**
   * Validar cupom
   * @param {string} code - Código do cupom
   * @param {number} total - Total do pedido
   */
  validate: (code, total) =>
    apiRequest('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, total }),
    }),
};

// ============================================================
// NEWSLETTER
// ============================================================
const NewsletterAPI = {
  subscribe: (email) =>
    apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// ============================================================
// MOCK — Simulação Local (usado quando API não está disponível)
// ============================================================
const MockAPI = {
  /**
   * Simula criação de pedido localmente
   * Remova quando backend estiver disponível
   */
  createOrder: async (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'TRZ-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          status: 'pending',
          created_at: new Date().toISOString(),
          ...orderData,
        });
      }, 1500);
    });
  },

  /**
   * Simula validação de cupom
   */
  validateCoupon: async (code) => {
    const coupons = {
      'TRAZE10': { discount: 10, type: 'percent', description: '10% de desconto' },
      'FRETE0': { discount: 0, type: 'free_shipping', description: 'Frete grátis' },
      'TRAZE20': { discount: 20, type: 'percent', description: '20% de desconto' },
      'PRIMEIRACOMPRA': { discount: 15, type: 'percent', description: '15% na primeira compra' },
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const coupon = coupons[code.toUpperCase()];
        if (coupon) resolve(coupon);
        else reject(new Error('Cupom inválido ou expirado'));
      }, 800);
    });
  },
};

// Exportar para uso global
window.API = {
  products: ProductsAPI,
  categories: CategoriesAPI,
  orders: OrdersAPI,
  shipping: ShippingAPI,
  coupons: CouponsAPI,
  newsletter: NewsletterAPI,
  mock: MockAPI,
  config: API_CONFIG,
  ApiError,
};

console.log('🚀 Trajezada API Service carregado. Base URL:', API_CONFIG.BASE_URL);
