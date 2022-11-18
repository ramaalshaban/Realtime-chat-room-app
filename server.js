const express = require('express');

const app = express();

const PORT = 3006 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));