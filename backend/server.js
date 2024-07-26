// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// const session = require('express-session');
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));
// // MongoDB connection
// const dbURI = 'mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/netfairsolution?retryWrites=true&w=majority';

// mongoose.connect(dbURI, {})
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log(err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// app.use('/api/contactUs', require('./routes/contactUs'));

// app.use("/api/saveEmail", require('./routes/saveEmail'));

// app.use('/api/saveComment', require('./routes/saveComment'));

// app.use('/api/getKycSubmission', require('./routes/getKycSubmission'));


// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Import routes
// const verificationRoutes = require('./routes/verification');
// app.use('/api/verification', verificationRoutes);


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const User = require('./models/User');
const KYC = require('./models/Verification');
const feedbackModel = require('./models/Feedback');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// Middleware
app.use(bodyParser.json());
const allowedOrigins = [
  "http://localhost:3000", 
  "https://netfairsolutions-user.onrender.com", 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('*', cors()); 

// MongoDB connection
const dbURI = 'mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/netfairsolution?retryWrites=true&w=majority';

mongoose.connect(dbURI, { })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contactUs', require('./routes/contactUs'));
app.use("/api/saveEmail", require('./routes/saveEmail'));
app.use('/api/saveComment', require('./routes/saveComment'));
app.use('/api/getKycSubmission', require('./routes/getKycSubmission'));
app.use('/api/checkKycVerification', require('./routes/checkKycVerification'));
app.use('/api/airPayAPI', require('./routes/airPayAPI'));
app.use('/api/payMorAPI', require('./routes/PayMorAPI'));


// Route to fetch user emails
app.get('/api/getUserEmails', async (req, res) => {
  try {
    // Find users where kycverification is false
    const users = await User.find({ kycverification: false }, 'email');
    const emails = users.map((user) => user.email);
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error fetching user emails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to fetch KYC details by email
app.get('/api/getKYCDetailsByEmail', async (req, res) => {
  const { email } = req.query;
  try {
    const kycDetails = await KYC.findOne({ email });
    if (!kycDetails) {
      return res.status(404).json({ message: 'KYC details not found for the provided email' });
    }
    res.status(200).json({ kycDetails });
  } catch (error) {
    console.error('Error fetching KYC details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to verify KYC
app.post('/api/verifyKYC', async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ email }, { kycverification: true });
    const updatedKYCDetails = await User.findOneAndUpdate({ email }, { kycverification: true });
    res.status(200).json({ kycDetails: updatedKYCDetails });
  } catch (error) {
    console.error('Error verifying KYC:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//USer Profile
app.get('/api/profile', async (req, res) => {
  const email = 'vp0072003@gmail.com';
  console.log(email);

  try {
    const user = await KYC.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/profile/image', async (req, res) => {
  try {
      const email = 'vp0072003@gmail.com';
      const user = await KYC.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Assuming 'profileimg' is the key in the KYC schema containing the file path
      const imagePath = user.profileimg;
      const fileName = imagePath.split('/').pop(); // Extract the file name from the path
      console.log(fileName);

      // Send the file name as a response
      res.json({ fileName });
  } catch (error) {
      console.error('Error fetching profile image:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/api/profile/image', upload.fields([
  { name: 'profileimg' }
]), async (req, res) => {
  try {
      const email = 'vp0072003@gmail.com';
      const files = req.files;
      const user = await KYC.findOneAndUpdate({ email }, { profileimg: files.profileimg ? files.profileimg[0].path : '' }, { new: true });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Profile image uploaded successfully' });
  } catch (error) {
      console.error('Error uploading profile image:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/api/NabarValidation', async (req, res) => {
  const email = "vp0072003@gmail.com";
  try {
    const userKyc = await User.findOne({ email });
    if (userKyc) {
      res.json({
        kycVerified: userKyc.kycverification,
        fullname: userKyc.fullname,
        email: userKyc.email
      });
    } else {
      res.json({ kycVerified: false,fullname: userKyc.fullname,
        email: userKyc.email });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error checking KYC status' });
  }
});


app.post('/feedback', async (req, res) => {
  const { name, email, message } = req.body; // Extract data from request body

  try {
      const newFeedback = new feedbackModel({ name, email, message }); // Create new feedback object
      await newFeedback.save(); // Save feedback to database
      res.json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
      console.error('Error saving feedback:', err);
      res.status(500).json({ message: 'Error submitting feedback' });
  }
});


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const verificationRoutes = require('./routes/verification');
app.use('/api/verification', verificationRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
