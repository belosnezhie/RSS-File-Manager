import { handleCD } from '../controllers/pathControllers/cd.js';
import { handleList } from '../controllers/pathControllers/ls.js';
import { handleUp } from '../controllers/pathControllers/up.js'

export const commandsMap = new Map();
commandsMap.set('up', handleUp);
commandsMap.set('cd', handleCD);
commandsMap.set('ls', handleList);
