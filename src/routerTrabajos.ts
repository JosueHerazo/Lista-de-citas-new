import { Router } from 'express'
import { getTrabajos, createTrabajo, deleteTrabajo } from './handlers/trabajos.handler'
import { uploadTrabajo } from './config/cloudinaryTrabajos'

const routerTrabajos = Router()

// GET  /api/trabajos
routerTrabajos.get('/', getTrabajos)

// POST /api/trabajos  (multipart/form-data con campo "archivo")
routerTrabajos.post('/', uploadTrabajo.single('archivo'), createTrabajo)

// DELETE /api/trabajos/:id
routerTrabajos.delete('/:id', deleteTrabajo)

export default routerTrabajos