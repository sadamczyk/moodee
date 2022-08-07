import express from 'express'

const router = express.Router()

// Controllers
import * as entriesController from '../controllers/entries.js'

// Entries Routes
router.get('/', entriesController.listEntries)

router.post('/', entriesController.createEntries)

router.put('/:id', entriesController.updateEntries)

router.delete('/:id', entriesController.deleteEntries)

export default router
