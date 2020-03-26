const NodeType = require('./NodeType');

const fs = require('fs');
const xmlQuery = require('xml-query');
const XmlReader = require('xml-reader');
const EOL = require('os').EOL;

const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .example('$0 --inputPath strings.xml --outputPath output.dart', 'Parse string arrays from Android to Dart translation files')
    .describe('inputPath', 'File path of the input xml')
    .describe('outputPath', 'File path of the output dart file')
    .demandOption(['inputPath', 'outputPath'])
    .help('h')
    .alias('h', 'help')
    .epilog('@Kristi Jorgji - 2020')
    .argv;

const INPUT_PATH = argv.inputPath;
const OUTPUT_PATH = argv.outputPath;

const content = fs.readFileSync(INPUT_PATH, 'utf8');
const ast = XmlReader.parseSync(content);
const xq = xmlQuery(ast);

const first = xq.first().ast;

let out = '';

for (let i = 0; i < first.children.length; i++) {
    const child = first.children[i];
    if (child.name === NodeType.STRING) {
        out += parseStringType(child);
    } else if (child.name === NodeType.STRING_ARRAY) {
        out += parseStringArray(child);
    }
}

fs.writeFileSync(OUTPUT_PATH, out, {
    encoding: 'utf8',
    flag: 'w'
},);

function parseStringType(node) {
    return formTranslation(node.attributes.name, node.children[0].value) + EOL;
}

function parseStringArray(node) {
    let out = EOL;
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.children.length === 0) {
            continue;
        }
        out += formArrayTranslation(node.attributes.name, i, child.children[0].value) + EOL;
    }
    out += EOL;

    return out;
}

function formTranslation(name, value) {
    return `String get ${name} =>
        Intl.message('${value}', name: '${name}');`;
}

function formArrayTranslation(name, index, value) {
    return formTranslation(`${name}_${index}`, value);
}
