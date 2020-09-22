const app = require("../app/index");

const port = 3030;
app.listen(port, () => {
  console.log(`listening to ${port} `);
});
