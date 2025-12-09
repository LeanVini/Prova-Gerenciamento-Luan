const jwt = require('jsonwebtoken');

// Chave secreta para JWT (DEVE ser uma variável de ambiente em produção)
const JWT_SECRET = 'sua_chave_secreta_muito_forte';

// Middleware de Autenticação
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido ou formato inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário (id, perfil, referencia_id) ao request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

// Middleware de Autorização para Professor
exports.authorizeProfessor = (req, res, next) => {
  if (req.user && req.user.perfil === 'professor') {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Apenas professores podem realizar esta ação.' });
  }
};

// Middleware de Autorização para Aluno
exports.authorizeAluno = (req, res, next) => {
  if (req.user && req.user.perfil === 'aluno') {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Apenas alunos podem realizar esta ação.' });
  }
};

// Middleware de Autorização para Aluno ou Professor
exports.authorizeAlunoOrProfessor = (req, res, next) => {
  if (req.user && (req.user.perfil === 'aluno' || req.user.perfil === 'professor')) {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Apenas usuários autenticados podem realizar esta ação.' });
  }
};
