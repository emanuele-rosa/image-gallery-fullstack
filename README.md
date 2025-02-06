# Projeto Galeria de Imagens

Sistema de gerenciamento de imagens com autenticação de usuários e funcionalidades de busca e inserção.

## Tecnologias Utilizadas

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- JWT para autenticação

## Requisitos

- Node.js 18+
- MongoDB
- NPM ou Yarn

## Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    └── .env
```

## Configuração do Ambiente

### Backend

1. Instale as dependências:

```bash
cd backend
npm install
```

2. Configure as variáveis de ambiente:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=seu_jwt_secret
```

3. Inicie o servidor:

```bash
npm run dev
```

### Frontend

1. Instale as dependências:

```bash
cd frontend
npm install
```

2. Configure as variáveis de ambiente:

```env
VITE_API_URL=http://localhost:5001/api
```

3. Inicie o aplicativo:

```bash
npm run dev
```

## API Endpoints

### Autenticação

- `POST /api/auth/login` - Login do usuário

### Imagens

- `GET /api/images` - Lista todas as imagens
- `POST /api/images` - Cria uma nova imagem
- `GET /api/images/:id` - Busca uma imagem específica

## Funcionalidades

1. **Autenticação**

   - Login de usuário
   - Proteção de rotas
   - Gerenciamento de sessão

2. **Gerenciamento de Imagens**

   - Listagem com paginação
   - Busca por autor
   - Upload de novas imagens

3. **Interface**
   - Design responsivo
   - Feedback visual de ações
   - Loading states
   - Tratamento de erros

## Deploy

### Backend

1. Prepare as variáveis de ambiente para produção
2. Configure o MongoDB Atlas ou seu servidor MongoDB
3. Deploy no servidor escolhido (ex: Heroku, DigitalOcean)

### Frontend

1. Gere o build de produção:

```bash
npm run build
```

2. Faça o deploy dos arquivos estáticos em um serviço de hospedagem (ex: Vercel, Netlify)

## Segurança

- Todas as senhas são hasheadas
- Autenticação via JWT
- Proteção contra CSRF
- Validação de dados
- Sanitização de inputs

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature
3. Faça o commit das mudanças
4. Faça o push para a branch
5. Abra um Pull Request

## Licença

MIT
