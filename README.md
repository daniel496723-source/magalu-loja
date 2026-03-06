# 🛒 Magalu E-commerce

Loja virtual estilo Magazine Luiza com 60 produtos, carrinho, favoritos e conta de usuário.

## 🚀 Deploy no Railway

### Passo a passo completo:

**1. Crie uma conta gratuita**
- Acesse [railway.app](https://railway.app) e clique em **"Login"**
- Entre com sua conta do **GitHub** (obrigatório)

**2. Suba o código no GitHub**
- Acesse [github.com](https://github.com) → **"New repository"**
- Nomeie como `magalu-loja` → **"Create repository"**
- Faça upload dos arquivos: `server.js`, `produto.html`, `package.json`, `.gitignore`
  - Clique em **"uploading an existing file"**
  - Arraste todos os arquivos e confirme

**3. Deploy no Railway**
- No Railway, clique em **"New Project"**
- Selecione **"Deploy from GitHub repo"**
- Escolha o repositório `magalu-loja`
- Railway detecta automaticamente que é Node.js e faz o deploy!

**4. Seu site estará online em ~2 minutos**
- URL gerada automaticamente: `https://magalu-loja-production.up.railway.app`

## 🖥️ Rodar localmente

```bash
node server.js
```
Acesse: http://localhost:3000

## 📦 Estrutura

```
server.js      → Backend Node.js + catálogo de 60 produtos
produto.html   → Página de produto individual
package.json   → Configuração do projeto
```

## ✨ Funcionalidades

- 60 produtos em 10 categorias
- Imagens SVG geradas localmente (nunca quebram)
- Busca por nome e categoria
- Carrinho de compras
- Lista de favoritos
- Conta de usuário com login
- Cálculo de frete por CEP
- Especificações únicas por produto
- Troca de imagem por cor selecionada
