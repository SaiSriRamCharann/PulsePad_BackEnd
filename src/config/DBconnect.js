const mongoose = require("mongoose");

const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected Successfully");
    } catch (err) {
        console.error("Database Connection Failed:", err);
        process.exit(1); 
    }
};

module.exports = DBconnect;
