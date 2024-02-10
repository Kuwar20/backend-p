import mongoose from 'mongoose';

// way 1 : connection to the database

export const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/sinlog', {
    });
    // will create "test" database in mongoDB if no db name is provided in the URL
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });
}

/*

// way 2 : connection to the database 

import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "form_test-2",
    }).then((c) => console.log(`Connected to DB to  ${c.connection.host}`))
        .catch((e) => console.log(e));
} 

*/


/*

// to check if the connection is working or not 

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