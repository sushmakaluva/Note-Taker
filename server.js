const express = require('express');

// creating an express server
const app = express();

app.use(express.static('public'));



// const apiRoutes = require('./routes/apiRoutes')(app);
// const htmlRoutes = require('./routes/htmlRoutes')(app);

// apiRoutes(app);
// htmlRoutes(app);

// setting up a port
const PORT = process.env.PORT || 3000;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
