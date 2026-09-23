# The Summoned Mage

Story ID: summoned_mage

Start scene: scene_001

## Description

A fantasy adventure about being summoned into a world losing its magic.

## Setup prompt

What would you like to name the magical world? 

---

## scene_001 — Opening

### Passage

You open your eyes and look around you, the darkness breaking way to the barest of light. As your eyes adjust, you notice you are seated inside of a small circle with unlit candles all around you.

Confused, you look up and notice you are not alone. Lying on the floor in front of you is a girl about your age, splayed out and unmoving.

As you slowly move forward, she stirs and her eyes snap open.

“It worked…oh my, it worked.”

She looks you in the eyes and says, “I can’t believe it worked. You must be so confused. I am Elliana, and I summoned you here to help my world.”

You look back at her, mouth dry and heart pounding, unsure whether to speak, run, or simply breathe.

### Choices

#### Choice 1

“You summoned me? What does that even mean? Where am I? Why me?”

```json
{
  "next_scene": "scene_002"
}
```

#### Choice 2

You get up and run, as fast as your legs can handle, which honestly isn’t that fast. You are feeling awful weak.

```json
{
  "next_scene": "scene_003"
}
```

#### Choice 3

You close your eyes and take a deep breath, something you learned from your Dad. It always helped when you were worried.

```json
{
  "next_scene": "scene_004"
}
```

---

## scene_002 — Questions

### Passage

“Ok, so you have a lot of questions, that’s fair. Yes, I summoned you and…”

As she is talking, you notice her purple hair and fluffy tail…she has a tail!?!?

Then you look closer at her eyes. They are a deep yellow with slits like a cat’s. As you look around, you notice the air around her is glowing a deep blue…

“Hello, are you listening?” breaks you out of your reverie.

### Choices

#### Choice 1

“I’m sorry,” you say. “I drifted there for a second. Can you explain this all again?”

```json
{
  "next_scene": "scene_005",
  "entry_intro": "asked_questions"
}
```

---

## scene_003 — The Barrier

### Passage

In a split second you are up and running towards the opening you saw, but your legs betray you and you stumble forwards and hit the ground…hard.

You look back and Elliana is staring at you with wide eyes.

You get back to your feet and try to move again. Finding the doorway ahead of you, you rush forwards as your legs pump, but you are greeted with a clear, almost glass-like barrier. You rebound off the barrier and smash backwards into the ground.

Slightly dazed, you look back at Elliana.

### Choices

#### Choice 1

Realizing you have nowhere to go, you head back to Elliana

```json
{
  "next_scene": "scene_005",
  "entry_intro": "ran_into_barrier"
}
```

---

## scene_004 — The Candle Flame

### Passage

As you breathe, you picture a flame flickering in the dark. Focusing on it makes you feel better, but it also strangely makes you feel a lot warmer.

You look down and notice the candles are all alight.

But how did that happen? You look up at Elliana.

### Choices

#### Choice 1

“Ok, well, I hope you are going to explain what is going on here.”

```json
{
  "next_scene": "scene_005",
  "entry_intro": "lit_candles"
}
```

---

## scene_005 — Elliana Explains

### Entry intro: asked_questions

“Yes, of course,” Elliana says quickly. “You must be completely overwhelmed.”

### Entry intro: ran_into_barrier

“I’m sorry,” Elliana says, rushing toward you. “You’re probably weak from the summoning, but I can’t let you run before we talk about this.”

### Entry intro: lit_candles

Elliana stares at the candles, her yellow eyes wide. “You lit them,” she whispers. “But how did you do that? It’s impossible.”

### Passage

Elliana shakes her head to clear it and starts talking again.

“Well, first things first,” she says. “I summoned you here to help my world. As you can probably tell, things are a little different here.”

Her tail flicks nervously.

“For one thing, you look different from anyone I have ever met. Where is your tail?”

### Choices

#### Choice 1

Ask what kind of help her world needs

```json
{
  "next_scene": "scene_006"
}
```

#### Choice 2

Ask why she chose you

```json
{
  "next_scene": "scene_007"
}
```

#### Choice 3

Ask if she can just send you home

```json
{
  "next_scene": "scene_008"
}
```

---

## scene_006 — What Help Is Needed

### Passage

Elliana takes a deep breath, then starts to explain.

“My world’s magic is…dying,” she says. “Not all at once. Slowly. Quietly. And no one knows why.”

### Choices

#### Choice 1

(continue)

```json
{
  "next_scene": "scene_009"
}
```

---

## scene_007 — Why You

### Passage

“Well, I didn’t choose you exactly,” Elliana says.

She looks embarrassed.

“The spell was supposed to find someone who could help. Someone with a spark for magic strong enough to answer.”

### Choices

#### Choice 1

(continue)

```json
{
  "next_scene": "scene_009"
}
```

---

## scene_008 — Going Home

### Passage

Elliana’s ears lower. Wait, she can lower her ears…stop getting distracted.

“I understand,” she says softly. “I really do. But sending you home is not as simple as opening the door again.”

“The magic portal brought you here because something answered from your side. To send you back, we may need to find out what that something was.”

### Choices

#### Choice 1

(continue)

```json
{
  "next_scene": "scene_009"
}
```

---

## scene_009 — The Seers’ Prophecy

### Passage

“You see, our seers foretold a summoned mage would come and put the world back on track. The problem was, no one knew the ritual.”

“I went and gathered all the stories in the world and tried and tried until finally…finally…well…you!”

### Choices

#### Choice 1

“Did you say magic…wait, hold on…does this mean I’m a mage?”

```json
{
  "next_scene": "scene_010"
}
```

---

## scene_010 — Am I a Mage

### Passage

“Did you say magic…wait, hold on…does this mean I’m a mage?”

“It does, doesn’t it? If I was the one summoned…does that mean I can use magic?”

You walk over to Elliana, who is still sitting on the ground in the circle, and reach down with your hand out. “I’m {hero_name}. I’d love to hear more about this magic.”

Elliana reaches out her hand, grasps yours, and lets out a breath she didn’t realize she was holding. “Does this mean you are willing to help?”

“Yes, I think…it is still a lot, to be honest, but if I can’t get home without fixing this issue anyway, I may as well jump right into it with you, right?” you say as you turn around and fling out your hand like you are going to shoot a fireball.

### Choices

#### Choice 1

See what happens

```json
{
  "next_scene": "scene_011"
}
```

---

## scene_011 — Choose Your Element

### Passage

…nothing happens. You stand there with your hand stuck out like a goofball while Elliana tries really hard not to laugh, and fails.

“Ok, good. Good! For a second there I thought you were actually going to do it,” she says, wiping her eyes. “Magic doesn’t work by flinging your hand around. You have to picture what you want, really clearly, then breathe in, hold the picture, and let it go when you breathe out.”

Picture it, breathe in, let it go…wait, that’s basically the breathing trick your Dad taught you for when you get worried. Huh.

“Can I try? Like, for real this time?”

Elliana’s tail swishes back and forth. “Something small. Please. The magic in {world_name} has gotten so thin you probably won’t get more than a spark, but still…SMALL.”

“Small,” you promise.

You plant your feet, strike your best mage pose, which honestly feels pretty cool, and close your eyes.

What do you picture?

### Choices

#### Choice 1

Pose and think of Fire

```json
{
  "next_scene": "scene_012"
}
```

#### Choice 2

Pose and think of Lightning

```json
{
  "next_scene": "scene_013"
}
```

#### Choice 3

Pose and think of Stone

```json
{
  "next_scene": "scene_014"
}
```

---

## scene_012 — Fire Spell Happens

### Passage

You picture a flame, the same little candle flame you always picture, flickering away in the dark. You breathe in and the air tastes warm…and ok, maybe you can’t help it, because you’re about to do MAGIC, and the flame in your head gets bigger and brighter and rounder until it’s not really a candle anymore.

You breathe out and throw your hand forward.

FWOOOOSH!

A fireball the size of a wagon wheel roars out of your palm, lights up the whole cave bright orange, and sails right over Elliana’s head as she drops flat to the floor with her ears pinned back. It slams into the far wall with a BOOM that shakes dust down from the ceiling.

### Choices

#### Choice 1

Open your eyes

```json
{
  "next_scene": "scene_015",
  "entry_intro": "fire"
}
```

---

## scene_013 — Lightning Spell Happens

### Passage

You picture a thunderstorm, the kind you used to watch from the porch with your Dad, and that one bright second when the whole sky goes white. You breathe in and the hair on your arms stands straight up. Elliana’s tail puffs out to twice its size.

“Um,” she says. “Is it supposed to do that? Mine never does that.”

You breathe out and throw your hand forward.

CRACK!

A bolt of lightning as thick as your arm leaps from your fingertips, so bright you can see it right through your eyelids. It zigzags across the cave right over Elliana’s head, and she drops flat to the floor with her ears pinned back as it smashes into the far wall with a BOOM.

### Choices

#### Choice 1

Open your eyes

```json
{
  "next_scene": "scene_015",
  "entry_intro": "lightning"
}
```

---

## scene_014 — Stone Bullet Spell Happens

### Passage

You picture a stone, a small one, like you promised. Just a smooth gray pebble, the good kind for skipping.

You breathe in, and on the cave floor a pebble wobbles, lifts up into the air, and floats in front of your hand. It starts to spin…then spin faster…then it starts to whistle.

“That’s really good!” Elliana says. “Now just set it back down, nice and—”

You breathe out and throw your hand forward.

The pebble doesn’t fly away, it’s just GONE, with a sound like a whip cracking, and Elliana’s purple hair blows straight back as something zips past her ear and hits the far wall with a BOOM.

### Choices

#### Choice 1

Open your eyes

```json
{
  "next_scene": "scene_015",
  "entry_intro": "stone"
}
```

---

## scene_015 — The Spell Lands

### Entry intro: fire

When the smoke clears, there’s a hole in the cave wall big enough to walk through, and the edges are glowing cherry red.

### Entry intro: lightning

When the spots in your eyes finally fade, there’s a hole in the cave wall big enough to walk through, with the edges black and smoking and little sparks still crawling around them.

### Entry intro: stone

When the dust settles, there’s a hole in the cave wall big enough to walk through, and it’s perfectly round, like somebody poked a giant finger right through the mountain.

### Passage

Sunlight pours in through the hole. Actual sky! You look at the hole, then at your hand, then back at the hole.

“Oh my goodness,” you whisper. “I’m a MAGE.”

Elliana slowly lifts her head off the floor. One of her ears is inside out.

“That,” she says, “was SMALL!?”

“I’m so sorry! Are you ok?”

