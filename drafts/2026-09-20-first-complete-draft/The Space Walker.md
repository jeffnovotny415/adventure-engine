# The Space Walker

Story ID: space_walker

Start scene: scene_001

## Description

A sci-fi space adventure that starts aboard a mysterious starship.

## Setup prompt

What would you like to name the starship? 

---

## scene_001 — The Portal

### Passage

You adjust the goggles on your head for the 5th time. Ok, this is your first portal but you’ve got this. Just jump through, {hero_name}. Just a little step.
Finally, you steel up your courage, pull down your goggles and jump.
You land with a loud clank on a hard metal floor. As you look around, you notice your surroundings are not what you expected. Cold metal everywhere and large panes of glass, not the sandy desert filled with ruins your research suggested. 
You spin around and get a really good view out the windows. “Are those stars…where the heck did I end up...is this a spaceship?” you say as you look out at the vastness of space and stars.
You turn around and notice your portal has closed, leaving you stranded here. That shouldn’t have happened, you think to yourself. I guess I need to figure out where I am and how to get home.
You are in a long hallway that leads in both directions. 
Where do you go?

### Choices

#### Choice 1

Head towards the left

```json
{
  "next_scene": "scene_002"
}
```

#### Choice 2

Head towards the right

```json
{
  "next_scene": "scene_003"
}
```

---

## scene_002 — Path 1 - Robot

### Passage

As you start walking down the hallway to the left, you start to hear the noise of something shuffling around. You stop for a second to listen closer for voices, but after a few seconds you hear nothing. You steel yourself and push forward, coming into a big room with a lot of very high tech machinery. As you look around, you notice something is shuffling towards you. You look closer and inspect it…it’s a robot! You excitedly wave at it, “Hi, I’m {hero_name}, Can you tell me where I am? I am honestly really confused.”
The robot keeps shuffling forwards towards you, completely ignoring you while looking right past you. 
“Ummm, hello? Can you not see me or…” you say.
As it gets close to you, it makes a quick adjustment and walks right around you, like you aren’t even there.
“Ok then, guess I will keep looking around haha.” you say with a chuckle as the robot completely ignores you.
You look around the room one more time and decide it looks an awful lot like an engine room. You grab a piece of paper from your notebook and do a quick sketch of the layout of the ship you have seen so far, just in case. Then you start following the hallway again.
You come to a big door with a sign above it that reads THE BRIDGE, and you stop and think to yourself. Ok, well I can either go in here or keep exploring this hallway.

### Choices

#### Choice 1

Go into THE BRIDGE

```json
{
  "next_scene": "scene_006"
}
```

#### Choice 2

Keep exploring the hallway

```json
{
  "next_scene": "scene_004"
}
```

---

## scene_003 — Path 2 - Shuttle Bay

### Passage

You start walking down the hallway to the right, looking out the windows at the stars. As you walk forward, you see the hallway opening into a very large room. At the center, you see something that stops you in your tracks. A small ship…a shuttle. You walk up to it to get a closer look and take out your camera to take pictures. No one at home is going to believe this.
You open the door to the craft and take a closer look inside. You see 2 seats up front with flight controls and screens you can’t really understand. In the back, there are 2 benches along the walls and what look like blasters of some sort. Amazing!
A part of you wants to do nothing but pore over this discovery, but you decide you need to keep moving, try to find someone to help you understand where you are. As you exit the shuttle you look up and notice a huge door that must open so you can fly the shuttle out…wait, if there is a shuttle here, how big is the ship I’m on now?
After one more passing glance back at the shuttle, you decide to keep walking down the hallway, eventually coming to a door that reads THE BRIDGE.
What do you do?

### Choices

#### Choice 1

Go through the door

```json
{
  "next_scene": "scene_006"
}
```

#### Choice 2

Keep walking down the hallway

```json
{
  "next_scene": "scene_005"
}
```

---

## scene_004 — Shuttle Bay (reached after Robot)

### Passage

You start walking down the hallway to the right, looking out the windows at the stars. As you walk forward, you see the hallway opening into a very large room. At the center, you see something that stops you in your tracks. A small ship…a shuttle. You walk up to it to get a closer look and take out your camera to take pictures. No one at home is going to believe this.
You open the door to the craft and take a closer look inside. You see 2 seats up front with flight controls and screens you can’t really understand. In the back, there are 2 benches along the walls and what look like blasters of some sort. Amazing!
A part of you wants to do nothing but pore over this discovery, but you decide you need to keep moving, try to find someone to help you understand where you are. As you exit the shuttle you look up and notice a huge door that must open so you can fly the shuttle out…wait, if there is a shuttle here, how big is the ship I’m on now?
After one more passing glance back at the shuttle, you decide it’s time to actually go check out The Bridge.

### Choices

#### Choice 1

Go into the Bridge

```json
{
  "next_scene": "scene_006"
}
```

---

## scene_005 — Robot (reached after Shuttle Bay)

### Passage

As you start walking down the hallway to the left, you start to hear the noise of something shuffling around. You stop for a second to listen closer for voices, but after a few seconds you hear nothing. You steel yourself and push forward, coming into a big room with a lot of very high tech machinery. As you look around, you notice something is shuffling towards you. You look closer and inspect it…it’s a robot! You excitedly wave at it, “Hi, I’m {hero_name}, Can you tell me where I am? I am honestly really confused.”
The robot keeps shuffling forwards towards you, completely ignoring you while looking right past you. 
“Ummm, hello? Can you not see me or…” you say.
As it gets close to you, it makes a quick adjustment and walks right around you, like you aren’t even there.
“Ok then, guess I will keep looking around haha.” you say with a chuckle as the robot completely ignores you.
You look around the room one more time and decide it looks an awful lot like an engine room. You grab a piece of paper from your notebook and do a quick sketch of the layout of the ship you have seen so far, just in case. 
After you tuck the book back into your satchel, you stand up and notice the other path leads you back to where you started. Looks like it’s time to check out The Bridge

### Choices

#### Choice 1

Go back to the bridge and go inside

```json
{
  "next_scene": "scene_006"
}
```

---

## scene_006 — The Bridge

### Passage

You press the button on the side of the door and walk through. You immediately find the people you have been looking for since you got here, and boy do they look different than you expected.
The one in the middle of the room is tall, really tall, with a large nose, far apart eyes, and wide ears, kind of like a kaola. Did I mention they are blue? Next, you see another alien seated at what looks like flight controls. They seem on the shorter side, with wild yellow hair, and their eyes are two long antennae, swaying above their hair. The last one you notice looks like a robot, but slightly more animated. Fully metal from head to toe, its movement is fluid, and you see it clock you the minute you walk in the room. All of them are dressed the same, in loose-fitting grey jumpsuits with zippers down the middle and patches everywhere.
“I was wondering how long it would take you to get here,” says the taller one. “But the more important question is, how did you get on my ship?”
You put your hands up and say, “Hi, umm, I am not sure how come, but I walked through this portal on my world and ended up here. It was supposed to take me somewhere else, though. I promise I’m not dangerous. I was honestly hoping you could help me figure out why I’m here.”
The robot moves closer and says, “Captain. I’ve scanned them. They have no weapons, and while their heart rate is elevated, they appear to be telling the truth. It looks like it has happened again.”
The one with the wild yellow hair sighs. ”Another planet, huh?”
You look at them all and then directly at the Captain. “What do they mean, another planet? Did something happen to Solaris?”
The Captain looks up from his data pad. “Solaris, you say? Well, that’s a few jumps away, but we should start at the beginning.”

