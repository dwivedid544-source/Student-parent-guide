// HighOrbit Parenting Guide Situations Data
// Covers all 10 required real-life situations with all 8 detailed dimensions

export const parentingGuideSituations = [
  {
    id: 'confidence',
    title: 'Lack of Confidence & Self-Doubt',
    category: 'Confidence & Voice',
    summary: 'Student hesitates to take opportunities, speaks dismissively of their abilities, or fears judgment from peers.',
    noticing: [
      'Downplaying their achievements as "just luck" or unimportant.',
      'Reluctance to join clubs, ask teachers for help, or apply for internships.',
      'Excessive self-criticism over minor errors or feedback.',
      'Hesitation in eye contact or speaking softly in social groups.'
    ],
    reasons: [
      'Intense social comparison driven by social media feeds.',
      'Fear of failure in high-stakes academic environments.',
      'Internalized perfectionism where anything short of flawlessness feels like failure.',
      'Unresolved past experiences of feeling dismissed or criticized.'
    ],
    questions: [
      '"What is one thing you tackled this week that felt challenging at first?"',
      '"If fear of messing up wasn’t a factor, what project would you want to try?"',
      '"What would you tell your best friend if they were being this hard on themselves?"',
      '"How can I best support you when you are feeling uncertain?"'
    ],
    dos: [
      'Praise the effort, persistence, and problem-solving process rather than innate talent.',
      'Share your own stories of healthy mistakes and how you learned from them.',
      'Encourage low-stakes experiments where the goal is trying, not winning.',
      'Remind them that confidence is a muscle developed after taking action, not before.'
    ],
    donts: [
      'Don’t dismiss their feelings with generic statements like "Don’t worry, you’re smart."',
      'Don’t compare them to siblings, cousins, or high-achieving peers.',
      'Don’t step in immediately to rescue them from minor challenges.',
      'Don’t show visible disappointment when an outcome isn’t optimal.'
    ],
    conversation: [
      { speaker: 'Parent', text: 'Hey, I noticed you seemed a bit hesitant about the debate club tryouts. Everything okay?' },
      { speaker: 'Student', text: 'It’s just that everyone else there is so much louder and more articulate. I’ll probably freeze up.' },
      { speaker: 'Parent', text: 'It’s completely natural to feel your heart race when stepping into a new arena. Loud doesn’t always mean thoughtful. What drew your curiosity to debate initially?' },
      { speaker: 'Student', text: 'I really care about the environmental topic they are discussing.' },
      { speaker: 'Parent', text: 'That passion is your anchor. How about you focus just on sharing your perspective, rather than trying to impress the room? Would you like to bounce your key idea off me?' }
    ],
    activity: {
      title: 'The 3-Minute Voice Sprint',
      track: 'Communication & Self-Advocacy',
      description: 'Practice articulating one personal perspective or asking one question in class or community this week.'
    },
    professionalHelp: 'If lack of confidence transforms into persistent social avoidance, extreme anxiety, panic attacks, or depressive withdrawal, consult a licensed adolescent counselor.'
  },
  {
    id: 'communication',
    title: 'Poor Communication & Emotional Withdrawal',
    category: 'Communication',
    summary: 'Student gives one-word answers, avoids family conversations, retreats to their room, or shuts down under inquiry.',
    noticing: [
      'Frequent one-word answers ("fine", "whatever", "okay").',
      'Immediate retreat to bedroom with headphones upon arriving home.',
      'Body language indicating tension (folded arms, avoiding eye contact).',
      'Shifting topics rapidly when asked about school or future plans.'
    ],
    reasons: [
      'Feeling interrogated rather than understood during parent interactions.',
      'Cognitive exhaustion from high-stimulation school or university days.',
      'Fear that sharing a struggle will lead to unsolicited lectures or advice.',
      'Need for autonomy and a safe decompression boundary.'
    ],
    questions: [
      '"Do you have energy to chat now, or would you prefer some quiet downtime first?"',
      '"What was the most surprising or interesting thing that happened today?"',
      '"I’m here to just listen—no problem solving needed unless you ask for it."',
      '"Is there anything on your plate that feels heavy right now?"'
    ],
    dos: [
      'Respect their initial decompression time before starting conversations.',
      'Engage in side-by-side activities (driving in the car, preparing dinner, walking) which lowers eye-contact pressure.',
      'Validate feelings first before offering suggestions: "That sounds frustrating."',
      'Keep your own reactions calm and steady.'
    ],
    donts: [
      'Don’t bombard them with five questions the second they walk through the door.',
      'Don’t take their silence or withdrawal as a personal insult or disrespect.',
      'Don’t demand immediate emotional transparency on your schedule.',
      'Don’t lecture or say "When I was your age..."'
    ],
    conversation: [
      { speaker: 'Parent', text: 'Hey Leo, I know you’ve had a packed day. How was school?' },
      { speaker: 'Student', text: 'Fine. Just going to my room.' },
      { speaker: 'Parent', text: 'Got it. Take all the quiet time you need to recharge. I made some tea if you want a cup later—no agenda, just if you feel like catching up.' },
      { speaker: 'Student', text: '...Thanks. Chemistry was kind of brutal today.' },
      { speaker: 'Parent', text: 'Ugh, sorry to hear that. I’m here whenever you want to vent about it, no advice given.' }
    ],
    activity: {
      title: 'Side-by-Side Walk & Talk',
      track: 'Connection & Trust',
      description: 'A 15-minute phone-free walk or shared tea break with zero academic discussion.'
    },
    professionalHelp: 'If withdrawal persists for weeks, accompanied by loss of interest in all hobbies, marked changes in eating/sleeping, or refusal to communicate with anyone, seek adolescent clinical evaluation.'
  },
  {
    id: 'procrastination',
    title: 'Procrastination & Academic Overwhelm',
    category: 'Focus & Time',
    summary: 'Delaying important assignments until the last minute, scrolling endlessly on phones, and suffering late-night panic.',
    noticing: [
      'Starting major essays or study sessions at 11:00 PM the night before.',
      'High stress and panic right before deadlines.',
      'Fidgeting, screen-switching, or cleaning their room when study time begins.',
      'Expressing feeling drowned under the sheer volume of work.'
    ],
    reasons: [
      'Procrastination is often emotional regulation failure, not laziness: fear of not doing it well.',
      'Unclear starting step—the project feels too large and undefined.',
      'Dopamine fatigue from constant phone notifications and quick digital fixes.',
      'Lack of break-down planning skills for multi-week university projects.'
    ],
    questions: [
      '"What is the absolute smallest, easiest first step of this assignment?"',
      '"Does this feel hard because of the material, or because getting started feels overwhelming?"',
      '"How can we break this into a 15-minute chunk so it doesn’t feel like a mountain?"',
      '"Would it help if I sit in the room quietly reading while you do your first sprint?"'
    ],
    dos: [
      'Help them define a "Micro-Start" (e.g., write the title and one sentence).',
      'Normalize the discomfort of beginning: "Starting is always the hardest 5 minutes."',
      'Encourage Pomodoro focus sprints (25 minutes on, 5 minutes off).',
      'Celebrate starting, regardless of how much was completed.'
    ],
    donts: [
      'Don’t call them lazy, unmotivated, or irresponsible.',
      'Don’t hover over their shoulder or demand hourly progress updates.',
      'Don’t confiscate devices in anger, which breeds resentment and secrecy.',
      'Don’t catastrophize: "If you don’t finish this, you won’t get into college."'
    ],
    conversation: [
      { speaker: 'Student', text: 'I have a 10-page paper due Friday and I haven’t even chosen a topic. I can’t do this.' },
      { speaker: 'Parent', text: 'Ten pages does feel massive when looked at all at once. Take a deep breath. You don’t need to write ten pages tonight.' },
      { speaker: 'Student', text: 'Everyone else probably already finished their drafts.' },
      { speaker: 'Parent', text: 'Forget everyone else. What if we just set a timer for 15 minutes right now, and all you do is write down three potential topics you don’t hate? After that, you can stop.' },
      { speaker: 'Student', text: 'Just three topics? I guess I can do that.' }
    ],
    activity: {
      title: 'The 15-Minute Micro-Sprint',
      track: 'Focus & Deep Work',
      description: 'Set a 15-minute timer to accomplish just the opening step of an avoided task.'
    },
    professionalHelp: 'If chronic procrastination prevents academic progression despite immense effort, consider evaluating for undiagnosed ADHD or executive function challenges with an educational psychologist.'
  },
  {
    id: 'anger',
    title: 'Anger, Irritability & Frustration',
    category: 'Emotional Wellness',
    summary: 'Snapping quickly at minor questions, slamming doors, reacting with disproportionate irritation to parental remarks.',
    noticing: [
      'Hair-trigger reactivity to routine questions or household reminders.',
      'Sarcastic, biting remarks or raised voices.',
      'Slamming doors or stomping away during minor disagreements.',
      'Expressing that "Nobody understands" or "Everything is annoying."'
    ],
    reasons: [
      'Anger is a secondary emotion masking deeper vulnerability, fear, or exhaustion.',
      'Hormonal and prefrontal cortex development creating emotional volatility.',
      'Feeling out of control regarding school, social status, or future prospects.',
      'Sensing that their boundaries or privacy are not being respected.'
    ],
    questions: [
      '"I can see you’re really frustrated. Do you want to vent, or do you want space right now?"',
      '"What feels most unfair about this situation?"',
      '"I care about what you’re feeling. When you’re ready, I’d like to understand what brought this on."',
      '"How can we handle this differently next time without shouting?"'
    ],
    dos: [
      'Keep your own voice quiet and calm—de-escalate the emotional temperature.',
      'Acknowledge the underlying emotion: "I hear how angry you are."',
      'Allow a cooling-off period of at least 30 minutes before discussing the issue.',
      'Model healthy emotional regulation by staying centered.'
    ],
    donts: [
      'Don’t match their shouting or get sucked into power struggles.',
      'Don’t invalidate them: "You have no reason to be this angry."',
      'Don’t demand immediate apologies while adrenaline is surging.',
      'Don’t bring up old grievances from months ago.'
    ],
    conversation: [
      { speaker: 'Parent', text: 'Could you please clear your plates from the counter?' },
      { speaker: 'Student', text: 'CAN YOU STOP NAGGIN ME FOR FIVE SECONDS?! I AM BUSY!' },
      { speaker: 'Parent', text: '(Pause, deep breath, calm tone) I hear that you’re under a lot of stress right now. I won’t shout with you. Let’s take 20 minutes to cool off, and then we’ll talk about this respectfully.' },
      { speaker: 'Student', text: '(Pause, looks down) ...Fine.' }
    ],
    activity: {
      title: 'The 5-5-5 Emotional Decompression',
      track: 'Emotional Resilience',
      description: 'A 5-minute cooling exercise: box breathing, physical shaking of tension, and identifying the primary underlying feeling.'
    },
    professionalHelp: 'If anger escalates into physical aggression, property destruction, self-harm, or cruelty, seek immediate specialized family therapy or mental health crisis support.'
  },
  {
    id: 'motivation',
    title: 'Low Motivation, Inertia & Apathy',
    category: 'Growth & Habits',
    summary: 'Expressing that "nothing matters", spending weekends lying in bed, showing indifference toward future ambitions.',
    noticing: [
      'Declining to engage in previously enjoyed hobbies or sports.',
      'Cynical attitude toward school, college, or future careers.',
      'Difficulty getting out of bed on non-structured days.',
      'Phrases like "What’s the point?" or "It doesn’t matter anyway."'
    ],
    reasons: [
      'Existential dread or feeling disconnected from personal purpose.',
      'Burnout from years of meeting external expectations rather than internal desires.',
      'Dopamine burnout from passive screen consumption.',
      'Underlying depressive symptoms.'
    ],
    questions: [
      '"When was the last time you felt genuinely energized or curious about something?"',
      '"What is one topic you could talk about for an hour without getting bored?"',
      '"If you didn’t have to worry about anyone else’s expectations, what would you spend time on?"',
      '"Do you feel tired in your body, or tired in your spirit?"'
    ],
    dos: [
      'Distinguish between genuine rest and numb avoidance.',
      'Help them reconnect with intrinsic curiosities rather than GPA metrics.',
      'Encourage physical movement in nature—sunlight, walking, fresh air.',
      'Be a steady, believing presence when they struggle to believe in themselves.'
    ],
    donts: [
      'Don’t give motivational speeches or tell them how fortunate they are.',
      'Don’t label them as lazy or ungrateful.',
      'Don’t pile on more responsibilities in hopes of "snapping them out of it."',
      'Don’t panic visibly, which increases their sense of burden.'
    ],
    conversation: [
      { speaker: 'Parent', text: 'Hey Maya, you’ve spent most of the weekend in your room. How are your energy levels feeling?' },
      { speaker: 'Student', text: 'Just tired. Everything feels kind of pointless lately.' },
      { speaker: 'Parent', text: 'Thank you for being honest with me. That feeling of flatness is really tough to carry. You don’t have to figure out your whole life today. Want to just come with me to grab a smoothie and look at the plants at the nursery?' },
      { speaker: 'Student', text: 'You’re not going to ask about my summer internship applications?' },
      { speaker: 'Parent', text: 'Zero internship talk. Promised. Just fresh air and your company.' }
    ],
    activity: {
      title: 'Curiosity Spark Inventory',
      track: 'Self-Discovery',
      description: 'List 5 things that sparked genuine curiosity in your life before the age of 14.'
    },
    professionalHelp: 'Persistent apathy and lack of pleasure (anhedonia) lasting more than two weeks can be a hallmark of clinical depression. Consult a medical professional or psychologist.'
  },
  {
    id: 'stress',
    title: 'Stress, Perfectionism & Burnout',
    category: 'Emotional Wellness',
    summary: 'Obsessing over minor grade drops, inability to relax, insomnia, and tying self-worth directly to external evaluation.',
    noticing: [
      'Working until 2:00 AM on assignments that are already high quality.',
      'Severe physical symptoms: headaches, stomachaches, nail-biting, muscle tightness.',
      'Inability to enjoy weekends or breaks without guilt about studying.',
      'Crying or panic over an A- minus or constructive criticism.'
    ],
    reasons: [
      'Belief that affection and worth are contingent on academic perfection.',
      'Hyper-competitive school culture and college admissions frenzy.',
      'Lack of healthy self-soothing and relaxation routines.',
      'Catastrophic thinking: "One mistake ruins my future."'
    ],
    questions: [
      '"If you got an 85% instead of a 98%, what do you worry would happen?"',
      '"What can we take off your plate this week to give you breathing room?"',
      '"What would a truly relaxing evening look like for you tonight?"',
      '"Do you know that our love and pride in you has nothing to do with your grades?"'
    ],
    dos: [
      'Explicitly give them permission to be imperfect and rest.',
      'Enforce healthy sleep hygiene: screen-off times, calm evening rituals.',
      'Model healthy boundaries in your own career and work-life balance.',
      'Celebrate mistakes as valuable research, not personal failures.'
    ],
    donts: [
      'Don’t ask "What did you get?" as your first question after a test.',
      'Don’t celebrate only the 100% scores and ignore the effort on harder subjects.',
      'Don’t tell them "Just don’t worry about it"—perfectionism is compulsive.',
      'Don’t micromanage their study schedule.'
    ],
    conversation: [
      { speaker: 'Parent', text: 'It’s 1:30 AM, Leo. You’ve reviewed those biology notes four times.' },
      { speaker: 'Student', text: 'If I don’t get an A, my GPA drops and I won’t get into the pre-med track.' },
      { speaker: 'Parent', text: 'Listen to me. Your health and your sanity are ten times more important than one biology quiz. A rested brain will score higher tomorrow than an exhausted brain anyway.' },
      { speaker: 'Student', text: 'I feel so guilty if I stop.' },
      { speaker: 'Parent', text: 'I understand. Let me take the responsibility: I am officially asking you to close the laptop. Come drink some chamomile tea, and let’s get you to sleep.' }
    ],
    activity: {
      title: 'Digital Sunset & Mindful Wind-Down',
      track: 'Wellness & Balance',
      description: 'Establish a 45-minute zero-device wind-down routine before sleep with light reading or music.'
    },
    professionalHelp: 'If perfectionism causes debilitating panic attacks, eating disturbances, or obsessive-compulsive routines, consult a licensed cognitive behavioral therapist (CBT).'
  },
  {
    id: 'responsibility',
    title: 'Difficulty Accepting Responsibility & Defensiveness',
    category: 'Discipline & Skills',
    summary: 'Blaming teachers, friends, or parents when things go wrong; refusing to acknowledge their own role in negative outcomes.',
    noticing: [
      'Immediate blame on external factors: "The teacher hates me," "The exam was unfair."',
      'Defensive, hostile reactions when asked about missed chores or tasks.',
      'Making excuses rather than acknowledging simple errors.',
      'Reluctance to apologize or make amends.'
    ],
    reasons: [
      'Vulnerable self-esteem where admitting fault feels catastrophic to self-worth.',
      'Fear of excessive punishment or shame if they admit to a mistake.',
      'Learned defensiveness from past experiences where honesty was met with anger.',
      'Immature locus of control.'
    ],
    questions: [
      '"Even if the situation was unfair, what was one part of it within your control?"',
      '"What can we learn from this so it doesn’t happen again next time?"',
      '"You aren’t in trouble here—I just want us to look at what happened objectively."',
      '"How would you like to handle this moving forward?"'
    ],
    dos: [
      'Make honesty safe: praise truthfulness even when the truth is difficult.',
      'Separate their identity from their behavior: "You made a mistake; you are not a mistake."',
      'Focus on restitution and learning rather than punitive consequences.',
      'Model admitting your own mistakes openly: "I was wrong about that; I apologize."'
    ],
    donts: [
      'Don’t respond with "I told you so!" or gloat when their plan fails.',
      'Don’t impose severe punishments that incentivize lying or hiding.',
      'Don’t interrogate like a prosecutor trying to catch them in a lie.',
      'Don’t shame them in front of peers or family members.'
    ],
    conversation: [
      { speaker: 'Student', text: 'My professor gave me a C because she’s totally biased against my topic!' },
      { speaker: 'Parent', text: 'That sounds really frustrating to hear after putting in work. Did she provide any rubric notes on the essay?' },
      { speaker: 'Student', text: 'She said I didn’t cite primary sources and submitted it 2 hours late.' },
      { speaker: 'Parent', text: 'Okay. Setting aside her tone for a moment, were those two points accurate?' },
      { speaker: 'Student', text: '...Yeah, my citations were rushed.' },
      { speaker: 'Parent', text: 'Thank you for owning that. That takes maturity. How could you approach her during office hours to ask for feedback on improving the next draft?' }
    ],
    activity: {
      title: 'Circle of Control Audit',
      track: 'Personal Responsibility',
      description: 'Draw two circles: what is outside your control vs. what is 100% within your response power.'
    },
    professionalHelp: 'If chronic refusal of responsibility includes deceitful conduct, rule violations, or total absence of empathy, professional family counseling is recommended.'
  },
  {
    id: 'disagreements',
    title: 'Parent-Child Disagreements & Escalating Friction',
    category: 'Communication',
    summary: 'Everyday interactions turning into arguments over curfews, screen time, clothing, values, or career choices.',
    noticing: [
      'Conversations quickly spiraling into raised voices, eye-rolling, and sarcasm.',
      'Both parties walking away feeling unheard, resentful, and alienated.',
      'Re-litigating the same unresolved arguments week after week.',
      'Walking on eggshells around the house.'
    ],
    reasons: [
      'Normal developmental push for individuation and autonomy bumping against parental protection.',
      'Generational differences in values, communication, and digital lifestyle.',
      'Parents struggling to transition from "authoritarian manager" to "trusted mentor."',
      'Fatigue and accumulated stress on both sides.'
    ],
    questions: [
      '"Can we hit pause and agree to talk about this when neither of us is heated?"',
      '"Can you help me understand your perspective, without me interrupting for 3 minutes?"',
      '"What is the most important outcome for you in this situation?"',
      '"Where can we find a reasonable middle ground that respects both safety and your freedom?"'
    ],
    dos: [
      'Practice reflective listening: "So what you’re saying is... did I get that right?"',
      'Choose your battles—differentiate between safety/values issues and mere stylistic differences.',
      'Frame boundaries collaboratively with negotiated input.',
      'Apologize when you lose your temper: "I’m sorry I raised my voice earlier."'
    ],
    donts: [
      'Don’t say "Because I said so" or rely purely on authoritarian leverage with older teens.',
      'Don’t bring in third parties to "prove" you are right ("Even your aunt agrees with me").',
      'Don’t continue arguing when emotions are red-lined.',
      'Don’t withhold affection as punishment.'
    ],
    conversation: [
      { speaker: 'Parent', text: 'We agreed you would be home by 11:00 PM, and you came in at 12:15 AM without texting.' },
      { speaker: 'Student', text: 'You treat me like I’m 12! Everyone else stayed until 1:00!' },
      { speaker: 'Parent', text: 'I understand you wanted to stay with your friends, and I hear that you want more independence. But my concern was your safety—I didn’t know if you were stranded.' },
      { speaker: 'Student', text: 'My phone died.' },
      { speaker: 'Parent', text: 'Okay. Let’s sit down tomorrow afternoon when we’re rested and agree on a protocol for late nights that gives you trust, but gives me communication. Deal?' }
    ],
    activity: {
      title: 'Collaborative Agreement Matrix',
      track: 'Family Bridge',
      description: 'Co-create a written agreement covering curfews, communication expectations, and privileges.'
    },
    professionalHelp: 'If family arguments involve persistent verbal abuse, hostility, or total communication breakdown, specialized family mediation or therapy can rebuild healthy bridges.'
  },
  {
    id: 'independence',
    title: 'Lack of Independence & Over-Reliance on Parents',
    category: 'Discipline & Skills',
    summary: 'Student hesitates to make phone calls, schedule appointments, manage money, or resolve administrative hurdles.',
    noticing: [
      'Asking parents to write emails to professors, call doctors, or resolve peer issues.',
      'Anxiety over navigating public transit, booking appointments, or budgeting.',
      'Waiting for parents to wake them up, wash their clothes, or prepare simple meals.',
      'Fear of being alone or stepping outside familiar routines.'
    ],
    reasons: [
      'Unintentional "snowplow parenting" where parents cleared all hurdles during childhood.',
      'Heightened digital friction—young adults often have intense phone-call anxiety.',
      'Fear of adult responsibilities and economic uncertainty.',
      'Comfortable domestic status quo.'
    ],
    questions: [
      '"Would you like me to do this with you the first time, and then you take over next time?"',
      '"What is the worst thing that could happen if you make this call and they say no?"',
      '"What is one adult skill you would feel proud to master this month?"',
      '"How can I take a step back so you have room to lead?"'
    ],
    dos: [
      'Use the "Scaffold Method": I do it, we do it together, you do it with me observing, you do it alone.',
      'Role-play administrative phone calls or doctor appointments beforehand.',
      'Transfer ownership of age-appropriate finances (allowance, bank card, budget).',
      'Celebrate when they navigate a bureaucratic or logistical task independently.'
    ],
    donts: [
      'Don’t make calls or solve problems they are capable of solving themselves.',
      'Don’t mock their hesitation or say "At your age, I was living on my own."',
      'Don’t take over tasks because "it’s faster if I just do it."',
      'Don’t shame them for feeling nervous about basic adult tasks.'
    ],
    conversation: [
      { speaker: 'Student', text: 'Can you call the dentist to reschedule my appointment? I hate calling them.' },
      { speaker: 'Parent', text: 'I get that phone calls to clinics feel awkward. But scheduling your own healthcare is an essential skill you’ll need for university next year.' },
      { speaker: 'Student', text: 'What if they ask questions I don’t know?' },
      { speaker: 'Parent', text: 'Let’s write down your calendar and insurance card number right here. I’ll sit next to you while you dial on speaker. You’ve got this.' },
      { speaker: 'Student', text: 'Okay... if you sit here with me.' }
    ],
    activity: {
      title: 'The Adulting Milestone Checklist',
      track: 'Life Skills',
      description: 'Master 3 essential adult life tasks independently this month (making appointments, budgeting, cooking a full meal).'
    },
    professionalHelp: 'If reluctance to leave home or interact with adult institutions stems from severe agoraphobia or debilitating generalized anxiety, seek clinical psychological intervention.'
  },
  {
    id: 'decisions',
    title: 'Difficulty Making Major Life & University Decisions',
    category: 'Confidence & Voice',
    summary: 'Agonizing over majors, universities, career paths, or summer choices; fear of choosing the "wrong" path.',
    noticing: [
      'Constant back-and-forth indecision about college applications or career paths.',
      'Asking ten different people for opinions without formulating their own.',
      'Analysis paralysis: spending hours reading online forums without taking action.',
      'Excessive worry about regret and future job security.'
    ],
    reasons: [
      'The myth of the "one perfect decision" in modern career narratives.',
      'Overwhelming volume of options and academic paths.',
      'Fear of disappointing parents or wasting family financial resources.',
      'Lack of experience in reversible decision-making.'
    ],
    questions: [
      '"If both choices lead to great learning, which one excites your genuine curiosity today?"',
      '"Remember that decisions are not permanent life sentences; they are chapters. What is the next logical step?"',
      '"Are you choosing this because you want it, or because you think it’s what we want for you?"',
      '"What would you choose if failure was impossible?"'
    ],
    dos: [
      'Introduce the concept of "Reversible vs. Irreversible Decisions"—most early choices are reversible.',
      'Help them create a structured weighted Decision Matrix (values, skills, lifestyle).',
      'Assure them that career paths today are zigzagging, not linear ladders.',
      'Remove your own ego and unlived dreams from their life choices.'
    ],
    donts: [
      'Don’t impose your own career preferences or pressure them into high-prestige paths.',
      'Don’t dismiss their unconventional interests as "unrealistic."',
      'Don’t rush them to declare permanent life trajectories prematurely.',
      'Don’t make decisions for them when they are frozen.'
    ],
    conversation: [
      { speaker: 'Student', text: 'I can’t decide between Computer Science and Environmental Policy. If I pick CS I might be bored, but if I pick Policy I might not find a job.' },
      { speaker: 'Parent', text: 'Both are thoughtful paths. You don’t have to lock in your entire 40-year career at age 18.' },
      { speaker: 'Student', text: 'It feels like one wrong move and I’m doomed.' },
      { speaker: 'Parent', text: 'That’s the pressure talking, not reality. What if you took introductory courses in both during your freshman year and spoke to professionals in both fields? The best decisions come from test-driving, not endless thinking.' },
      { speaker: 'Student', text: 'That takes a lot of pressure off.' }
    ],
    activity: {
      title: 'The Weighted Decision Matrix',
      track: 'Decision-Making',
      description: 'Evaluate two major options against 5 core personal values rather than fear of the unknown.'
    },
    professionalHelp: 'If indecision causes severe chronic insomnia, panic, or obsessive thought loops that paralyze daily functioning, consider consulting a career psychologist or mental health professional.'
  }
];

