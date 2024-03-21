import { app } from "./app";
import connectDB from "./utils/db";
require('dotenv').config();

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    connectDB();
})