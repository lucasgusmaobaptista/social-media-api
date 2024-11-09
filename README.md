# Social Media API

Esta é uma API de rede social construída com Node.js, Express e MongoDB. A API permite que os usuários se registrem, façam login, criem postagens, sigam outros usuários, curtam postagens e recebam notificações.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização.
- **Cloudinary**: Serviço de gerenciamento de imagens.
- **dotenv**: Carregar variáveis de ambiente de um arquivo `.env`.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **Nodemon**: Ferramenta que ajuda a desenvolver aplicativos baseados em Node.js reiniciando automaticamente o aplicativo quando mudanças nos arquivos são detectadas.
- **Insomnia**: Ferramente utilizada para fazer os testes de endopints.

## Estrutura do Projeto

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd seu-repositorio
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```
4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    MONGO_URI=sua_mongo_uri
    JWT_SECRET=sua_jwt_secret
    CLOUDINARY_CLOUD_NAME=seu_cloud_name
    CLOUDINARY_API_KEY=sua_api_key
    CLOUDINARY_API_SECRET=sua_api_secret
    NODE_ENV=development
    PORT=5000
    ```

## Uso

1. Inicie o servidor:
    ```sh
    npm run dev
    ```
2. A API estará disponível em `http://localhost:5000`.

## Endpoints

### Autenticação

- **POST /api/auth/signup** - Registrar um novo usuário
- **POST /api/auth/login** - Fazer login
- **POST /api/auth/logout** - Fazer logout
- **GET /api/auth/me** - Obter informações do usuário autenticado

### Usuários

- **GET /api/users/profile/:username** - Obter perfil de um usuário
- **GET /api/users/suggested** - Obter usuários sugeridos
- **POST /api/users/follow/:id** - Seguir/Deixar de seguir um usuário
- **POST /api/users/update** - Atualizar perfil do usuário

### Postagens

- **GET /api/posts/all** - Obter todas as postagens
- **GET /api/posts/likes/:id** - Obter postagens curtidas por um usuário
- **GET /api/posts/following** - Obter postagens dos usuários seguidos
- **GET /api/posts/user/:username** - Obter postagens de um usuário específico
- **POST /api/posts/create** - Criar uma nova postagem
- **POST /api/posts/like/:id** - Curtir/Descurtir uma postagem
- **POST /api/posts/comment/:id** - Comentar em uma postagem
- **DELETE /api/posts/:id** - Deletar uma postagem

### Notificações

- **GET /api/notifications/** - Obter notificações do usuário autenticado
- **DELETE /api/notifications/** - Deletar todas as notificações do usuário autenticado
- **DELETE /api/notifications/:id** - Deletar uma notificação específica

## Middleware

- **protectRoute** - Middleware para proteger rotas que requerem autenticação. Importado de [`middleware/protectRoute.js`](middleware/protectRoute.js).

## Modelos

### User

Definido em [`models/user.model.js`](models/user.model.js).

```js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    email: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    profileImg: { type: String, default: "" },
    coverImg: { type: String, default: "" },
    bio: { type: String, default: "" },
    link: { type: String, default: "" },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }]
}, { timestamps: true });
```
### Post
```js
    const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },
  img: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  }]
}, { timestamps: true });
```

### Notification 
```js
    const notificationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  type: { type: String, required: true, enum: ["follow", "like"] },
  read: { type: Boolean, default: false }
}, { timestamps: true });
```

