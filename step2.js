const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("err = ", err)
            process.kill(1)
        } else {
            console.log("data = ", data)
        }
    })
}

async function webcat(url) {
    try {
        let r = await axios.get(url)
        console.log(r.data)
    }
    catch (e) {
        console.log(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}

if (process.argv[2].startsWith("http")) {
    webcat(process.argv[2]);    
} else {
    cat(process.argv[2]);
}

// node step2.js testfile.txt
// data =  here's the data in the testfile
// node_files$ node step2.js http://google.com/error
// Error fetching http://google.com/error: AxiosError: Request failed with status code 404
// node step2.js http://google.com
// <!doctype html><html ...