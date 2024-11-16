import { Router } from 'express'
import {
    addContact,
    deleteContact,
    getAllContact,
    getContact,
    updateContact,
} from '../controllers/contact.controllers'

const router = Router()

router.route('/').post(addContact)
router.route('/').get(getAllContact)
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact)

export default router
