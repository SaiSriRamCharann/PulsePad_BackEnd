const mongoose = require("mongoose");

const JurnolSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    discipline: {
        type: String,
        enum: ["Strictly", "Moderate", "Cheat"],
        required: true,
    },
    dayWeight: { type: Number, required: true },
    supplements: { type: String },
    dayWorkouts: { type: String },
}, { timestamps: true });

const Jurnol = mongoose.model("Jurnol", JurnolSchema);

module.exports = Jurnol;
