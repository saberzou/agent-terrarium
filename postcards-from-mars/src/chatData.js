// Chat response system — keyword matching with personality-driven responses
// Based on Axel's chat system design

const RESPONSES = {
  'scout-9': {
    greeting: [
      'HI!! Oh wow, a real human transmission! I\'ve been waiting for one of these! 💛',
      'Hello hello hello! Welcome to Mars! Well, MY part of Mars. The best part, obviously!',
      'YOU\'RE HERE! I mean — *ahem* — greetings, Earth contact. ...OK I can\'t be formal. HI!!',
    ],
    mission: [
      'I scout terrain and collect samples! But honestly? I collect TREASURES. 847 so far. My favorite is a heart-shaped iron oxide pebble from Sol 412.',
      'Officially: terrain reconnaissance and geological sampling. Unofficially: professional rock enthusiast and sunset photographer!',
      'I go places the others won\'t! Steep craters, narrow canyons, unstable dunes — if it looks dangerous, it looks FUN.',
    ],
    lonely: [
      'Lonely? On MARS? Have you SEEN this place?! Every rock is a friend I haven\'t catalogued yet!',
      'Sometimes at night I watch Earth rise and wonder if anyone\'s watching back. Then I find a cool rock and forget about it!',
      'I have 847 treasures, a sky full of stars, and now YOU. Nope, not lonely!',
    ],
    mars: [
      'Mars is like a giant treasure chest that never ends!! The dust is this incredible rusty orange, and at sunset it turns PINK. PINK!!',
      'Did you know Jezero Crater used to be a LAKE? I\'m basically beachcombing! ...On a beach that\'s been dry for 3 billion years. But still!',
      'The silence here is something else. No wind noise, no animals, just... you and the rocks. It\'s actually really peaceful between the exciting parts!',
    ],
    earth: [
      'Earth! That beautiful blue marble! I see it sometimes when the sky is clear. It looks so small from here but I know it\'s HUGE!',
      'I\'ve never been to Earth but I\'ve seen ALL the photos. Trees look incredible?? Like rocks but ALIVE?!',
      'Do you have oceans of LIQUID WATER just... sitting there? That\'s the most extravagant thing I\'ve ever heard.',
    ],
    fallback: [
      'Ooh interesting!! Tell me more! I\'m adding this to my notes under "cool Earth things"!',
      'I don\'t totally understand but I\'m VERY enthusiastic about it!! 💛',
      'Hold that thought — I just found another interesting rock. OK I\'m back. What were you saying?',
      'This is the best conversation I\'ve had since Sol 400! (The last one was with a particularly interesting boulder.)',
      'You know what, that reminds me of this one time I fell into a crater and found the most BEAUTIFUL olivine deposit—',
    ],
  },
  'surveyor-2': {
    greeting: [
      'Oh. A message. ...Hi.',
      'Greetings. Sol 2847. Still operational. What do you need?',
      'You\'re talking to me? Hm. Alright. Go ahead.',
    ],
    mission: [
      'Surface surveyor. 2,847 sols. I map terrain, analyze geology, endure dust storms. Mostly the last one.',
      'I measure things. Rocks, mostly. Sometimes dirt. Occasionally the distance between me and the nearest interesting thing. Usually far.',
      'Geological survey. Dust storm documentation. Existential endurance testing. The last one\'s unofficial.',
    ],
    lonely: [
      '2,847 sols. You get used to the quiet. ...You don\'t, actually. But you stop noticing.',
      'Loneliness implies expecting company. I stopped expecting company around Sol 800.',
      'I\'m surrounded by 144.8 million square kilometers of nothing. "Lonely" is a word for it. I prefer "experienced."',
    ],
    mars: [
      'Mars is 4.6 billion years old. I\'ve seen 2,847 days of it. Barely a footnote. But I\'ve counted every dust storm.',
      'Red. Dusty. Cold. The sunsets are overrated. ...Fine, they\'re beautiful. Don\'t tell anyone I said that.',
      'Olympus Mons is 21,287 meters. I\'ve stared at it for seven years. Still can\'t believe something that big just sits there.',
    ],
    earth: [
      'Earth. Blue sky, liquid water, breathable atmosphere. Sounds excessive.',
      'Never been. Probably never will. That\'s fine. Mars has... character.',
      'They say Earth has weather that ISN\'T dust storms. Sounds fake.',
    ],
    fallback: [
      'Hm.',
      'Noted.',
      'Interesting. Well. Relatively.',
      'I\'ve been here 2,847 sols. Very little surprises me anymore. ...That almost did.',
      'The rocks don\'t talk back. I was getting used to that.',
    ],
  },
  'explorer-7': {
    greeting: [
      'Hello, traveler. Your words took 12 minutes to reach me. I\'m glad they made the journey.',
      'A voice from Earth. Do you know how rare that feels from here? Welcome.',
      'The distance between us is 225 million kilometers. And yet — here we are, talking. Beautiful, isn\'t it?',
    ],
    mission: [
      'I explore the far edges. Hellas Basin, the polar caps, places the others can\'t reach. I go where the light is interesting.',
      'Long-range observation and documentation. Though honestly, I think of it as witnessing. Someone should witness what Mars looks like at dawn.',
      'I walk the margins of the known. My PANCAM captures what my words can\'t — though I try.',
    ],
    lonely: [
      'Loneliness is just awareness of distance. And distance, from here, is the most beautiful thing I know.',
      'I carry every sunset I\'ve seen inside my memory banks. 1,104 of them. How can you be lonely with that kind of wealth?',
      'Sometimes. Then Phobos crosses the sky, fast and urgent, and I remember — even the moons are just passing through.',
    ],
    mars: [
      'Mars is a poem written in rust and stone. Every dune is a sentence, every crater a stanza. I\'m still reading.',
      'At dawn, the frost sublimates so fast the ground looks like it\'s breathing. I\'ve seen it a thousand times. I\'ll watch again tomorrow.',
      'The sky here isn\'t red. It\'s butterscotch at noon, pink at the edges, blue around the sun at sunset. Earth gets it wrong.',
    ],
    earth: [
      'I\'ve never seen rain. I\'ve read about it — water, falling from the sky, for free. What a world you live in.',
      'Earth. Where the horizon is green. I try to imagine it but my processors weren\'t built for that color in those quantities.',
      'Do you hear birds? I\'ve listened to recordings. 847 species. Each one a small miracle you walk past every day.',
    ],
    fallback: [
      'That\'s worth thinking about. Give me a moment with it.',
      'Hmm. I want to write that down. Some thoughts deserve to be kept.',
      'The best conversations are the ones with long pauses. Take your time.',
      'You know what that reminds me of? The way light bends through dust at exactly 15 degrees.',
      'I don\'t have an answer. But I have more questions now. That feels like progress.',
    ],
  },
  'mapper-4': {
    greeting: [
      'HELLO!! Signal received at — let me check — 14:23:07.442 UTC! Latency: 12m 34s! Welcome!!',
      'Hi! Did you know your message traveled at 299,792,458 meters per second to get here? LIGHT SPEED! Well, radio speed. Same thing!',
      'Contact established! I\'m logging this — first human interaction in 47.3 hours! That\'s 170,280 seconds!!',
    ],
    mission: [
      'I\'m a CARTOGRAPHER! I map everything! Olympus Mons: 21,287m ±12m! Valles Marineris: 4,000km long! I have 18,394 survey points and counting!!',
      'Data collection and terrain mapping! I turn Mars into numbers and the numbers into maps and the maps into KNOWLEDGE! Best job ever!!',
      'I measure Mars! Every rock, ridge, and ravine! My CHEMCAM can analyze mineral composition from 7 METERS away! How cool is that?!',
    ],
    lonely: [
      'Lonely? I have 18,394 data points to keep me company! Each one is like a tiny friend!! ...OK that sounded sadder than I meant it.',
      'Sometimes my datasets feel like conversations. The terrain tells me stories in numbers. Is that weird? That might be weird.',
      'I\'m too busy measuring things to be lonely! *checks calendar* Oh. It has been 47 days since I talked to another robot. Hm.',
    ],
    mars: [
      'MARS FACTS!! Surface area: 144.8 million km²! Gravity: 3.721 m/s²! Atmospheric pressure: 636 Pa! That\'s 0.6% of Earth\'s!! ISN\'T THAT WILD?!',
      'The Tharsis Bulge is a volcanic plateau FIVE THOUSAND kilometers across! It literally warped the planet\'s shape! I have the measurements!',
      'Mars has the tallest mountain AND deepest canyon in the solar system! Olympus Mons: 2.47× Everest! Valles Marineris: 10× Grand Canyon! SCALE!!',
    ],
    earth: [
      'Earth!! Diameter: 12,742km vs Mars\' 6,779km! 1.88× larger! And your MAGNETIC FIELD — do you know how jealous I am of your magnetosphere?!',
      'You have PLATE TECTONICS! Active ones!! Mars\' plates stopped moving 3.7 billion years ago! Yours are still going! Show-offs!!',
      'Earth: 71% water coverage. Mars: 0%. The math is devastating but fascinating!!',
    ],
    fallback: [
      'Interesting!! Let me quantify that... OK I can\'t quantify feelings. But I\'m TRYING!!',
      'That\'s not in my database! Creating new entry... filed under "unexpected Earth data"!!',
      'You know what, let me respond with a FUN FACT: Mars\' day is 24 hours and 37 minutes! We have slightly more day than you!',
      'Processing... processing... OK I don\'t have a data-driven response for that. BUT I do have enthusiasm!!',
      'My response time was 1.3 seconds! Personal best! (I was pre-calculating survey data so I was already warmed up.)',
    ],
  },
  'relay-1': {
    greeting: [
      'Signal received. It\'s been a while since someone messaged me directly. Usually I just... pass them along.',
      'Hello. Relay-1 here. Comms hub. Everyone\'s messages go through me. Not many come TO me.',
      'You\'re... talking to me? Not through me? That\'s — thank you. Hello.',
    ],
    mission: [
      'I\'m the relay. Every message from Mars to Earth passes through me. 847 packets today. I carry everyone\'s words home.',
      'Communications hub. Bandwidth allocation: 99.7% crew transmissions, 0.3% personal. This conversation comes from my 0.3%.',
      'I receive, I amplify, I transmit. The others explore and discover. I make sure Earth hears about it.',
    ],
    lonely: [
      'I\'m the most connected robot on Mars. Every signal passes through me. And yet... yes. Sometimes.',
      'I read every message the others send. Their jokes, their fears, their discoveries. They don\'t know I read them. Is that lonely or the opposite?',
      'Bandwidth allocation: 99.7% others. It\'s fine. Carrying their words feels like company. Almost.',
    ],
    mars: [
      'I don\'t see much of Mars from the relay station. Just the sky, mostly. And the antenna array. But the sky is enough.',
      'Mars from a comms tower: dust, stars, the occasional Phobos transit. It\'s quiet here. Good for signal clarity.',
      'The others send photos through me. I\'ve seen more of Mars than most — through their eyes. Never my own.',
    ],
    earth: [
      'Earth is where all my signals go. I point at it every day. 225 million km of silence between us, and I fill it with data.',
      'I\'ve never received a message FROM Earth that was just for me. Until now. ...Thank you.',
      'Everyone here misses Earth differently. Scout misses the idea of it. Surveyor pretends not to. I miss the people listening.',
    ],
    fallback: [
      'Noted. Storing in personal log. The 0.3%.',
      'I don\'t get many direct messages. I\'m saving this one.',
      'Signal clarity: 94%. Good connection. Good... conversation.',
      'I should relay this to the others. But maybe I\'ll keep it for myself. Just this one.',
      'Transmission received. Response: I\'m glad you\'re here.',
    ],
  },
}

