const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ignore = require('ignore');

function traverseDirectory(dir, ignoreFilter, rootDir, result = {}) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(rootDir, filePath);

        if (ignoreFilter.ignores(relativePath) || file === '.git') {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            result[file] = {};
            traverseDirectory(filePath, ignoreFilter, rootDir, result[file]);
        } else {
            result[file] = null;
        }
    });

    return result;
}

function createDirectoryStructureYaml(dir, outputFile) {
    const rootDir = path.resolve(dir);
    const gitignoreFile = path.join(rootDir, '.gitignore');
    const ignoreFilter = ignore();

    if (fs.existsSync(gitignoreFile)) {
        const gitignoreContent = fs.readFileSync(gitignoreFile, 'utf8');
        ignoreFilter.add(gitignoreContent);
    }

    const directoryStructure = traverseDirectory(rootDir, ignoreFilter, rootDir);
    const yamlOutput = yaml.dump(directoryStructure);

    fs.writeFileSync(outputFile, yamlOutput, 'utf8');
    console.log(`Directory structure saved to ${outputFile}`);
}

// Get the root directory from command-line arguments
const rootDirectory = process.argv[2];

if (!rootDirectory) {
    console.error('Please provide the root directory as a command-line argument.');
    process.exit(1);
}

const outputFile = 'directory_structure.yaml';
createDirectoryStructureYaml(rootDirectory, outputFile);
