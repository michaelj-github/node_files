const fs = require('fs');

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
cat(process.argv[2]);