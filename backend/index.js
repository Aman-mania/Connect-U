const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clientRouter = require("./routes/client");
const workerRouter = require("./routes/worker");
const signinRouter = require("./routes/signin");
const cors=require("cors");

app.use(bodyParser.json());
app.use('/*',cors());
app.use('/api/v1/signin',signinRouter);
app.use('/api/v1/client',clientRouter);
app.use('/api/v1/worker',workerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