### Choices

#### Choice 1

Ask about how they knew you were here

```json
{
  "next_scene": "scene_007"
}
```

#### Choice 2

Ask about how they scanned you

```json
{
  "next_scene": "scene_008"
}
```

---

## scene_007 — How Did You Know?

### Passage

“I’m curious: how did you know I was even here? You said you were waiting for me; how?”

The Captain’s wide ears twitch, which you are starting to think is how he smiles.

“Nothing comes aboard the {world_name} without us knowing. The sensors picked up a burst of portal energy in the port hallway, and then one very loud clank.”

“That was my landing,” you admit.

“After that, Seven tracked you through the ship.” He nods at the metal crewmate.

“You stopped to look out of every window you passed,” Seven says. “There are nineteen windows on that deck. They all show the same stars.”

Your face goes warm. “They were really good stars.”

The one with the yellow hair snorts. “I’m Pip. I fly this thing. And for what it’s worth, I still look out the windows too.”

“Someone who stops to admire the view is lost, not dangerous,” the Captain says. “That is when I decided to wait for you here. I am Captain Azul. Now, you asked about Solaris.”

### Choices

#### Choice 1

“Yes. Please. What happened to Solaris?”

```json
{
  "next_scene": "scene_009",
  "entry_intro": "asked_how"
}
```

---

## scene_008 — Scanned?

### Passage

“Hold on, you scanned me? With what?”

“With my eyes,” the metal one says.

You wait for more. There is no more.

“He means it,” says the one with the yellow hair, and both of her antennae-eyes swivel toward you. “Seven sees heat, heartbeats, metal, all of it. He can tell what you had for breakfast. I’m Pip, by the way. I fly this thing.”

“You had eggs,” Seven says. “You are also carrying forty feet of rope, a compass, a canteen, two notebooks, a camera, sunscreen, a folding shovel, and four sandwiches.”

“I was told there would be a desert,” you say.

“There is no desert here.”

“I’m getting that.”

The tall one’s wide ears twitch, which you are starting to think is how he smiles. “Seven is a synthoid. The first of his kind, and the finest officer on this ship. I am Captain Azul, and this is the {world_name}. Now, you asked about Solaris.”

### Choices

#### Choice 1

“Yes. Please. What happened to Solaris?”

```json
{
  "next_scene": "scene_009",
  "entry_intro": "asked_scan"
}
```

---

## scene_009 — Cut Short

### Entry intro: asked_how

Captain Azul sets down his data pad, and his ears stop twitching.

### Entry intro: asked_scan

Captain Azul sets down his data pad. Whatever was funny a moment ago is gone from his face.

### Passage

“We should start at the beginning,” he says. “This ship belongs to the Lifeline Fleet. We are not soldiers, and we are not explorers. We are a rescue ship. We go where people need help, and lately, {hero_name}, a great many people have needed help, because—”

WHOOP. WHOOP. WHOOP.

Red lights flash across the bridge. Pip spins her chair back to the flight controls so fast that her hair takes a second to catch up.

“Distress call, Captain! Passenger transport, the Marigold. They’ve drifted into a debris field, their engines are dead, and they’re spinning. Forty people on board.”

“How long do they have?” the Captain asks.

“Hull breach in twenty-two minutes,” Seven says. “Twenty-one.”

The Captain looks at you. It is the look of someone who wants to finish a very important sentence and cannot.

“I am sorry. You deserve answers, and you will have them. But not while forty people are spinning in the dark. Pip, take us in.”

The stars outside the window stretch into lines.

You came through that portal looking for adventure. It looks like it found you first.

### Choices

#### Choice 1

Ask how you can help

```json
{
  "next_scene": "scene_010"
}
```

#### Choice 2

Stay out of the way and watch closely

```json
{
  "next_scene": "scene_011"
}
```

---

## scene_010 — Put Me to Work

### Passage

“Captain, I want to help. What can I do?”

Pip glances back at you. Seven glances at you. The Captain does not glance. He looks at you for a long moment, the way your teachers did right before a pop quiz.

“Can you follow instructions the first time they are given?”

“Yes, sir.”

“Can you tell me when you do not understand something, instead of pretending that you do?”

That one is harder. You think about the portal, and the desert that was supposed to be on the other side.

“I’m working on that one, sir.”

His ears twitch. “An honest answer. That is worth more than a yes.”

The ship drops out of its jump, and the window fills with tumbling rock and twisted metal. In the middle of it all is a fat orange ship, turning slowly end over end, with its lights flickering.

The Marigold.

### Choices

#### Choice 1

See what needs doing

```json
{
  "next_scene": "scene_012",
  "entry_intro": "volunteered"
}
```

---

## scene_011 — Watch and Learn

### Passage

You press yourself against the back wall of the bridge, pull out your notebook, and watch.

It is what you do. It is how you figured out the portal schedules back home when nobody would teach you. You watch, you write it down, and you find the pattern.

The ship drops out of its jump, and the window fills with tumbling rock and twisted metal. In the middle of it all is a fat orange ship, turning slowly end over end, with its lights flickering.

The Marigold.

Pip’s hands fly over the controls. Seven reads out numbers. The Captain gives orders in a calm, low voice.

And you notice something. The debris looks like chaos, but it is not. The big chunks are circling, slowly, like leaves going around a drain. Every few seconds, a gap opens up on the left side, in the same place, and then closes again.

You sketch it quickly, and you count. Eleven seconds. Eleven seconds. Eleven seconds.

“Um. Captain?” You hold up the notebook. “It’s not random. There’s a gap, and it keeps coming back.”

Everyone turns to look at you.

### Choices

#### Choice 1

See what needs doing

```json
{
  "next_scene": "scene_012",
  "entry_intro": "noticed"
}
```

---

## scene_012 — The Marigold

### Entry intro: volunteered

“Here is where we stand,” the Captain says.

### Entry intro: noticed

Seven looks at your sketch for exactly one second. “They are correct, Captain. Eleven-second cycle. I had not finished calculating it.” The Captain’s ears twitch. “It seems we have a fourth set of eyes. Here is where we stand.”

### Passage

“The Marigold’s docking clamp is jammed shut, so we cannot link up with her the usual way. She is spinning, so we cannot simply fly alongside. And the debris is closing in.”

He points, and three parts of the big screen light up.

“Seven will take the shuttle across and free that clamp by hand. Pip will hold us steady inside the debris field, which is a little like threading a needle during an earthquake. I will be at the airlock to bring forty frightened people aboard.”

He turns to you.

“Every one of those jobs could use another pair of hands. I will not order you, {hero_name}. You are a guest on my ship. But if you meant what you said...”

You tighten the strap on your goggles.

This is nothing like the desert ruins. It is so much better.

### Choices

#### Choice 1

Go with Seven in the shuttle

```json
{
  "next_scene": "scene_013"
}
```

#### Choice 2

Help Pip chart a path through the debris

```json
{
  "next_scene": "scene_014"
}
```

#### Choice 3

Go with the Captain to the airlock

