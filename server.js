import mongoose from 'mongoose'; 
import app from './app.js';
import config from './src/config/index.js'; 
import connectToDatabase from './src/db/conn.js'; 

async function main() {
  try {
   await connectToDatabase();
    app.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('MongoDB Error', error);
    process.exit(1);
  }
}

main();
