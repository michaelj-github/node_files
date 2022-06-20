const fs = require('fs');
const axios = require('axios');

function cat(infile, outfile) {
    fs.readFile(infile, 'utf8', (err, data) => {
        if (err) {
            console.log("err = ", err)
            process.kill(1)
        } else {
            console.log("data = ", data)
            if (outfile != "") {   
                fs.writeFile(outfile, data, 'utf8', function(err) {
                    if (err) {
                        console.log("err = ", err)
                        process.kill(1)   
                     }
                })
            }
        }
    })
}

async function webcat(url, outfile) {
    try {
        let r = await axios.get(url)
        console.log(r.data)
        if (outfile != "") {   
            fs.writeFile(outfile, r.data, 'utf8', function(err) {
                if (err) {
                    console.log("err = ", err)
                    process.kill(1)   
                 }
            })
        }
    }
    catch (e) {
        console.log(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}

let input = ""
let output = ""
if (process.argv[2].startsWith("--out")) {
    output = process.argv[3]
    input = process.argv[4]
} else {
    input = process.argv[2]
}
if (input.startsWith("http")) {
    webcat(input, output);    
} else {
    cat(input, output);
}

// node step3.js testfile.txt
// node step3.js http://google.com
// node step3.js --out outputfile.txt testfile.txt
// node step3.js --out outputfile.txt http://google.com