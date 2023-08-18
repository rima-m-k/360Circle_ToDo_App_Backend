const cors = require('cors');

const corsMiddleware = cors({
  // origin: 'http://localhost:5173',
  // origin: 'http://*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});

module.exports = corsMiddleware;

