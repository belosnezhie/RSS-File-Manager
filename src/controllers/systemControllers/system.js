import { handleArch } from "./arch.js";
import { handleCPUS } from "./cpus.js";
import { handleEOL } from "./eol.js";
import { handleHomedir } from "./homedir.js";
import { handleUsername } from "./username.js";

const systemCommandsMap = new Map();
systemCommandsMap.set('--EOL', handleEOL);
systemCommandsMap.set('--cpus', handleCPUS);
systemCommandsMap.set('--homedir', handleHomedir);
systemCommandsMap.set('--username', handleUsername);
systemCommandsMap.set('--architecture', handleArch);



export const handleSystem = (args) => {
  const [command] = args;

  const controller = systemCommandsMap.get(command);

  controller();
}

