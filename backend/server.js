const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const User = require('./models/User');
const Nutrition = require('./models/Nutrition');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Here we are using the sample data of diet plan
const dietPlan = {
  "daily": [
    {
      "breakfast": "Oatmeal with fruits (apple, banana)",
      "mid-morning snack": "Handful of almonds or yogurt with berries",
      "lunch": "Dal Tadka with a side of mixed vegetables",
      "afternoon snack": "Paneer Tikka (grilled) with mint chutney",
      "dinner": "Grilled chicken breast or fish with salad"
    },
    {
      "breakfast": "Whole wheat toast with avocado and poached egg",
      "mid-morning snack": "Greek yogurt with honey and walnuts",
      "lunch": "Quinoa salad with chickpeas and vegetables",
      "afternoon snack": "Mixed fruit bowl",
      "dinner": "Baked salmon with quinoa and steamed broccoli"
    },
  ],
  "weekly": [
    {
      "day1": "Vegetable Biryani with Raita",
      "day2": "Chana Masala with whole wheat roti",
      "day3": "Grilled paneer salad with mixed greens",
      "day4": "Stir-fried vegetables with quinoa",
      "day5": "Dal Tadka with brown rice",
      "day6": "Vegetable soup with grilled chicken breast",
      "day7": "Whole wheat pasta with marinara sauce and vegetables"
    },
    {
      "day1": "Mediterranean chicken wrap with hummus",
      "day2": "Thai green curry with brown rice",
      "day3": "Grilled shrimp salad with avocado and citrus dressing",
      "day4": "Caprese salad with whole grain bread",
      "day5": "Turkey chili with cornbread",
      "day6": "Lentil soup with whole wheat bread",
      "day7": "Vegetable stir-fry with tofu and quinoa"
    },
  ],
  "monthly": [
    {
      "week1": "Focus on portion control and balanced meals",
      "week2": "Increase vegetable intake and reduce carbohydrates",
      "week3": "Incorporate more lean protein sources like grilled fish and chicken",
      "week4": "Try intermittent fasting with a focus on hydration and fiber-rich foods"
    },
    {
      "week1": "Emphasize whole foods and reduce processed foods",
      "week2": "Experiment with new recipes and cuisines",
      "week3": "Include more plant-based meals",
      "week4": "Practice mindful eating and monitor portion sizes"
    },
  ]
};

function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

app.use(bodyParser.json()); 
app.use(cors());

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully', role: role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.validPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = user.generateAuthToken();
    res.json({message: 'successfull', token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Nutrition.findAll();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/daily-diet', (req, res) => {
  const randomDailyPlan = getRandomItem(dietPlan.daily);
  res.json(randomDailyPlan);
});

app.get('/api/weekly-diet', (req, res) => {
  const randomWeeklyPlan = getRandomItem(dietPlan.weekly);
  res.json(randomWeeklyPlan);
});

app.get('/api/monthly-diet', (req, res) => {
  const randomMonthlyPlan = getRandomItem(dietPlan.monthly);
  res.json(randomMonthlyPlan);
});


app.post('/api/all-user-data/', async (req,res)=>{
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Server error' });
  }

});

app.post('/api/user-data/', async (req,res)=>{
  const username = req.body.user;
  try {
    const user = await User.findOne({ where: { username } });
    res.json(user);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Server error' });
  }

});

app.post('/api/user-update/',async( req,res)=>{
  const { username, password, age, gender, weight, height, dietaryPref, allergies, healthGoals } = req.body;
  console.log("username",username)
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (weight) user.weight = weight;
    if (height) user.height = height;
    if (dietaryPref) user.dietaryPref = dietaryPref;
    if (allergies) user.allergies = allergies;
    if (healthGoals) user.healthGoals = healthGoals;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
})
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
