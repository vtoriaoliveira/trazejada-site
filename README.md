# TRAJEZADA — Loja de Streetwear

> Site completo para loja de streetwear com catálogo, carrinho de compras, checkout e código preparado para integração com backend.

---

## ✅ Funcionalidades Implementadas

### 🏠 Home / Landing Page
- Tela de loading animada com logo
- Hero section com headline impactante, stats e CTAs
- Banner de marquee animado com promoções
- Banner de destaque (Featured Drop)
- Seção "Sobre Nós" com valores da marca
- Logos de marcas de referência (inspiração)
- Footer completo com links, social e meios de pagamento

### 🛍️ Catálogo de Produtos
- Grid responsivo de produtos
- Filtro por categoria (Camisetas, Moletons, Calças, Bonés, Calçados, Acessórios)
- Ordenação: menor preço, maior preço, novidades, promoções
- Badges: Novo, Sale, Hot, Limitado
- Preview de tamanhos disponíveis por produto
- Quick-add direto do card
- Hover effect com botão "Adicionar ao Carrinho"

### 🔍 Modal do Produto
- Imagem em destaque
- Seleção de tamanho com indicação de disponibilidade
- Seletor de quantidade
- Preço com desconto e percentual
- Descrição detalhada
- Botão de favoritar (wishlist local)

### 🛒 Carrinho de Compras
- Sidebar deslizante com animação
- Lista de itens com imagem, tamanho, quantidade e preço
- Controle de quantidade (+/-)
- Remoção de itens
- Validação de cupom de desconto (mock):
  - `TRAZE10` → 10% de desconto
  - `TRAZE20` → 20% de desconto
  - `FRETE0` → Frete grátis
  - `PRIMEIRACOMPRA` → 15% de desconto
- Cálculo automático: subtotal, desconto, frete, total
- Frete grátis acima de R$ 299
- Persistência no localStorage

### 📋 Checkout em 2 Etapas
- **Etapa 1**: Dados pessoais + endereço de entrega
  - Busca automática de endereço por CEP (ViaCEP API gratuita)
- **Etapa 2**: Forma de pagamento (PIX, Cartão de Crédito, Boleto)
  - Resumo completo do pedido
  - Confirmação com número do pedido gerado

### 🔔 Notificações
- Sistema de toast notifications (success, error, info)

---

## 📁 Estrutura de Arquivos

```
index.html              → Estrutura base com React CDN
css/
  style.css             → Estilos completos (tema urban/streetwear)
js/
  api.js                → Camada de serviços de API (pronta para backend)
  products.js           → Dados mock de produtos e categorias
  app.jsx               → Aplicação React completa (JSX via Babel CDN)
README.md               → Documentação do projeto
```

---

## 🔌 Integração com Backend (API)

O arquivo `js/api.js` possui uma camada de serviços completa, pronta para substituir os dados mock pelo backend real.

### Configuração
```js
// js/api.js — linha 10
const API_CONFIG = {
  BASE_URL: 'https://api.trajezada.com.br/v1', // ← Substitua pela sua URL
  ...
};
```

### Endpoints Mapeados

| Serviço | Método | Rota |
|---------|--------|------|
| Listar produtos | GET | `/products` |
| Produto por ID | GET | `/products/:id` |
| Criar pedido | POST | `/orders` |
| Validar cupom | POST | `/coupons/validate` |
| Calcular frete | POST | `/shipping/calculate` |
| Buscar CEP | GET | `viacep.com.br` (gratuito, já integrado) |
| Newsletter | POST | `/newsletter/subscribe` |

### Para ativar a API real no Checkout
No `js/app.jsx`, na função `handleSubmit` do `CheckoutModal`:
```js
// Substitua:
const order = await window.API.mock.createOrder(orderPayload);

// Por:
const order = await window.API.orders.create(orderPayload);
```

---

## 🎨 Paleta de Cores

| Variável | Valor | Uso |
|----------|-------|-----|
| `--accent` | `#ff3c00` | Laranja streetwear (destaque) |
| `--black` | `#0a0a0a` | Fundo principal |
| `--white` | `#f5f5f5` | Textos |
| `--green` | `#00e676` | Sucesso |
| `--yellow` | `#ffd600` | Hot badge |

---

## 🔧 Tecnologias Usadas

- **React 18** (via CDN jsDelivr)
- **Babel Standalone** (compilação JSX no browser)
- **Font Awesome 6** (ícones)
- **Google Fonts**: Bebas Neue, Inter, Space Grotesk
- **ViaCEP** (API de CEP gratuita)
- **LocalStorage** (persistência do carrinho)

---

## 🚀 Próximos Passos para Produção

### Backend / API
- [ ] Criar API REST (Node.js/Express, Django, etc.)
- [ ] Implementar autenticação de usuários (JWT)
- [ ] Integrar gateway de pagamento (Mercado Pago, Stripe, PagSeguro)
- [ ] Sistema de gestão de estoque
- [ ] Webhook para atualização de status do pedido

### Frontend Evolução
- [ ] Migrar para Vite + React (build tool em produção)
- [ ] Adicionar React Router para páginas separadas
- [ ] Página de detalhes do produto com URL única
- [ ] Sistema de busca com filtros avançados
- [ ] Wishlist persistida (backend)
- [ ] Área do cliente (pedidos, histórico)
- [ ] Rastreamento de pedido

### UX/Conversão
- [ ] Galeria de imagens do produto (múltiplas fotos)
- [ ] Reviews e avaliações
- [ ] Produtos relacionados / "Quem viu também viu"
- [ ] Chat de suporte (WhatsApp / Chatwoot)
- [ ] Pop-up de primeira compra

---

## 💡 Cupons de Teste

| Código | Desconto |
|--------|----------|
| `TRAZE10` | 10% off |
| `TRAZE20` | 20% off |
| `FRETE0` | Frete grátis |
| `PRIMEIRACOMPRA` | 15% off |

---

*© 2025 Trajezada Streetwear*
