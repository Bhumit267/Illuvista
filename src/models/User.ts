import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
    ADMIN = 'ADMIN',
    ARTIST = 'ARTIST',
    BUYER = 'BUYER'
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string; // Optional because we might select: false
    role: UserRole;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Do not return password by default
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.BUYER,
        },
        profileImage: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model during hot reload in Next.js
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
