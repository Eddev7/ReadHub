//  Dependecies
import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

// Routes
import homeRoutes from './src/routes/homeRoutes'
import buscaRoutes from './src/routes/buscaRoutes'

dotenv.config();

class App {
  constructor() {
    // Express
    this.app = express();
    this.middlewares();
    this.routes();
    
    // Connection to BD
    mongoose.connect(process.env.CONNECT)
    .then(() => {
      console.log("Conectado a base de dados.")
      this.app.emit('pronto');
    });
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/busca', buscaRoutes)
  } 
}

export default new App().app;