“I’m fine, I’m better than fine!” She scrambles up and now she’s laughing. “Do you know what the best mage in {world_name} can do right now? Light a lamp, if she’s had a good breakfast. And you just put a hole in a MOUNTAIN! The seers were right…they were really right!”

She grabs her satchel and points to a wooden door at the back of the cave, and you notice the glassy barrier from before is gone.

“Come on, town is half a day’s walk and everyone has to meet you.”

You look at the door, then at the nice sunny hole you just made, and that’s when you feel something weird, a little tug right behind your belly button. It’s like your magic is telling you that you don’t need a door OR a hole. You could just think about being outside…and then you would be.

### Choices

#### Choice 1

Leave through the door, like a normal person

```json
{
  "next_scene": "scene_016"
}
```

#### Choice 2

Leave through the hole. You made it, after all

```json
{
  "next_scene": "scene_017"
}
```

#### Choice 3

Follow that tugging feeling and see what happens

```json
{
  "next_scene": "scene_018"
}
```

---

## scene_016 — The Door

### Passage

One hole in a mountain is probably enough for today, so you follow Elliana through the door.

Behind it is a long stairway carved into the rock, with little glass globes along the walls that look like they should be glowing, but most of them are dark.

“Glow-globes,” Elliana says, tapping one as she passes. It flickers weakly.

You tap one too, and it flares up so bright you both see spots for a second.

“Ok, maybe don’t touch the globes,” Elliana says, blinking. “When I was little these were bright as day, all the time, and nobody even thought about them. That’s how it is here, {hero_name}. Magic isn’t just for spells…it’s how everything works.”

At the bottom of the stairs she pushes open another door, you step out onto the side of the mountain, and for a second you forget how to breathe.

A green valley spreads out below you with a silver river winding through it, and way off in the distance you can see the rooftops of a town with thin lines of chimney smoke drifting up. On your left, a dirt trail winds down the hill toward the town. On your right is the edge of a forest with the biggest trees you’ve ever seen.

“The trail’s faster,” Elliana says. “The forest is prettier. Well…it used to be.”

### Choices

#### Choice 1

Take the trail to town

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_door"
}
```

#### Choice 2

Head towards the forest

```json
{
  "next_scene": "scene_025",
  "entry_intro": "from_door"
}
```

---

## scene_017 — The Hole

### Passage

“I made a door,” you say. “Seems rude not to use it.”

You climb out through the hole and Elliana follows, grumbling the whole way and holding her tail up so it doesn’t touch the edges.

“The seers never said anything about the summoned mage wrecking my ritual cave,” she mutters. “I swept in there. I swept for TWO DAYS.”

You come out onto a wide ledge high up on the side of the mountain, and the wind almost knocks you right off your feet. You can see everything from up here, a green valley with a silver river running through it and, way off, a town with chimney smoke rising up.

There are three ways down. A rocky path runs along the ridge and would give you the best view of all of {world_name}. Below you, a slope of loose stones slides down to the edge of a forest with enormous trees. And off to the left, you can just make out a dirt trail winding down toward the town.

### Choices

#### Choice 1

Walk out onto the mountains

```json
{
  "next_scene": "scene_023"
}
```

#### Choice 2

Head towards the forest

```json
{
  "next_scene": "scene_025",
  "entry_intro": "from_hole"
}
```

#### Choice 3

Go toward the trail

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_hole"
}
```

---

## scene_018 — Teleport Away

### Passage

“Hang on,” you say. “I want to try something.”

“Try what? {hero_name}, try WHAT?”

You close your eyes and picture being outside…grass, trees, sky. You breathe in, hold the picture, and breathe out.

Pop!

It feels like getting sucked through a straw, and then you’re sitting in a bush.

You’re outside! There’s grass and there are trees, and not just any trees, these things are as wide as houses and so tall you can’t even see the tops. It’s a forest, very green and very quiet…and you are very much by yourself. No cave, no mountain, no Elliana.

Your head is spinning and your legs feel like pudding. Whatever you just did, it took a LOT out of you.

“Ok,” you tell the bush. “So I probably should’ve figured out where I was going first.”

### Choices

#### Choice 1

Try to teleport back

```json
{
  "next_scene": "scene_028"
}
```

#### Choice 2

Explore your surroundings

```json
{
  "next_scene": "scene_025",
  "entry_intro": "from_teleport"
}
```

---

## scene_019 — Trail to Town

### Entry intro: from_door

You take the trail. It’s a nice walk, and Elliana talks the entire way, pointing out birds with four wings and flowers that snap shut when you walk past them.

### Entry intro: from_hole

You pick your way down to the trail. It’s a nice walk once you’re on it, and Elliana has mostly forgiven you for the cave.

### Entry intro: from_mountains

The path down from the ridge is steep, but it meets the trail at the bottom and your legs are really glad to be on flat ground again.

### Entry intro: from_forest

The trees start to thin out and the forest path joins up with a wide dirt trail. Elliana points ahead. “Town’s that way, we’re almost there.”

### Passage

After a while you come to a little wooden bridge over a stream, and you’re halfway across when three figures jump out from behind the bushes on the far side.

They’ve got long striped tails and flour sacks over their heads with eye holes cut in them, except one of them cut his eye holes in the wrong spot and has to keep turning his head sideways to see you. One has a pitchfork, one has a broom, and the smallest one is holding…a soup ladle?

“HALT!” shouts the one with the pitchfork. “Your lunch or your life! I mean your money! Your money or your lunch!”

“Your money or your LIFE, Kent,” whispers the one with the broom.

“Why would I want their life? I want their lunch!”

Elliana sighs and looks over at you.

### Choices

#### Choice 1

Attack the bandits with magic

```json
{
  "next_scene": "scene_020"
}
```

#### Choice 2

Try to escape

```json
{
  "next_scene": "scene_021"
}
```

#### Choice 3

Leave it to Elliana

```json
{
  "next_scene": "scene_022",
  "entry_intro": "left_to_her"
}
```

---

## scene_020 — Attack Bandits

### Passage

You step in front of Elliana, plant your feet, and raise your hands, and honestly? It feels pretty great.

The three bandits take a step back, and the smallest one hides behind his ladle.

“{hero_name},” Elliana says quietly. “Remember the mountain. SMALL. And please, nobody gets hurt. Aim near them, not at them.”

Right. Small. You can do small…probably.

You breathe in. What do you picture?

### Choices

#### Choice 1

Freeze their feet to the bridge

```json
{
  "next_scene": "scene_033",
  "entry_intro": "freeze"
}
```

#### Choice 2

Fire a stone bullet past their ears

```json
{
  "next_scene": "scene_033",
  "entry_intro": "stone"
}
```

#### Choice 3

Dazzle them with a beam of light

```json
{
  "next_scene": "scene_033",
  "entry_intro": "light"
}
```

---

## scene_021 — Try to Escape

### Passage

“Run!” you shout, and you grab Elliana’s hand and race back the way you came.

“After them!” yells Kent. “Wait, I can’t see…which way did they go?”

“Turn your sack around, Kent!”

You pound back across the bridge feeling pretty good about this plan for about four seconds, and then the summoning catches up with you. Your legs turn to jelly, you slow down, then you stop completely and put your hands on your knees and wheeze.

The bandits catch up, and they’re wheezing too, so for a minute all five of you just stand there on the trail trying to catch your breath.

“Ok,” pants the one with the broom. “Now. Your money…or your lunch.”

Up close you notice their clothes are patched at the knees and elbows, and the pitchfork has dirt on it, like it’s actually been used for farming. They all look awful thin for bandits.

### Choices

#### Choice 1

Fight

```json
{
  "next_scene": "scene_020"
}
```

#### Choice 2

Stop, and ask what they actually want

```json
{
  "next_scene": "scene_022",
  "entry_intro": "asked"
}
```

---

## scene_022 — Leave It to Elliana

### Entry intro: left_to_her

You step back and give Elliana a little bow. After you.

### Entry intro: asked

“Hang on,” you say, holding up your hands. “What do you actually want? Are you guys hungry?” The three of them look at each other, and Elliana’s eyes go narrow.

### Passage

Elliana marches right up to the bandits with her hands on her hips.

“Kent Trailway, is that you under there? I can see your tail! And Lark! And little Velion! Does your mother know you’re out here with her good soup ladle?”

The three bandits droop, and one by one they pull off their flour sacks. Underneath are three raccoon-folk with black masks of fur around their eyes and very, very red cheeks.

“Hello, Miss Elliana,” Kent mumbles.

“What are you DOING?”

“The growing-charms gave out,” Kent tells his feet. “All of them, all over Lower Furrow. The fields won’t come up and there’s nothing left in the cellar, so we thought…well…travelers have lunches.”

Elliana’s face goes soft. She opens her satchel and hands over everything in it, bread, cheese, and three apples.

“Go home. And tell Lower Furrow the mage has come.” She points at you and all three of them stare. “Help is coming. I promise.”

“Be careful in town after dark, miss,” Lark says with his mouth full. “The pale things come down from the Hollow Hills at night now and drift around the lamps…and every morning there’s a little less magic than the day before.”

### Choices

#### Choice 1

Continue to town

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_023 — Mountains

### Passage

You take the ridge path, and wow, it’s worth it.

From up here it feels like you can see all of {world_name}. Elliana points everything out for you: the river is the Silverwind, the town is Willowmere, and those are the farms of Lower Furrow.

“It’s beautiful,” you say, and you mean it.

“Look closer,” Elliana says.

So you do. Some of the fields are brown when they should be green, and there are little floating shapes above the river that aren’t going anywhere, just bobbing in place. And way off past the town there’s a line of low hills where the color looks…wrong. Like somebody took an eraser and rubbed at that part of the world until it went gray.

“Those are the Hollow Hills,” Elliana says. “They didn’t used to look like that.”

Before you can ask about it you come around a bend and find the path blocked by a rock slide, a new one too, because there’s still dust hanging in the air. And from somewhere underneath the rocks, you hear a very small squeak.

### Choices

#### Choice 1

Check the rock slide

```json
{
  "next_scene": "scene_024"
}
```

#### Choice 2

