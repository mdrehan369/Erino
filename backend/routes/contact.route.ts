import { Router } from "express";
import { addContact, deleteContact, getAllContact, updateContact } from "../controllers/contact.controllers";

const router = Router()

router.route("/").post(addContact)
router.route("/").get(getAllContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)


export default router