```json
{
  "next_scene": "scene_015"
}
```

---

## scene_013 — The Shuttle Run

### Passage

The shuttle is a small, stubby ship with two seats up front and two benches in the back, and you cannot believe that you get to ride in it.

Seven takes the pilot’s seat. You strap into the other one. On the back wall, a row of things that look like blasters sits in a rack.

“Stun rifles,” Seven says, without turning around. “They immobilize. They do not harm. You will not need one.”

“I wasn’t going to touch them.”

“I know. I am saying it so that you stop looking at them.”

The shuttle drops out of the bay and weaves through the tumbling rock. Seven matches the Marigold’s spin so perfectly that the orange ship seems to hold still while the stars whirl around it.

The clamp is a mess. A chunk of rock has bent it, and the release lever is wedged tight.

Seven pulls on it. His metal fingers leave dents in the lever. It does not move.

“I can apply more force,” he says. “But I calculate that the lever will snap before it turns.”

You look at the bent clamp. You have seen this before. It is a stuck gate latch, just a lot bigger and a lot more in space.

You dig in your satchel and pull out the folding shovel.

“You don’t pull it. You get something under the bent part and lift, and then the lever turns easy. Hold this end.”

Seven holds that end. You lean on the handle together.

Clunk.

The lever turns with two fingers.

“That was not in my calculations,” Seven says.

“It’s a farm thing.”

### Choices

#### Choice 1

Bring them home

```json
{
  "next_scene": "scene_016",
  "entry_intro": "shuttle"
}
```

---

## scene_014 — Threading the Needle

### Passage

You slide into the seat next to Pip. It is too big for you, and there are roughly nine hundred buttons.

“Don’t touch anything,” Pip says. “Just tell me what you see. Your gap. Where and when?”

You open your notebook on your knee. The debris circles outside the window, and you count under your breath.

“Left side, low. Opens in four. Three. Two. One. Now!”

Pip shoves the controls forward. The {world_name} slides through a space that did not exist a second ago, and a rock the size of a house tumbles silently past the window behind you.

“Ha! Again!”

You call them. She flies them. One gap, then the next, then the next. Her antennae-eyes are pointed in two different directions, watching two screens at once, and her hands never stop moving. You have never seen anybody so good at anything.

“Big one coming, straight ahead,” you say. “It’s not going to open in time. But there’s a little one, up high on the right. It’s tight.”

“How tight?”

You hold your fingers a small distance apart.

“Oh, I love tight,” Pip says, and she rolls the whole ship sideways.

You come out the other side right next to the Marigold, close enough to see faces in the windows.

Pip lets out a whoop and holds out her hand, palm up. You are not sure what that means here, so you shake it.

“We’ll work on that,” she says.

### Choices

#### Choice 1

Bring them home

```json
{
  "next_scene": "scene_016",
  "entry_intro": "nav"
}
```

---

## scene_015 — At the Airlock

### Passage

The airlock is a bare metal room with a big round door. You and Captain Azul stand in front of it, listening to clangs and thumps from the other side.

“They have been spinning in the dark for an hour,” the Captain says. “They will be frightened. Some will be sick. We need them to move quickly, and frightened people do not move quickly.”

The door rolls open.

He was right. Forty people come stumbling through, dizzy and pale and all talking at once. There are furry ones, and scaly ones, and a family of four who seem to be mostly made of elbows. Nobody knows where to go.

The Captain is very tall, and very blue, and at this moment he is not helping.

So you climb up on a supply crate.

“HI! I’m {hero_name}! I’m new here too! Everybody who can walk, follow the green line on the floor! If you feel sick, sit down by this wall and I’ll bring you water!”

And they do. Maybe because you are small, and you obviously do not belong here either.

You pass around your canteen. You tear your four sandwiches into pieces, and they go further than you would think. One little kid with big gray ears will not stop crying, so you give her your compass to hold. The needle spins in lazy circles out here, and she watches it, hiccuping, until she forgets to be scared.

“Thirty-nine. Forty,” the Captain counts, as the last one steps through. He looks down at you. “You have done this before.”

“No, sir. I just know what it’s like to land somewhere and not know where you are. It happened to me this morning.”

### Choices

#### Choice 1

Bring them home

```json
{
  "next_scene": "scene_016",
  "entry_intro": "airlock"
}
```

---

## scene_016 — Everyone Aboard

### Entry intro: shuttle

The clamp lets go, the Marigold links up, and by the time you and Seven are back on board the {world_name}, the last of the passengers is stepping through the airlock.

### Entry intro: nav

With the {world_name} holding steady right beside her, the Marigold finally links up. By the time you get down to the cargo bay, the last of the passengers is stepping through the airlock.

### Entry intro: airlock

The big round door rolls shut behind the last of them.

### Passage

Four minutes later, from a safe distance, you watch the empty Marigold drift into the rocks and crumple like a paper cup.

Forty people watch it with you. Nobody on board. Nobody hurt.

The cargo bay is full of blankets and hot drinks and tired voices. Captain Azul walks through it, stopping to talk with every single person. When he gets to you, he rests one big blue hand on your shoulder, just for a second, and then moves on.

It feels better than any treasure you were hoping to find.

You are handing out blankets when someone tugs on your sleeve. It is a small kid with big gray ears.

“Are you new?” she asks. “You look new.”

“Pretty new.”

“We’re from Tansy. It’s gone now.” She says it the way you might say that it is raining. “Did yours get eaten too?”

You stand very still.

“Did my what get eaten?”

“Your planet.”

Across the bay, the Captain has turned around. So has Seven. They heard.

Another planet, huh? That is what Pip said, back on the bridge.

### Choices

#### Choice 1

Go straight to the Captain

```json
{
  "next_scene": "scene_017"
}
```

#### Choice 2

Ask Seven. He will not soften it.

```json
{
  "next_scene": "scene_018"
}
```

---

## scene_017 — The Captain Tells It

### Passage

The Captain takes you to a small room with a big window, and he waits until you sit down.

“I was cut off before. I will not be cut off now.” He folds his long hands together. “There is something out there, {hero_name}. It is as large as a world, and it is hungry. It drifts between the stars, and when it finds a living planet, it feeds. It does not hate. It does not plan. It only eats. We call it the World-Eater.”

Your mouth has gone dry. “And Solaris?”

“Your portal closed behind you. You said that should not have happened, and you are right. A portal has two ends. It closes when one end is no longer there.”

He does not look away from you. You will remember that later.

“Solaris is gone. I am so very sorry.”

You look out the window. Stars. Just stars, in every direction.

“But hear the rest,” he says, “because it matters. When the World-Eater comes, a world’s portals do not simply close. They burst open first. All of them, all at once, everywhere. People fall through. They are scattered across the stars, alone and lost and alive.”

He leans forward.

“You were not the only one who came through a portal today. You were only the first one we found. That is what this ship is for.”

### Choices

#### Choice 1

