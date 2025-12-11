
import { W1Parser } from '../dist/index.js';
import * as path from 'path';
import * as fs from 'fs';

async function main() {
    console.log("Starting verification...");
    const parser = new W1Parser();
    // Resolve path relative to this script
    const samplePath = path.resolve(process.cwd(), 'w1_py_parse/.sample');

    if (!fs.existsSync(samplePath)) {
        console.error(`Sample file not found at: ${samplePath}`);
        process.exit(1);
    }

    console.log(`Parsing sample file: ${samplePath}`);

    try {
        const records = await parser.parseFile(samplePath, undefined, true);
        console.log(`Successfully parsed ${records.length} records.`);

        if (records.length > 0) {
            console.log('First record sample (Root Segment):');
            console.log(JSON.stringify(records[0]["01"], null, 2));
        }
    } catch (error) {
        console.error('Error parsing file:', error);
        process.exit(1);
    }
}

main();