export const sampleActivitiesCatalog = [
  {
    id: 'act_1',
    title: 'The 3-Minute Voice Sprint',
    category: 'Communication & Self-Advocacy',
    difficulty: 'Introductory',
    estTime: '15 mins',
    description: 'Practice speaking up with one perspective or asking one clarifying question in a group setting.',
    learningOutcome: 'Builds low-stakes confidence and decreases vocal hesitation.'
  },
  {
    id: 'act_2',
    title: 'The 25-Minute Pomodoro Focus Challenge',
    category: 'Focus & Deep Work',
    difficulty: 'Moderate',
    estTime: '30 mins',
    description: 'Complete one uninterrupted 25-minute deep work block with all phone notifications silenced.',
    learningOutcome: 'Trains attention span and breaks digital distraction loops.'
  },
  {
    id: 'act_3',
    title: 'Circle of Control Reflection',
    category: 'Emotional Resilience & Stress',
    difficulty: 'Reflective',
    estTime: '20 mins',
    description: 'Map current worries into two lists: things outside your control vs. actions 100% within your response.',
    learningOutcome: 'Reduces anxiety and refocuses agency on actionable steps.'
  },
  {
    id: 'act_4',
    title: 'The Adulting Log: Healthcare & Admin',
    category: 'Independent Life Skills',
    difficulty: 'Practical',
    estTime: '45 mins',
    description: 'Independently schedule an appointment, refill a prescription, or research a bank account feature.',
    learningOutcome: 'Builds self-reliance and reduces adulting phone-anxiety.'
  },
  {
    id: 'act_5',
    title: 'Digital Sunset Wind-Down Routine',
    category: 'Focus & Deep Work',
    difficulty: 'Habit Sprint',
    estTime: '40 mins/night',
    description: 'Turn off screens 45 minutes before sleep for 4 consecutive nights to protect REM sleep.',
    learningOutcome: 'Restores nervous system balance and morning alertness.'
  },
  {
    id: 'act_6',
    title: 'The Weighted Decision Matrix',
    category: 'Independent Life Skills',
    difficulty: 'Analytical',
    estTime: '35 mins',
    description: 'Score two conflicting choices against your top 5 life values to clarify the next best step.',
    learningOutcome: 'Cures analysis paralysis with objective values weighting.'
  }
];

