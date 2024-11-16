import mongoose from 'mongoose'

interface IContact {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    company: string
    job_title: string
}

const contactSchema = new mongoose.Schema<IContact>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: true,
            match: new RegExp(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            ),
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            index: true,
            match: new RegExp(/^\d{10}$/),
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        job_title: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true },
)

export const contactModel = mongoose.model<IContact>('Contact', contactSchema)
