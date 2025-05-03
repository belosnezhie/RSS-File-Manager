import { handleCD } from '../controllers/pathControllers/cd.js';
import { handleList } from '../controllers/pathControllers/ls.js';
import { handleUp } from '../controllers/pathControllers/up.js'
import { handleCat } from '../controllers/fileControllers/cat.js';

export const commandsMap = new Map();
// Path controllers
commandsMap.set('up', handleUp);
commandsMap.set('cd', handleCD);
commandsMap.set('ls', handleList);
// File controllers
commandsMap.set('cat', handleCat);
