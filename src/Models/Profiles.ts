import { Schema, model, Document } from 'mongoose';

export interface IProfile extends Document {
  phone: string;
  bio: string;
  address: string;
}

const ProfileSchema = new Schema<IProfile>({
  phone: { type: String, required: true },
  bio: { type: String, required: false },
  address: { type: String, required: true },
});

export const Profile = model<IProfile>('Profile', ProfileSchema);

