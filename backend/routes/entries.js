import express from 'express'

const router = express.Router()

// Controllers
import * as entriesController from '../controllers/entries.js'

// Entries Routes
router.get('/list', entriesController.listEntries)

router.post('/create', entriesController.createEntries)

router.post('/update', entriesController.updateEntries)

router.delete('/:id', entriesController.deleteEntries)

export default router
