const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');
const { performance } = require('perf_hooks');

// Function to encrypt text using crypto module
function encryptText() {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const text = "Hello, Good Morning";
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted String:', encrypted);
    console.log('Random String (UUID):', uuidv4());
}

// Function to compare file read methods using stream and normal read
function compareFileReadMethods() {
    const file = 'largefile.txt'; // Path to a large file you have

    // Stream Method
    console.time('Stream');
    const readStream = fs.createReadStream(file);
    readStream.on('data', (chunk) => {});
    readStream.on('end', () => console.timeEnd('Stream'));

    // Normal Read Method
    console.time('Read');
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        console.timeEnd('Read');
    });
}

// Function to print system information using os module
function printSystemInfo() {
    console.log('OS Platform:', os.platform());
    console.log('CPU Architecture:', os.arch());
    console.log('Total Memory:', os.totalmem());
    console.log('Free Memory:', os.freemem());
    console.log('Uptime:', os.uptime());
    console.log('User Info:', os.userInfo());
}

// Handle command-line arguments to run specific functions
const args = process.argv.slice(2);

if (args.includes('crypto')) {
    encryptText();
} else if (args.includes('stream')) {
    compareFileReadMethods();
} else if (args.includes('os')) {
    printSystemInfo();
}
