// make database connection here and then export it to use in index.js,
// then will call this function in index.js to connect to the database
// we do this in index so that other files can use the connection

import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "6-sinlog",
    }).then((c) => console.log(`Connected to DB to  ${c.connection.host}`))
    .catch((e) => console.log(e));
}

/*
//to check if the connection is working or not 

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