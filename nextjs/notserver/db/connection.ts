import { connect } from 'mongoose';

function connectionWithMongo(): void {
  const connectionString: string = process.env.MONGO_DB_URL!;

  connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      return console.info('Succesfully conected to mongoDB!');
    })
    .catch((err: Error) => {
      console.error('Error connecting to database: ', err);
    });
}

export default connectionWithMongo;
