# Extract Directory Structure

This Node.js script traverses a directory and its subdirectories, creates a YAML representation of the directory structure, and saves it to a file. It is particularly useful for generating a structured overview of a project's files and directories, which can be helpful for documentation or sharing with others.

## Features

- Recursively traverses a directory and its subdirectories
- Generates a YAML representation of the directory structure
- Excludes files and directories specified in a `.gitignore` file
- Ignores the `.git` folder
- Accepts the root directory as a command-line argument

## Prerequisites

- Node.js (version 10 or above)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/adrianschmidt/extractDirectoryStructure.git
   ```

2. Navigate to the project directory:
   ```
   cd extractDirectoryStructure
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To generate the YAML representation of a directory structure, run the following command:

```
node index.js /path/to/root/directory
```

Replace `/path/to/root/directory` with the path to the directory you want to traverse.

For example:

```
node index.js ../my-project
```

This will traverse the `../my-project` directory and generate a file named `directory_structure.yaml` in the current working directory.

## Output

The script generates a YAML file that represents the directory structure. Each directory is represented as a key in the YAML object, and its contents (subdirectories and files) are nested under it. Files are represented as keys with a `null` value. Ignored directories are represented as keys with a `{}` value.

Example output:

```yaml
node_modules: {}
package.json: null
public:
  favicon.ico: null
  index.html: null
README.md: null
src:
  components:
    footer.js: null
    header.js: null
  pages:
    about.js: null
    home.js: null
  index.js: null
```

## Ignoring Files and Directories

The script automatically excludes files and directories specified in a `.gitignore` file, if present in the root directory. It also ignores the `.git` folder.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
