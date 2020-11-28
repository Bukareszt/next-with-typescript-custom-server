import express from 'express';
import cors from 'cors';

export function prepareServer(server: express.Application) {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors());
}
