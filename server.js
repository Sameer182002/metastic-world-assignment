const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3000, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening to 3000`);
  });


module.exports = {
    app
}