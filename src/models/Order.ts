import mongoose, { Schema, Document, Model } from 'mongoose';

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed'
}

export interface IOrder extends Document {
    artworkId: mongoose.Types.ObjectId;
    buyerId: mongoose.Types.ObjectId;
    artistId: mongoose.Types.ObjectId;
    price: number;
    paymentStatus: PaymentStatus;
    paymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
    {
        artworkId: {
            type: Schema.Types.ObjectId,
            ref: 'Artwork',
            required: [true, 'Artwork ID is required'],
            index: true,
        },
        buyerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Buyer ID is required'],
            index: true,
        },
        artistId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Artist ID is required'],
            index: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
            index: true,
        },
        paymentIntentId: {
            type: String,
            unique: true,
            sparse: true, // Allows null/missing values while still enforcing uniqueness for existing ones
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model during hot reload in Next.js
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
