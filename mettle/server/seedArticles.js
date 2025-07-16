const mongoose = require('mongoose');
const Article = require('./models/Article');
require('dotenv').config();

const sampleArticles = [
  {
    title: "5 Things That Helped Me Through Chemo",
    body: "Chemotherapy was one of the hardest things I've ever faced. But these five things—staying hydrated, having a support buddy, journaling, gentle movement, and soft hats—made a huge difference for me.",
    author: "Emily J.",
    tags: ["chemo", "cancer", "treatment"]
  },
  {
    title: "3 Things I Recommend for Someone Needing Dialysis",
    body: "Dialysis is overwhelming at first. I found that bringing a warm blanket, noise-canceling headphones, and snacks made sessions more bearable.",
    author: "Michael R.",
    tags: ["dialysis", "kidney", "treatment tips"]
  },
  {
    title: "What I Wish I Knew Before My Mastectomy",
    body: "Before my surgery, I was scared and unsure. I now know that asking questions, having button-up shirts ready, and connecting with survivors would've helped a lot.",
    author: "Samantha P.",
    tags: ["mastectomy", "recovery", "breast cancer"]
  },
  {
    title: "How Music Helped Me Cope with Chronic Illness",
    body: "Listening to calming playlists and revisiting favorite albums helped ease my anxiety and made long hospital visits more bearable.",
    author: "Jayden K.",
    tags: ["coping", "music", "mental health"]
  },
  {
    title: "My Go-To Comfort Foods During Recovery",
    body: "I found warm, soft foods like soups, mashed potatoes, and smoothies not only easy on the stomach but comforting too.",
    author: "Linda M.",
    tags: ["nutrition", "healing", "recovery"]
  },
  {
    title: "Dealing with Fatigue After Radiation: What Worked for Me",
    body: "Short naps, light stretching, and cutting myself some slack were essential for managing post-radiation fatigue.",
    author: "Thomas L.",
    tags: ["radiation", "fatigue", "healing"]
  },
  {
    title: "Keeping a Medical Journal Saved My Sanity",
    body: "Writing down symptoms, questions for my doctor, and even daily wins helped me feel in control during my treatment.",
    author: "Nina D.",
    tags: ["journaling", "organization", "mental health"]
  },
  {
    title: "Finding Joy on Hard Days",
    body: "Even on the worst days, a funny TV show, a small walk outside, or chatting with a friend helped remind me of the good.",
    author: "Reece T.",
    tags: ["positivity", "grief", "daily life"]
  },
  {
    title: "The Role My Dog Played in My Healing",
    body: "Having my dog by my side gave me a sense of normalcy and emotional support I didnt know I needed.",
    author: "Kylie F.",
    tags: ["pets", "support", "healing"]
  },
  {
    title: "Why I Started Writing Letters to Myself",
    body: "I began writing letters to my future self as a way to process fear and hold on to hope. It's been incredibly healing.",
    author: "Arjun S.",
    tags: ["writing", "mental health", "reflection"]
  }
]

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mettleApp')
.then(async () => {
    console.log('Connected to DB');
    await Article.insertMany(sampleArticles)
    console.log('Articles seeded');
    mongoose.disconnect();
})
.catch(err => console.error('Seedingerror:', err));


