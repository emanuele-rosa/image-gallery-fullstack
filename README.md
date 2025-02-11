# Galeria de Imagens API & Frontend

Um projeto full-stack para gerenciamento de galeria de imagens com autenticação, busca e inserção.

## 🚀 Tecnologias

### Backend
- Node.js
- Express.js
- MongoDB com Mongoose
- Redis para cache
- JWT para autenticação
- HTTPS
- Swagger para documentação

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Context API

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/emanuele-rosa/fullstack3
```

2. Instale as dependências (Backend)
```bash
cd backend
npm install
```

3. Instale as dependências (Frontend)
```bash
cd frontend
npm install
```

4. Configure as variáveis de ambiente

Backend (.env):
```env
PORT=5000
HTTPS_PORT=443
MONGODB_URI=mongodb://localhost:27017
REDIS_URL=redis://localhost:6379
JWT_SECRET=environment_jwt_secret
NODE_ENV=production
```

Frontend (.env):
```env
VITE_API_URL=http://localhost:5001/api
```

## 🚀 Executando o projeto

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:5001/api-docs
```


## 🏗 Estrutura do Projeto

### Backend
```
backend/
├── src/
├───── config/
│       ├── cache.js
│       ├── db.js
│       └── swagger.js
├───── controllers/
│       ├── authController.js
│       └── imageController.js
├───── middlewares/
│       ├── auth.js
│       └── security.js
├───── models/
│       ├── Image.js
│       └── User.js
├───── routes/
│       ├── auth.js
│       └── images.js
└───── server.js
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   └── App.jsx
```

## ⚙️ Funcionalidades

- Autenticação de usuários
- Upload de imagens
- Listagem de imagens com paginação
- Busca por autor
- Cache de resposta
- Proteção de rotas


## 📫 Contato

Emanuele A. B. Flor da Rosa - emanuelerosa@alunos.utfpr.edu.br
