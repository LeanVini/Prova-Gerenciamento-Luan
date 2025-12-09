# Sistema de Gerenciamento Escolar

## Integrantes 

Olavo Guilherme dos Santos Tomaz  - 1624543
Vinícius Caires De Souza          - 6324613
Luis Gustavo silveira pinto       - 6324670
Pedro Kommers Medke               - 6324623

## Execução Rápida

### Backend (Terminal 1)
```bash
docker compose up --build
```
- PostgreSQL na porta **5432**
- API na porta **3000**
- Nginx na porta **80**

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
- Acesse: **http://localhost:5173**

## Build Produção

```bash
cd frontend
npm run build   
```

## Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 18.2 | UI |
| TypeScript | 5.2 | Type safety |
| Vite | 5.0 | Build tool |
| Socket.io | 4.5 | WebSocket |
| PostgreSQL | 14 | Banco dados |


### Alunos
- Nome (string)
- Idade (number)

### Professores
- Nome (string)
- Disciplina (string)

## API REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/alunos` | Listar alunos |
| POST | `/alunos` | Criar aluno |
| PUT | `/alunos/:id` | Atualizar |
| DELETE | `/alunos/:id` | Deletar |
| GET | `/professores` | Listar professores |
| POST | `/professores` | Criar professor |
| PUT | `/professores/:id` | Atualizar |
| DELETE | `/professores/:id` | Deletar |


##  Estrutura

```
PROVA-main/
├── frontend/                    (React + TypeScript)
│   ├── src/
│   │   ├── components/         (CRUD components)
│   │   ├── hooks/             (useWebSocket)
│   │   ├── services/          (api.ts)
│   │   ├── types/             (interfaces)
│   │   └── styles/            (CSS)
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── APP/                         (Backend)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
├── docker-compose.yml
├── Dockerfile.app
└── README.md
```