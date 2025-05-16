// models/genre.model.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGenre extends Document {
    _id: Types.ObjectId;
    name: string;
}

const GenreSchema = new Schema<IGenre>({
    name: { type: String, required: true, unique: true },
});

export const Genre = mongoose.models.Genre || mongoose.model<IGenre>('Genre', GenreSchema);
