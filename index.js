const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
app.set('io', io); // Adiciona o objeto io ao app para ser usado nas rotas

const db = require('./APP/config/database');
db.sync();
const alunoController = require('./APP/controllers/alunoController');
const Nota = require('./APP/models/nota');
const Frequencia = require('./APP/models/frequencia');
const Usuario = require('./APP/models/usuario');
const alunoRoutes = require('./APP/routes/alunoRoutes'); // Importando as rotas de aluno
const professorRoutes = require('./APP/routes/professorRoutes'); // Importando as rotas de professor
const notaFrequenciaRoutes = require('./APP/routes/notaFrequenciaRoutes'); // Importando as rotas de notas e frequência
const materiaRoutes = require('./APP/routes/materiaRoutes'); // Importando as rotas de matéria
const authRoutes = require('./APP/routes/authRoutes'); // Importando as rotas de autenticação

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API da Escola 🚀'));

// Usando as rotas
app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes);
app.use('/materias', materiaRoutes);
app.use('/api', alunoRoutes);
app.use('/api', notaFrequenciaRoutes);
app.use('/api/auth', authRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  // Listeners para eventos customizados
  socket.on('aluno_criado', (data) => {
    io.emit('aluno_criado', data);
  });

  socket.on('aluno_atualizado', (data) => {
    io.emit('aluno_atualizado', data);
  });

  socket.on('aluno_deletado', (data) => {
    io.emit('aluno_deletado', data);
  });

  socket.on('professor_criado', (data) => {
    io.emit('professor_criado', data);
  });

  socket.on('professor_atualizado', (data) => {
    io.emit('professor_atualizado', data);
  });

  socket.on('professor_deletado', (data) => {
    io.emit('professor_deletado', data);
  });

  socket.on('materia_criada', (data) => {
    io.emit('materia_criada', data);
  });

  socket.on('materia_atualizada', (data) => {
    io.emit('materia_atualizada', data);
  });

  socket.on('materia_deletada', (data) => {
    io.emit('materia_deletada', data);
  });
});

// Testando a conexão com o banco de dados
const sequelize = require('./APP/config/database');
sequelize.authenticate()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Iniciando o servidor
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