Make your way down to the trail

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_mountains"
}
```

---

## scene_024 — Check Rock Slide

### Passage

You climb carefully up onto the rock pile and follow the squeaking until you find it, wedged in a gap between two big stones. It’s a small, round, fuzzy creature about the size of a grapefruit, with huge dark eyes, a pair of stubby little wings, and a long fluffy tail…and the tail is pinned under a rock.

“Oh!” Elliana gasps. “It’s a puffkin! I haven’t seen one since I was little. They love magic, so most of them went away when the magic did.”

The rock is way too heavy to lift, and if you roll it the wrong way you’ll squash the poor thing. So you sit down next to it, breathe in, and picture the rock lifting up slow and gentle, like a bubble. Small, you tell yourself. REALLY small this time.

You breathe out.

The rock wobbles, rises two whole inches into the air, and just hangs there.

The puffkin shoots out like a cork from a bottle! It zooms around your head twice, bumps its nose right against your nose, and lets out a long happy trill before it flies off down the mountain toward town, leaving a faint trail of sparkles behind it.

You set the rock back down without making a sound.

“You did small,” Elliana says, and she sounds proud.

“I did small!”

### Choices

#### Choice 1

Make your way down to the trail

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_mountains"
}
```

---

## scene_025 — Forest

### Entry intro: from_door

You head for the trees. “We can cut through and pick up the trail on the other side,” Elliana says.

### Entry intro: from_hole

You half climb, half slide down the slope of loose stones and land at the edge of the trees with your shoes full of gravel. “We can cut through and pick up the trail on the other side,” Elliana says.

### Entry intro: from_teleport

You climb out of the bush and look around, and a few minutes later you hear somebody shouting your name. Elliana comes crashing through the ferns completely out of breath. “I saw the flash! From the MOUNTAIN! You TELEPORTED! Nobody’s done that in a hundred years! Please don’t ever do it again!”

### Entry intro: from_teleport_back

Elliana helps you down out of the tree, which takes a while. “I saw the flash from the mountain,” she says. “You TELEPORTED…TWICE! Nobody’s done that in a hundred years! Please don’t ever do it again!”

### Passage

This forest is nothing like the woods back home. The trees are as wide as houses, and thick moss hangs off every branch giving off a faint green glow, like a night-light that’s running out of batteries.

“Glow-moss,” Elliana says. “It used to be bright enough to read by. People came out here for midnight picnics.” She touches a dark patch and frowns. “It gets dimmer every time I come.”

You’re about to say something when you hear a voice off to your left.

“HELP! Somebody! Shoo! Shoo, you great lumps! HELP!”

And at the exact same time, off to your right, there’s a bunch of snorting and crashing. Something big is coming through the ferns…actually, it sounds like a lot of somethings, and they’re heading your way.

### Choices

#### Choice 1

Look for the yelling person

```json
{
  "next_scene": "scene_026"
}
```

#### Choice 2

Run from the animals

```json
{
  "next_scene": "scene_027"
}
```

---

## scene_026 — Look for Yelling Person

### Passage

You run toward the voice and find a clearing with an old goat-folk gentleman in it. He’s got a long white beard, curly horns, and a patched green coat, and he’s sitting on a tree branch ten feet off the ground, hugging the trunk for dear life.

Underneath him is a wooden cart tipped on its side with turnips spilled everywhere, and three enormous animals snuffling through them. They look like wild boars, except they’re as big as ponies and they’ve got moss and tiny flowers growing on their backs.

“Tuskers,” Elliana whispers. “They’re usually gentle. There are ward-stones that keep them up in the high meadows…the wards must have gone out.”

“HELLO!” the old goat calls, waving at you. “Gordo’s the name, peddler by trade! I’d come down and shake your hand but I’ve grown quite attached to this tree!”

One of the tuskers looks up at you with a whole turnip in its mouth. It doesn’t look mean, but it does look very, VERY large.

Gordo seems safe enough up there, and the tuskers will probably wander off once the turnips run out.

### Choices

#### Choice 1

See that the stranger is safe, and leave

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_forest"
}
```

#### Choice 2

Help the stranger

```json
{
  "next_scene": "scene_029"
}
```

---

## scene_027 — Run From Animals

### Passage

You don’t wait around to find out what’s making that noise. You RUN.

So does Elliana, and she’s way faster than you…right, part cat. Your legs are still wobbly from the summoning and you keep tripping over roots, and behind you the crashing keeps getting louder. You look back over your shoulder.

There are three of them. They look like wild boars, except they’re as big as ponies with moss and little flowers growing on their backs, and they’re thundering down the path with their eyes rolling.

“Tuskers!” Elliana shouts. “They’re not chasing us, they’re just spooked! The wards must have failed and they don’t know where they’re supposed to be…but they’ll still run us flat!”

Up ahead you can see daylight where the trees thin out, with a path heading that way, but the tuskers are catching up fast and you’re not sure you can beat them there.

### Choices

#### Choice 1

Turn around and fight back

```json
{
  "next_scene": "scene_032"
}
```

#### Choice 2

Follow the trail to town as fast as you can

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_forest"
}
```

---

## scene_028 — Teleport Back

### Passage

You close your eyes and picture the cave…the candles, the circle, Elliana’s surprised face. You breathe in, you breathe out.

Pop!

You open your eyes and…nope. Not the cave. Same forest. You’re looking down at the exact same bush, except now you’re ten feet up in the air sitting on a tree branch.

Your head spins so hard you have to hug the trunk. Whatever’s inside you that makes the magic go feels like a cup somebody just poured out, so apparently two teleports in a row is one teleport too many.

“Ok,” you tell the tree. “No more of that today.”

Then from far away you hear somebody shouting your name, and it’s getting closer.

### Choices

#### Choice 1

Shout back, and get down from this tree

```json
{
  "next_scene": "scene_025",
  "entry_intro": "from_teleport_back"
}
```

---

## scene_029 — Helping the Peddler

### Passage

“We can’t just leave him up there,” you say.

“Oh, bless you!” Gordo calls down. “I’ve been up here since breakfast! I’ve named all three of them! The big one is Trudy!”

Trudy burps.

Elliana bites her lip. “They’re not dangerous on purpose, but they’re confused and scared and that makes them jumpy. If they bolt the wrong way they’ll go right through that cart…and maybe right through us.”

You look at the three big mossy animals and think it over. You could scare them off, a big flash and a bang ought to send them running back up the hill. Or…back in the cave, when you were worried, you pictured the candle flame and everything went warm and calm. Would that work on somebody else? Would it work on three somebodies the size of ponies?

### Choices

#### Choice 1

Scare them off with a big flash of magic

```json
{
  "next_scene": "scene_030"
}
```

#### Choice 2

Try to calm them down instead

```json
{
  "next_scene": "scene_031"
}
```

---

## scene_030 — Flash and Bang

### Passage

“Cover your ears,” you tell Elliana.

You picture fireworks, breathe in, breathe out, and clap your hands together over your head.

CRACK-BOOM!

A burst of white light fills the clearing along with a bang like the biggest firecracker in the world, and every bird in the forest takes off at once. The three tuskers squeal, spin around, and gallop off up the hill the way they came, and the ground shakes under your feet as they go.

Gordo is so surprised he lets go of his tree and lands in the turnips with a thump, then just sits there blinking.

“Well!” he says. “That’s one way of doing it!”

You help him tip his cart back up and gather whatever Trudy didn’t eat, and he pumps your hand up and down and absolutely will not let you leave without a gift. He digs around in his cart and presses a little brass lantern into your hands, no bigger than an egg.

“A pocket-lantern! Never goes out! Well…it never used to. These days it sulks a bit. But it seems to like you!”

Sure enough, in your hands the little lantern is glowing bright and steady.

“The trail to Willowmere is just through there,” Gordo says. “Mind the bridge, folks have gotten a bit desperate lately.”

### Choices

#### Choice 1

Follow the trail to town

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_forest"
}
```

---

## scene_031 — Warm and Calm

### Passage

You walk into the clearing slowly, hands open.

“{hero_name},” Elliana whispers. “What are you doing?”

“Honestly? Not sure yet.”

You sit down in the turnips right in the middle of the three tuskers, and Trudy swings her enormous head around and snuffles at your hair. You close your eyes and picture the candle flame, not big, not bright, just warm and steady, the way it feels when your Dad sits with you until a bad dream goes away.

You breathe in and you breathe out, and this time you don’t throw it. You just let it spread.

A soft golden warmth rolls out across the clearing like sunshine through a window, and the moss on the trees glows a little brighter. Trudy lets out a HUGE sigh and her eyes stop rolling, then she folds up her legs and lies down right there in the turnips. The other two flop down next to her, and in less than a minute all three of them are snoring.

Gordo climbs down from his tree with his mouth hanging open.

“Calming magic,” he whispers. “I haven’t seen calming magic work since I was a kid. And I mean a real kid…a baby goat.”

He presses a little brass pocket-lantern into your hands as a thank you, and it glows bright and steady the second you touch it.

“The trail to Willowmere is just through there,” he says. “Mind the bridge, folks have gotten a bit desperate lately.”

### Choices

#### Choice 1

Follow the trail to town

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_forest"
}
```

---

## scene_032 — Stand Your Ground

### Passage

You stop running, turn around, and plant your feet right in the middle of the path.

“{hero_name}, NO!” Elliana yells.

Three pony-sized tuskers are thundering straight at you, but you don’t want to hurt them, they’re just scared. So you don’t aim at them…you aim at the ground.

You picture the path in front of you bursting up, breathe in, breathe out, and stomp your foot.

WHUMP!

A wall of dirt and leaves and pebbles blasts up out of the path, ten feet high, right in front of the lead tusker’s nose. She squeals and swerves and the other two swerve right after her, crashing off through the ferns away from you and back up the hill toward the high meadows where they belong.

Then all that dirt comes raining back down, and most of it lands on you.

Elliana walks back picking leaves out of her hair. She looks at the hole in the path, then at you.

“You are either very brave, or you don’t know any better.”

“Can it be both?”

“I think it’s both.”

### Choices

#### Choice 1

