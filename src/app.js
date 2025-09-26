import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/user.route.js';
import errorHandler from './middleware/error.middleware.js';
import setupSwagger from './docs/swagger.js';
import roleRoutes from './routes/role.routes.js';
import authRoutes from './routes/auth.routes.js';



const app = express();

app.use(express.json());

// Swagger docs
setupSwagger(app);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);

// Error Handling
app.use(errorHandler);

export default app;
