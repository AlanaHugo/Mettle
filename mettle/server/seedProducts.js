const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mettleApp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: 'Comfort Care Package',
    description: 'A curated box with warm socks, herbal tea, and a soft eye mask.',
    price: 49.99,
    category: 'Recovery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Comfort+Care',
  },
  {
    name: 'Hospital Essentials Kit',
    description: 'Includes lip balm, face wipes, a notebook, and a reusable water bottle.',
    price: 34.95,
    category: 'Hospital Stay',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Essentials+Kit',
  },
  {
    name: 'Post-Surgery Pillow',
    description: 'Supportive cushion for chest or abdominal surgery recovery.',
    price: 29.99,
    category: 'Surgery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Recovery+Pillow',
  },
  {
    name: 'Gentle Healing Kit',
    description: 'A thoughtful combination of comfort and practicality for recovery.',
    price: 31.69,
    category: 'Surgery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Gentle+Healing+Kit',
  },
  {
    name: 'Soothe & Sip Bundle',
    description: 'Includes herbal tea, a cozy wrap, and calming aromatherapy.',
    price: 43.49,
    category: 'Recovery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Soothe+%26+Sip+Bundle',
  },
  {
    name: 'Mindful Moments Box',
    description: 'Perfect for rest days with a book, tea, and fuzzy socks.',
    price: 32.69,
    category: 'Comfort',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Mindful+Moments+Box',
  },
  {
    name: 'Home Recovery Kit',
    description: 'Daily essentials for home recovery from treatment or surgery.',
    price: 46.88,
    category: 'Recovery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Home+Recovery+Kit',
  },
  {
    name: 'Chemo Comfort Pack',
    description: 'Designed to ease side effects and provide emotional care.',
    price: 40.26,
    category: 'Recovery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Chemo+Comfort+Pack',
  },
  {
    name: 'Rest & Recharge Set',
    description: 'Recharge with bath salts, an eye mask, and cozy slippers.',
    price: 47.21,
    category: 'Wellness',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Rest+%26+Recharge+Set',
  },
  {
    name: 'Supportive Friend Box',
    description: 'Curated by patients for thoughtful support and care.',
    price: 42.15,
    category: 'Comfort',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Supportive+Friend+Box',
  },
  {
    name: 'Hydration Essentials',
    description: 'Stay hydrated with a stainless steel water bottle and lip balm.',
    price: 38.45,
    category: 'Hospital Stay',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Hydration+Essentials',
  },
  {
    name: 'Quiet Time Package',
    description: 'Promotes quiet, mindful rest during long treatments.',
    price: 35.02,
    category: 'Wellness',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Quiet+Time+Package',
  },
  {
    name: 'Mini Uplift Box',
    description: 'A mini pick-me-up with snacks and a personal note card.',
    price: 27.89,
    category: 'Comfort',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Mini+Uplift+Box',
  },
  {
    name: 'Get Well Journal',
    description: 'Guided journal for healing, reflection, and mindfulness.',
    price: 26.50,
    category: 'Wellness',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Get+Well+Journal',
  },
  {
    name: 'Comfort & Care Set',
    description: 'Comfort-focused items handpicked for recovery journeys.',
    price: 48.32,
    category: 'Recovery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Comfort+%26+Care+Set',
  },
  {
    name: 'Wellness Recovery Tote',
    description: 'Includes tote, snacks, ear plugs, and sanitizing wipes.',
    price: 52.10,
    category: 'Hospital Stay',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Wellness+Recovery+Tote',
  },
  {
    name: 'Heart Surgery Hug Pillow',
    description: 'Shaped to support healing after chest surgery.',
    price: 44.77,
    category: 'Surgery',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Heart+Surgery+Hug+Pillow',
  },
  {
    name: 'Overnight Hospital Bag',
    description: 'Everything you need for a hospital stay in one bag.',
    price: 55.90,
    category: 'Hospital Stay',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Overnight+Hospital+Bag',
  },
  {
    name: 'Skin Soother Kit',
    description: 'Natural skin care for post-treatment sensitivity.',
    price: 39.35,
    category: 'Wellness',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Skin+Soother+Kit',
  },
  {
    name: 'Portable Warmth Blanket',
    description: 'Compact and USB-powered blanket for instant warmth.',
    price: 53.70,
    category: 'Comfort',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Portable+Warmth+Blanket',
  }
];

const seed = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
};

seed();
