import { Alert, Container, FormControl, TextField } from '@mui/material'
import { FieldError, useForm, UseFormRegister } from 'react-hook-form'
import { Contact } from '../utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactZodSchema } from '../zodSchema'
import { axiosInstance } from '../utils/axiosInstance'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Loader } from '../components/Loader'

type FormFieldNames =
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phoneNumber'
    | 'job_title'
    | 'company'

type FormFieldProps = {
    name: FormFieldNames
    placeHolder?: string
    label: string
    register: UseFormRegister<Contact>
    error: FieldError | undefined
    options?: object
}

const FormField = ({
    name,
    placeHolder,
    label,
    register,
    error,
    options
}: FormFieldProps) => {
    return (
        <FormControl className="w-[60%]" required>
            <TextField
                className="w-full"
                error={error ? true : false}
                label={label}
                placeholder={placeHolder}
                variant="filled"
                {...register(name)}
                {...options}
            />
            {error && <span className="text-red-500">{error.message}</span>}
        </FormControl>
    )
}

export const CreateContact = () => {
    const [searchParams, _] = useSearchParams()
    const [loader, setLoader] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Contact>({
        resolver: zodResolver(contactZodSchema),
        defaultValues: async () => {
            const id = searchParams.get('id')
            let contact: Contact = {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                job_title: '',
            }
            if (id) {
                try {
                    const response = await axiosInstance.get(`/contact/${id}`)
                    contact = response.data.data
                } catch (err) {
                    console.log(err)
                    setError(true)
                }
            }
            setLoader(false)
            return contact
        },
    })

    const nav = useNavigate()
    const [error, setError] = useState(false)

    const submit = async (data: Contact) => {
        try {
            if(searchParams.get("id")) {
                await axiosInstance.put(`/contact/${searchParams.get("id")}`, data)
            } else {
                await axiosInstance.post('/contact', data)
            }
            nav('/')
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    return (
        !loader ?
        <Container className="w-full h-full flex flex-col items-center justify-start py-16 gap-5">
            {error && (
                <Alert severity="error">
                    Some Error Occurred While Adding The Contact
                </Alert>
            )}
            <h1 className=" text-xl font-medium">Contact Details</h1>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex w-full flex-col items-center justify-start gap-4"
            >
                <FormField
                    name="firstName"
                    label="First Name"
                    register={register}
                    error={errors.firstName}
                />
                <FormField
                    name="lastName"
                    label="Last Name"
                    register={register}
                    error={errors.lastName}
                />
                <FormField
                    name="email"
                    label="Email"
                    register={register}
                    error={errors.email}
                    options={{ "disabled": searchParams.get("id") && true }}
                />
                <FormField
                    name="phoneNumber"
                    label="Phone Number"
                    register={register}
                    error={errors.phoneNumber}
                    options={{ "disabled": searchParams.get("id") && true }}
                />
                <FormField
                    name="company"
                    label="Company"
                    register={register}
                    error={errors.company}
                />
                <FormField
                    name="job_title"
                    label="Job Title"
                    register={register}
                    error={errors.job_title}
                />
                <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    variant="contained"
                >
                    { searchParams.get("id") ? "Update Contact" : "Add Contact" }
                </LoadingButton>
            </form>
        </Container>
        : <Loader />
    )
}
