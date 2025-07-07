import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';
import antlrCompilerRouter from './routes/antlrCompiler';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', pingRouter);
app.use('/api', antlrCompilerRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});