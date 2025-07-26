// server/seed.js
const dotenv = require('dotenv');
dotenv.config({ path: require('path').join(__dirname, '.env') }); // ✅ Load .env before anything else

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing in .env');
  process.exit(1);
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Category = require('./models/Category');
const Question = require('./models/Question');
const User = require('./models/User');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Optional: Clear old data
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Question.deleteMany()
    ]);
    console.log('🧹 Cleared old data');

    // Create user
    const hashedPassword = await bcrypt.hash('test123', 10);
    const demoUser = await User.create({ username: 'linah', password: hashedPassword });
    console.log(`👤 User created: ${demoUser.username}`);

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Pregnancy' },
      { name: 'Childbirth' },
      { name: 'Postpartum' },
      { name: 'Marriage' }
    ]);
    console.log('📚 Categories seeded:', categories.map(c => c.name).join(', '));

    // Create questions
    const questions = [
      {
        text: 'What are common symptoms during early pregnancy?',
        category: categories[0]._id,
        user: demoUser._id
      },
      {
        text: 'How painful is childbirth really?',
        category: categories[1]._id,
        user: demoUser._id
      },
      {
        text: 'How do I handle postpartum depression?',
        category: categories[2]._id,
        user: demoUser._id
      },
      {
        text: 'How do you maintain a healthy marriage?',
        category: categories[3]._id,
        user: demoUser._id
      }
    ];

    await Question.insertMany(questions);
    console.log('💬 Questions seeded');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();