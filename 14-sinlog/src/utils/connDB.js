import mongoose from "mongoose"

// Connect to the database
export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: process.env.dbName,})
    .then((c)=>console.log(`Connected to ${c.connections[0].name} database`))
    .catch((err)=>console.log(`Error connecting to database: ${err.message}`))
}


/*

//to check if the connection is working or not 
// By making kuwars named collection in test database and inserting a document in it

const Schema = mongoose.Schema;
const TestSchema = new Schema({ name: 'string' });

const Test = mongoose.model('kuwar', TestSchema); // "kuwars" is the collection name
// so in "test" database, there will be a collection named "kuwars"

const testDoc = new Test({ name: 'Test Document' });

async function saveDocument() {
    try {
        const doc = await testDoc.save();
        console.log('Document inserted', doc);
    } catch (err) {
        console.error(err);
    }
}

saveDocument();  

*/
