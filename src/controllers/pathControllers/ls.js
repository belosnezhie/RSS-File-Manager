import { readdir } from 'fs/promises';
import { handleOperationError } from '../../utils/handleOperationError.js';

export const handleList = async () => {
  const dir = process.cwd();

  try {
    const res = await readdir(dir, {
      withFileTypes: true,
    })

    const items = res.map((dirent) => ({
      name: dirent.name,
      type: dirent.isDirectory() ? 'directory' : 'file'
    }));

    const sortedItems = items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    console.table(sortedItems);
  } catch (err) {
    handleOperationError();
  }
}
