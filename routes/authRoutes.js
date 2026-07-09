
import express from 'express';
import { login } from '../controllers/authController.js'; // .js extension lagana mat bhoolna

const router = express.Router();

router.post('/login', login);

export default router;
// import express from 'express';
// import User from '../models/User.js';
// const router = express.Router();
// // Temporary route to create proper Admin
// router.post('/create-admin-securely', async (req, res) => {
//   try {
//     // Pehle purane galat admin ko delete karein
//     await User.deleteOne({ email: 'admin@diginiwas.com' });

//     // Naya admin create karein (Mongoose pre-save hook iska password sahi se hash karega)
//     const admin = new User({
//       name: "DigiNiwas Admin",
//       email: "admin@diginiwas.com",
//       password: "Admin@123", // Plain text likhein, mongoose ise automatic hash kar dega
//       role: "admin",
//       permissions: ["manage_users", "manage_properties"],
//       isActive: true
//     });

//     await admin.save();
//     res.send("Admin created successfully with proper hashing!");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
// export default router;