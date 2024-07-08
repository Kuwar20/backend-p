
import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
});

const Position = mongoose.model('Position', positionSchema);

export default Position;
