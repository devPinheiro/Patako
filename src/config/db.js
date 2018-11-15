import mongoose from 'mongoose';
import config from './config';

export const connect = () => mongoose.connect(config.conString);

