// Import the router from AdonisJS core services
import CommentsController from '#controllers/CommentsController'
import MomentsController from '#controllers/MomentsController'
import router from '@adonisjs/core/services/router'

// Import the controller that handles the routes

// Define the routes
router
  .group(() => {
    // Route to delete a moment by ID
    router.delete('/moments/:id', [MomentsController, 'destroy'])
    // Route to create a new moment
    router.post('/moments', [MomentsController, 'store'])
    // Route to get all moments
    router.get('/moments', [MomentsController, 'index'])
    // Route to get a specific moment by ID
    router.get('/moments/:id', [MomentsController, 'show'])
    router.patch('/moments/:id', [MomentsController, 'update'])
    router.post('/moments/:momentId/comments', [CommentsController, 'store'])
  })
  .prefix('/api') // Prefix all routes with /api
