import router from './routes/index';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
