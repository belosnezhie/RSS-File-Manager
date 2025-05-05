import { handleCD } from '../controllers/pathControllers/cd.js';
import { handleList } from '../controllers/pathControllers/ls.js';
import { handleUp } from '../controllers/pathControllers/up.js'
import { handleCat } from '../controllers/fileControllers/cat.js';
import { handleAdd } from '../controllers/fileControllers/add.js';
import { handleMkdir } from '../controllers/fileControllers/mkdir.js';
import { handleRn } from '../controllers/fileControllers/rn.js';
import { handleCP } from '../controllers/fileControllers/cp.js';
import { handleMV } from '../controllers/fileControllers/mv.js';
import { handleRM } from '../controllers/fileControllers/rm.js';
import { handleSystem } from '../controllers/systemControllers/system.js';
import { handleHash } from '../controllers/hashControllers/hash.js';
import { handleCompress } from '../controllers/compressionControllers/compress.js';
import { handleDecompress } from '../controllers/compressionControllers/decompress.js';

export const commandsMap = new Map();
// Path controllers
commandsMap.set('up', handleUp);
commandsMap.set('cd', handleCD);
commandsMap.set('ls', handleList);
// File controllers
commandsMap.set('cat', handleCat);
commandsMap.set('add', handleAdd);
commandsMap.set('mkdir', handleMkdir);
commandsMap.set('rn', handleRn);
commandsMap.set('cp', handleCP);
commandsMap.set('mv', handleMV);
commandsMap.set('rm', handleRM);
// Operating system controllers
commandsMap.set('os', handleSystem);
// Hash controllers
commandsMap.set('hash', handleHash);
// Compression controllers
commandsMap.set('compress', handleCompress);
commandsMap.set('decompress', handleDecompress);
