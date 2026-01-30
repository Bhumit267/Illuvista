import mongoose, { Schema, Document, Model } from 'mongoose';

export enum NotificationType {
    COMMENT = 'comment',
    SALE = 'sale',
    SYSTEM = 'system'
}

export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
        type: {
            type: String,
            enum: Object.values(NotificationType),
            required: [true, 'Notification type is required'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model during hot reload in Next.js
const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
