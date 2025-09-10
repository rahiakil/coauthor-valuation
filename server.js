const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Investor presentation server running on:`);
    console.log(`- Local (WSL): http://localhost:${PORT}`);
    console.log(`- Windows Host: http://192.168.1.19:${PORT}`);
    console.log(`- Network: http://0.0.0.0:${PORT}`);
});