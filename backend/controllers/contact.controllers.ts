import { contactModel } from "../models/contact.model";
import { contactZodSchema } from "../zodSchema";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";

const addContact = asyncHandler(async (req: Request, res: Response) => {

  const body = req.body;
  console.log(body)
  // Checks whether the data is in the required format or throws an error
  const parsedData = contactZodSchema.parse(body);

  const prevContact = await contactModel
    .findOne({
      $or: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
    }).exec()

  if (prevContact) throw new ApiError(400, "Contact already exists");

  const newContact = await contactModel.create(parsedData);

  return res
    .status(201)
    .json(new ApiResponse(201, newContact, "Contact created successfully!"));
});

const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id == "") throw new ApiError(400, "Invalid ID");

  const contact = await contactModel.findById(id).exec();
  if (!contact) throw new ApiError(404, "No contact found to be deleted");

  await contact.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Contact deleted successfully!"));
});

const getAllContact = asyncHandler(async (req: Request, res: Response) => {

    let { page, limit, sort, search } = req.query

    if(!page) page = "0"
    if(!limit) limit = "10"
    if(!sort) sort = "1" // 1 means ascending and -1 means descending
    if(!search) search = ""

    search = search.toString()

    const contacts = await contactModel.aggregate([
      {
        '$match': {
          '$or': [
            {
              'firstName': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }, {
              'lastName': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }, {
              'email': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }, {
              'phoneNumber': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }, {
              'company': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }, {
              'job_title': {
                '$regex': new RegExp(search), 
                '$options': 'i'
              }
            }
          ]
        }
      }, {
        '$sort': {
          'createdAt': sort == "1" ? 1 : -1
        }
      }, {
        '$skip': Number(page) * Number(limit)
      }, {
        '$limit': Number(limit)
      }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, contacts, "Contacts fetched successfully!"))

})

const updateContact = asyncHandler(async (req: Request, res: Response) => {

  const body = req.body;
  const { id } = req.params
  console.log(body)
  // Checks whether the data is in the required format or throws an error

  if(body.phoneNumber || body.email) throw new ApiError(400, "Cannot update phone number and email")

  const prevContact = await contactModel
    .findById(id).exec()

  if (!prevContact) throw new ApiError(404, "Contact does not exists");

  const updatedContact = await contactModel.findByIdAndUpdate(id, body, { new: true }).exec()

  return res
    .status(201)
    .json(new ApiResponse(201, updatedContact, "Contact updated successfully!"));
});

export { addContact, deleteContact, getAllContact, updateContact };