Let it sink in

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_captain"
}
```

---

## scene_018 — Seven Tells It

### Passage

You find Seven by the cargo bay door, standing perfectly still.

“Seven. What happened to Solaris? I want the real answer.”

“I have only real answers,” he says. “There is an entity. It is approximately the size of a planet, and it consumes planets. We call it the World-Eater. Solaris stopped transmitting four hours and twelve minutes ago. Your portal closed because its other end no longer exists.”

You thought you wanted it straight. It turns out that straight is very hard to hold.

You sit down on a crate. Seven does not pat your shoulder, or tell you it will be okay. He does something else. He sits down on the crate next to you, which you have never seen him do, and he stays.

“There is more data, and it is relevant,” he says after a while. “When the World-Eater approaches, every portal on a world opens at once. People fall through. We have recovered survivors from eleven lost worlds this way. I keep the list. It has four thousand, two hundred and six names.”

He turns his head toward you.

“Today I added forty. I also added yours. I do not feel sorrow, {hero_name}. But ‘I am sorry’ is what is said, and I have considered it, and I choose to say it. I am sorry.”

You wipe your eyes with the back of your hand.

Somehow, it helps.

### Choices

#### Choice 1

Let it sink in

```json
{
  "next_scene": "scene_019",
  "entry_intro": "from_seven"
}
```

---

## scene_019 — The Truth

### Entry intro: from_captain

The Captain stays in his chair and says nothing else. He lets you have the quiet.

### Entry intro: from_seven

Seven stays where he is, right beside you, and says nothing else.

### Passage

You think about home.

Your room, with the maps on the wall. The market on Fifth-day. The portal yard, where you used to press your face against the fence and watch the real delvers come and go, and promise yourself that it would be you one day.

Your family.

They were all near portals. The whole town was built around the portal yard. If every portal burst open at once...

They could be anywhere.

They could be anywhere. It is the worst thought you have ever had, and it is also, somehow, the best one. Anywhere is a place. Anywhere can be found.

You jumped through that portal because you wanted to find something amazing out here.

Now you know what it is that you are looking for.

### Choices

#### Choice 1

Take a minute alone

```json
{
  "next_scene": "scene_020"
}
```

#### Choice 2

Ask what the World-Eater actually is

```json
{
  "next_scene": "scene_021"
}
```

---

## scene_020 — The Observation Deck

### Passage

You find a quiet room at the top of the ship where the whole ceiling is a window.

You lie on your back on the floor and look at more stars than you knew there were.

After a while the door slides open, and someone lies down on the floor next to you. Yellow hair spreads out across the deck.

“Lumen,” Pip says. “That was mine. Two suns, pink oceans. The best fried dough in the galaxy. I was nine. I fell through a portal in my kitchen and landed in a cargo hold full of extremely surprised chickens.”

You laugh. You did not expect to, and it comes out wobbly.

“The Captain found me three days later. I’ve been on this ship ever since.” One of her antennae-eyes turns to look at you while the other keeps watching the stars. “I’m not going to tell you it stops hurting. But I’ll tell you what I figured out. You can sit still and be sad, or you can be sad and go get people. The second one’s better. You’re sad either way, but there’s fried dough sometimes.”

You lie there a while longer.

“Did you ever find anybody? From Lumen?”

“Sixty-two so far,” Pip says, and she grins up at the stars. “My cousin Zib was number thirty. I’m still looking. That’s the whole point.”

### Choices

#### Choice 1

Go find the Captain

```json
{
  "next_scene": "scene_022",
  "entry_intro": "from_deck"
}
```

---

## scene_021 — What It Is

### Passage

“Show me,” you say. “I want to know what it is.”

Seven brings up an image on the wall. At first you think it is a picture of nothing, just a patch of space with no stars in it.

Then you realize the patch has a shape. And the shape has an edge. And the little bright dot next to it, for scale, is a planet.

“We know very little,” Seven says. “It does not answer signals. It does not seem to notice ships, the way you would not notice a gnat. It is not a machine. It may be alive. It is drawn to portal energy, the way some animals are drawn to the smell of food. Worlds with many portals are found first.”

Worlds like Solaris, where there is a whole job called delver.

“Has anybody ever stopped it?”

“No.”

“Has anybody ever hurt it?”

“No.”

“Has anybody ever tried?”

Seven is quiet for a moment, which for him is a very long time.

“That is a better question. Not successfully. Most who see it are busy running, and they are correct to run.”

You look at the hole in the stars for a long time. You find that you are not as scared of it as you thought you would be.

Mostly, you are angry.

### Choices

#### Choice 1

Go find the Captain

```json
{
  "next_scene": "scene_022",
  "entry_intro": "from_records"
}
```

---

## scene_022 — Permission to Come Aboard

### Entry intro: from_deck

You walk back to the bridge with your shoulders straighter than when you left it.

### Entry intro: from_records

You walk back to the bridge with your jaw set.

### Passage

Captain Azul is standing at the big window with his hands behind his back.

“Captain. I want to join your crew.”

He turns around. “{hero_name}. You have had the worst day of your life. It is not the day to make—”

“I can’t go home. There’s no home to go to. My family could be anywhere out here, and you’re the ones who go looking. And I’m good at this, sir. I was good at it today.” You take a breath. “I jumped through that portal without thinking. I know that. I’m thinking now. I want to help.”

The bridge is very quiet.

“The passengers of the Marigold were calmer with them in the room,” Seven says. “I do not know why. It is in my report.”

“And I like them,” says Pip. “That’s not a technical reason. I just do.”

The Captain’s ears twitch. Then they twitch again. Then he walks to a locker on the back wall, takes something out, and holds it out to you.

It is a gray jumpsuit, with a zipper down the middle and patches everywhere.

“Welcome to the Lifeline Fleet, Crewmate {hero_name}.”

You put it on right there, over your clothes. Did I mention it is about three sizes too big? It is about three sizes too big. You have to roll the sleeves four times.

You have never been prouder of anything in your life.

“You have a great deal to learn,” the Captain says, “and not much time to learn it.”

### Choices

#### Choice 1

Learn to fly with Pip

```json
{
  "next_scene": "scene_023"
}
```

#### Choice 2

Learn the ship’s systems with Seven

```json
{
  "next_scene": "scene_024"
}
```

---

## scene_023 — Flight Lessons

### Passage

Pip puts you in the pilot’s seat of the shuttle simulator and straps you in.

“Okay. Left stick goes up and down. Right stick goes side to side. That pedal is go. That pedal is stop. Don’t touch the red one.”

“What does the red one do?”

“Nobody knows. Nobody’s ever touched it. Go!”

You crash into an asteroid in four seconds.

You crash into a moon in nine seconds.

You crash into the {world_name} itself, which Pip says is a new record, because the ship is behind you when you start.

But you keep your notebook open on your knee, and after every crash you write down what happened. By the end of the week, you can fly a wobbly loop around a space station. By the end of the second week, the loop is not wobbly.

“You fly like you’re reading a map,” Pip tells you. “Like you’ve already worked out where everything is going to be.”

“Is that bad?”

“It’s weird. I fly like I’m dancing.” She ruffles your hair. “It’s good to have one of each.”

You still get lost on the way to the bathroom most mornings. But you are learning.

### Choices

#### Choice 1

Answer the call

```json
{
  "next_scene": "scene_025",
  "entry_intro": "flight"
}
```

---

## scene_024 — Systems Lessons

### Passage

Seven teaches the way he does everything else: completely.

You learn the scanners, which can spot a heartbeat through a mile of rock. You learn the comms, the airlocks, and the shields. You learn where the ship’s power goes and how to send it somewhere else. You fill a notebook and a half.

Seven never says “good job.” He says “correct.” You start to live for “correct.”

Most of your lessons are in the engine room, where the maintenance robot shuffles back and forth, oiling things. You say good morning to it every day. It walks around you every day.

“It cannot hear you,” Seven says on the ninth day.

“I know. But you said you’re the first synthoid who can really talk with people. So you’re the first. That means there were a whole lot of ones before you that couldn’t.” You shrug. “It seems rude not to say hi to your family.”

Seven stops in the middle of what he is doing.

He looks at the little robot as it shuffles past. He looks at it for a long time.

“Good morning,” he says to it.

It walks around him.

“As expected,” Seven says, and goes back to work.

But he says it again the next day. And the day after that.

### Choices

#### Choice 1

Answer the call

```json
{
  "next_scene": "scene_025",
  "entry_intro": "systems"
}
```

---

## scene_025 — Frost Station

### Entry intro: flight

You are in the middle of your best loop yet when the simulator screen goes red.

### Entry intro: systems

You are re-routing power to the forward shields, for practice, when the engine room lights go red.

### Passage

WHOOP. WHOOP. WHOOP.

You run for the bridge. You only make one wrong turn.

“Frost Station,” Pip reads out. “It’s a research base on an ice moon. Eight scientists. The ice under the base is breaking up, and their own ship is already at the bottom of a crevasse.”

“Why is the ice breaking?” the Captain asks.

Seven puts a map up on the screen. There is the moon. And there, a long way off but closer than you would like, is a patch of sky with no stars in it.

“The World-Eater is passing through this system,” Seven says. “It will not come near the moon, but it is large enough that its pull is felt from here. The moon is flexing, and the ice is cracking.”

It is the first time you have seen it on a live screen. It does not look like anything. That is the worst part.

“Eight people,” says the Captain. “Pip, get us into orbit. Seven, take the shuttle down. Crewmate {hero_name}?”

You look down at your jumpsuit, with the sleeves rolled four times.

“Ready, Captain.”

### Choices

#### Choice 1

Go down to the ice with Seven

```json
{
  "next_scene": "scene_026"
}
```

#### Choice 2

Guide the rescue from orbit with Pip

```json
{
  "next_scene": "scene_027"
}
```

---

## scene_026 — On the Ice

### Passage

The shuttle sets down on a flat, white plain under a black sky. The cold gets in through your suit anyway. Every few seconds the ground groans under your boots, like something very large turning over in its sleep.

The base is two hundred steps away. Between you and it, a crack has opened in the ice. It is as wide as a street, and you cannot see the bottom.

Eight people in orange suits are standing on the far side, waving.

“The crevasse is widening,” Seven says. “I can jump it. They cannot. I can carry one at a time, which will take too long. I cannot land the shuttle on that side, because the ice there will not hold it.”

You look at the crack. You look at the eight scientists.

Then, very slowly, you look down at your satchel.

You have been carrying forty feet of rope since the moment you left home. Pip teases you about it. You have carried it onto a spaceship, through a debris field, and into orbit around an ice moon, because a good delver is always prepared.

“Seven,” you say. “How far can you throw?”

### Choices

#### Choice 1

Rig a rope line across the crevasse

```json
{
  "next_scene": "scene_028",
  "entry_intro": "rope"
}
```

#### Choice 2

Hook your rope to the shuttle’s tow cable to make it longer

```json
{
  "next_scene": "scene_028",
  "entry_intro": "tow_cable"
}
```

---

## scene_027 — Eyes in the Sky

### Passage

You take the scanner station, the way Seven taught you. Pip holds the {world_name} right above the base, and the Captain himself takes the shuttle down with Seven.

On your screen, the moon’s surface is a sheet of cold blue. The cracks show up as thin black lines, and they are growing. Eight little orange dots are clustered at the base. Those are heartbeats.

“Captain, the big crack is between you and them. Go around to the north. The ice is thickest there. I’m sending you a path.”

“Received. Well done.”

You count the dots again, because you always count twice.

Seven. There are seven dots at the base.

Your stomach drops. You sweep the scanner outward, slowly, the way you were taught, and there it is. One orange dot, all by itself, far out on the ice, and not moving. The cracks are creeping toward it from two sides.

“Captain! One of them isn’t with the others. Half a mile east, and the ice is breaking up all around them. You won’t see them from the ground. There’s a ridge in the way.”

“Can you talk me in?”

You pull your notebook closer and start drawing the cracks as fast as they grow.

“Yes, sir. Turn right in three. Two. One.”

### Choices

#### Choice 1

Bring them all home

```json
{
  "next_scene": "scene_028",
  "entry_intro": "orbit"
}
```

---

## scene_028 — Off the Ice

### Entry intro: rope

Seven throws the rope across on the first try. The scientists anchor their end, you anchor yours, and they come across one at a time, clipped to the line, while the ice groans underneath them. The last one, an older woman hugging a silver case to her chest, steps off the rope just as the far edge crumbles away.

### Entry intro: tow_cable

Your rope alone is a little short, but knotted to the shuttle’s tow cable, it reaches with room to spare. Seven throws it across on the first try. The scientists come across one at a time, clipped to the line, while the ice groans underneath them. The last one, an older woman hugging a silver case to her chest, steps off just as the far edge crumbles away.

### Entry intro: orbit

You talk the shuttle in, turn by turn, to a patch of ice no bigger than a front yard. The lost scientist is an older woman, sitting on a silver case, too cold to stand. Seven lifts her aboard, case and all. The ice she was sitting on breaks apart before the shuttle is a hundred feet up.

### Passage

Eight scientists. Eight out of eight.

Back on board, wrapped in three blankets, the older woman will not let go of her silver case. Her name is Dr. Wren, and she insists on seeing the Captain before she has even stopped shivering.

“I wasn’t out there for fun,” she says. “I was getting my instruments back. We’ve been watching that thing for two years from Frost Station. We know more about the World-Eater than anyone alive, and it’s all in here.”

She opens the case. It is full of data crystals.

“First. It follows portal energy, like a hound follows a scent. Second. When it feeds, it opens. There’s a sort of mouth, and the inside isn’t armored the way the outside is.”

She looks around the bridge at all of you.

“And third. I’ve charted its path. I know where it’s going next, Captain. It’s going to Haven.”

Pip’s antennae droop. Even Seven goes still.

“What’s Haven?” you ask.

### Choices

#### Choice 1

Hear the answer

```json
{
  "next_scene": "scene_029"
}
```

---

## scene_029 — Haven

### Passage

“Haven is where we take them,” the Captain says.

It is late, and the five of you are in the galley, around a table that is too small, eating something Pip cooked that is mostly noodles. Dr. Wren has two bowls.

“Everyone we rescue. The Marigold’s passengers. The people of Tansy, and Lumen, and eleven other worlds. Haven is a quiet planet with no portals at all. We chose it for that. It was supposed to be the one place the World-Eater would never look.”

“Four thousand, two hundred and fourteen people,” Seven says.

“It isn’t looking for Haven,” says Dr. Wren, with her mouth full. “It’s just on the way to somewhere else, and Haven’s in the road. Nineteen days.”

Nobody says anything for a while. Pip pushes noodles around her bowl.

You look around the table. A tall blue captain. A pilot with eyes on stalks. A person made of metal. A scientist who went back out onto breaking ice for a box of crystals. And you, in a jumpsuit three sizes too big.

Three weeks ago you did not know any of them.

It occurs to you that if your family walked in right now, you would want them to meet these people first.

### Choices

#### Choice 1

Ask Seven about his list of names

```json
{
  "next_scene": "scene_030"
}
```

#### Choice 2

Ask the Captain why he started all this

```json
{
  "next_scene": "scene_031"
}
```

---

## scene_030 — The List

### Passage

After dinner, you find Seven at his station. There are names scrolling slowly up his screen.

“Is that the list?”

“Yes. Four thousand, two hundred and fourteen found.” He touches the screen, and a second list appears next to the first. It is much, much longer. “And these are the ones reported missing who have not been found yet. I review both lists every night.”

“Why every night? You don’t forget things.”

“No. I do not.” He watches the names go by. “The Captain remembers them because he grieves. Pip remembers them because she hopes. I cannot do either. So I have decided that I will be the one who remembers them exactly. Every name, spelled correctly. Someone should.”

You read over his shoulder for a while.

“Seven? Can you search the long one? For Solaris?”

“I already have. I search it every night for you. There are three hundred and nine names from Solaris on the missing list so far, and more each day, as the reports come in.”

Your heart thumps. “Is my family—”

“I do not know your family’s names. You have not told me.”

So you tell him. He types each one carefully, and he asks you how to spell them.

They are not on the found list. Not yet.

But they are written down now, exactly, by someone who will check every single night.

### Choices

#### Choice 1

Get some sleep. The call could come any time.

```json
{
  "next_scene": "scene_032",
  "entry_intro": "from_seven"
}
```

---

## scene_031 — Why He Started

### Passage

You find the Captain on the observation deck, looking up through the ceiling.

“Sir? Can I ask why you started all this?”

He is quiet for so long that you think he will not answer.

“My world was called Indra. It was the first one. There was no Lifeline Fleet then. Nobody knew what was coming, or what the open portals meant. I was the captain of a cargo ship. I hauled grain.”

He folds his hands behind his back.

“I was three days away when it happened. I came home to a hole in the sky. And I thought, well. I have a ship. It is empty. And there are people out there falling through doors into the dark.”

He looks down at you.

“I did not find my family, {hero_name}. I want to be honest with you about that. It has been a long time, and I have not. But I found Pip in a hold full of chickens. I found a laboratory that was about to switch off the first synthoid who could really think, because they were frightened of him. I found four thousand people.”

His ears twitch, just a little.

“I went looking for my family, and along the way I seem to have built another one. I did not plan it. I would not trade it.”

You stand next to him, and you both look up.

“I’m still going to look for mine,” you say.

“Good,” says the Captain. “So am I.”

### Choices

#### Choice 1

Get some sleep. The call could come any time.

```json
{
  "next_scene": "scene_032",
  "entry_intro": "from_captain"
}
```

---

## scene_032 — The Convoy

### Entry intro: from_seven

You fall asleep thinking about names, spelled correctly.

### Entry intro: from_captain

You fall asleep thinking about a grain ship with an empty hold.

### Passage

WHOOP. WHOOP. WHOOP.

This time, you do not make a single wrong turn.

“It’s the Haven evacuation,” Pip says. Her voice is tight. “They started moving people out, just in case. Twelve ships. They’ve gone dead in space, all twelve of them. Engines, lights, everything.”

“Cause?” says the Captain.

“They passed too close behind it,” Dr. Wren says, leaning over Seven’s shoulder. “It leaves a wake. A sort of cold spot. It drains the power out of anything that drifts in.”

The {world_name} drops out of its jump, and you see it with your own eyes for the first time.

It fills half the window. There is no screen in the way, and no dot for scale. It is an ocean of darkness with the stars just stopping at its edge, and it is moving away from you, slowly, like a whale that has not noticed the minnows. Twelve small ships hang helpless in the dark behind it.

Your knees do not feel good. You hold on to the back of Pip’s chair.

“Crewmate,” the Captain says quietly. “Look at the twelve ships. Not at it. At them. That is the job.”

You look at the twelve ships.

Your knees feel better.

### Choices

#### Choice 1

Take the shuttle and tow them out, one by one

```json
{
  "next_scene": "scene_033"
}
```

#### Choice 2

Run to the engine room and send the ships our power

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_033 — Tow Line

### Passage

You fly. Seven works the tow cable.

Nobody argues about it. Pip has to hold the big ship steady at the edge of the wake, and you are the one who spent two weeks crashing into simulated moons for exactly this.

“Do not think about it,” you tell yourself, out loud.

“Thinking is generally useful,” Seven says.

“Not right now!”

You dip the shuttle into the cold spot. The lights dim, the engine coughs, and you feel the power draining away like water out of a bath. You have maybe ninety seconds each time before the shuttle goes dead too.

Seven fires the cable. It catches. You pull.

One ship out. Back in. Two ships. Three.

You fly it like you are reading a map. In, hook, out. By the ninth ship, your hands have stopped shaking. By the eleventh, you are flying better than you ever did in the simulator.

On the twelfth, the engine dies.

The shuttle goes dark. You are drifting, with the last ship hooked on behind you, and the wake pulling you both backward.

“Red pedal,” Seven says.

“Nobody knows what the red pedal does!”

“I do. I installed it. It is the emergency booster. Pip is not allowed to know, because she would use it every day.”

You stomp on the red pedal.

The shuttle leaps forward like something kicked it, and the last ship comes with it.

### Choices

#### Choice 1

Count the ships

```json
{
  "next_scene": "scene_035",
  "entry_intro": "towed"
}
```

---

## scene_034 — Power Transfer

### Passage

You run for the engine room. You know every step of the way now.

Seven’s lessons come back to you all at once. Where the ship’s power goes. How to send it somewhere else.

“Captain, I can beam our power out to them! Enough to restart their engines. But I have to pull it from somewhere. We’ll lose lights, heat, and shields.”

“Do it.”

You pull the big levers, one after another. The engine room goes dark except for the glow of the power core. The {world_name} is pouring its own energy out across space, into twelve dead ships.

The little maintenance robot shuffles up beside you in the gloom. For one wild second, you think it has come to help.

It oils the lever next to your hand, and shuffles away.

“Good talk,” you tell it.

On your screen, one of the twelve ships flickers, and its engines light. Then another. Then four at once.

“Ten. Eleven,” Pip calls over the comm. “Number twelve’s not catching! It needs more, and we’re out of time!”

You have given them everything. Lights, heat, shields.

Not quite everything. You look down at the glowing panel in front of you.

“Sorry, everybody,” you say. “Hold on to something.”

You send them the gravity.

Everything on the {world_name} that is not tied down floats gently up into the air, including you, and Pip’s noodles. The twelfth ship’s engines roar to life.

### Choices

#### Choice 1

Count the ships

```json
{
  "next_scene": "scene_035",
  "entry_intro": "powered"
}
```

---

## scene_035 — Twelve for Twelve

### Entry intro: towed

You land the shuttle in the bay with your hands cramped around the sticks. Seven has to help you let go of them.

### Entry intro: powered

You put the gravity back as gently as you can. From the sound of it, the noodles land on Pip.

### Passage

Twelve ships. All twelve, with their engines running, limping away from the wake.

Nobody cheers. Everyone on the bridge is looking at the big window.

The World-Eater is turning.

It is slow, the way a storm is slow. But the great dark shape is swinging around, and the edge of it is rippling.

“It noticed,” Dr. Wren whispers. “All that power, moving around right behind it. We rang the dinner bell.”

“It is not turning toward us,” Seven says. “It is correcting its course. It will now reach Haven in four days. Not nineteen.”

“The evacuation needs two weeks,” Pip says. “At least.”

The Captain stands at the window with his hands behind his back for a long moment.

“Then we cannot outrun it, and we cannot get them out in time.” He turns around. “For all the years I have done this, we have run from that thing. Today we stop running. I do not know how to fight something the size of a world. I am open to ideas.”

The bridge is silent.

You look down at your satchel.

At the very bottom, under the rope and the sunscreen, wrapped in a sock, is the one thing you brought that a real delver would bring. You have not taken it out since you got here, because it reminds you of home.

“Captain,” you say. “I think I have one.”

### Choices

#### Choice 1

Show them

```json
{
  "next_scene": "scene_036"
}
```

---

## scene_036 — The Plan

### Passage

You unwrap the sock and set it on the table. It is a brass disc about the size of your palm, with a crystal in the middle.

“It’s a portal key. It’s how delvers open portals, and hold them open. I, um. I borrowed it. From the portal yard.” You clear your throat. “I was going to give it back.”

Dr. Wren picks it up with both hands, as if it is made of glass. “This gives off portal energy. Pure portal energy. That’s what it hunts by.”

“It’s tiny,” Pip says.

“Not if we feed the ship’s power through it,” you say. It comes out in a rush, because you can see the whole thing in your head, like a map. “It follows portal energy, like a hound. So we can lead it. And when it feeds, it opens up, and the inside isn’t armored. That’s what you said. So we can sting it. It’s never been hurt. Not once, ever. What does an animal do the first time it gets stung?”

“It leaves,” says the Captain softly. “It learns that this place hurts, and it leaves.”

“We cannot kill it,” Seven says.

“We don’t have to,” you say. “We just have to make it go somewhere else.”

The Captain looks at the brass key for a long moment.

“There are two ways to use this. We can put the key in the shuttle and lure the creature away from Haven. Or we can wire the key into the ship’s main emitter and sting it head on. {hero_name}, it is your key, and your plan. Where do we begin?”

### Choices

#### Choice 1

Lure it away with the shuttle

```json
{
  "next_scene": "scene_037"
}
```

#### Choice 2

Sting it with the ship

```json
{
  "next_scene": "scene_038"
}
```

---

## scene_037 — The Lure

### Passage

You and Seven take the shuttle out alone, with the portal key wired into the dashboard with about a mile of Dr. Wren’s cable.

Haven hangs behind you. It is small and green, and it has four thousand people on it.

Ahead of you, there are no stars at all.

“Activating,” Seven says.

The key begins to glow, and then to sing, a high, clear note that you feel in your teeth. It sounds exactly like the portal yard back home.

The World-Eater stops.

Then, slowly, the whole vast darkness swings toward you. Toward one little shuttle the size of a bus.

“It’s working! Go, go, go!”

You fly. You lead it away from Haven, out toward empty space, and it follows, like the world’s largest and worst dog.

But it is fast. It is so much faster than it looked. The darkness is filling the back window, and the edges of it are starting to fold outward, like a flower.

“It is opening,” Seven says. “It intends to feed on us. I would like to suggest that we do not let it.”

“If it’s opening up, then Dr. Wren was right! The inside is right there! We’re just at the wrong end of the plan!”

### Choices

#### Choice 1

Get the ship on the comm

```json
{
  "next_scene": "scene_039",
  "entry_intro": "lure"
}
```

---

## scene_038 — The Sting

### Passage

It takes Seven and Dr. Wren six hours to wire the portal key into the ship’s main emitter, the big dish at the front that is normally used for clearing space rocks. The stun rifles from the shuttle’s rack get taken apart for their power cells. Nobody has ever needed them for anything else.

“One shot,” Dr. Wren says. “The key won’t survive a second one. And it has to go inside. If it hits the outside, it’ll just be a snack.”

Pip flies you straight at it.

It gets bigger, and bigger, and then it stops getting bigger, because it is already everything. You are a gnat flying at a mountain.

“It’s not opening,” Pip says. “Why isn’t it opening? We’re right here!”

“It does not notice ships,” Seven says. “We have never been worth noticing.”

“The key’s wired into the dish,” you say. “It can’t smell it until we fire. And we can’t fire until it opens up. We need it to open up first.”

The darkness slides past the window, endless and uninterested. You have the sting. You have no bait.

You look at the shuttle bay light on Pip’s console, and you understand what has to happen next.

### Choices

#### Choice 1

Tell them the rest of the plan

```json
{
  "next_scene": "scene_039",
  "entry_intro": "sting"
}
```

---

## scene_039 — Both at Once

### Entry intro: lure

Seven switches the key off. The singing stops. Behind you, the great darkness slows, as if it has lost the scent, and its edges fold shut again. You race back to the {world_name} with your heart pounding and run all the way to the bridge. “It opens up when it hunts!” you tell them. “We have to sting it while it’s chasing something!”

### Entry intro: sting

“It needs bait,” you say. “The shuttle. If the shuttle puts out enough portal energy, it’ll chase it, and it’ll open up. And then the ship stings it.”

### Passage

There is a short, terrible silence.

“The key cannot be in two places,” the Captain says.

“It doesn’t have to be,” Dr. Wren cuts in. “The shuttle’s engine core will put out something close enough, if you overload it. It’ll smell like a portal for a few minutes. Then it’ll burn out.”

So this is the plan. The shuttle runs, screaming portal energy, and gets the World-Eater to open its mouth. The ship comes in from the side and fires the key’s one shot down its throat. If the shuttle is too slow, it gets swallowed. If the ship misses, there is no second try.

Two jobs. Flying the bait needs someone who can hold a line with their hands steady while the largest thing in the universe comes up behind them. Firing the shot needs someone who can watch a moving target and find the pattern, and call the one right moment.

You have spent three weeks learning to be both of those people.

“Crewmate {hero_name},” the Captain says. “I have never asked anyone so young to do something like this, and I would not ask now if I had any other choice. Where do you want to be?”

### Choices

#### Choice 1

Fly the shuttle with Seven

```json
{
  "next_scene": "scene_040"
}
```

#### Choice 2

Take the firing station on the bridge

```json
{
  "next_scene": "scene_041"
}
```

---

## scene_040 — The Bait

### Passage

Seven overloads the engine core. The whole shuttle starts to hum the portal note. You take the sticks.

“I will handle the power,” he says. “You fly. Do not think about it.”

“You said thinking is useful.”

“I have revised my position.”

It comes.

You have never flown like this. You are not reading a map, because there is no map. There is only the darkness rising behind you, and the edges of it folding open, wider than a continent. Inside it is a dim red glow, like coals.

“Hold the line,” the Captain’s voice says. “Ten more seconds. We are almost in position.”

The shuttle is shaking itself apart. A panel bursts. Sparks rain down on your side of the cockpit, and before you can even flinch, Seven has put his arm across you. It takes the whole shower. When he pulls it back, the metal is black and the fingers are not moving.

“Your arm!”

“It is an arm. I have another. I do not feel fear, {hero_name}. But I have calculated that you do, and you are flying anyway. Hold the handle. Five more seconds.”

You hold the handle.

The red glow fills every mirror.

“NOW!” the Captain roars. “Break left! PIP, FIRE!”

You break left, harder than you have ever turned, and something bright goes past you the other way.

### Choices

#### Choice 1

Look back

```json
{
  "next_scene": "scene_042",
  "entry_intro": "flew"
}
```

---

## scene_041 — The Shot

### Passage

You take the firing station. It is one screen, one crosshair, and one button. Your notebook is open on your knee.

Out in the dark, Seven is flying the shuttle alone, with its engine core screaming portal energy, and the World-Eater is rising up behind him like a wave.

“It’s opening!” Pip shouts. “There it is!”

The edges of the darkness fold outward. Inside is a dim red glow, like coals. But the mouth is not still. It ripples, and flexes, and pulses.

One shot.

“Crewmate,” the Captain says. “Any time.”

“Not yet.”

You watch. You count. You write it down, the way you always do. Wide, narrow, narrow, wide. Wide, narrow, narrow, wide. It is breathing. Every fourth beat, the glow in the center is brightest, and there is a clear path all the way in.

“The shuttle’s coming apart,” Pip says. “{hero_name}, he can’t hold it!”

“I have lost the use of one arm,” Seven’s voice says calmly over the comm. “I have another. Please take the time you need. I would prefer that you did not miss.”

Wide. Narrow. Narrow.

You think of Solaris. You think of Tansy, and Lumen, and Indra. You think of all those names, spelled correctly.

“Seven, break left. Now.”

Wide.

You press the button.

### Choices

#### Choice 1

Watch it fly

```json
{
  "next_scene": "scene_042",
  "entry_intro": "fired"
}
```

---

## scene_042 — Stung

### Entry intro: flew

In the mirror, you watch the shot go in.

### Entry intro: fired

The portal key’s one and only shot leaps from the front of the ship, passes the fleeing shuttle by a hair, and goes in.

### Passage

It is a single thread of brilliant white light, carrying every bit of power the {world_name} has. It slides straight down the middle, into the red glow, and vanishes.

For a moment, nothing happens.

Then the World-Eater shudders.

You do not hear it. There is no sound in space. But you feel it, in your ribs, in the deck, in the air, a vast, low note of something that has never once been hurt, discovering what it is like. A crack of white light runs across the darkness from one side to the other, like lightning across a night sky.

The mouth slams shut.

And the World-Eater turns away. Away from the shuttle, away from the ship, away from the little green planet with four thousand people on it. It is faster than you have ever seen it move. The starless patch shrinks, and shrinks, until it is a smudge, and then it is a speck.

Then it is only stars.

The bridge of the {world_name} erupts. Pip is screaming and hugging Dr. Wren. Dr. Wren is crying on her crystals.

“It is not dead,” Seven says, over the noise.

“No,” says the Captain. “It is wounded, and it is frightened, and it is still out there. But it has learned today that some doors bite back.” His voice cracks a little. “And it learned it from us.”

Far below, the lights of Haven are twinkling.

### Choices

#### Choice 1

Go down to Haven

```json
{
  "next_scene": "scene_043"
}
```

---

## scene_043 — The Wall of Names

### Passage

Haven smells like cut grass and cooking. You had forgotten that planets have smells.

Four thousand people come out to meet the ship. You get hugged by more strangers than you can count. The kid with the big gray ears from the Marigold runs up and hugs you around the knees.

Seven’s arm is already being rebuilt, and he is already supervising. Pip finds a fried dough stand run by her cousin Zib, and she does not come back for an hour.

In the middle of the town, there is a long white wall covered in names. Thousands and thousands of them, with the name of a lost world above each group. It is Seven’s list, carved where everyone can see it. People leave flowers along the bottom.

At the very end, there is a fresh, empty stretch of wall. While you stand there, a woman with a chisel carves a new heading into it.

SOLARIS.

And underneath it, she begins to carve names. There are six already. They are six people who fell through portals just like you did, and were picked up by other ships, and brought here.

You read them three times. You do not know any of them.

But there are six. Yesterday there were none. And there is a lot of empty wall.

Captain Azul comes to stand beside you.

“More will come,” he says. “They always do. Some will be brought here. Some are still out there, waiting for a ship. You have earned the right to choose, {hero_name}. You can stay here on Haven and be the first face every Solarian sees when they arrive. Or you can come with us, and go and find them.”

### Choices

#### Choice 1

Stay on Haven and wait by the wall

```json
{
  "next_scene": "scene_044"
}
```

#### Choice 2

Stay with the crew and keep searching

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_044 — The First Face

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I think I need to be here,” you say. “When they come through those gates, lost and scared, I want somebody from home to be standing there. I know what that’s worth.”

The Captain nods slowly. “I thought you might. It is a good choice.”

“Can I keep the jumpsuit?”

“I would be insulted if you did not. You are still crew. You are simply stationed on the ground.”

The {world_name} lifts off three days later. Pip cries and pretends she is not. Seven shakes your hand with his new arm, because he has learned that you are a hand-shaker.

“I will continue to search the list for your family every night,” he says. “When I find them, you will be the first to know. I have said when. I considered the word carefully.”

You watch the ship until it is one more star.

Then you get to work. You build a little welcome station by the gates, with blankets, and water, and sandwiches. A lot of sandwiches. You pin a map of Haven to the wall, drawn by hand.

Every ship that lands, you are there, in a gray jumpsuit that is a little less too big every month.

“Hi,” you say, to every lost and frightened face. “I’m {hero_name}. I’m from Solaris. You’re safe. Let me show you the wall.”

Out there in the dark, something huge and wounded is still drifting between the stars.

But the wall is getting longer, and you check the new names every single morning.

One day, you know, you are going to recognize one.

The End.

### Choices

---

## scene_045 — The Space Walker

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I can’t wait by a wall,” you say. “I’m not built for it. If my family’s out there, they’re waiting for a ship. I want to be on the ship.”

The Captain’s ears twitch. Both of them, twice.

“I was hoping you would say that. I have already told the quartermaster to find you a jumpsuit that fits.”

“No thanks,” you say, and you roll your sleeves one more time. “I’ll grow into this one.”

The {world_name} lifts off three days later, with a rebuilt shuttle, a repaired synthoid, a pilot full of fried dough, and a scientist who has decided that she is not going back to an ice moon. And you.

You carve your family’s names on the wall yourself before you go, under MISSING. Seven checks the spelling.

On your first night back in space, you lie on the floor of the observation deck with your notebook. You are drawing a map. It has every lost world on it, and every place a survivor has ever been found. There is a pattern in there somewhere. There always is.

“It is still out there,” Seven says from the doorway. “It will heal. It will come back.”

“I know,” you say, without looking up. “And when it does, it’s going to find out we’ve been practicing.”

WHOOP. WHOOP. WHOOP.

You grab your satchel. Rope, compass, notebook, sandwiches. A good delver is always prepared.

“Crewmate {hero_name} to the bridge,” says the Captain’s voice.

You are already running. You do not make a single wrong turn.

The End.

### Choices
