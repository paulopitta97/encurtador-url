import mongoose from 'mongoose';

export class MongoConnection {

    public async connect(): Promise<void> {
		try {
            const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}.lgfad.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
			await mongoose.connect(url);
		} catch (err) {
			process.exit(1);
		}
	}

}