import mongoose, {Document,Schema} from "mongoose";
export interface IDocument extends Document {
    sellerId: mongoose.Types.ObjectId; // Assuming you link to a Seller model by ID
    documentType: string;
    originalName: string;
    mimeType: string;
    fileSize: number;
    filePath: string; // The path where Multer temporarily saved the file
    uploadDate: Date;
    cashfreeStatus: 'PENDING' | 'UPLOADED' | 'FAILED' | 'VERIFIED' | 'REJECTED'; // Example statuses
    cashfreeUploadId?: string; // ID returned by Cashfree upon successful upload
    // Add any other fields you deem necessary from Cashfree's response or for your internal tracking
}

// Define the Mongoose Schema
const DocumentSchema: Schema = new Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'Seller', // Assuming you have a 'Seller' model
        required: true,
    },
    documentType: {
        type: String,
        required: true,
        enum: ['Certificate of Incorporation', 'GST Certificate', 'PAN Card', 'Aadhaar Card', 'FSSAI License', 'Bank Statement', 'Other'], // Add relevant document types
    },
    originalName: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    filePath: { // This is the temporary path where Multer saves the file. You might remove the file after sending to Cashfree.
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    cashfreeStatus: {
        type: String,
        required: true,
        default: 'PENDING',
    },
    cashfreeUploadId: {
        type: String,
        required: false, // Optional, only present after successful Cashfree upload
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Create and export the Mongoose Model
const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);
export default DocumentModel;