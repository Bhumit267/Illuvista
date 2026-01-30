import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
    artworkId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    commentText: string;
    status: 'pending' | 'approved' | 'flagged';
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
    {
        artworkId: {
            type: Schema.Types.ObjectId,
            ref: 'Artwork',
            required: [true, 'Artwork ID is required'],
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
        commentText: {
            type: String,
            required: [true, 'Comment text is required'],
            trim: true,
            maxlength: [1000, 'Comment cannot be more than 1000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'flagged'],
            default: 'approved',
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model during hot reload in Next.js
const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
