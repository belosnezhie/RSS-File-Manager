# RSS-File-Manager

List of operations and their syntax:

_Please make sure that the arguments `path_to_directory` and `path_to_destination` do not contain filenames._

- Navigation & working directory (nwd)
  - Go upper from current directory.
  ```bash
  up
  ```
  - Go to dedicated folder from current directory.
  ```bash
  cd path_to_directory
  ```
  - Print in console list of all files and folders in current directory.
  ```bash
  ls
  ```
- Basic operations with files
  - Read file and print it's content in console (should be done using Readable stream):
  ```bash
  cat path_to_file
  ```
  - Create empty file in current working directory:
  ```bash
  add new_file_name
  ```
  - Create new directory in current working directory:
  ```bash
  mkdir new_directory_name
  ```
  - Rename file:
  ```bash
  rn path_to_file new_filename
  ```
  - Copy file:
  ```bash
  cp path_to_file path_to_new_directory
  ```
  - Move file:
  ```bash
  mv path_to_file path_to_new_directory
  ```
  - Delete file:
  ```bash
  rm path_to_file
  ```
- Operating system info (prints following information in console)
  - Get EOL (default system End-Of-Line) and print it to console
  ```bash
  os --EOL
  ```
  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
  ```bash
  os --cpus
  ```
  - Get home directory and print it to console
  ```bash
  os --homedir
  ```
  - Get current system user name and print it to console
  ```bash
  os --username
  ```
  - Get CPU architecture for which Node.js binary has compiled and print it to console
  ```bash
  os --architecture
  ```
- Hash calculation
  - Calculate hash for file and print it into console
  ```bash
  hash path_to_file
  ```
- Compress and decompress operations
  - Compress file
  ```bash
  compress path_to_file path_to_destination
  ```
  - Decompress file
  ```bash
  decompress path_to_file path_to_destination
  ```