Follow the trail to town

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_forest"
}
```

---

## scene_033 — Bandits Dealt With

### Entry intro: freeze

You picture ice, breathe out, and point at the planks under their feet. Frost races across the bridge with a crackle, and in a second all three bandits are frozen to the wood up to their ankles.

### Entry intro: stone

You picture a pebble, breathe out, and flick your finger. A stone zips between the bandits with a crack like a whip, and the top half of the pitchfork falls right off.

### Entry intro: light

You picture the sun, breathe out, and open your hand. A beam of white light blazes out over their heads so bright the whole stream lights up, and even with flour sacks on they have to cover their eyes.

### Passage

“WE GIVE UP!” all three of them shout at the exact same time, and the smallest one chucks his ladle into the stream.

They pull off their flour sacks, and underneath are three raccoon-folk with black masks of fur around their eyes. They all look pretty thin.

“Kent Trailway!” Elliana says. “And Lark! And little Velion! What are you DOING?”

“Sorry, Miss Elliana,” Kent mumbles. “It’s the growing-charms. They gave out all over Lower Furrow and nothing will come up, and there’s nothing left in the cellar. We never robbed anybody before…we’re not very good at it.”

“You’re really not,” you agree, and now you kind of feel bad for scaring them.

Elliana gives them everything in her satchel, bread, cheese, and three apples, while you do your best to undo whatever you just did to them.

“Tell Lower Furrow the mage has come,” she says. “Help is coming. I promise.”

“Be careful in town after dark,” Lark says with his mouth full. “The pale things come down from the Hollow Hills at night now and drift around the lamps…and every morning there’s a little less magic than the day before.”

### Choices

#### Choice 1

Continue to town

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_034 — Willowmere

### Passage

You reach Willowmere just as the sun is going down, and it’s the coziest place you’ve ever seen. The houses are round with mossy roofs and crooked chimneys and round doors painted every color you can think of, and there are beastfolk EVERYWHERE…rabbit ears, badger stripes, a whole family of hedgehogs holding hands in a line.

But the longer you look, the more you notice what’s wrong.

Wooden carts are hanging in the air all along the main street, but none of them are moving. They’re tipped at weird angles and people are unloading them with ladders.

Washing lines are strung between the houses and the clothes on them are slowly turning round and round in the air, like they got stuck halfway through washing themselves. A long line of people with buckets stretches toward the middle of town, and the street lamps keep flickering on…and off…and on.

“The drift-carts, the wash-lines, the water, the lamps, the bins,” Elliana says quietly. “All of it runs on magic, it always has. Nobody here even knows how to do it any other way.”

People are starting to stare at you, probably because of the whole no-tail thing. A little rabbit kid points right at your backside and whispers, “Mama, where’s their TAIL?” and gets shushed so hard her ears flop over.

From one direction you can hear water splashing and somebody banging on metal and saying words Elliana pretends not to hear. From the other direction comes the most amazing smell of fresh-baked bread.

### Choices

#### Choice 1

Go to the fountain square

```json
{
  "next_scene": "scene_035"
}
```

#### Choice 2

Follow the smell of bread

```json
{
  "next_scene": "scene_036"
}
```

---

## scene_035 — The Fountain Square

### Passage

In the middle of the square is a huge stone fountain carved like a bunch of fish jumping over each other.

“It sings,” Elliana says. “Well, it’s supposed to. And it’s supposed to send fresh water to every house in town.”

Right now it’s making a noise like somebody gargling, and water is dribbling out of exactly one fish. This is where the bucket line ends, with everyone filling up by hand.

Next to the fountain a drift-cart is hanging crooked in the air with a pair of boots sticking out from underneath it, and that’s where the banging is coming from.

“Gilly!” Elliana calls.

A fox-folk girl slides out from under the cart. She’s got red fur, a big bushy tail, goggles pushed up on her forehead, a smear of grease on her nose, and a wrench in each hand.

“Elliana, you’re back! Did it work? Did you—” She sees you. Her eyes go to your face, then to where your tail isn’t, and she drops a wrench. “NO TAIL! It’s the mage! You got the MAGE!”

The entire bucket line turns around.

Gilly runs over and shakes your hand with both of hers. “I’m Gilly, I fix things! Except I can’t fix THIS, because it isn’t broken! The lift-charm is perfect, it’s just got nothing to run on, like a lamp with no oil!” She kicks the cart and it bobs. “Come on. If the mage is here, Bernard has to hear about it…and he’ll feed you.”

### Choices

#### Choice 1

Go with Gilly

```json
{
  "next_scene": "scene_037",
  "entry_intro": "from_fountain"
}
```

---

## scene_036 — The Fancy Spoon

### Passage

You follow your nose to a round building with a big wooden sign shaped like a spoon: THE FANCY SPOON. Warm yellow light spills out the windows, and it looks like half the town is packed inside.

Behind the counter is the biggest person you’ve ever seen. He’s bear-folk with brown fur and little round ears and an apron covered in flour, and he’s carrying four trays of buns at once.

“Elliana!” he booms. “Sit, sit! And who’s this? No tail? Oh…oh my.” He sets the trays down very carefully. “It worked, then.”

“It worked, Bernard.”

Bernard comes around the counter, crouches down until his eyes are level with yours, and holds out a honey bun. It’s still warm, and it’s the best thing you’ve ever tasted, no contest.

“My grandmother’s ovens heated themselves for two hundred years,” he says. “Never once went cold. Then three months ago, they did. So now I get up in the middle of the night and chop wood and do it the hard way.” He nods at the crowded room. “When the lamps won’t stay lit, folks need someplace warm to go. So the Spoon stays open.”

You notice his big hands are covered in blisters.

Just then the door bangs open and a fox-folk girl with goggles on her forehead and a wrench in her hand comes running in.

“Bernard! Somebody in the bucket line says Elliana’s back with—” She sees you and drops the wrench. “NO TAIL! It’s the MAGE!”

“That’s Gilly,” Bernard tells you. “She fixes things. She’s real quiet, as you can see.”

### Choices

#### Choice 1

Sit down with everybody

```json
{
  "next_scene": "scene_037",
  "entry_intro": "from_bakery"
}
```

---

## scene_037 — A Table at the Spoon

### Entry intro: from_fountain

Gilly drags you across town to a round building with a big wooden sign shaped like a spoon: THE FANCY SPOON. Inside it’s warm and crowded, and behind the counter is the biggest person you’ve ever seen. He’s bear-folk, his name is Bernard, and about ten seconds after you walk in he’s already put a warm honey bun in your hand.

His ovens used to heat themselves, Gilly explains, but now he chops wood in the middle of the night so the town has somewhere warm to go.

### Entry intro: from_bakery

Bernard clears off the big table in the corner, and Gilly pulls up a chair backwards and plops down on it.

### Passage

The four of you sit down together, and you’re just about to bite into your honey bun when something drops out of the rafters and lands right on your head.

It’s small and round and fuzzy, with stubby little wings, huge dark eyes, and a long fluffy tail. It leans down over your forehead, looks at you upside down, and trills…then it takes the honey bun right out of your hand and eats it, still sitting on your head.

“That’s Honey,” Bernard says. “You can probably guess how he got the name. He’s a puffkin, doesn’t belong to anybody, just turned up a while back and started stealing my buns.” He watches Honey settle into your hair like it’s a nest. “Looks like he belongs to you now. Puffkins can’t stay away from magic, and you’re the most magic thing he’s ever seen.”

Bernard brings more buns, and while you eat they tell you everything. It started about two years ago and it gets a little worse every night, and now the elders are talking about leaving Willowmere altogether, except nobody knows where they’d even go.

You look around at all the tired people keeping warm, at Bernard’s blistered hands, at Gilly’s wrench that can’t fix the one thing that actually needs fixing.

“I’ll help,” you say. “I don’t know how yet…but I’ll help.”

Elliana lets out a long breath, like she’s been holding it for two years.

### Choices

#### Choice 1

Offer to fix something in town right now

```json
{
  "next_scene": "scene_038"
}
```

#### Choice 2

Ask Elliana what she knows about the cause

```json
{
  "next_scene": "scene_039"
}
```

---

## scene_038 — Small Fixes

### Passage

“Let me try something,” you say. “Everything here runs on magic and there isn’t enough to go around, right? Well, I’ve got plenty. I put a hole in a mountain this morning.”

“They WHAT?” says Gilly.

“Later,” says Elliana.

The whole Spoon empties out into the street to watch, with Honey riding along on your head. It’s totally dark now, and the street lamps are flickering worse than ever.

“Go gently,” Elliana says quietly. “You don’t need to throw it. Think of it like pouring water into a cup.”

You look around at the dark, stuck, sputtering town. Where do you even start?

### Choices

#### Choice 1

Relight the street lamps

```json
{
  "next_scene": "scene_040",
  "entry_intro": "lanterns"
}
```

#### Choice 2

Get the fountain singing again

```json
{
  "next_scene": "scene_040",
  "entry_intro": "fountain"
}
```

#### Choice 3

Un-stick the wash-lines

```json
{
  "next_scene": "scene_040",
  "entry_intro": "laundry"
}
```

---

## scene_039 — The Seals

### Passage

“Elliana, you said nobody knows why the magic is dying…but you’ve gotta have some idea.”

Elliana pulls a fat, beat-up old book out of her satchel and opens it on the table, and Gilly moves the buns out of the way.

“A long, long time ago the old mages found places where the world is thin,” she says. “Places where other worlds press up really close to this one, like two soap bubbles touching, and things could leak through. So the mages closed those places up with seals.”

She turns the page to a drawing of a huge stone door covered in symbols.

“The seals don’t need anybody to look after them. They run on the magic in the air, same as the lamps and the carts. That was the clever part.”

“Oh,” Gilly says slowly. “Oh no. And that was also the not-clever part.”

“Right. If the magic in the air gets thin, the seals get weak. If a seal gets weak, something leaks through. And if the thing that leaks through happens to eat magic…”

“Then the magic gets thinner,” you say. “So the seal gets weaker…so more of them get through.”

“Round and round,” Bernard rumbles. “Like water going down a drain.”

“There’s a thin place in the Hollow Hills,” Elliana says. “The closest one to here.” She goes quiet for a second. “My parents were the keepers of that seal.”

### Choices

#### Choice 1

Ask her what came through

```json
{
  "next_scene": "scene_040",
  "entry_intro": "seals"
}
```

---

## scene_040 — The First Syphon

### Entry intro: lanterns

You put your hand on the nearest lamp post and pour. The lamp blazes up warm and gold, then the next one, then the next, all the way down the street like dominoes falling over, and the whole town cheers! It lasts almost a whole minute…then the lamp right above you starts to dim, and everybody goes quiet.

### Entry intro: fountain

You put both hands on the rim of the fountain and pour. Water leaps up out of every single stone fish and the fountain starts to sing, a sweet bubbly sound like a choir of bells, and the whole town cheers! It lasts almost a whole minute…then the song goes sour, the water sinks, the glow in the stone starts to fade, and everybody goes quiet.

### Entry intro: laundry

You grab hold of the nearest wash-line and pour. All over town, shirts and socks and bedsheets whirl to life, scrubbing themselves and wringing themselves out and folding up into neat little stacks in midair, and the whole town cheers! It lasts almost a whole minute…then the line in your hand loses its glow, the sheets droop, and everybody goes quiet.

### Entry intro: seals

Before she can answer, the lamp on your table starts to dim, then the one next to it, and the whole room goes quiet. “You can see for yourself,” Elliana whispers. “Look. By the window.”

### Passage

It’s about as big as a cat and very, very pale, sort of like a moth and sort of like a jellyfish, with slow soft wings and long ribbons trailing down underneath. It doesn’t have a face at all, and it doesn’t make a single sound.

It drifts right up to the glow, wraps its ribbons around the light, and drinks. You can actually see the light flow into it. For a second the creature glows a little, and whatever it was drinking from goes dark.

On your head, Honey puffs up to twice his size and dives straight down the back of your shirt.

“A syphon,” Elliana whispers. “That’s what we call them. They come every night.”

You were expecting a monster, but this thing doesn’t look like a monster. It doesn’t even look mean…if anything, it looks hungry.

The syphon turns away from the dead light and floats off down the street toward the edge of town and the dark hills beyond.

### Choices

#### Choice 1

Follow it quietly

```json
{
  "next_scene": "scene_041"
}
```

#### Choice 2

Zap it before it gets away

```json
{
  "next_scene": "scene_042"
}
```

---

## scene_041 — Following the Light

### Passage

You tiptoe after it, and Elliana, Gilly, and Bernard tiptoe after you. Bernard is not very good at tiptoeing.

The syphon floats down the main street in no hurry at all, stopping for a little sip at a window where a glow-globe is flickering, then drifting on out past the last houses of Willowmere to where the fields begin.

You stop at the fence and just stare.

The fields are FULL of them. Dozens and dozens of pale glowing shapes floating slowly over the grass like paper lanterns somebody let go of, drifting in from the farms and the river and the town, and every single one is heading the same way. A long, soft, shining line of them stretches off into the distance toward the Hollow Hills. It’s honestly kind of beautiful…which somehow makes it worse.

“They come down when it gets dark,” Bernard says quietly. “Drink their fill. And at dawn they all go home.”

“Then that’s where we go too,” you say. “Home. Theirs, I mean.”

Gilly pulls down her goggles. “I’ll pack my tools.”

### Choices

#### Choice 1

Get ready to leave at first light

```json
{
  "next_scene": "scene_043"
}
```

---

## scene_042 — Feeding Time

### Passage

Oh no you don’t.

You picture a bright hot spark, breathe out, and throw it. Your spark streaks down the street and hits the syphon right in the middle…and the syphon swallows it.

It glows WAY brighter and swells up to the size of a big dog, and if something without a face can look delighted, this one does. It turns around and starts floating back toward you, and behind it, out of the dark, five more come drifting around the corner to see where the snacks are coming from.

“STOP!” Elliana grabs your arm. “You’re FEEDING it! Spells are magic, and magic is what they eat!”

“You could’ve mentioned that!”

“I didn’t think you were going to THROW something at it!”

The big one is almost on top of you now. You grab a rock off the street, no time to breathe or picture anything, and just fling it with a shove of magic behind it.

The rock goes straight through the syphon and it bursts apart like a dandelion when you blow on it. The pale fluff hangs in the air, swirls around, and slowly pulls itself back together a good ways farther off. It gives itself a little shake, then drifts away toward the hills like nothing happened, and the others follow it.

“Huh,” says Gilly. “So they eat magic…but they don’t much like a thing that’s been thrown BY magic.”

### Choices

#### Choice 1

Get ready to leave at first light

```json
{
  "next_scene": "scene_043"
}
```

---

## scene_043 — Packing Up

### Passage

You sleep in the loft above the Fancy Spoon, which smells like bread, and Honey sleeps on your face.

In the morning you come downstairs and find out everybody’s already packed.

“I’m going,” Elliana says. “It’s my ritual, my mage, and my parents’ seal.”

“I’m going too,” says Gilly, holding up a brass gadget that looks like a compass. The needle swings around and around, then steadies and points toward the hills. “I made a magic-sniffer, it points wherever the magic is flowing. And if something’s wrong out there that a wrench can fix, you’re gonna want somebody with a wrench.”

“And I’m going,” says Bernard, “because the three of you would forget to eat.” He’s got a pack on his back as big as you are, and it smells like cinnamon.

“Is that all food?” you ask.

“No,” Bernard says, offended. “There’s also a frying pan.”

His cousin will keep the Spoon warm while he’s gone.

Honey trills and climbs into your hood. That makes five.

A cat-folk girl who tried the same ritual over and over until it finally worked, a fox with a wrench, a bear with a bag full of pastries, and a ball of fluff…and yesterday morning you didn’t even know any of them existed.

It’s two days’ walk to the Hollow Hills, and there are two ways to get there.

### Choices

#### Choice 1

Take the river road. It’s longer, but it’s easy going

```json
{
  "next_scene": "scene_044"
}
```

#### Choice 2

Take the shortcut through the old forest

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_044 — The River Road

### Passage

The river road follows the Silverwind, and it’s easy walking.

Out on the water, big flat boats are just sitting there turning slowly in circles. “Drift-barges,” Gilly says. “They used to float stuff up and down the whole valley by themselves. Now everybody has to use poles.” She waves to a badger poling a barge full of cabbages, who looks like he’s having a truly terrible day.

Bernard walks next to you, taking one step for every three of yours.

“You asked about my hands,” he says, even though you didn’t. “I’m not complaining about them. When I was little I asked my grandmother how the ovens stayed hot, and she said a place stays warm as long as there’s somebody in it who cares whether it does. I thought she meant magic.”

He looks down at his blisters.

“When the ovens went cold, I figured it out. She wasn’t talking about magic at all. So I picked up the axe.”

You think about that for a long time.

“Bernard? I think your grandmother was the smartest person in {world_name}.”

“She would’ve liked you,” Bernard says. “She’d have said you’re too skinny, though.” And he hands you a cinnamon roll.

### Choices

#### Choice 1

Make camp for the night

```json
{
  "next_scene": "scene_046",
  "entry_intro": "river"
}
```

---

## scene_045 — The Old Forest

### Passage

The shortcut cuts through the oldest part of the forest, where the glow-moss has gone almost completely dark and you really have to watch where you’re stepping.

Gilly walks out front with her magic-sniffer, muttering to herself.

“Can I ask you something?” you say. “Why do you like fixing things so much?”

“Because a broken thing is a puzzle,” she says. “Every single one! Something’s loose or bent or worn down, you find it, you fix it, and then the thing WORKS again and somebody’s happy. There’s always an answer. That’s my favorite part.”

She whacks a fern with her wrench.

“That’s why this makes me so mad! I’ve had every charm in Willowmere apart on my bench and there’s nothing loose, nothing bent, they’re all PERFECT and they don’t WORK. It’s a puzzle with no answer and I HATE it!”

She stomps along for a bit, breathing hard.

“Sorry,” she says.

“Don’t be. I think we’re headed for the answer right now,” you say. “It’s just that this time the broken part is at the other end of a really long wire.”

Gilly stops, pushes her goggles up, and looks at you.

“Huh,” she says. “I like that. I actually like that a lot.”

### Choices

#### Choice 1

Make camp for the night

```json
{
  "next_scene": "scene_046",
  "entry_intro": "forest"
}
```

---

## scene_046 — Campfire

### Entry intro: river

You make camp on the riverbank as the stars start coming out.

### Entry intro: forest

You make camp in a clearing as the stars start peeking out between the branches.

### Passage

Bernard builds a fire the regular way, with sticks. Then he pulls out the frying pan, and that’s the end of anybody worrying about anything for a while. Honey eats four pancakes and then sits in the pan.

After supper the five of you sit around the fire. Gilly is cleaning her tools, Bernard is humming, and Elliana has her knees pulled up with her tail wrapped around her feet, staring into the flames. Honey is lying on his back in your lap, fast asleep, with all four feet sticking straight up in the air.

You’ve only known these people for two days…funny how it doesn’t feel like it.

It’s a good night for talking.

### Choices

#### Choice 1

Ask Elliana why she kept trying the ritual

```json
{
  "next_scene": "scene_047"
}
```

#### Choice 2

Teach everybody your Dad’s breathing trick

```json
{
  "next_scene": "scene_048"
}
```

#### Choice 3

Practice some small magic with Honey

```json
{
  "next_scene": "scene_049"
}
```

---

## scene_047 — One Hundred and Twelve

### Passage

“Elliana? How many times did you try the ritual before it worked?”

“One hundred and twelve,” she says, without even having to think about it.

Bernard stops humming.

“My parents were the keepers of the seal in the Hollow Hills,” she says. “Two years ago they went out to check on it, same as every spring, and they came back three days later…”

She stops, looking for the word.

“Faded. They aren’t hurt, they know who I am, but they’re tired all the time and they’re gray, and neither of them has been able to light so much as a candle since. They used to be the best mages in the valley.”

She pokes at the fire with a stick.

“Nobody believed in the old prophecy. They thought I was just some silly girl with a pile of storybooks. So I went to the cave by myself and drew that circle a hundred and eleven times, and nothing happened.”

“And then?”

“And then I drew it one more time and got you.” She laughs and wipes her nose. “And the first thing you did was blow a hole in my cave.”

You don’t really know what to say, so you scoot over until your shoulder bumps hers, and you stay like that for a while.

“We’re gonna fix it,” you tell her. “Promise.”

### Choices

#### Choice 1

Get some sleep

```json
{
  "next_scene": "scene_050"
}
```

---

## scene_048 — The Breathing Trick

### Passage

“Can I show you guys something? It’s how I do the magic, but it’s not actually a magic thing. My Dad taught it to me for when I get worried.”

You show them how. Close your eyes, picture one small candle flame in the dark, breathe in slow and hold it, breathe out slow. The flame doesn’t flicker. You’re warm, you’re safe, you’re right here.

They all try it. Gilly is terrible at sitting still and keeps opening one eye, but after a few minutes it’s gotten really quiet around the fire.

“Oh,” Elliana whispers.

You open your eyes. There’s a little ball of golden light floating above her hands, bright and steady and not flickering even a little.

“I haven’t been able to hold a light steady in over a year,” she says.

Gilly’s wrench is glowing faintly. And Bernard reaches one big finger toward a dead twig, and a tiny flame pops up on the end of it, and he stares at it like it’s the most precious thing he’s ever seen.

“I thought it all went out of me,” he says, his voice rough. “I thought it went out of everybody.”

“It didn’t go anywhere,” you say, and it clicks as you’re saying it. “It was never gone from inside you, it’s just the air that got thin. You’ve all still got your own.”

### Choices

#### Choice 1

Get some sleep

```json
{
  "next_scene": "scene_050"
}
```

---

## scene_049 — Small Magic

### Passage

Everything you’ve done so far has been BIG, so maybe it’s time to practice doing small.

You picture a tiny light, no bigger than a firefly, and breathe out really, really gently. No wagon-wheel fireball, which is already an improvement…just a spark the size of a pea floating up off your fingertip.

Honey’s eyes snap open.

He launches out of your lap and chases the spark all the way around the campfire, trilling at the top of his lungs, catches it, eats it, does a loop in the air, then zooms back and hovers right in front of your face waiting for another one.

So you make another. And another. You make them zigzag, you make two at once, and then you figure out you can make one bright and turn it down dimmer…and dimmer…until it’s almost out, then bring it right back up again, like the knob on a lamp.

Bernard and Gilly are laughing so hard at Honey they don’t notice what you’re really doing, but Elliana does.

“That’s control,” she says quietly. “Most mages take years to learn how to turn it down. Turning it up is easy, anybody can shout. It takes practice to whisper.”

You dim your last spark all the way down to nothing, and Honey gives you a look of absolutely terrible disappointment.

### Choices

#### Choice 1

Get some sleep

```json
{
  "next_scene": "scene_050"
}
```

---

## scene_050 — Night Visitors

### Passage

You wake up in the middle of the night because Honey is trying to climb inside your ear.

You open your eyes and…the camp is full of syphons.

Dozens of them, pale and silent, drifting between the trees like paper lanterns. They float right over Bernard’s fire without caring about it at all, and right past the others, who are all still asleep.

They’re coming toward you.

Well, of course they are. Elliana said it herself, you’re more magic than anything this world has seen in a hundred years. To a syphon you must look like a bonfire on a dark night.

They make a slow circle around your blanket with their long ribbons waving back and forth, and the closest one is near enough to touch. You can see right through it to the stars on the other side.

Your heart is pounding, but they aren’t grabbing at you or rushing you. They’re just…floating there.

Very slowly, you sit up.

### Choices

#### Choice 1

Stay still, and let one come close

```json
{
  "next_scene": "scene_051"
}
```

#### Choice 2

Scatter them with wind and stones

```json
{
  "next_scene": "scene_052"
}
```

#### Choice 3

Dim your spark, and hide

```json
{
  "next_scene": "scene_053"
}
```

---

## scene_051 — The Touch

### Passage

You hold out your hand palm up, the way you would for a dog you don’t know yet.

The closest syphon drifts in, and one long pale ribbon reaches out and curls softly around your fingers. It’s cool and tingly, like a foot that fell asleep, and you can feel a little of your magic trickle out of you. Not much, just a sip.

Then something shows up behind your eyes.

A gray world. Gray ground, gray hills, a gray sky with no sun and no stars. Nothing growing, nothing glowing, nothing left to eat anywhere, and there hasn’t been for a really long time. And thousands and thousands of pale shapes drifting over that gray ground, going slower and slower and getting dimmer.

Then…a light! A circle on the ground shining gold, and on the other side of it there’s warmth and color and FOOD. A door, left wide open.

So they went through. Of course they did. Anybody would.

The ribbon lets go and you gasp, and you’re back by the campfire with tears running down your face and no idea when they started.

They aren’t invaders and they aren’t evil, they don’t even have a plan…they’re just starving animals who found a hole in the fence.

As the sky starts turning gray, the syphons turn all together and drift away to the east.

### Choices

#### Choice 1

Wake the others and follow them

```json
{
  "next_scene": "scene_054",
  "entry_intro": "touched"
}
```

---

## scene_052 — Scatter

### Passage

You are NOT about to sit here and be somebody’s midnight snack.

A spell would just be dinner for them. But wind is only wind, and a pebble is only a pebble, even when magic is what throws it. So you don’t throw a spell. You picture the wind, and every pebble and twig and pinecone on the ground lifting up into it.

You breathe in, breathe out, and sweep your arms out wide.

WHOOSH!

A whirlwind of leaves and grit and pebbles spins out from where you’re sitting and tears right through the ring of syphons, and one after another they burst apart like dandelions until the air is full of floating white fluff.

The noise wakes up everybody. Bernard comes up out of his blankets ROARING with a frying pan in his hand.

The fluff swirls around and gathers back up at the edge of the trees into smaller, dimmer syphons. They hover there a second, then turn all together and drift off to the east, not even hurrying.

“Everybody ok?” you ask, breathing hard.

Gilly is kneeling on the ground with her sniffer. “Look at this.”

Where the syphons were floating, the grass has gone gray. Not burnt, not dead, just gray, like all the color got sipped right out of it. The same gray as the Hollow Hills.

“The needle’s pointing right after them,” Gilly says. “Come on, they’ll lead us straight there.”

### Choices

#### Choice 1

Follow them

```json
{
  "next_scene": "scene_054",
  "entry_intro": "scattered"
}
```

---

## scene_053 — Hide Your Light

### Passage

If you look like a bonfire to them, then you need to stop being a bonfire.

You close your eyes and find the flame inside you, but this time instead of picturing it bigger, you picture it getting smaller…from a bonfire to a campfire, from a campfire to a candle, from a candle down to one little orange ember tucked way down deep where nobody can see it.

It’s the hardest magic you’ve done yet. Turning it up was easy. Turning it down takes everything you’ve got.

You open one eye.

The syphons have stopped coming closer. They’re drifting this way and that with their ribbons waving around like they lost the scent, and one floats right over your head without even slowing down. To them you’re just a rock now, or some kid asleep in a blanket. Inside your shirt Honey is holding perfectly still, and you’re pretty sure he’s dimming himself too.

After a long, long while the sky starts to go gray and the syphons give up. They turn all together and drift away east in a long pale line, like geese heading south.

You finally let your breath out and let your flame come back up. You’re soaked in sweat…but now you know exactly which way they go home.

### Choices

#### Choice 1

Wake the others and follow them

```json
{
  "next_scene": "scene_054",
  "entry_intro": "hid"
}
```

---

## scene_054 — The Hollow Hills

### Entry intro: touched

You wake the others and tell them what you saw, and nobody says much after that. You pack up camp and follow the pale line east.

### Entry intro: scattered

You pack up camp in the gray morning light and follow the pale line east.

### Entry intro: hid

You wake the others and tell them what happened, and Gilly is FURIOUS she slept through it. You pack up camp and follow the pale line east.

### Passage

By the middle of the day, the color starts draining out of everything.

It starts with the grass, which goes from green to a dusty sort of sage and then to gray, then the trees, then the stones. There are no birds out here, and even the sky looks washed out. Your shoes look way too bright, like they don’t belong.

“I don’t like it here,” Bernard says quietly. It’s the first time you’ve ever heard him sound small.

The needle on Gilly’s sniffer is pulling so hard the whole thing shakes in her hand.

And then you see it. In the side of the biggest hill there’s a cave mouth as tall as a house, with broken stone pillars on either side.

“That’s the seal-house,” Elliana says, her voice super steady, the way it gets when somebody’s working really hard to keep it that way. “My parents were the keepers here. Two years ago they came out to check on the seal, and they came home gray and tired, and neither of them has lit so much as a candle since.”

Gilly has been scrambling around on the hillside. “There’s a crack up here too!” she calls down. “It’s narrow but it goes all the way in, I can feel a draft coming out of it. I bet it comes out up high where we could get a look at everything before anything gets a look at us.”

### Choices

#### Choice 1

Go in through the main entrance

```json
{
  "next_scene": "scene_055"
}
```

#### Choice 2

Squeeze in through Gilly’s crack

```json
{
  "next_scene": "scene_056"
}
```

---

## scene_055 — The Broken Door

### Passage

You walk between the broken pillars and into the hill, and the little pocket of light from Elliana’s hands is the only color anywhere.

Thirty steps in, you find the seal.

It used to be a door. It’s a huge round slab of stone twice as tall as Bernard, carved all over with symbols in rings inside of rings, just like the drawing in Elliana’s book. And it’s cracked right down the middle, the two halves leaning apart with a gap between them wide enough to walk through. The symbols must have glowed once, but now they’re dark.

Elliana puts her hand on the stone.

“It didn’t get smashed,” she says. “See how the edges are all crumbly? Nothing broke it, it just got so weak it couldn’t hold itself up anymore.”

She traces one of the carved rings with her finger, then frowns. “That’s weird. This part’s a locking pattern…but this ring in the middle is a summoning ring. I KNOW this ring, I’ve drawn it a hundred and twelve times. Why would anybody put a summoning ring on a seal?”

A slow pale glow is coming through the gap in the door from somewhere farther in.

### Choices

#### Choice 1

Go through the gap

```json
{
  "next_scene": "scene_057",
  "entry_intro": "main"
}
```

---

## scene_056 — The Crack

### Passage

Gilly goes in first, since it’s her crack. Then Elliana, then you with Honey in your hood…then Bernard.

“I’m stuck,” says Bernard.

“You’re not stuck,” says Gilly. “Breathe out.”

“I DID breathe out. This is me with the breath out.”

It takes all three of you pulling on his arms and one very unhappy minute, and then Bernard pops through like a cork out of a bottle and lands on top of everybody. He checks the pastries first. They’re fine.

After that the crack opens up into a tunnel that slopes down, with a pale glow up ahead. The tunnel comes out onto a ledge, and you all crawl to the edge on your stomachs, side by side, and look over.

You’re high up on the wall of a gigantic round cavern, so big Willowmere’s whole town square could fit inside it, and from up here you can see all of it.

Nobody says a single word.

### Choices

#### Choice 1

Look down

```json
{
  "next_scene": "scene_057",
  "entry_intro": "side"
}
```

---

## scene_057 — The Source

### Entry intro: main

You step through the broken door into a gigantic round cavern, so big Willowmere’s whole town square could fit inside it, and carved into the floor is something you recognize right away.

### Entry intro: side

Carved into the floor of the cavern, way down below you, is something you recognize right away.

### Passage

It’s a summoning circle.

The same rings and the same symbols as the one you woke up in…except this one is as wide as a pond, cut deep into the rock, and really, really old. And it’s glowing, the whole thing shining with a steady golden light.

It’s still open.

Syphons are rising up out of it one after another in a slow steady stream, like bubbles in a glass. There are already hundreds of them in here, hanging up near the ceiling as thick as fog.

“Somebody tried it before,” Elliana whispers, and her face has gone pale. “A long, long time ago somebody else tried to summon help, and it went wrong. It opened onto the wrong world, an empty one, and they couldn’t close it again. So they built a seal over the top of it, didn’t tell anybody, and hoped.” Her voice shakes. “It’s my circle. It’s the same ritual. What if I’d—”

Bernard’s big hand comes down on her shoulder.

“You didn’t, though,” he says. “Yours brought us help.”

You look at the circle. You’ve sat in the middle of one of these, and you can feel how it works the way you can feel a loose tooth. It’s a door, and it’s been standing open for a thousand years.

“I can close it,” you say. “I know I can, with Elliana’s help.”

“And then what about all of them?” Gilly points up at the pale cloud under the ceiling. “There’s hundreds in here and more out there. If you shut that door, they’re stuck on this side of it for good…and they’ll just keep eating.”

Ugh. She’s right. You can’t just close the door and walk away…first you’ve gotta decide what to do about everything that already came through it.

### Choices

#### Choice 1

Herd them back home through the circle, then close it

```json
{
  "next_scene": "scene_058"
}
```

#### Choice 2

Drive them off and destroy them, then close it

```json
{
  "next_scene": "scene_059"
}
```

---

## scene_058 — The Shepherd’s Plan

### Passage

“We send them home,” you say. “All of them.”

“Home to what?” Gilly asks. “There’s nothing over there, that’s why they left.”

“I know. I’ve got an idea about that part too. But first they have to go back through.”

“How?” says Bernard. “You can’t exactly whistle for them.”

“Sure I can.” You tap your chest. “They follow magic, and I’m the brightest thing in {world_name}. They’d follow me anywhere. So I lead them right up to the edge of the circle, and then…”

“And then they drink you dry, like they did my mother and father,” Elliana snaps. “{hero_name}, NO. There are hundreds of them.”

Gilly has started pulling stuff out of her pack, four little glass lanterns with charms inside them, all of them dark.

“What if it’s not just you?” she says. “These charms aren’t broken, they’re just empty. So fill them up as full as they’ll go and we each carry one. That’s four lights instead of one, and we walk them in like sheep. Nobody gets drunk dry because nobody’s carrying the whole load.”

It’s a good plan. It’s also a slower one, and it puts all your friends right down on the cavern floor in the middle of the flock.

### Choices

#### Choice 1

Be the lure yourself

```json
{
  "next_scene": "scene_060"
}
```

#### Choice 2

Do it together, with the lanterns

```json
{
  "next_scene": "scene_061"
}
```

---

## scene_059 — The Battle Plan

### Passage

“We can’t send them back to a dead world, and we can’t leave them in this one,” you say. “They’re eating {world_name} alive. People are going hungry because of them. Elliana’s parents…” You don’t finish. “We get rid of them. Then we close the door so no more ever come.”

Nobody argues. Nobody looks happy about it either.

“Spells will only feed them,” Elliana says. “Magic is what they eat.”

“But a rock isn’t magic,” says Gilly, “even when magic is what’s throwing it. Look at them, they’re made of fluff. I bet they go to pieces like a dandelion if you hit them…and I bet if you pop one enough times, it doesn’t come back together at all.”

You look around. There’s no shortage of stone down here, the whole floor is covered in gravel and rubble.

“I can raise a storm,” you say. “Every loose stone in this cave, all at once.”

Bernard is looking up at the ceiling, where a huge shelf of cracked rock hangs out right over the circle.

“Or you could let us help,” he rumbles. “Gilly finds the weak spots in things, and I’m not exactly small. We bring that whole shelf down, you put a wind behind it, and it all happens at once.”

### Choices

#### Choice 1

Raise the stone storm yourself

```json
{
  "next_scene": "scene_063",
  "entry_intro": "storm"
}
```

#### Choice 2

Set the rockslide trap with Bernard and Gilly

```json
{
  "next_scene": "scene_063",
  "entry_intro": "trap"
}
```

---

## scene_060 — The Lure

### Passage

You walk out onto the cavern floor by yourself and stop right at the edge of the circle, toes almost touching the golden light. You close your eyes and find the flame inside you…

…and you let it BLAZE. You don’t throw it at anything, you just turn it up, brighter than the hole in the mountain, as bright as it’ll go, until you can feel it shining out through your skin.

Every syphon in the cavern turns toward you.

They come down from the ceiling like snow, hundreds of them, pouring in all around you in a river of pale wings and trailing ribbons, and every single one takes a sip as it goes by. One sip is nothing. Hundreds of sips is a whole lot.

Your knees start to shake. The flame is getting lower and you’re getting cold.

Then a hand slides into yours, a warm one with little claws. Elliana is standing right next to you in the middle of the river, ears flat and eyes squeezed shut.

“Breathe,” she says. “In. Hold. Out. I’ve got you…you showed me how.”

So you breathe. And you take one step to the side.

The river of syphons flows right past where you were standing, toward the only other light in the cave, the golden glow of the open door. One after another they tip over the edge, sink down, and they’re gone.

### Choices

#### Choice 1

Hold on until the last one

```json
{
  "next_scene": "scene_062",
  "entry_intro": "alone"
}
```

---

## scene_061 — The Shepherds

### Passage

You fill up the four lanterns until they’re shining like little suns. It takes a lot out of you, but way less than hundreds of sips would have.

Then the four of you spread out across the cavern floor and hold your lanterns up high, and the syphons come down from the ceiling like snow.

“Walk slow,” you call out. “Don’t run, just walk them in.”

And that’s exactly what you do. Bernard walks on the left with his lantern held up in one fist, steady as a lighthouse. Gilly walks on the right and talks to the syphons the ENTIRE time. “That’s it, this way. No, not over there, you goofball, THIS way.” Elliana takes the middle with her tail held high, and you come along behind them with the brightest lantern of all, sweeping up the slow ones.

Honey is the one who surprises everybody. He zooms out of your hood and tears around the outside of the flock trilling and glowing, nipping at the stragglers until they turn around. A sheepdog the size of a grapefruit!

It’s like trying to herd clouds, but step by step the big pale flock floats across the cavern to the edge of the circle. One by one the four of you set your lanterns down on the rim and step back, and the syphons drift right past the little lights toward the big one, tipping over the edge of the golden door one after another, sinking down, and gone.

### Choices

#### Choice 1

Watch until the last one

```json
{
  "next_scene": "scene_062",
  "entry_intro": "together"
}
```

---

## scene_062 — Through the Circle

### Entry intro: alone

It takes a long time. By the end you’re down on your knees and Elliana is the only thing holding you up, but the river gets thinner…then it’s a trickle…then it’s only a few.

### Entry intro: together

It takes a long time. The flock gets thinner…then it’s a trickle…then it’s only a few. Bernard has to go fetch one that got itself stuck behind a rock, and he carries it over in his cupped hands, super gently, and tips it in.

### Passage

The very last syphon stops at the edge of the circle.

It turns around and floats back over to you, ribbons trailing, and stops right in front of your face. One ribbon reaches out and touches your forehead, really lightly.

You see the gray world again, the gray ground, the gray sky. But this time, all across it, thousands of pale shapes are settling back down onto the hills. They’re home…and they’re still hungry.

You can’t just send them back to starve. So you do the thing you’ve been planning ever since you thought of it.

You reach way down inside yourself and take a piece of your flame. Not a sip’s worth or a spell’s worth, a REAL piece, the kind you’re going to feel the loss of. You hold it in your cupped hands where it shines like a tiny sun, and you don’t throw it. You hold it out.

The last syphon takes it with all its ribbons, as carefully as you’d carry an egg. It doesn’t drink it, it carries it, back to the circle and down into the gold, holding your light against its chest like a seed.

Just for a second, behind your eyes, you see one tiny point of color show up on a gray hill in a gray world.

“Grow,” you whisper.

The cavern is empty now and the air is clear…but the door is still standing open.

### Choices

#### Choice 1

Close the circle

```json
{
  "next_scene": "scene_064"
}
```

---

## scene_063 — The Battle of the Circle

### Entry intro: storm

You walk out into the middle of the cavern by yourself, spread your arms, and breathe in, and every loose stone in the cave lifts off the floor. You breathe out, and the storm starts to turn, slow at first, then faster and faster until the whole cavern is howling and you’re standing in the quiet spot right in the middle of it.

### Entry intro: trap

Gilly climbs up and finds the weak spots, and Bernard gets his shoulder in behind the shelf of rock and you hear him growl. There’s a crack like thunder, and as the whole shelf comes down you throw a gale of wind in behind it, and a thousand tons of broken stone goes sweeping across the cavern like a wave.

### Passage

The syphons burst.

They burst by the dozens, then by the hundreds, until the air is so full of white fluff it looks like a blizzard. The fluff swirls around and tries to pull itself back together and the stones go through it again…and again…and each time the shapes that form are smaller and dimmer.

You notice they don’t fight back. You thought they would. They don’t even run. The ones that are left just keep drifting toward you, toward the light, same as always, because it’s the only thing they know how to do.

You keep going. You think about Bernard’s blistered hands, and Kent’s empty cellar, and Elliana’s mom and dad, and you keep going until your arms are shaking…and then there’s nothing left to aim at.

The stones rattle down onto the floor and it goes quiet. A fine gray dust comes sifting down through the golden light of the circle and settles over everything, on your shoulders, in your hair.

In your hood, Honey makes a small sad sound you’ve never heard him make before.

“It had to be done,” Gilly says, the way you’d say it if you were checking your math.

“It did,” says Bernard. He brushes the gray dust off his arm, then just stands there looking at his hand.

You won. {world_name} is safe. So why does it feel like this?

The door is still standing open.

### Choices

#### Choice 1

Close the circle

```json
{
  "next_scene": "scene_065"
}
```

---

## scene_064 — Closing the Circle

### Passage

You and Elliana kneel down together at the edge of the circle, the way she must have knelt in her cave a hundred and twelve times.

“I know how to open one,” she says. “I’ve never closed one.”

“I’ve never done either,” you say. “But I know how it feels to be inside one. We’ll figure it out.”

You take her hands and close your eyes, and you picture the candle flame the same as always…except this time you picture the very end of the night, when your Dad thinks you’ve already fallen asleep. He leans over and breathes out, soft, and the light goes out, and all that means is you’re safe and it’s time to rest.

You breathe in, and Elliana breathes in with you.

You breathe out.

The golden light of the circle folds inward one ring at a time, from the outside to the middle, until the last ring shrinks down to one bright point that hangs there for a second…and then goes out.

For one heartbeat, nothing happens.

Then you feel it, like the first warm day at the end of a really long winter. It rises up out of the ground and rolls out of the cavern and away across the hills, magic coming back in like the tide now that there’s nothing left to drink it up. All over the cavern walls, every dark symbol lights up gold!

Bernard is laughing, Gilly’s sniffer is spinning like a top, and Honey is glowing like a lantern and doing loops up by the ceiling.

When you walk out of the cave, the hills have turned green.

### Choices

#### Choice 1

Go home to Willowmere

```json
{
  "next_scene": "scene_066"
}
```

---

## scene_065 — Closing the Circle

### Passage

You and Elliana kneel down together at the edge of the circle, in the gray dust.

“I know how to open one,” she says quietly. “I’ve never closed one.”

“I’ve never done either. We’ll figure it out.”

You take her hands and close your eyes, and you picture the candle flame the same as always…except this time you picture the very end of the night, when your Dad thinks you’ve already fallen asleep. He leans over and breathes out, soft, and the light goes out.

You breathe in, and Elliana breathes in with you.

You breathe out.

The golden light of the circle folds inward one ring at a time until the last ring shrinks down to a single bright point, hangs there for a second, and goes out.

Then you feel it, like the first warm day at the end of a really long winter, magic rolling back in like the tide now that there’s nothing left to drink it up. All over the cavern walls, every dark symbol lights up gold.

Bernard lets out a long breath. Gilly’s sniffer is spinning like a top. Honey creeps up out of your hood and starts, very slowly, to glow.

It worked. It really, actually worked.

On your way out you stop, and you’re not totally sure why, but you crouch down, scoop up a pinch of the fine gray dust, fold it into a page from Elliana’s book, and tuck it in your pocket.

When you walk out of the cave, the hills have turned green.

### Choices

#### Choice 1

Go home to Willowmere

```json
{
  "next_scene": "scene_067"
}
```

---

## scene_066 — The Festival of Lights

### Passage

You can hear Willowmere before you can even see it.

The fountain is singing! You can hear it from half a mile away, like a whole choir of bells, with the sound of a whole town cheering underneath it.

Every street lamp is blazing. Drift-carts go zipping by overhead with the drivers whooping, and all along the wash-lines the laundry is doing something that looks a whole lot like dancing.

Kent Trailway is there with Lark and Velion and a wagon piled high with vegetables from Lower Furrow, where the growing-charms woke up two days ago and the fields have gone totally bonkers. Kent is handing out samples with a very familiar soup ladle. An old goat-folk peddler is selling turnips and telling anyone who’ll listen that he knew you before you were famous, whether or not that’s true.

At the Fancy Spoon, the ovens lit themselves that morning all at once with a WHOOMP that knocked Bernard’s cousin flat on his back. Bernard stands in front of them with his eyes wet, then puts on his apron and bakes for nine hours straight.

On the second night of the party, two cat-folk come walking slowly up the main street, thin and leaning on each other, with purple hair streaked with silver…and a small golden light floating over each of their open hands.

Elliana makes a sound you’ve never heard her make before, and she RUNS.

You give them a good long while to themselves.

Later on she finds you up on the roof of the Spoon, watching the lamps with Honey in your lap.

“The magic’s back,” she says, “and that means I can do it. I can send you home.” She sits down next to you. “Remember how I said something answered from your side? I figured it out. It was you, {hero_name}. It was only ever you. Your spark was way too big for a world with no magic in it, and it was looking for somewhere to go.”

She pulls her knees up to her chin.

“So it’s up to you, the way it should’ve been the first time. I’ll draw the circle tonight if that’s what you want…or I won’t.”

### Choices

#### Choice 1

Go home

```json
{
  "next_scene": "scene_068"
}
```

#### Choice 2

Stay in {world_name}

```json
{
  "next_scene": "scene_069"
}
```

---

## scene_067 — The Festival of Lights

### Passage

You can hear Willowmere before you can even see it.

The fountain is singing! You can hear it from half a mile away, like a whole choir of bells, with the sound of a whole town cheering underneath it.

Every street lamp is blazing, drift-carts go zipping by overhead, and all along the wash-lines the laundry is doing something that looks a whole lot like dancing.

Kent Trailway is there with Lark and Velion and a wagon piled high with vegetables from Lower Furrow, where the growing-charms woke up two days ago. At the Fancy Spoon the ovens lit themselves that morning all at once, and Bernard puts on his apron and bakes for nine hours straight.

They carry you around the square on their shoulders and call you the Mage of the Hollow Hills. A badger makes up a song about the battle with eleven verses, and the syphons get bigger and grow more teeth in every single one. You smile and wave, and you don’t tell anybody the syphons didn’t have teeth.

On the second night of the party, two cat-folk come walking slowly up the main street, thin and leaning on each other, with a small golden light floating over each of their open hands. Elliana makes a sound you’ve never heard her make before, and she RUNS.

Watching that, the tight feeling in your chest loosens up a little.

Later on she finds you up on the roof of the Spoon with Honey in your lap. He hasn’t let you out of his sight since the cave.

“I can send you home now,” she says. “That something that answered from your side? It was you, {hero_name}. Your spark was way too big for a world with no magic in it, and it was looking for somewhere to go.” She looks at you sideways. “You’ve been quiet.”

“I keep thinking about how they never fought back.”

“I know,” Elliana says. “Me too.” She leans her shoulder against yours. “I’ll draw the circle tonight if that’s what you want…or I won’t. It’s up to you.”

### Choices

#### Choice 1

Go home

```json
{
  "next_scene": "scene_070"
}
```

#### Choice 2

Stay in {world_name}

```json
{
  "next_scene": "scene_071"
}
```

---

## scene_068 — Home Again

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I have to go home,” you say. “My Dad’s there. He’s gonna be so worried.”

“I know,” Elliana says, smiling and crying at the same time. “I’d think less of you if you didn’t.”

Everybody comes up to the cave to see you off. Gilly has fixed the hole in the wall and even put a little brass sign on it. Bernard gives you a bag of honey buns that weighs more than you do, and Gilly hands you her magic-sniffer. “It won’t point at anything where you’re going,” she says. “Keep it anyway.”

Honey refuses to come out of your hood, so Bernard has to lift him out. You kiss him on top of his fuzzy head and he glows all the way down to his tail.

You sit down in the circle, and Elliana lights the candles with a snap of her fingers, the way a mage should.

“The circle works both ways,” she says. “I just want you to know that. A hundred and twelve tries is nothing…I’d do it again.”

“You’d better,” you say.

You close your eyes. You breathe in…and you breathe out.

You’re in your own bed. It’s morning and it smells like toast, and downstairs your Dad is calling you for breakfast like you’ve only been gone one night.

You lie there for a minute. Maybe it was all a dream?

Then you feel something in your pocket. A brass compass with a wobbly needle, with one crumb of honey bun still stuck to it.

You picture a candle flame and breathe out as softly as you can, and on the windowsill a tiny golden spark floats up into the sunshine.

You grin so big it almost hurts, and you run downstairs to hug your Dad.

The End.

### Choices

---

## scene_069 — The Mage of Willowmere

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

You look out over the town, at the lamps and the carts and the laundry dancing on the lines. You can hear Bernard’s big laugh coming up through the roof, and Gilly arguing with somebody about gears.

“Can you send a letter through?” you ask. “Just a letter, not me?”

Elliana’s ears shoot straight up. “I think so! Something small…yes!”

So you write to your Dad. It takes four tries. You tell him you’re safe, and that you’re needed here, and that his breathing trick turned out to be WAY more useful than he ever could’ve guessed, and that you’ll visit as soon as you and Elliana figure out how. You stick a honey bun in with it.

The letter disappears from the circle with a pop.

Three days later there’s another pop, and something shows up in the circle. It’s a note in handwriting you know by heart: “I always knew you were magic. Wear a coat. Love, Dad.” And there’s a coat with it.

So you stay.

You and Elliana spend that whole winter walking from one end of {world_name} to the other, fixing the old seals the right way. Gilly builds you a drift-cart of your own that goes a LOT faster than it should, Bernard names a pastry after you (it’s a little lopsided, and it has way too much cinnamon, and it sells out every single morning), and Honey sleeps on your face every single night.

And sometimes, late at night, you close your eyes and look for a gray world very far away.

It’s not all gray anymore. On one hill there’s a patch of green no bigger than a blanket, with pale shapes drifting around it in a slow, soft circle. They aren’t drinking it…they’re keeping watch over it.

And every time you look, it’s a little bit bigger.

The End.

### Choices

---

## scene_070 — Home Again

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I have to go home,” you say. “My Dad’s there. He’s gonna be so worried.”

“I know,” Elliana says. “I’d think less of you if you didn’t.”

Everybody comes up to the cave to see you off. Gilly has fixed the hole in the wall, Bernard gives you a bag of honey buns that weighs more than you do, and Honey refuses to come out of your hood, so Bernard has to lift him out. You kiss him right on top of his fuzzy head.

“They’re putting up a statue of you,” Gilly says. “In the square. You’re gonna have a very heroic chin.”

“Do me a favor,” you say. “If they make a statue, don’t let them put teeth on the syphons.”

Gilly looks at you for a second, then nods. “No teeth. I’ll see to it.”

You sit down in the circle and Elliana lights the candles with a snap of her fingers.

“You saved us,” she says. “You saved my mom and dad. Whatever else you’re thinking about, think about that too.”

You close your eyes. You breathe in…and you breathe out.

You’re in your own bed. It’s morning and it smells like toast, and downstairs your Dad is calling you for breakfast like you’ve only been gone one night.

In your pocket is a folded piece of paper with a pinch of gray dust inside.

You keep it in a jar on your windowsill, and you’re not really sure why. Some nights you picture a candle flame and breathe out as softly as you can, and a tiny golden spark floats across the room and lands on the jar. The dust never does anything. You keep doing it anyway.

Then you go downstairs and hug your Dad.

The End.

### Choices

---

## scene_071 — The Keeper of the Seal

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I’m staying,” you say. “There’s something I need to do here.”

You send a letter home to your Dad through the circle, with a honey bun, and three days later a coat comes back with a note: “I always knew you were magic. Wear a coat. Love, Dad.”

Willowmere wants to give you a house right on the square. You say thanks…and ask for something else instead.

You move into the old seal-house out in the Hollow Hills.

Once they’re strong enough, Elliana’s mom and dad teach you how to be a keeper, how to read a seal, how to mend one, and how to listen at a thin place for whatever’s on the other side. Elliana comes out every week with books, Gilly comes out to fix your roof whether it needs fixing or not, and Bernard sends so much food you end up giving most of it to the tuskers.

The folded paper full of gray dust sits on a shelf above your bed.

Every night you sit at the edge of the closed circle and do the hardest kind of magic there is. You turn your flame down to almost nothing, whisper with it, and listen.

There’s a gray world out there somewhere on the other side, hungry and getting dimmer, and you’re going to figure out if there’s a way to help it that doesn’t cost {world_name} everything. It might take years…good thing you’ve got years.

On your shoulder, Honey glows softly in the dark.

A hundred and twelve tries is nothing, Elliana always says.

You close your eyes and breathe in.

Try number one.

The End.

### Choices
