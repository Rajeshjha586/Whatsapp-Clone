// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './DBmessage.js'
import Pusher from 'pusher';
import cors from 'cors';


// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1143821",
   
    
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = '';
mongoose.connect(connection_url, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB Connected');

    const messageCollection = db.collection("messages");
    const changeStream = messageCollection.watch();
    
    changeStream.on('change',(change)=>{
        console.log("Changed Message");

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted', // messages is my channel name
            {
                
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            });
        }
        else{
            console.log("Error triggering Pusher");
        }
    })
})
// ???

// api routes
app.get('/', (req, res) => res.status(200).send('Hello Mr. Server'));


app.get('/messages/sync', (req, res) => {
    Messages.find( (err, data) => {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    });
});


app.post('/messages/new', (req, res) => {
    const dbMessages = req.body;

    Messages.create(dbMessages, (err, data) => {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }
    });
});

// listner
app.listen(port, () => console.log(`Listening on localhost:${port}`));
