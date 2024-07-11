import mongoose from 'mongoose';

const searchLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    searchQuery: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const SearchLog = mongoose.model('SearchLog', searchLogSchema);

export { SearchLog }