import 'dotenv/config';
import { createApp } from './app';
import { PORT } from './server.const';

const app = createApp();

app.listen(PORT, () => {
  console.log(`ThaiLab server is running on http://localhost:${PORT}`);
});