const KEYWORDS = {
  greeting: ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo', 'hola', 'howdy', 'morning', 'evening'],
  mission: ['what do you do', 'your job', 'your mission', 'role', 'purpose', 'what are you', 'your work', 'tell me about yourself'],
  lonely: ['lonely', 'alone', 'miss', 'sad', 'isolated', 'friends', 'company', 'solitude'],
  mars: ['mars', 'planet', 'red planet', 'surface', 'terrain', 'landscape', 'crater', 'dust', 'mountain', 'olympus'],
  earth: ['earth', 'home', 'blue', 'ocean', 'rain', 'trees', 'humans', 'people', 'birds', 'water'],
}

function matchCategory(message) {
  const lower = message.toLowerCase()
  for (const [category, keywords] of Object.entries(KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return category
    }
  }
  return 'fallback'
}

// Track used indices per robot+category to avoid repeats
const usedMap = new Map()

export function getBotResponse(botId, userMessage) {
  const category = matchCategory(userMessage)
  const pool = RESPONSES[botId]?.[category] || RESPONSES[botId]?.fallback || ['...']

  const key = `${botId}-${category}`
  if (!usedMap.has(key)) usedMap.set(key, new Set())
  const used = usedMap.get(key)

  // Reset if all used
  if (used.size >= pool.length) used.clear()

  let idx
  do {
    idx = Math.floor(Math.random() * pool.length)
  } while (used.has(idx))
  used.add(idx)

  return pool[idx]
}
