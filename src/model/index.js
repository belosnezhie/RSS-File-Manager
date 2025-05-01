import { handleCD } from '../controllers/cd.js';
import { handleUp } from '../controllers/up.js'

export const commandsMap = new Map();
commandsMap.set('up', handleUp);
commandsMap.set('cd', handleCD);
