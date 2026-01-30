import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ArtworkStatus {
    LISTED = 'listed',
    SOLD = 'sold',
    HIDDEN = 'hidden'
}

export interface IArtwork extends Document {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    artistId: mongoose.Types.ObjectId;
    status: ArtworkStatus;
    createdAt: Date;
    updatedAt: Date;
}

const ArtworkSchema: Schema<IArtwork> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Artwork title is required'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            index: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        artistId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Artist ID is required'],
            index: true,
        },
        status: {
            type: String,
            enum: Object.values(ArtworkStatus),
            default: ArtworkStatus.LISTED,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add text index for searchability
ArtworkSchema.index({ title: 'text', description: 'text' });

// Prevent overwriting model during hot reload in Next.js
const Artwork: Model<IArtwork> = mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);

export default Artwork;
