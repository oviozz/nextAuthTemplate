
import mongoose, { Schema } from "mongoose";

// Define the user schema
const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

// Export the User model or create it if it doesn't exist
export default mongoose.models.User || mongoose.model("User", userSchema);
