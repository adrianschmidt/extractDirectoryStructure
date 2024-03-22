const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ignore = require('ignore');

function traverseDirectory(dir, ignoreFilter, result = {}) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(process.cwd(), filePath);

        if (ignoreFilter.ignores(relativePath)) {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            result[file] = {};
            traverseDirectory(filePath, ignoreFilter, result[file]);
        } else {
            result[file] = null;
        }
    });

    return result;
}

function createDirectoryStructureYaml(dir, outputFile) {
    const gitignoreFile = path.join(dir, '.gitignore');
    const ignoreFilter = ignore();

    if (fs.existsSync(gitignoreFile)) {
        const gitignoreContent = fs.readFileSync(gitignoreFile, 'utf8');
        ignoreFilter.add(gitignoreContent);
    }

    const directoryStructure = traverseDirectory(dir, ignoreFilter);
    const yamlOutput = yaml.dump(directoryStructure);

    fs.writeFileSync(outputFile, yamlOutput, 'utf8');
    console.log(`Directory structure saved to ${outputFile}`);
}

// Usage example
const rootDirectory = './';
const outputFile = 'directory_structure.yaml';
createDirectoryStructureYaml(rootDirectory, outputFile);
