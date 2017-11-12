import { model, Schema } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

const userSchema: any = new Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
}, { timestamps: true, collection: 'Users' });

userSchema.method['getName'] = () => `${this.firstname} ${this.lastname}`;

userSchema.plugin(passportLocalMongoose, { usernameField: 'email', passwordField: 'password' });

export default model('User', userSchema);
