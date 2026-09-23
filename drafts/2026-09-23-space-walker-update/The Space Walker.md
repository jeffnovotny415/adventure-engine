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

You adjust the goggles on your head for the 5th time. Ok, this is your first portal, but you’ve got this. Just jump through, {hero_name}. Just a little step.

Finally, you steel up your courage, pull down your goggles, and jump.

You land with a loud clank on a hard metal floor. As you look around, you notice your surroundings are not what you expected. Cold metal everywhere and large panes of glass, not the sandy desert filled with ruins your research suggested.

You spin around and get a really good view out the windows. “Are those stars…where the heck did I end up…is this a spaceship?” you say as you look out at the vastness of space and stars.

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

As you start walking down the hallway to the left, you start to hear the noise of something shuffling around. You stop for a second to listen closer for voices, but after a few seconds you hear nothing.

You steel yourself and push forward, coming into a big room with a lot of very high-tech machinery. As you look around, you notice something is shuffling towards you. You look closer and inspect it…it’s a robot!

You excitedly wave at it. “Hi, I’m {hero_name}. Can you tell me where I am? I am honestly really confused.”

The robot keeps shuffling forwards towards you, completely ignoring you while looking right past you.

“Ummm, hello? Can you not see me or…” you say.

As it gets close to you, it makes a quick adjustment and walks right around you, like you aren’t even there.

“Ok then, guess I will keep looking around, haha,” you say with a chuckle as the robot completely ignores you.

You look around the room one more time and decide it looks an awful lot like an engine room. You grab a piece of paper from your notebook and do a quick sketch of the layout of the ship you have seen so far, just in case. Then you start following the hallway again.

You come to a big door with a sign above it that reads THE BRIDGE, and you stop and think to yourself. Ok, well, I can either go in here or keep exploring this hallway.

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

You start walking down the hallway to the right, looking out the windows at the stars. As you walk forward, you see the hallway opening into a very large room. At the center, you see something that stops you in your tracks. A small ship…a shuttle.

You walk up to it to get a closer look and take out your camera to take pictures. No one at home is going to believe this.

You open the door to the craft and take a closer look inside. You see 2 seats up front with flight controls and screens you can’t really understand. In the back, there are 2 benches along the walls and what look like blasters of some sort. Amazing!

A part of you wants to do nothing but pore over this discovery, but you decide you need to keep moving and try to find someone to help you understand where you are. As you exit the shuttle, you look up and notice a huge door that must open so you can fly the shuttle out…wait, if there is a shuttle here, how big is the ship I’m on now?

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

You start walking down the hallway to the right, looking out the windows at the stars. As you walk forward, you see the hallway opening into a very large room. At the center, you see something that stops you in your tracks. A small ship…a shuttle.

You walk up to it to get a closer look and take out your camera to take pictures. No one at home is going to believe this.

You open the door to the craft and take a closer look inside. You see 2 seats up front with flight controls and screens you can’t really understand. In the back, there are 2 benches along the walls and what look like blasters of some sort. Amazing!

A part of you wants to do nothing but pore over this discovery, but you decide you need to keep moving and try to find someone to help you understand where you are. As you exit the shuttle, you look up and notice a huge door that must open so you can fly the shuttle out…wait, if there is a shuttle here, how big is the ship I’m on now?

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

As you start walking down the hallway to the left, you start to hear the noise of something shuffling around. You stop for a second to listen closer for voices, but after a few seconds you hear nothing.

You steel yourself and push forward, coming into a big room with a lot of very high-tech machinery. As you look around, you notice something is shuffling towards you. You look closer and inspect it…it’s a robot!

You excitedly wave at it. “Hi, I’m {hero_name}. Can you tell me where I am? I am honestly really confused.”

The robot keeps shuffling forwards towards you, completely ignoring you while looking right past you.

“Ummm, hello? Can you not see me or…” you say.

As it gets close to you, it makes a quick adjustment and walks right around you, like you aren’t even there.

“Ok then, guess I will keep looking around, haha,” you say with a chuckle as the robot completely ignores you.

You look around the room one more time and decide it looks an awful lot like an engine room. You grab a piece of paper from your notebook and do a quick sketch of the layout of the ship you have seen so far, just in case.

After you tuck the book back into your satchel, you stand up and notice the other path leads you back to where you started. Looks like it’s time to check out The Bridge.

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

You press the button on the side of the door and walk through. You immediately find the people you have been looking for since you got here, and boy, do they look different than you expected.

The one in the middle of the room is tall, really tall, with a large nose, far-apart eyes, and wide ears, kind of like a koala. Did I mention they are blue?

Next, you see another alien seated at what looks like flight controls. They seem on the shorter side, with wild yellow hair, and their eyes are two long antennae, swaying above their hair.

The last one you notice looks like a robot, but slightly more animated. Fully metal from head to toe, its movement is fluid, and you see it clock you the minute you walk in the room.

All of them are dressed the same, in loose-fitting grey jumpsuits with zippers down the middle and patches everywhere.

“I was wondering how long it would take you to get here,” says the taller one. “But the more important question is, how did you get on my ship?”

You put your hands up and say, “Hi, umm, I am not sure how come, but I walked through this portal on my world and ended up here. It was supposed to take me somewhere else, though. I promise I’m not dangerous. I was honestly hoping you could help me figure out why I’m here.”

The robot moves closer and says, “Captain. I’ve scanned them. They have no weapons, and while their heart rate is elevated, they appear to be telling the truth. It looks like it has happened again.”

The one with the wild yellow hair sighs. “Another planet, huh?”

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

“I’m curious: how did you know I was even here? You said you were waiting for me. How?”

The Captain’s huge ears twitch, blue on the outside and orange-gold on the inside. You’re starting to think that’s how he smiles.

“Nothing comes aboard the {world_name} without us knowing. The sensors picked up a burst of portal energy in the port hallway, and then one very loud clank.”

“That was my landing,” you admit.

“After that, Trace tracked you through the ship.” He nods at the metal crewmate.

Trace’s round eyes whir and refocus on you, like camera lenses. He’s got a little smile built right into his face. You’ll find out later it’s always there, even when he’s telling you bad news.

“You stopped to look out of every window you passed,” Trace says. “There are nineteen windows on that deck. They all show the same stars.”

Your face goes warm. “They were really good stars.”

The one with the yellow hair snorts, and their big black nose wrinkles up. “I’m Percy. I fly this thing. And for what it’s worth, I still look out the windows too.”

“Someone who stops to admire the view is lost, not dangerous,” the Captain says. “That is when I decided to wait for you here. I am Captain Aster. Now, you asked about Solaris.”

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

“With my eyes,” the metal one says. His round eyes whir as they focus on you.

You wait for more. There is no more.

“He means it,” says the one with the yellow hair, and both of their antennae-eyes swivel toward you. “Trace sees heat, heartbeats, metal, all of it. He can tell what you had for breakfast. I’m Percy, by the way. I fly this thing.”

“You had eggs,” Trace says, with the little smile that seems to be built into his face. “You are also carrying forty feet of rope, a compass, a canteen, two notebooks, a camera, sunscreen, a folding shovel, and four sandwiches.”

“I was told there would be a desert,” you say.

“There is no desert here.”

“Yeah, I’m getting that.”

The tall one’s huge ears twitch, orange-gold on the inside. You’re starting to think that’s how he smiles. “Trace is a synthoid. The first of his kind, and the finest officer on this ship. I am Captain Aster, and this is the {world_name}. Now, you asked about Solaris.”

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

Captain Aster sets down his data pad, and his ears stop twitching.

### Entry intro: asked_scan

Captain Aster sets down his data pad. Whatever was funny a moment ago is gone from his face.

### Passage

“We should start at the beginning,” he says. “This ship belongs to the Rescue Corps. We are not soldiers, and we are not explorers. We are a rescue ship. We go where people need help, and lately, {hero_name}, a great many people have needed help, because—”

WHOOP. WHOOP. WHOOP.

Red lights flash across the bridge. Percy spins their chair back to the flight controls so fast their hair takes a second to catch up.

“Distress call, Captain! Passenger transport, the Genesis. They’ve drifted into a debris field, their engines are dead, and they’re spinning. Forty people on board!”

“How long do they have?” the Captain asks.

“Hull breach in twenty-two minutes,” Trace says. “Twenty-one.”

The Captain looks at you, the way somebody looks when they really want to finish a very important sentence and can’t.

“I am sorry. You deserve answers, and you will have them. But not while forty people are spinning in the dark. Percy, take us in.”

The stars outside the window stretch out into long lines.

You came through that portal looking for an adventure. Looks like it found you first.

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

Percy glances back at you. Trace glances at you. The Captain doesn’t glance…he looks at you for a long moment, the way your teachers did right before a pop quiz.

“Can you follow instructions the first time they are given?”

“Yes, sir.”

“Can you tell me when you do not understand something, instead of pretending that you do?”

That one’s harder. You think about the portal, and the desert that was supposed to be on the other side of it.

“I’m working on that one, sir.”

His ears twitch. “An honest answer. That is worth more than a yes.”

The ship drops out of its jump, and the window fills up with tumbling rock and twisted metal. In the middle of it all is a fat orange ship, turning slowly end over end with its lights flickering.

The Genesis.

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

It’s what you do. It’s how you figured out the portal schedules back home when nobody would teach you. You watch, you write it down, and you find the pattern.

The ship drops out of its jump, and the window fills up with tumbling rock and twisted metal. In the middle of it all is a fat orange ship, turning slowly end over end with its lights flickering.

The Genesis.

Percy’s hands fly over the controls, Trace reads out numbers, and the Captain gives orders in a calm, low voice.

And that’s when you notice something. The debris looks like total chaos, but it isn’t. The big chunks are circling, slowly, like leaves going around a drain. Every few seconds a gap opens up on the left side, in the exact same place, and then closes again.

You sketch it fast and count. Eleven seconds. Eleven seconds. Eleven seconds!

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

## scene_012 — The Genesis

### Entry intro: volunteered

“Here is where we stand,” the Captain says.

### Entry intro: noticed

Trace looks at your sketch for exactly one second. “They are correct, Captain. Eleven-second cycle. I had not finished calculating it.”

The Captain’s ears twitch. “It seems we have a fourth set of eyes. Here is where we stand.”

### Passage

“The Genesis’s docking clamp is jammed shut, so we cannot link up with her the usual way. She is spinning, so we cannot simply fly alongside. And the debris is closing in.”

He points, and three parts of the big screen light up.

“Trace will take the shuttle across and free that clamp by hand. Percy will hold us steady inside the debris field, which is a little like threading a needle during an earthquake. I will be at the airlock to bring forty frightened people aboard.”

He turns to you.

“Every one of those jobs could use another pair of hands. I will not order you, {hero_name}. You are a guest on my ship. But if you meant what you said…”

You tighten the strap on your goggles.

This is nothing like the desert ruins. It’s SO much better.

### Choices

#### Choice 1

Go with Trace in the shuttle

```json
{
  "next_scene": "scene_013"
}
```

#### Choice 2

Help Percy chart a path through the debris

```json
{
  "next_scene": "scene_016"
}
```

#### Choice 3

Go with the Captain to the airlock

```json
{
  "next_scene": "scene_019"
}
```

---

## scene_013 — The Shuttle Run

### Passage

The shuttle is a small, stubby ship with two seats up front and two benches in the back, and you can’t believe you actually get to ride in it.

Trace takes the pilot’s seat and you strap into the other one. On the back wall, those things that look like blasters sit in a rack.

“Stun rifles,” Trace says, without turning around. “They immobilize. They do not harm. You will not need one.”

“I wasn’t going to touch them.”

“I know. I am saying it so that you stop looking at them.”

The shuttle drops out of the bay and weaves through the tumbling rock. Trace matches the Genesis’s spin so perfectly that the orange ship seems to hold still while the stars whirl around it.

You both climb out onto the hull with your boots clamped to the metal. You try very, VERY hard not to think about that.

The clamp is a mess. A chunk of rock has bent it, and the release lever is wedged tight. Trace pulls on it, and his metal fingers leave dents in the lever…but it doesn’t budge.

“I can apply more force,” he says. “But I calculate that the lever may snap before it turns.”

You look at the bent clamp. You’ve seen this before. It’s a stuck gate latch, just a whole lot bigger, and a whole lot more in space.

### Choices

#### Choice 1

Dig out your folding shovel and try something

```json
{
  "next_scene": "scene_014"
}
```

#### Choice 2

Tell Trace to pull harder. There is no time to be clever

```json
{
  "next_scene": "scene_015"
}
```

---

## scene_014 — A Farm Thing

### Passage

You dig in your satchel and pull out the folding shovel. You packed it for digging in desert ruins.

“You don’t pull on it,” you tell Trace. “It’s stuck because the bent part is pinching it. You get something under the bent part and lift, and then the lever turns easy. Hold this end.”

Trace holds that end. You wedge the blade of the shovel under the twisted metal, and the two of you lean on the handle together.

For a second, nothing happens. Then there’s a CLUNK you can feel right through your boots.

Trace reaches over and turns the lever with two fingers.

“That was not in my calculations,” he says.

“It’s a farm thing. Our gate sticks every winter.”

“I will add ‘farm thing’ to my calculations.”

The clamp swings open. Below you, the {world_name} slides in close, and the two ships lock together with a BOOM.

### Choices

#### Choice 1

Get back aboard

```json
{
  "next_scene": "scene_020",
  "entry_intro": "shuttle"
}
```

---

## scene_015 — Snap

### Passage

“Pull harder! We don’t have time!”

Trace pulls harder.

The lever snaps off in his hand.

The two of you look at it. There’s a tiny stub left sticking out of the clamp, about as long as your thumb.

“I did calculate that,” Trace says.

“I know. I’m sorry. That was my fault.” You’ll tell the Captain later that you didn’t understand something and pretended you did. Right now, there are forty people under your feet.

You dig in your satchel and pull out the folding shovel.

“Ok. It’s stuck because the bent part is pinching it. If we lift the bent part, the stub should turn. Can you grip something that small?”

“I can grip something much smaller than that.”

You wedge the blade of the shovel under the twisted metal and hang your whole weight on the handle, and Trace pinches the stub between two fingers and turns it, slowly.

CLUNK.

It cost you three minutes you didn’t have. But the clamp swings open, the {world_name} slides in close below you, and the two ships lock together with a BOOM.

### Choices

#### Choice 1

Get back aboard

```json
{
  "next_scene": "scene_020",
  "entry_intro": "shuttle"
}
```

---

## scene_016 — Threading the Needle

### Passage

You slide into the seat next to Percy. It’s way too big for you, and there are roughly nine hundred buttons.

“Don’t touch anything,” Percy says. “Just tell me what you see. Your gap. Where and when?”

You open your notebook on your knee. The debris circles past outside the window, and you count under your breath.

“Left side, low. Opens in four. Three. Two. One. NOW!”

Percy shoves the controls forward. The {world_name} slides through a space that didn’t exist a second ago, and a rock the size of a house tumbles silently past the window behind you.

“HA! Again!”

You call them and Percy flies them. One gap, then the next, then the next. Their antennae-eyes are pointed in two different directions, watching two screens at once, and their hands never stop moving. You’ve never seen anybody so good at anything.

Then you see the last one, and your stomach sinks.

“Big rock coming, straight ahead. The gap on the left isn’t going to open in time. There’s a little one, up high on the right. But it’s tight. It’s really tight.”

“How tight?”

You hold your fingers a tiny distance apart.

“Or we could hold here,” you say. “The big gap comes back around in eleven seconds. It’s safe. But it’s eleven more seconds that they’re spinning.”

“You’re the one with the map,” Percy says. “Call it.”

### Choices

#### Choice 1

Call the tight gap

```json
{
  "next_scene": "scene_017"
}
```

#### Choice 2

Wait for the safe one

```json
{
  "next_scene": "scene_018"
}
```

---

## scene_017 — I Love Tight

### Passage

“Tight one. High right. Go, go, GO!”

“Oh, I LOVE tight,” Percy says, and they roll the whole ship over on its side.

Everything that isn’t strapped down slides across the bridge. The Captain doesn’t slide. He just leans.

Rock fills the window on both sides. You could read the writing on it, if rocks had writing. Something scrapes along the bottom of the ship with a long, slow SCREEEECH that you feel in your teeth.

And then you’re through, and right there in front of you is the Genesis, close enough that you can see faces in the windows!

Percy lets out a whoop and holds out their hand to you, palm up. You’re not sure what that means here, so you shake it.

“We’ll work on that,” they say.

“Percy,” the Captain says mildly. “You have removed some of my paint.”

“It was old paint, Captain.”

### Choices

#### Choice 1

Run down to the airlock

```json
{
  "next_scene": "scene_020",
  "entry_intro": "nav"
}
```

---

## scene_018 — Eleven Seconds

### Passage

“Hold here. Wait for the big one.”

Percy’s hands twitch on the controls. You can tell they hate it…but they hold.

Eleven seconds is a really long time. You count every single one of them. On the screen, the Genesis keeps tumbling end over end, lights flickering.

Nine. Ten.

A rock nobody saw, no bigger than a suitcase, comes spinning out of the dark and cracks against the side of the ship. Red lights flash, and the whole bridge jumps sideways.

“Shields are holding,” Trace says. “Mostly.”

Eleven.

“NOW! Left side, low!”

Percy shoves the controls forward, and the {world_name} sails through a gap as wide as a barn door, with room to spare on every side. Right there in front of you is the Genesis, close enough that you can see faces in the windows.

“Safe and slow,” Percy says, blowing the hair out of their face. “It’s not how I’d have done it. But hey, we’ve still got all of our paint.” They hold out their hand to you, palm up. You’re not sure what that means here, so you shake it.

“We’ll work on that,” they say.

### Choices

#### Choice 1

Run down to the airlock

```json
{
  "next_scene": "scene_020",
  "entry_intro": "nav"
}
```

---

## scene_019 — At the Airlock

### Passage

The airlock is a bare metal room with a big round door. You and Captain Aster stand in front of it, listening to the clangs and thumps coming from the other side.

“They have been spinning in the dark for an hour,” the Captain says. “They will be frightened. Some will be sick. We need them to move quickly, and frightened people do not move quickly.”

The door rolls open.

He was right. Forty people come stumbling through, dizzy and pale and all talking at once. There are furry ones and scaly ones, and a family of four who seem to be mostly made of elbows. Nobody knows where to go.

The Captain is very tall, and very blue, and at this exact moment, he is not helping.

So you climb up on a supply crate.

“HI! I’m {hero_name}! I’m new here too! Everybody who can walk, follow the green line on the floor! If you feel sick, sit down by this wall and I’ll bring you water!”

And they do! Maybe because you’re small, and you obviously don’t belong here either.

You pass around your canteen. You tear your four sandwiches into pieces, and they go a lot further than you’d think. One little kid with big gray ears won’t stop crying, so you give her your compass to hold. Out here the needle just spins in lazy circles, and she watches it, hiccuping, until she forgets to be scared.

The Captain has been counting heads at the door. He looks down at you. “You have done this before.”

“No, sir. I just know what it’s like to land somewhere and not know where you are. It happened to me this morning.”

### Choices

#### Choice 1

Help the last few through

```json
{
  "next_scene": "scene_020",
  "entry_intro": "airlock"
}
```

---

## scene_020 — Thirty-Eight

### Entry intro: shuttle

By the time you and Trace are back on board the {world_name}, the passengers are pouring in through the airlock. The Captain is counting them as they come.

### Entry intro: nav

With the {world_name} holding steady right beside her, the Genesis finally links up. By the time you get down to the airlock, the passengers are pouring through. The Captain is counting them as they come.

### Entry intro: airlock

The last few stragglers step through the big round door. The Captain is counting them as they come.

### Passage

“Thirty-seven. Thirty-eight.”

He waits. Nobody else comes through.

“Thirty-eight life signs aboard,” Trace says. “Two remain on the Genesis. They are in her engine room, and they are not moving toward the airlock.”

The comm crackles.

“This is Captain Thyme of the Genesis.” It’s a rough, tired voice. “Whoever you are, thank you. Now close that door and get my passengers clear. My engineer and I are holding the coolant valve shut by hand. While we hold it, she’s got nine minutes. If we let go, she’s got about two. It’s not enough time to get to you. We’ve done the math.”

Behind her, a much smaller voice says, “We did it twice.”

“That’s Ratchet. He’s a good engineer. Tell my passengers that we…well. Tell them something nice.”

Captain Aster’s hands close into fists behind his back.

“Captain Thyme,” he says. “This is Captain Aster, of the Rescue Corps. We do not leave people. Hold that valve.”

He turns around. He looks at Trace, and then he looks at you.

Nine minutes.

### Choices

#### Choice 1

Go aboard with Trace and find another way to hold that valve

```json
{
  "next_scene": "scene_021"
}
```

#### Choice 2

Get on the comm and help them find a way out

```json
{
  "next_scene": "scene_022"
}
```

---

## scene_021 — Belts

### Passage

You and Trace run through the Genesis. It’s like running through a house that somebody is slowly rolling down a hill. The floor turns into the wall, and then the wall turns into the ceiling.

You find them in the engine room. Captain Thyme is tall and gray and feathery. Ratchet is small and round and furry, and he only comes up to her knee. They’re both hanging on to a big red wheel, and the wheel is fighting them.

“I told you to LEAVE!” Thyme shouts.

“I can hold the valve,” Trace says. “I am considerably stronger than both of you.”

“And then who holds it while YOU run?”

Nobody has an answer for that. You look at the wheel. You look at the fat pipe running along the wall right next to it. Then you look down at your own belt.

“Everybody take off your belts,” you say.

“Excuse me?” says Captain Thyme.

Four belts, buckled end to end, make one long strap. Trace hauls the wheel shut as tight as it’ll go, and you lash it to the pipe, round and round, and pull the last buckle tight.

Trace lets go. The strap creaks. The wheel trembles.

It holds!

“It will last for one minute and forty seconds,” Trace says.

“Then RUN!”

And that’s how you end up sprinting through a tumbling spaceship next to a synthoid, a bird, and a very small engineer, with every single one of you holding your pants up with one hand.

### Choices

#### Choice 1

Dive through the airlock

```json
{
  "next_scene": "scene_023",
  "entry_intro": "aboard"
}
```

---

## scene_022 — The Low Point

### Passage

You grab the comm. “Captain Thyme? My name’s {hero_name}. I’m new. Can you tell me what the valve is doing? Is it pushing on you the same amount all the time?”

“What kind of a question is that?”

“No,” says the smaller voice. “It’s not the same. It comes and goes. Hard, then not so hard.”

Your heart jumps. “Ratchet? How long between the hard parts?”

There’s a pause. “I count…eleven. About eleven seconds.”

It’s the spin! The same eleven seconds as everything else out here. Every time the Genesis turns over, the pressure goes up, and then it comes back down.

You flip open your notebook and draw it, fast. A wave, up and down. “Trace, if they crank it shut at the very bottom of the wave, as tight as it’ll go, how long before it works itself loose?”

Trace looks at your drawing for exactly one second.

“Forty seconds. Possibly forty-five.”

“Is that enough time to get to the airlock?”

“Not at a walk,” says Captain Thyme, and you can hear that she’s starting to believe it. “But Ratchet, you were the fastest kid on Trellis, weren’t you?”

“I was the second fastest,” says Ratchet. “I’ll carry the wrench.”

You count them down to the bottom of the wave. Three. Two. One. “NOW! Crank it and GO!”

You hear grunting, and metal squealing, and then nothing but the sound of running feet. You stand at the airlock and count to forty, and it’s the longest forty of your whole entire life.

### Choices

#### Choice 1

Watch the door

```json
{
  "next_scene": "scene_023",
  "entry_intro": "comms"
}
```

---

## scene_023 — Everyone Aboard

### Entry intro: aboard

The four of you dive through the airlock in a heap, and the big round door slams shut behind you. Thirty-nine. Forty. Everybody goes looking for their belts.

### Entry intro: comms

At thirty-six, a tall gray shape comes flying through the airlock with a small furry one tucked under her arm, and the big round door slams shut behind them. Thirty-nine. Forty.

### Passage

The {world_name} pulls away. From a safe distance, you watch the empty Genesis drift into the rocks and crumple like a paper cup.

Forty people watch it with you. Nobody’s on board. Nobody’s hurt. Captain Thyme stands at the window until there’s nothing left to see, and Ratchet holds on to her leg.

Afterward, the cargo bay is full of blankets and hot drinks and tired voices. A tall robot rolls through on a pair of treads with a stack of blankets balanced on its forklift claws. It’s got a solar panel on its head, one big camera eye, and a round speaker in its chest, and every time it hands somebody a blanket, the speaker announces, “CARGO SECURED.” Nobody corrects it.

Captain Aster walks through the whole bay, stopping to talk with every single person. When he gets to you, he rests one big blue hand on your shoulder, just for a second, and then moves on.

It feels better than any treasure you were hoping to find.

You’re handing out blankets when someone tugs on your sleeve. It’s the little kid with the big gray ears.

“Are you new?” she asks. “You look new.”

“Pretty new.”

“We’re from Trellis. It’s gone now.” She says it the way you’d say it’s raining. “Did yours get eaten too?”

You stand very still.

“Did my what get eaten?”

“Your planet.”

Across the bay, the Captain has turned around. So has Trace. They heard.

Another planet, huh? That’s exactly what Percy said, back on the bridge.

### Choices

#### Choice 1

Go straight to the Captain

```json
{
  "next_scene": "scene_024"
}
```

#### Choice 2

Ask Trace. He will not soften it.

```json
{
  "next_scene": "scene_025"
}
```

---

## scene_024 — The Captain Tells It

### Passage

The Captain takes you to a small room with a big window, and he waits until you sit down.

“I was cut off before. I will not be cut off now.” He folds his long hands together. “There is something out there, {hero_name}. It is as large as a world, and it is hungry. It drifts between the stars, and when it finds a living planet, it feeds. It does not hate. It does not plan. It only eats. We call it the World-Eater.”

Your mouth has gone totally dry. “And Solaris?”

“Your portal closed behind you. You said that should not have happened, and you are right. A portal has two ends. It closes when one end is no longer there.”

He doesn’t look away from you. You’ll remember that later.

“Solaris is gone. I am so very sorry.”

You look out the window. Stars. Just stars, in every direction.

“But hear the rest,” he says, “because it matters. When the World-Eater comes, a world’s portals do not simply close. They burst open first. All of them, all at once, everywhere. People fall through. They are scattered across the stars, alone and lost…and alive.”

He leans forward.

“You were not the only one who came through a portal today. You were only the first one we found. That is what this ship is for.”

### Choices

#### Choice 1

Let it sink in

```json
{
  "next_scene": "scene_026",
  "entry_intro": "from_captain"
}
```

---

## scene_025 — Trace Tells It

### Passage

You find Trace by the cargo bay door, standing perfectly still.

“Trace. What happened to Solaris? I want the real answer.”

“I have only real answers,” he says. “There is an entity. It is approximately the size of a planet, and it consumes planets. We call it the World-Eater. Solaris stopped transmitting four hours and twelve minutes ago. Your portal closed because its other end no longer exists.”

You thought you wanted it straight. Turns out straight is really, really hard to hold.

You sit down on a crate. Trace doesn’t pat your shoulder or tell you it’ll be ok. He does something else. He sits down on the crate next to you, which you’ve never seen him do, and he stays.

“There is more data, and it is relevant,” he says after a while. “When the World-Eater approaches, every portal on a world opens at once. People fall through. We have recovered survivors from eleven lost worlds this way. I keep the list. It has four thousand, two hundred and six names.”

He turns his head toward you, and his round eyes whir softly.

“Today I added forty. I also added yours. I do not feel sorrow, {hero_name}. But ‘I am sorry’ is what is said, and I have considered it, and I choose to say it. I am sorry.”

You wipe your eyes with the back of your hand.

Somehow, it helps.

### Choices

#### Choice 1

Let it sink in

```json
{
  "next_scene": "scene_026",
  "entry_intro": "from_trace"
}
```

---

## scene_026 — The Truth

### Entry intro: from_captain

The Captain stays in his chair and doesn’t say anything else. He lets you have the quiet.

### Entry intro: from_trace

Trace stays right where he is, beside you, and doesn’t say anything else.

### Passage

You think about home.

Your room, with the maps all over the walls. The market on Fifth-day. The portal yard, where you used to press your face against the fence and watch the real delvers come and go, and promise yourself that one day it would be you.

Your family.

They were all near portals. The whole town was built around the portal yard. If every portal burst open at once…

They could be anywhere.

They could be ANYWHERE. It’s the worst thought you’ve ever had, and somehow it’s also the best one. Anywhere is a place, and anywhere can be found.

You jumped through that portal because you wanted to find something amazing out here.

Now you know exactly what you’re looking for.

### Choices

#### Choice 1

Take a minute alone

```json
{
  "next_scene": "scene_027"
}
```

#### Choice 2

Ask what the World-Eater actually is

```json
{
  "next_scene": "scene_028"
}
```

---

## scene_027 — The Observation Deck

### Passage

You find a quiet room at the very top of the ship where the whole ceiling is a window.

You lie down on your back on the floor and look at more stars than you knew existed.

After a while the door slides open, and someone lies down on the floor next to you. Yellow hair spreads out across the deck.

“Loop,” Percy says. “That was mine. Two suns, pink oceans, and the best fried dough in the galaxy. I was nine. I fell through a portal in my kitchen and landed in a cargo hold full of extremely surprised chickens.”

You laugh. You didn’t expect to, and it comes out all wobbly.

“The Captain found me three days later. I’ve been on this ship ever since.” One of their antennae-eyes turns to look at you while the other one keeps watching the stars. “I’m not gonna tell you it stops hurting. But I’ll tell you what I figured out. You can sit still and be sad, or you can be sad and go get people. The second one’s better. You’re sad either way, but there’s fried dough sometimes.”

You lie there a while longer.

“Did you ever find anybody? From Loop?”

“Sixty-two so far,” Percy says, and they grin up at the stars. “My cousin Zenta was number thirty. I’m still looking. That’s the whole point.”

### Choices

#### Choice 1

Go find the Captain

```json
{
  "next_scene": "scene_029",
  "entry_intro": "from_deck"
}
```

---

## scene_028 — What It Is

### Passage

“Show me,” you say. “I want to know what it is.”

Trace brings up an image on the wall. At first you think it’s a picture of nothing, just a patch of space with no stars in it.

Then you realize the patch has a shape. And the shape has an edge. And the little bright dot next to it, for scale…is a planet.

“We know very little,” Trace says. “It does not answer signals. It does not seem to notice ships, the way you would not notice a gnat. It is not a machine. It may be alive. It is drawn to portal energy, the way some animals are drawn to the smell of food. Worlds with many portals are found first.”

Worlds like Solaris, where there’s a whole job called delver.

“Has anybody ever stopped it?”

“No.”

“Has anybody ever hurt it?”

“No.”

“Has anybody ever TRIED?”

Trace is quiet for a moment, which for him is a really long time.

“That is a better question. Not successfully. Most who see it are busy running, and they are correct to run.”

You look at the hole in the stars for a long time. You’re not as scared of it as you thought you’d be.

Mostly, you’re mad.

### Choices

#### Choice 1

Go find the Captain

```json
{
  "next_scene": "scene_029",
  "entry_intro": "from_records"
}
```

---

## scene_029 — Permission to Come Aboard

### Entry intro: from_deck

You walk back to the bridge with your shoulders a little straighter than when you left it.

### Entry intro: from_records

You walk back to the bridge with your jaw set.

### Passage

Captain Aster is standing at the big window with his hands behind his back.

“Captain. I want to join your crew.”

He turns around. “{hero_name}. You have had the worst day of your life. It is not the day to make—”

“I can’t go home. There’s no home to go to. My family could be anywhere out here, and you’re the ones who go looking. And I’m good at this, sir. I was good at it today.” You take a breath. “I jumped through that portal without thinking. I know that. I’m thinking now. I want to help.”

The bridge is very quiet.

“The passengers of the Genesis were calmer with them in the room,” Trace says. “I do not know why. It is in my report.”

“And I like them,” says Percy. “That’s not a technical reason. I just do.”

The Captain’s ears twitch. Then they twitch again. Then he walks over to a locker on the back wall, takes something out, and holds it out to you.

It’s a gray jumpsuit, with a zipper down the middle and patches everywhere. Just like theirs.

“Welcome to the Rescue Corps, Crewmate {hero_name}.”

You put it on right there, over your clothes. Did I mention it’s about three sizes too big? It’s about three sizes too big. You have to roll the sleeves up four times.

You have never been prouder of anything in your whole life.

“You have a great deal to learn,” the Captain says, “and not much time to learn it.”

### Choices

#### Choice 1

Start your first day

```json
{
  "next_scene": "scene_030"
}
```

---

## scene_030 — First Day

### Passage

Your first day as a member of the crew starts with getting lost.

You were given directions to your bunk. You’re pretty sure you followed them. You are standing in a closet full of mops.

“You are in a closet,” says Trace’s voice, from a little speaker in the ceiling.

“I know that.”

“Turn around. Left, then left again, then up the ladder. Training begins in the shuttle bay in three hours. Until then, the Captain says that the ship is yours to explore. He also says to please stop drawing on the walls.”

You look at the little arrow you just drew next to the closet door, with MOPS written under it.

“It’s a map,” you say. “It’s a very small map.”

“I will tell him that it is a very small map.”

Three hours, and a whole starship. You tuck your pencil behind your ear.

### Choices

#### Choice 1

Follow the smell of cooking to the galley

```json
{
  "next_scene": "scene_031"
}
```

#### Choice 2

Go back to the engine room and look at it properly

```json
{
  "next_scene": "scene_032"
}
```

#### Choice 3

Find your bunk and unpack your satchel

```json
{
  "next_scene": "scene_033"
}
```

---

## scene_031 — The Galley

### Passage

The galley is a small, warm room with one table, and Percy is in the middle of it, cooking. One antenna-eye is watching a pot of noodles. The other one is watching a second pot of noodles.

“There’s a food printer,” they say, pointing their spoon at a box on the wall. “It makes two things. One is noodles. The other one is beige.”

“Beige what?”

“Just beige. Trace says it has everything a body needs. I say it tastes like a wet blanket. So I cook.”

They hand you a knife and a pile of something purple and knobbly, and you chop. It’s a little bit like home. You’re the one who does the chopping there, too.

You stop chopping for a second. Percy doesn’t say anything. They just bump you with their hip and hand you another purple thing.

“House rules,” they say. “The cook doesn’t wash up. Whoever’s newest does the dishes. I have been the newest person on this ship for eleven YEARS.” They point their spoon at you and grin so big their nose scrunches up. “I have been waiting for you for a very, very long time.”

You eat noodles. You wash a truly amazing number of dishes. It’s the most normal you’ve felt since you jumped through the portal.

### Choices

#### Choice 1

Go and look at the engine room

```json
{
  "next_scene": "scene_032"
}
```

#### Choice 2

Go and find your bunk

```json
{
  "next_scene": "scene_033"
}
```

#### Choice 3

Head down to the shuttle bay for training

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_032 — The Engine Room

### Passage

You find the engine room on the second try. There’s a lot less getting lost when you’re not also panicking.

In the middle of the room is a tall glass column full of slow blue light. It pulses. Bright, dim. Bright, dim. You can feel it through the floor.

“The power core,” says Trace. He’s standing next to it with his hands behind his back, exactly the way the Captain stands. “It is sometimes called the heart of the ship. That is not accurate. But I understand why it is said.”

The little maintenance robot comes shuffling past with its oil can, and this time you actually get a good look at it. It’s small and blocky, with square eyes, a painted-on smile, and a lightning bolt on its chest. There’s a tiny solar panel on top of its head, and it’s tilted toward the power core, like a flower leaning toward the sun.

You say hello. It walks around you.

“Trace? Do you sleep?”

“No. For four hours each night, I have no duties. I spend them in here.”

“Why in here? It’s the loudest room on the ship.”

“Yes.” He watches the blue light rise and fall. “I find that I prefer it. It is never silent in here. I was kept in a very silent room, before the Captain found me.” He tilts his head. “I do not know why I prefer things. I have no feelings about it. I have only observed that every night, this is where I stand.”

You sit down on the floor beside him with your notebook, and for a while the two of you just watch the light. You draw it. Bright, dim. Bright, dim.

He’s right. It’s nice in here.

### Choices

#### Choice 1

Go and find your bunk

```json
{
  "next_scene": "scene_033"
}
```

#### Choice 2

Head down to the shuttle bay for training

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_033 — Your Bunk

### Passage

Your bunk is a bed set into the wall, with a curtain, a shelf, and a small round window full of stars. It’s about the size of a cupboard, and you love it immediately.

You unpack your satchel onto the blanket, one thing at a time.

A compass, which doesn’t know which way north is anymore, because out here there IS no north. A folding shovel. Forty feet of rope. A canteen. A tube of sunscreen, the extra strong kind. A hat with a flap in the back to keep the desert sun off your neck.

And your notes. Two whole notebooks full of them, all about the ruins that were supposed to be on the other side of that portal. There are maps you copied out of library books, and lists, and a drawing of yourself holding up some treasure, which you’d like it noted that you did when you were much younger. It was last month.

There’s a knock on the wall. It’s the Captain, with a spare blanket under his arm. He looks at everything laid out on the bed, and he picks up the sunscreen.

“You were very well prepared,” he says, “for somewhere else entirely.”

“Yes, sir.”

“Keep all of it.” He sets the sunscreen back down, very carefully, next to the hat. “In my experience, the universe is large enough that everything comes in useful in the end. Even the rope.”

You pin your best map of the ruins to the wall beside your pillow. Next to it, you pin a fresh, blank page.

### Choices

#### Choice 1

Head down to the shuttle bay for training

```json
{
  "next_scene": "scene_034"
}
```

---

## scene_034 — The Shuttle Bay

### Passage

You get to the shuttle bay with four whole minutes to spare, and you find your two teachers right in the middle of an argument.

“Flying first,” Percy is saying. “Obviously. What use is a crewmate who can’t fly the shuttle?”

“Systems first,” says Trace. “What use is a crewmate who can fly the shuttle, and does not know what any of the lights mean?”

“You learn what the lights mean when they turn red!”

“That is precisely the approach I am hoping to avoid.”

Behind them, the cargo bot rolls past on its treads with a crate of spare parts on its forklift claws. “CARGO SECURED,” it announces, to nobody in particular.

Percy and Trace both notice you standing there, and they both point at you at the exact same time.

“You choose,” says Percy.

“Choose correctly,” says Trace.

Over by the wall, the little shuttle sits waiting with its hatch open. Next to it is a big gray box with a seat inside, which you’re guessing is the simulator. On the other side of the bay, a hatch in the floor leads down to the engine room.

You’ll need to learn all of it sooner or later. But there’s only time to get really good at one thing before the next call comes.

### Choices

#### Choice 1

Learn to fly with Percy

```json
{
  "next_scene": "scene_035"
}
```

#### Choice 2

Learn the ship’s systems with Trace

```json
{
  "next_scene": "scene_036"
}
```

---

## scene_035 — Flight Lessons

### Passage

Percy puts you in the pilot’s seat of the shuttle simulator and straps you in.

“Ok. Left stick goes up and down. Right stick goes side to side. That pedal is go. That pedal is stop. Don’t touch the red one.”

“What does the red one do?”

“Nobody knows. Nobody’s ever touched it. GO!”

You crash into an asteroid in four seconds.

You crash into a moon in nine seconds.

You crash into the {world_name} itself, which Percy says is a new record, because the ship is BEHIND you when you start.

But you keep your notebook open on your knee, and after every crash you write down what happened. By the end of the week, you can fly a wobbly loop around a space station. By the end of the second week, the loop isn’t wobbly anymore.

“You fly like you’re reading a map,” Percy tells you. “Like you’ve already worked out where everything’s gonna be.”

“Is that bad?”

“It’s weird. I fly like I’m dancing.” They ruffle your hair. “It’s good to have one of each.”

You still get lost on the way to the bathroom most mornings. But you’re learning.

### Choices

#### Choice 1

Answer the call

```json
{
  "next_scene": "scene_037",
  "entry_intro": "flight"
}
```

---

## scene_036 — Systems Lessons

### Passage

Trace teaches the way he does everything else: completely.

You learn the scanners, which can spot a heartbeat through a mile of rock. You learn the comms, the airlocks, and the shields. You learn where the ship’s power goes and how to send it somewhere else. You fill up a notebook and a half.

Trace never says “good job.” He says “correct.” You start to live for “correct.”

Most of your lessons are in the engine room, where the little maintenance robot shuffles back and forth, oiling things, with its solar panel tipped toward the core. You say good morning to it every day. It walks around you every day.

“It cannot hear you,” Trace says on the ninth day.

“I know. But you said you’re the first synthoid who can really talk with people. So you’re the first. That means there were a whole lot of ones before you that couldn’t.” You shrug. “It seems rude not to say hi to your family.”

Trace stops right in the middle of what he’s doing.

He looks at the little robot as it shuffles past. He looks at it for a long time.

“Good morning,” he says to it.

It walks around him.

“As expected,” Trace says, and he goes back to work.

But he says it again the next day. And the day after that.

### Choices

#### Choice 1

Answer the call

```json
{
  "next_scene": "scene_037",
  "entry_intro": "systems"
}
```

---

## scene_037 — Frost station

### Entry intro: flight

You’re in the middle of your best loop yet when the simulator screen goes red.

### Entry intro: systems

You’re re-routing power to the forward shields, just for practice, when the engine room lights go red.

### Passage

WHOOP. WHOOP. WHOOP.

You run for the bridge. You only make one wrong turn!

“Frost station,” Percy reads out. “It’s a research base on an ice moon. Eight scientists. The ice under the base is breaking up, and their own ship is already at the bottom of a crevasse.”

“Why is the ice breaking?” the Captain asks.

Trace puts a map up on the screen. There’s the moon. And there, a long way off but closer than you’d like, is a patch of sky with no stars in it.

“The World-Eater is passing through this system,” Trace says. “It will not come near the moon, but it is large enough that its pull is felt from here. The moon is flexing, and the ice is cracking.”

It’s the first time you’ve seen it on a live screen. It doesn’t look like anything. That’s the worst part.

“Eight people,” says the Captain. “Percy, get us into orbit. Trace, take the shuttle down. Crewmate {hero_name}?”

You look down at your jumpsuit, with the sleeves rolled four times.

“Ready, Captain.”

### Choices

#### Choice 1

Go down to the ice with Trace

```json
{
  "next_scene": "scene_038"
}
```

#### Choice 2

Guide the rescue from orbit with Percy

```json
{
  "next_scene": "scene_042"
}
```

---

## scene_038 — On the Ice

### Passage

The shuttle sets down on a flat, white plain under a black sky. The cold gets in through your suit anyway. Every few seconds the ground groans under your boots, like something really big turning over in its sleep.

The base is two hundred steps away. Between you and it, a crack has opened up in the ice. It’s as wide as a street, and you can’t see the bottom.

Eight people in orange suits are standing on the far side, waving.

“The crevasse is widening,” Trace says. “I can jump it. They cannot. I can carry one at a time, which will take too long. I cannot land the shuttle on that side, because the ice there will not hold it.”

You look at the crack. You look at the eight scientists.

Then, very slowly, you look down at your satchel.

You’ve been carrying forty feet of rope since the second you left home. Percy teases you about it constantly. You’ve carried it onto a spaceship, through a debris field, and into orbit around an ice moon, because a good delver is always prepared.

“Trace,” you say. “How far can you throw?”

### Choices

#### Choice 1

Rig a rope line across the crevasse

```json
{
  "next_scene": "scene_039",
  "entry_intro": "rope"
}
```

#### Choice 2

Hook your rope to the shuttle’s tow cable to make it longer

```json
{
  "next_scene": "scene_039",
  "entry_intro": "tow_cable"
}
```

---

## scene_039 — Trace Across

### Entry intro: rope

Trace throws the rope across on the first try. The scientists anchor their end to a steel post, and you hammer your end into the ice with the back of the folding shovel.

### Entry intro: tow_cable

Your rope on its own is a little short. But knotted to the end of the shuttle’s tow cable, it reaches with room to spare. Trace throws it across on the first try, and the scientists anchor their end to a steel post.

### Passage

They come across one at a time, clipped to the line, hand over hand, with nothing underneath them but blue shadows. Every time the ice groans, everybody stops breathing.

One. Two. Three. You grab each of them as they reach the edge and haul them up. Four. Five. Six. Seven.

The eighth is an older woman. She clips on. She gets one hand onto the rope. Then she looks back over her shoulder at the base, and says a word your translator doesn’t translate.

She unclips herself and runs back toward the buildings!

“DR. WREN!” the other scientists all shout. “LEAVE IT!”

“Two years!” she shouts back, without slowing down. “I am NOT leaving it!”

A crack opens up on the far side with a sound like a gunshot. It runs right between the base and the rope.

“She has approximately four minutes,” Trace says.

### Choices

#### Choice 1

Go across the rope yourself and get her

```json
{
  "next_scene": "scene_040"
}
```

#### Choice 2

Send Trace across, and hold the line for him

```json
{
  "next_scene": "scene_041"
}
```

---

## scene_040 — Hand Over Hand

### Passage

You clip on before you can think about it.

“{hero_name},” Trace says.

“You’re heavier than I am, and that ice over there is cracking. I’ll be quick!”

You go out over the edge. It turns out not thinking about it only works for about the first three feet.

After that, it’s just you and the rope. One hand, then the other. You don’t look down. You look at your hands, and you think that a real delver has probably done this a hundred times, and then you think that a real delver would’ve had some training.

You get across. You run. You find her in a lab, shoving little glowing crystals into a silver case with both hands.

“Two years!” she says when she sees you. “We know more about that thing than anybody alive, and it’s all right here, and if you try to stop me, I will BITE you!”

“I’m not stopping you! I’m HELPING! Which ones?”

She blinks at you. Then she points, and the two of you scoop crystals together until the case won’t close, and then you sit on it until it does.

You run back with the case swinging between you. The floor is tilting. She clips on, and you clip on behind her, with the case hanging off your belt and banging against your knees.

You’re halfway across when the far edge of the crevasse falls away behind you. The rope goes slack, then snaps tight, and you swing in hard against the near wall. Eight pairs of hands pull you up over the top.

### Choices

#### Choice 1

Get everybody into the shuttle

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_041 — Hold the Line

### Passage

“Go,” you tell Trace. “You’re faster. I’ll hold the line for you.”

Trace doesn’t bother with the rope. He takes three steps back, runs, and jumps the whole crevasse! He lands on the far side in a spray of snow, and then he’s gone between the buildings.

That’s when your end of the rope starts to move.

The spike you hammered into the ice is sliding. The ice all around it is cracking like a dinner plate. If it pulls out, there’s no way back across, for anybody.

You grab the rope, wrap it twice around your waist, and sit down in the snow with your boots braced against a ridge of ice, and you lean back as hard as you can. It drags you forward anyway, an inch at a time.

Then somebody sits down behind you and wraps their arms around your middle. Then somebody else, behind them. It’s all seven of the scientists, one behind another in a row, like the world’s coldest game of tug-of-war.

The rope stops moving.

“Is this what your job is normally like?” the one behind you asks, through chattering teeth.

“I don’t know,” you say. “It’s my third week.”

Trace comes out of the base at a run. He’s carrying Dr. Wren over his shoulder. Dr. Wren is carrying a silver case and yelling at him to be careful with it. He doesn’t slow down for the crevasse. He just jumps.

He lands beside you right as the far edge crumbles away into the dark.

### Choices

#### Choice 1

Get everybody into the shuttle

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_042 — Eyes in the Sky

### Passage

You take the scanner station, the way Trace taught you. Percy holds the {world_name} right above the base, and the Captain himself takes the shuttle down with Trace.

On your screen, the moon’s surface is a sheet of cold blue. The cracks show up as thin black lines, and they’re growing. Eight little orange dots are clustered at the base. Those are heartbeats.

“Captain, the big crack is between you and them. Go around to the north. The ice is thickest there. I’m sending you a path.”

“Received. Well done.”

The dots start climbing into the shuttle, and you count them, then count again, because you always count twice.

Only seven. There should be eight.

Your stomach drops. You sweep the scanner outward, slowly, the way you were taught, and there it is. One orange dot, all by itself, half a mile out on the ice and not moving. The cracks are creeping toward it from two sides.

“Captain! One of them isn’t with the others. Half a mile east. You won’t see them from the ground. There’s a ridge in the way.”

“Can you talk me in?”

You pull your notebook closer and start drawing the cracks as fast as they grow. There are two ways to get there. One is straight across the flat. It’s quick, but the ice is thin there, and getting thinner. The other goes the long way around, along the ridge, where the ice is as solid as rock. It’s safe…and it’s four minutes slower.

The orange dot is flickering.

### Choices

#### Choice 1

Send them straight across the thin ice

```json
{
  "next_scene": "scene_043"
}
```

#### Choice 2

Send them the long way, along the ridge

```json
{
  "next_scene": "scene_044"
}
```

---

## scene_043 — Thin Ice

### Passage

“Straight across, Captain. It’s thin. You’ll have to keep moving. Don’t stop for anything until I tell you.”

“Understood.”

The shuttle skims out over the flat so low it kicks up a tail of snow. On your screen, new black lines open up underneath it and chase it across the ice like something alive.

“Left. More left. There’s a good patch coming up. It’s about as big as a front yard. That’s all there is. Now, now, NOW, set down!”

“Down,” says the Captain.

“You’ve got maybe thirty seconds before that patch goes.”

Through the shuttle’s camera you watch Trace jump out before the skids have even settled. The lost scientist is an older woman, sitting on a silver case, too cold to stand up. He scoops her up, case and all.

“Twenty seconds. Fifteen. Captain, GO!”

The shuttle lifts. A heartbeat later, the patch of ice it was sitting on tips up on its end like a sinking ship and slides down into the dark.

Nobody says anything on the comm for a moment.

“That was closer than I prefer,” the Captain says at last. His voice is perfectly calm. You notice Percy has both hands over their mouth.

“Yes, sir. Sorry, sir.”

“Do not be sorry. You were right about the thirty seconds. Eight aboard. We are coming home.”

### Choices

#### Choice 1

Meet them in the shuttle bay

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_044 — The Long Way

### Passage

“Take the ridge, Captain. It’s slower, but it’ll hold you. I’ll find you the quickest line along it.”

“Understood.”

Four minutes. The orange dot is flickering, and its heartbeat is slowing down, the way a heartbeat does when somebody’s getting too cold and too sleepy.

You can’t make the shuttle go any faster. But there’s one other thing you can do.

You find the channel for the scientist’s suit radio, and you open it.

“Hello? Can you hear me? My name’s {hero_name}. Who’s this?”

For a long moment there’s nothing but hissing. Then an older woman’s voice says, very slowly, “Wren. Dr. Wren. I’m…sitting down. Just for a minute.”

“Ok. But you can’t go to sleep. What are you doing all the way out there?”

“My instruments. Went back for them. Two years of readings.”

“Readings of what? Tell me about them. I really want to know. I write everything down too.”

So she tells you. It’s slow and mumbly at first, and then it gets quicker, because it turns out Dr. Wren can’t help herself once she gets going. She’s right in the middle of a sentence about portal energy when the shuttle’s lights sweep over her, and Trace lifts her up, silver case and all.

“Eight aboard,” the Captain says. “We are coming home. And {hero_name}? She is asking me to tell you that she had not finished.”

### Choices

#### Choice 1

Meet them in the shuttle bay

```json
{
  "next_scene": "scene_045"
}
```

---

## scene_045 — Off the Ice

### Passage

Eight scientists. Eight out of eight!

Back on board, wrapped up in three blankets, the older woman won’t let go of her silver case. She insists on speaking to the whole crew before she’s even stopped shivering.

“I’m Dr. Wren. And I wasn’t out there for fun,” she says. “We’ve been watching that thing from Frost station for two years. We know more about the World-Eater than anybody alive, and all of it is right in here.”

She opens the case. It’s full of glowing data crystals.

“First. It follows portal energy, the way a hound follows a scent. Second. When it feeds, it opens. There’s a kind of mouth, and the inside isn’t armored like the outside is.”

She looks around the bridge at all of you.

“And third. I’ve charted its path. I know where it’s going next, Captain. It’s going to Harbor.”

Percy’s antennae droop. Even Trace goes still.

“What’s Harbor?” you ask.

### Choices

#### Choice 1

Hear the answer

```json
{
  "next_scene": "scene_046"
}
```

---

## scene_046 — Harbor

### Passage

“Harbor is where we take them,” the Captain says.

It’s late, and the five of you are squeezed into the galley around a table that’s way too small, eating something Percy cooked that’s mostly noodles. Dr. Wren has two bowls.

“Everyone we rescue. The Genesis’s passengers. The people of Trellis, and Loop, and eleven other worlds. Harbor is a quiet planet with no portals at all. We chose it for that. It was supposed to be the one place the World-Eater would never look.”

“Four thousand, two hundred and fourteen people,” Trace says.

“It isn’t looking for Harbor,” says Dr. Wren, with her mouth full. “It’s just on the way to somewhere else, and Harbor’s in the road. Nineteen days.”

Nobody says anything for a while. Percy pushes noodles around their bowl.

You look around the table. A tall blue captain with enormous ears. A pilot with eyes on stalks. A person made of metal with a smile built into his face. A scientist who went back out onto breaking ice for a box of crystals. And you, in a jumpsuit three sizes too big.

Three weeks ago you didn’t know any of them.

It hits you that if your family walked in right now, you’d want them to meet these people first.

### Choices

#### Choice 1

Finish your noodles

```json
{
  "next_scene": "scene_047"
}
```

---

## scene_047 — The Stasis

### Passage

You’re still sitting there when Trace lifts his head.

“Captain. I am receiving a signal. It is not a distress call.” He pauses. “It is a song.”

He puts it on the speaker. It’s a slow, creaky voice singing something that sounds like a lullaby. When it gets to the end, it starts right back over from the beginning.

“It is coming from a ship called the Stasis,” Trace says. “She is in the records. She is an archive ship, from a world named Atlantean.”

“Atlantean was lost sixty years ago,” says the Captain.

“Yes. There is one life sign on board. And the ship is drifting toward the edge of the World-Eater’s wake.”

It takes half a day to reach her. The Stasis is enormous and very old, and she doesn’t have a single window. Her engines went cold a long, long time ago. She’s turning slowly in the dark with every one of her running lights still burning, and that little song going round and round.

“She’s beautiful,” Percy says softly.

“She is also breaking up,” says Trace. “The wake is pulling her apart at the seams. I estimate one hour.”

You and Trace take the shuttle across. There are two ways in. One is the main hatch, up near the front. The other is a cargo door at the back, which has already been torn half open.

### Choices

#### Choice 1

Dock at the main hatch

```json
{
  "next_scene": "scene_048"
}
```

#### Choice 2

Go in through the broken cargo door

```json
{
  "next_scene": "scene_049"
}
```

---

## scene_048 — The Hall of Voices

### Passage

The main hatch opens onto a hallway so long you can’t see the other end.

Both walls are shelves, from the floor all the way up to a ceiling lost in the shadows, and every shelf is filled with crystals. They’re about the size of your thumb, and each one glows a slightly different color. There must be millions of them.

You walk past the first shelf, and somebody whispers in your ear.

You nearly jump out of your boots! But there’s nobody there. You lean in toward the crystals and hear it again. It’s a voice, very faint, telling a story. The next crystal over has a different voice, and that one’s singing. The one after that is laughing and trying to get to the end of a joke.

“They are recordings,” says Trace. “These are stories. These are songs. This whole shelf is recipes. Every crystal holds one person from Atlantean, telling one thing that they did not want to be forgotten.”

You walk down the hall with a whole world whispering around you. You realize you’re walking on tiptoe.

At the far end is a round door. The creaky voice is coming from the other side of it, still singing.

### Choices

#### Choice 1

Open the door

```json
{
  "next_scene": "scene_050",
  "entry_intro": "from_hall"
}
```

---

## scene_049 — The Seed Vault

### Passage

You squeeze in through the broken cargo door and into the cold.

You’re in a hold the size of a sports field, filled with row after row of tall metal cabinets, and each cabinet is made up of hundreds of little drawers. Everything is furry with frost, and your breath comes out in clouds.

Every drawer has a label in tiny, careful handwriting. You wipe the frost off one, and your translator reads it out for you. “Moonmelon. Sweet. Grows best on a south wall.”

You slide the drawer open. It’s full of seeds.

“Every plant that grew on Atlantean,” says Trace. He’s walking along the row, reading as he goes. “Every tree. Every grain. Every flower. There are over nine hundred thousand kinds.”

It’s a whole planet’s worth of gardens, in a freezer, waiting for somebody to find them some dirt.

Somewhere above you, the ship lets out a long groan, and a little shower of frost sifts down on your head.

At the far end of the hold is a round door. The creaky voice is coming from the other side of it, still singing.

### Choices

#### Choice 1

Open the door

```json
{
  "next_scene": "scene_050",
  "entry_intro": "from_cargo"
}
```

---

## scene_050 — Keeper Cobble

### Entry intro: from_hall

The door opens onto a hold the size of a sports field, filled with frosty metal cabinets. Trace wipes off a label and reads it. They’re seeds, a drawer for every plant that ever grew on Atlantean.

### Entry intro: from_cargo

The door opens onto a hallway so long you can’t see the end of it. Both walls are shelves, and every shelf is filled with little glowing crystals that whisper as you go by. They’re recordings, Trace says, each one a person from Atlantean telling a story they didn’t want forgotten.

### Passage

In between the seeds and the stories, in a small round room with one lamp, somebody is sitting in an armchair.

They’re very large, and very old, and very wrinkly, with a great domed shell on their back and a blanket over their knees. They’ve got a crystal in one hand, and they’re singing along with it…to an open drawer of seeds.

They finish the verse before they look up. They don’t seem surprised to see you at all.

“Ah,” they say. It takes a long time. “Visitors. I am…Keeper Cobble. Do forgive me for not…getting up. I have been reading…to the seeds. They grow better…if they have heard…the stories. I am nearly sure of it.”

“For sixty years?” you say. “All by yourself?”

“Is it…sixty? Goodness.”

“Keeper Cobble,” says Trace, “this ship will break apart in forty-one minutes. You must come with us.”

“Oh, yes. I know. I felt her…going.” The Keeper nods slowly. “I will come. When the archive…is loaded.”

“Which part of it?” you ask.

Keeper Cobble blinks at you, like the question doesn’t make any sense.

“All of it, dear.”

You look at Trace. The shuttle has two seats and two benches.

“The shuttle will hold one tenth of one percent of this archive,” he says. “If we are careful. If we are quick.”

### Choices

#### Choice 1

Fill the shuttle with seeds

```json
{
  "next_scene": "scene_051",
  "entry_intro": "seeds"
}
```

#### Choice 2

Fill the shuttle with stories

```json
{
  "next_scene": "scene_051",
  "entry_intro": "stories"
}
```

#### Choice 3

Ask Keeper Cobble to choose

```json
{
  "next_scene": "scene_051",
  "entry_intro": "cobble"
}
```

---

## scene_051 — One Tenth of One Percent

### Entry intro: seeds

“The seeds,” you say. “Stories can be told again by somebody. Once a plant is gone, it’s gone.”

Keeper Cobble shuts their eyes, and then they nod. You and Trace run up and down the frozen rows pulling out drawers while the Keeper calls out after you which ones matter the most. They ALL matter the most.

### Entry intro: stories

“The stories,” you say. “A seed is a seed. But those are people.”

Keeper Cobble shuts their eyes, and then they nod. You and Trace run up and down the whispering hall, sweeping crystals into crates by the armful. Every one of them is somebody’s voice, and you’re leaving a thousand behind for every one you take.

### Entry intro: cobble

“You choose,” you say. “It’s your archive. I don’t have the right.”

Keeper Cobble looks at you for a long moment. “No,” they say. “No one does. That is the…trouble with it.” In the end, they walk slowly along the shelves and the cabinets, touching one thing here and one thing there, and you and Trace pack up whatever they touch. It’s a little of both…and not nearly enough of either.

### Passage

It takes thirty minutes. When you’re done, the shuttle is packed right up to the roof, and Keeper Cobble is wedged into the back on top of it all with their knees up around their ears.

You stand in the hatchway and look back down the hall.

It doesn’t look like you took anything at all. The shelves go on, and on, and on, glowing and whispering.

“Ten minutes,” says Trace. “We should leave now. That would be the safe margin.”

“The shuttle’s fast. I could run one more crate out here. ONE more! There’s room on my lap!”

“Nine minutes and fifty seconds.”

You look at all those lights.

### Choices

#### Choice 1

One more trip

```json
{
  "next_scene": "scene_052"
}
```

#### Choice 2

Leave now

```json
{
  "next_scene": "scene_053"
}
```

---

## scene_052 — One More

### Passage

“ONE more!”

You grab an empty crate and you run.

You fill it. You’re fast and you’re careful, and you’re on your way back with the crate hugged against your chest when the floor of the Stasis splits open right between your feet.

The air goes screaming past you into space. The crate gets torn out of your arms, and you watch it tumble off end over end into the dark, with everything inside spilling out of it like a handful of glitter.

You’re going to follow it out. Your boots come up off the floor.

A metal hand closes around the back of your jumpsuit.

Trace drags you down the hall against the wind, throws you in through the hatch, and slams it shut. He flies the shuttle out through a gap that’s closing as you go through it, and there’s a horrible CRUNCH along one side. In the back, a whole stack of what you saved breaks loose and smashes against the wall.

Nobody says anything, the whole way home.

The Captain is waiting for you in the shuttle bay. He looks at the long scrape down the side of the shuttle. He looks at the broken things on the floor. He looks at you.

You’d really like it if he would just yell.

“Are you hurt?” is all he says.

“No, sir.”

“Good.” He puts his hand on your shoulder, and he leaves it there. “Then come with me. I want you to see what you did save.”

### Choices

#### Choice 1

Go with him

```json
{
  "next_scene": "scene_054",
  "entry_intro": "greedy"
}
```

---

## scene_053 — Leave Now

### Passage

You stand there for one more second.

Then you step backward into the shuttle and pull the hatch closed yourself.

“That was the correct decision,” says Trace.

“Then why does it feel so rotten?”

“I do not know. I am told that they often do.”

He flies you out slowly and carefully, with room to spare. Behind you, Keeper Cobble has turned all the way around in their seat so they can see out the little back window.

You turn around and watch it with them. Somebody should.

The Stasis goes quietly. Her seams open up, one by one. Her running lights go out in rows. And then, just for a moment, a great cloud of tiny colored sparks comes spilling out of her side, millions of them, spreading out across the dark like a second set of stars. Then the wake takes them, and they’re gone.

“Sixty years,” Keeper Cobble says, very quietly. “I read to them…every day.”

You don’t know what to say. There isn’t anything to say. So you reach back between the crates, find one big, wrinkly hand, and hold on to it the whole way home.

### Choices

#### Choice 1

Go home

```json
{
  "next_scene": "scene_054",
  "entry_intro": "left"
}
```

---

## scene_054 — What Was Saved

### Entry intro: greedy

The Captain walks you down to the cargo bay.

### Entry intro: left

That evening, the Captain finds you in the cargo bay.

### Passage

What you saved from the Stasis fits into one corner of it. The cargo bot is setting down the last crate, so gently that for once it doesn’t announce anything. Keeper Cobble is sitting in the middle of it all, in an armchair Percy found for them somewhere, going slowly through every piece, one at a time.

“We failed,” you say.

“Did we?” says the Captain.

“There were millions, sir. We saved a few crates. A whole world’s worth of remembering, and it’s gone, and I was standing RIGHT there.”

The Captain doesn’t answer for a while.

“When I started doing this, I kept a count of everyone that I did not reach in time,” he says. “It very nearly finished me. You cannot carry that number, {hero_name}. No one can. It only ever gets larger.”

He nods toward the corner.

“So I learned to count the other way. Yesterday, there was nothing left of Atlantean anywhere at all. Today there is one Keeper, and there are those crates. That is not everything. But it is a very long way from nothing.”

Over in the armchair, Keeper Cobble has picked something up and is holding it up to the light.

“Ah,” they say. “This one. I am so glad…that it was this one.”

And they begin, very slowly, to tell the story to the rest.

You stay and listen until the end. Then you go find somebody to talk to, because tonight you don’t feel like being by yourself.

### Choices

#### Choice 1

Find Trace, and ask him about his list of names

```json
{
  "next_scene": "scene_055"
}
```

#### Choice 2

Find the Captain again, and ask him why he started all this

```json
{
  "next_scene": "scene_056"
}
```

---

## scene_055 — The List

### Passage

You find Trace at his station, with names scrolling slowly up his screen.

“Is that the list?”

“Yes. Four thousand, two hundred and fifteen found. I added Keeper Cobble this evening.” He touches the screen, and a second list appears next to the first. It’s much, much longer. “And these are the ones reported missing who have not been found yet. I review both lists every night.”

“Why every night? You don’t forget things.”

“No. I do not.” He watches the names go by. “The Captain remembers them because he grieves. Percy remembers them because they hope. I cannot do either. So I have decided that I will be the one who remembers them exactly. Every name, spelled correctly. Someone should.”

You read over his shoulder for a while.

“Trace? Can you search the long one? For Solaris?”

“I already have. I search it every night for you. There are three hundred and nine names from Solaris on the missing list so far, and more each day, as the reports come in.”

Your heart thumps. “Is my family—”

“I do not know your family’s names. You have not told me.”

So you tell him. He types each one carefully, and he asks you how to spell them.

They aren’t on the found list. Not yet.

But now they’re written down, exactly right, by someone who’s going to check every single night.

### Choices

#### Choice 1

Get some sleep. The call could come any time.

```json
{
  "next_scene": "scene_057",
  "entry_intro": "from_trace"
}
```

---

## scene_056 — Why He Started

### Passage

You find the Captain on the observation deck, looking up through the ceiling.

“Sir? Can I ask why you started all this?”

He’s quiet for so long you think he isn’t going to answer.

“My world was called Azure. It was the first one. There was no Rescue Corps then. Nobody knew what was coming, or what the open portals meant. I was the captain of a cargo ship. I hauled grain.”

He folds his hands behind his back.

“I was three days away when it happened. I came home to a hole in the sky. And I thought, well. I have a ship. It is empty. And there are people out there, falling through doors into the dark.”

He looks down at you.

“I did not find my family, {hero_name}. I want to be honest with you about that. It has been a long time, and I have not. But I found Percy in a hold full of chickens. I found a laboratory that was about to switch off the first synthoid who could really think, because they were frightened of him. I found four thousand people.”

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
  "next_scene": "scene_057",
  "entry_intro": "from_captain"
}
```

---

## scene_057 — The Convoy

### Entry intro: from_trace

You fall asleep thinking about names, spelled correctly.

### Entry intro: from_captain

You fall asleep thinking about a grain ship with an empty hold.

### Passage

WHOOP. WHOOP. WHOOP.

This time you don’t make a single wrong turn.

“It’s the Harbor evacuation,” Percy says, and their voice is tight. “They started moving people out, just in case. Twelve ships. They’ve gone dead in space, all twelve of them. Engines, lights, everything.”

“Cause?” says the Captain.

“They passed too close behind it,” Dr. Wren says, leaning over Trace’s shoulder. “It leaves a wake. A sort of cold spot. It drains the power out of anything that drifts in.”

The {world_name} drops out of its jump, and you see it with your own eyes for the very first time.

It fills half the window. There’s no screen in the way, and no dot for scale. It’s an ocean of darkness, with the stars just stopping at its edge, and it’s moving away from you slowly, like a whale that hasn’t noticed the minnows. Twelve small ships hang helpless in the dark behind it.

Your knees do not feel good. You grab on to the back of Percy’s chair.

“Crewmate,” the Captain says quietly. “Look at the twelve ships. Not at it. At them. That is the job.”

You look at the twelve ships.

Your knees feel better.

### Choices

#### Choice 1

Take the shuttle and tow them out, one by one

```json
{
  "next_scene": "scene_058"
}
```

#### Choice 2

Run to the engine room and send the ships our power

```json
{
  "next_scene": "scene_061"
}
```

---

## scene_058 — Tow Line

### Passage

You fly. Trace works the tow cable.

Nobody argues about it. Percy has to hold the big ship steady at the edge of the wake, and Trace is the only one strong enough to work the tow cable by hand. That leaves the pilot’s seat…and you.

“Don’t think about it,” you tell yourself, out loud.

“Thinking is generally useful,” Trace says.

“Not right NOW!”

You dip the shuttle into the cold spot. The lights dim, the engine coughs, and you can feel the power draining away like water going out of a bath. You’ve got maybe ninety seconds each time before the shuttle goes dead too.

Trace fires the cable. It catches. You pull.

One ship out. Back in. Two ships. Three.

You fly it like you’re reading a map. In, hook, out. By the ninth ship, your hands have stopped shaking. By the eleventh, you’re flying better than you’ve ever flown in your life.

On the twelfth, the engine dies.

The shuttle goes dark. You’re drifting, with the last ship hooked on behind you, and the wake is pulling you both backward.

“Percy!” you shout into the comm. “We’re dead in the water!”

“I see you! Hang on, I can come in and grab you!”

“That would place the {world_name} inside the wake,” says Trace. “There is another option. There is a red pedal under your left foot.”

You look down. There IS a red pedal under your left foot. It has a little cover over it, and the cover says DO NOT.

### Choices

#### Choice 1

Stomp on the red pedal

```json
{
  "next_scene": "scene_059"
}
```

#### Choice 2

Tell Percy to come and get you

```json
{
  "next_scene": "scene_060"
}
```

---

## scene_059 — The Red Pedal

### Passage

“What does it DO?”

“I installed it myself. It is an emergency booster. It has its own power, which the wake cannot drain. Percy does not know that it exists, because if they did, they would use it every day.”

You flip up the little cover and stomp on the red pedal.

The shuttle leaps forward like something kicked it! You get squashed flat into your seat, and your cheeks try to slide around to the back of your head. Behind you, the tow cable snaps tight, and the twelfth ship comes right along with you, whether it wants to or not.

You come shooting out of the wake like a cork out of a bottle, and you go straight past the {world_name} before you can work out how to slow down.

“WHAT was THAT?” Percy yells over the comm. “Did that shuttle just…Trace! Is there a BUTTON? Have you had a button this WHOLE TIME?”

“It is a pedal,” says Trace.

“I want one! I want one on EVERYTHING!”

“This,” Trace says to you quietly, “is precisely the conversation that I had hoped to avoid.”

### Choices

#### Choice 1

Count the ships

```json
{
  "next_scene": "scene_064"
}
```

---

## scene_060 — Catch

### Passage

“Percy! Come and get us!”

“Oh, I thought you’d never ask.”

The {world_name} tips over on her nose and dives straight into the wake.

You watch her lights go dim as she comes. Percy isn’t slowing down. They’re coming in WAY too fast, because they know the engines will have died by the time they get here, and they’re planning to do the last part with no engines at all.

“Bay doors!” Percy shouts. “Captain, NOW!”

The shuttle bay doors slide open at the front of the ship like a big square mouth.

Percy scoops you up!

The shuttle goes in through the doors, bounces twice, and skids the whole length of the bay in a shower of sparks. The cargo bot rolls out of the way just in time. Behind you, the tow cable pulls tight, and the twelfth ship gets dragged along in the {world_name}’s shadow. The big ship’s engines cough, and catch, and ROAR, and she swings up and out of the cold with every light on board flickering.

You sit there in the dark shuttle for a moment and wait for your heart to climb back down out of your throat.

“That was the most reckless piece of flying that I have ever recorded,” says Trace.

“I KNOW!” Percy yells happily over the comm. “Wasn’t it GREAT?”

“For the record,” says Trace, “there was also a pedal.”

“There was a WHAT?”

### Choices

#### Choice 1

Count the ships

```json
{
  "next_scene": "scene_064"
}
```

---

## scene_061 — Power Transfer

### Passage

You run for the engine room. You know every single step of the way now.

Trace’s lessons come back to you all at once. Where the ship’s power goes. How to send it somewhere else.

“Captain, I can beam our power out to them! Enough to get their engines started again. But I have to pull it from somewhere. We’ll lose lights, heat, and shields.”

“Do it.”

You pull the big levers, one after another. The engine room goes dark, except for the blue glow of the power core. The {world_name} is pouring her own energy out across space, into twelve dead ships.

The little maintenance robot shuffles up beside you in the gloom, square eyes glowing and painted smile as cheerful as ever. For one wild second, you think it’s come to help.

It oils the lever next to your hand, and it shuffles away.

“Good talk,” you tell it.

On your screen, one of the twelve ships flickers, and its engines light up. Then another. Then four at once!

“Ten. Eleven,” Percy calls over the comm. “Number twelve’s not catching! She needs more, and we’re out of time!”

You’ve given them everything. Lights, heat, shields.

Well…not quite everything. There’s one big system left on the panel in front of you, and nobody ever thinks of it as power, because nobody ever thinks of it at all.

And there’s one other power source on board that isn’t part of the ship. It’s sitting down in the shuttle bay.

### Choices

#### Choice 1

Send them the gravity

```json
{
  "next_scene": "scene_062"
}
```

#### Choice 2

Call Trace, and ask him for the shuttle’s power core

```json
{
  "next_scene": "scene_063"
}
```

---

## scene_062 — Hold On to Something

### Passage

“Sorry, everybody,” you say into the comm. “Hold on to something.”

“Hold on to WHAT? Why?” says Percy.

You send them the gravity.

Everything on the {world_name} that isn’t tied down floats gently up into the air. That includes you. It includes the maintenance robot, which keeps right on oiling a lever that’s now a little ways below it. Somewhere down in the cargo bay, the cargo bot’s speaker says, “CARGO…NOT SECURED.” And from the noise on the comm, it also includes Percy’s lunch.

“I have NOODLES in my EYES!” Percy shouts. “I have a LOT of eyes!”

On your screen, the twelfth ship flickers. It flickers again.

Its engines roar to life!

You hang there in the middle of the dark engine room, slowly turning upside down, and you laugh until you get the hiccups.

“Crewmate {hero_name},” says the Captain’s voice. He sounds like he’s talking from somewhere up near the ceiling. “That was well done. At your earliest convenience, I would very much like to be put down.”

### Choices

#### Choice 1

Put the gravity back, and count the ships

```json
{
  "next_scene": "scene_064"
}
```

---

## scene_063 — You Said Right Now

### Passage

“Trace! I need the power core out of the shuttle! I need it in the engine room! I need it RIGHT NOW!”

“On my way.”

The shuttle bay is at the far end of the ship, three decks down, and a long run for anybody. You start counting, because you can’t help it.

You’ve gotten as far as eleven when the engine room door slides open.

Trace is standing in the doorway with the shuttle’s power core under one arm. It’s the size of a barrel. He isn’t out of breath, because he doesn’t have any breath. There’s a little scorch mark on the floor behind him where he stopped.

“You said right now,” he says.

You plug it in together. Your hands are shaking and his aren’t, so he does all the tiny connections. You throw the lever.

On your screen, the twelfth ship flickers. It flickers again. Its engines roar to life!

You slide down the wall until you’re sitting on the floor. After a moment, Trace sits down next to you, back against the wall and legs straight out in front of him, exactly the way yours are.

“The shuttle cannot fly without that core,” he says. “It will take me a full day to put it back.”

“Was it worth it?”

“There are two hundred and six people on that ship,” says Trace. “That is a strange question.”

### Choices

#### Choice 1

Put the lights back on, and count the ships

```json
{
  "next_scene": "scene_064"
}
```

---

## scene_064 — Twelve for Twelve

### Passage

Twelve ships. All twelve, with their engines running, limping away from the wake.

Nobody cheers. Everybody on the bridge is looking at the big window.

The World-Eater is turning.

It’s slow, the way a storm is slow. But the great dark shape is swinging around, and the edge of it is rippling.

“It noticed,” Dr. Wren whispers. “All that power, moving around right behind it. We rang the dinner bell.”

“It is not turning toward us,” Trace says. “It is correcting its course. It will now reach Harbor in four days. Not nineteen.”

“The evacuation needs two weeks,” Percy says. “At least.”

The Captain stands at the window with his hands behind his back for a long moment. His ears are flat.

“Then we cannot outrun it, and we cannot get them out in time.” He turns around. “For all the years that I have done this, we have run from that thing. Today we stop running. I do not know how to fight something the size of a world. I am open to ideas.”

The bridge is silent.

You look down at your satchel.

At the very bottom, under the rope and the sunscreen, wrapped up in a sock, is the one thing you brought that a real delver would bring. You haven’t taken it out since you got here, because it reminds you of home.

“Captain,” you say. “I think I’ve got one.”

### Choices

#### Choice 1

Show them

```json
{
  "next_scene": "scene_065"
}
```

---

## scene_065 — The Plan

### Passage

You unwrap the sock and set it on the table. It’s a brass disc about the size of your palm, with a crystal in the middle.

“It’s a portal key. It’s how delvers open portals and hold them open. I, um. I borrowed it. From the portal yard.” You clear your throat. “I was going to give it back.”

Dr. Wren picks it up with both hands like it’s made of glass. “This gives off portal energy. PURE portal energy. That’s what it hunts by.”

“It’s tiny,” Percy says.

“Not if we feed the ship’s power through it,” you say. It all comes out in a rush, because you can see the whole thing in your head, like a map. “It follows portal energy, like a hound. So we can lead it. And when it feeds, it opens up, and the inside isn’t armored. That’s what you said. So we can sting it! It’s never been hurt. Not once, ever. What does an animal do the first time it gets stung?”

“It leaves,” the Captain says softly. “It learns that this place hurts, and it leaves.”

“We cannot kill it,” Trace says.

“We don’t have to,” you say. “We just have to make it go somewhere else.”

The Captain looks at the brass key for a long moment.

“There are two ways to use this. We can put the key in the shuttle and lure the creature away from Harbor. Or we can wire the key into the ship’s main emitter and sting it head on. {hero_name}, it is your key, and your plan. Where do we begin?”

### Choices

#### Choice 1

Lure it away with the shuttle

```json
{
  "next_scene": "scene_066"
}
```

#### Choice 2

Sting it with the ship

```json
{
  "next_scene": "scene_070"
}
```

---

## scene_066 — The Lure

### Passage

You and Trace take the shuttle out alone, with the portal key wired into the dashboard by about a mile of Dr. Wren’s cable.

Harbor hangs behind you, small and green, with four thousand people on it.

Ahead of you, there are no stars at all.

“Activating,” Trace says.

The key begins to glow, and then to sing, a high, clear note you can feel in your teeth. It sounds exactly like the portal yard back home.

The World-Eater stops.

Then, slowly, the whole huge darkness swings around toward you. Toward one little shuttle the size of a bus.

“It’s working! Go, go, GO!”

You fly. You lead it away from Harbor, out toward empty space, and it follows you like the world’s biggest and worst dog.

For about ten minutes, it’s the best plan anybody has ever had.

Then the darkness in your mirrors starts to fall behind. It’s slowing down. The edge of it ripples, and it begins to turn, slowly, back the other way.

“It is losing interest,” says Trace. “The key is one small scent in a very large sky. And Harbor is still exactly where it was going.”

“No, no, no. Come on. Here, boy!”

There’s a dial on the key’s cable. Dr. Wren drew a red line on it, and beside the line she wrote NO FURTHER and underlined it twice.

### Choices

#### Choice 1

Turn the key up past the red line

```json
{
  "next_scene": "scene_067"
}
```

#### Choice 2

Fly back in close, where it can’t ignore you

```json
{
  "next_scene": "scene_068"
}
```

---

## scene_067 — Past the Red Line

### Passage

You turn the dial past the red line.

The key’s song climbs higher, and higher, until it’s less like a note and more like a drill. The crystal blazes white, and the whole cockpit lights up like a lightning flash that doesn’t end.

Out in the dark, the World-Eater stops turning away.

It comes around faster this time. A LOT faster.

“That has its attention,” says Trace.

There’s a tiny sound from the dashboard. Tink.

You look down. There’s a crack running across the crystal in the middle of the key, as thin as a hair.

“Oh, no. No, no, no.” You spin the dial back down below the line. The light fades…but the crack stays right where it is.

It’s the only portal key for a thousand light years, and you just cracked it.

“It is still singing,” says Trace. “It will hold. I would not do that a second time.”

You don’t have to. The World-Eater has made up its mind. The darkness is rushing up behind you, filling the back window, and it’s getting bigger faster than you can fly.

### Choices

#### Choice 1

Fly!

```json
{
  "next_scene": "scene_069",
  "entry_intro": "bright"
}
```

---

## scene_068 — Too Close

### Passage

You swing the shuttle around and fly straight back at it.

“{hero_name},” says Trace. “I would like to point out the direction in which we are now traveling.”

“I know! If it can’t smell us from out there, then we get closer!”

You get closer. You get so close there’s no sky left, only a wall. You skim along the side of the World-Eater with the key singing at the top of its voice.

Up close, it isn’t smooth. It’s rough and ridged and pitted, like the bark of a tree, or the hide of something very old. It goes on forever in every direction. There are craters in it bigger than the town where you grew up.

It’s alive. You knew that already. But you hadn’t really KNOWN it until now.

The hide underneath you twitches, the way a horse’s skin twitches when a fly lands on it.

“That has its attention,” says Trace.

The wall begins to move. You haul back on the sticks and run, and the whole enormous darkness peels away from its path and comes after you. It’s faster than it ever looked from far away, and it’s getting bigger faster than you can fly.

### Choices

#### Choice 1

Fly!

```json
{
  "next_scene": "scene_069",
  "entry_intro": "close"
}
```

---

## scene_069 — Jaws

### Entry intro: bright

With the cracked key still singing on the dashboard, you push the engines as hard as they’ll go.

### Entry intro: close

With that endless hide still sliding past your side window, you push the engines as hard as they’ll go.

### Passage

It’s not enough. The darkness fills the back window. It fills the side windows too. And then the edges of it begin to fold outward, like the petals of a flower opening up…a flower as wide as a continent. Down inside, there’s a dim red glow, like coals.

“It is opening,” says Trace. “It intends to feed. On us. I would like to suggest that we do not let it.”

You’re staring into the mirror. You can’t help it. Dr. Wren was right. The inside is nothing like the outside. It’s soft, and it’s glowing, and it’s wide open.

“Trace. Look at it. If the ship were here right now, with something to shoot…”

“The ship is not here. We are here. Please turn the key off.”

“We’re at the wrong end of the plan!”

“{hero_name}. The key.”

You slap the switch. The singing stops like it got cut off with a knife.

Behind you, the great mouth hangs open for one long, terrible second. Then the World-Eater slows down. It’s lost the scent. The petals fold shut, the red glow disappears, and the huge shape swings slowly back around toward Harbor, like you were never even there.

You don’t breathe until you’re most of the way home.

“Well,” you finally say. Your voice comes out super high. “We learned something.”

“We did,” says Trace. “I would prefer to have read it in a book.”

### Choices

#### Choice 1

Get back to the ship

```json
{
  "next_scene": "scene_074",
  "entry_intro": "lure"
}
```

---

## scene_070 — The Sting

### Passage

It takes Trace and Dr. Wren six hours to wire the portal key into the ship’s main emitter, the big dish at the front that’s normally used for clearing space rocks out of the way. The stun rifles from the shuttle get taken apart for their power cells. Nobody’s ever needed them for anything else. The cargo bot hauls cable back and forth the whole time, and every time it drops off a spool, it announces “CARGO SECURED,” and Dr. Wren says “thank you” without even looking up.

“One shot,” Dr. Wren says. “The key won’t survive a second one. And it has to go INSIDE. If it hits the outside, it’ll just be a snack.”

Percy flies you straight at it.

It gets bigger, and bigger, and then it stops getting bigger, because it’s already everything. You’re a gnat flying at a mountain.

Up close, it isn’t smooth. It’s rough and ridged, like the bark of a tree, or the hide of something very old. There are craters in it bigger than the town where you grew up.

“So,” says Percy. “Where’s the mouth?”

Everybody looks at Dr. Wren.

“It was at the front,” she says. “Last time.”

“Which end is the front?”

Dr. Wren opens her mouth, and then she closes it again.

The darkness slides past the window, endless and totally uninterested. You’ve got one shot, and nothing to shoot it at.

### Choices

#### Choice 1

Fire a tiny test pulse to get its attention

```json
{
  "next_scene": "scene_071"
}
```

#### Choice 2

Fly around it and look for the mouth

```json
{
  "next_scene": "scene_072"
}
```

---

## scene_071 — A Snack

### Passage

“What if we knock?” you say. “Not the real shot. Just a tiny bit, the least we can send. To make it turn around and look at us.”

Dr. Wren chews her lip. “One percent. Not one speck more.”

You take the firing station, turn the dial all the way down, and press the button.

A thin little thread of white light hops off the front of the ship and touches the World-Eater’s hide.

The hide ripples outward from the spot, like a pond when you drop a pebble in. For a moment, a small fold opens up in it, no bigger than the ship, with a red glow deep down inside.

The little thread of light goes in. The fold closes over it.

And that’s it. The World-Eater doesn’t turn around. It doesn’t slow down. It just got handed a crumb, and it ate the crumb, and it didn’t even look to see where the crumb came from.

“That was a mouth!” says Percy. “That was a TINY mouth!”

“It can open anywhere,” Dr. Wren breathes. She’s scribbling notes on her own sleeve. “It doesn’t HAVE a mouth. It makes one, wherever the food is. But a crumb only gets you a crumb-sized mouth. For the real shot to get all the way in, we’d need it to open wide. It’d have to be really hungry. It’d have to be chasing something.”

### Choices

#### Choice 1

Think about that

```json
{
  "next_scene": "scene_073",
  "entry_intro": "pulse"
}
```

---

## scene_072 — The Long Way Around

### Passage

“Then we go and look for it,” says the Captain. “Percy. Take us around.”

It takes four hours to fly around the World-Eater one time.

You spend them at the scanner station, mapping it, because somebody ought to, and maps are what you do. You fill nine pages. You draw ridges as long as mountain ranges, craters like dried-up seas, and great slow wrinkles that open and close as it moves.

You don’t find a mouth. You don’t find a front, either, or a back. It’s the same all over, like a potato.

“I don’t understand it,” says Dr. Wren. “We watched it feed. It opened up like a flower. It was enormous. It can’t just be GONE.”

You look down at your nine pages, and you think about flowers.

“Maybe it isn’t gone,” you say slowly. “Maybe it isn’t there YET. A flower’s not open all the time. It only opens up when there’s some sun.” You tap your pencil on the page. “What if it doesn’t have a mouth? What if it makes one when there’s something to eat, wherever the food happens to be?”

Dr. Wren stares at you. Then she snatches your notebook right out of your hands and starts flipping through it.

“It’d have to be hungry,” she mutters. “It’d have to be chasing something.”

### Choices

#### Choice 1

Think about that

```json
{
  "next_scene": "scene_073",
  "entry_intro": "search"
}
```

---

## scene_073 — No Bait

### Entry intro: pulse

Nobody on the bridge says anything for a while.

### Entry intro: search

Dr. Wren slowly hands your notebook back to you. The bridge goes quiet.

### Passage

“The key’s wired into the dish now,” you say, working it out loud. “So it can’t smell the key until we fire it. And we can’t fire it until it’s opened up. And it won’t open up until it smells something.”

“That is a circle,” says Trace.

“We built a stinger,” says Percy, and they slump back in their chair. “We forgot the bait.”

Outside the window, the hide of the World-Eater goes sliding by. It doesn’t know you’re here. It’s never once needed to know that anybody was here.

Four thousand people. Four days. One shot, and no way to use it.

You stare at the lights on Percy’s console, because you can’t stand to look out the window anymore. One of them is a little green light, labeled SHUTTLE BAY.

You look at it for a long time.

The shuttle is small, and it’s fast. And anything with an engine in it can be made to make a whole lot of noise.

Your stomach turns over slowly. You know what the rest of the plan is…and you don’t like it.

### Choices

#### Choice 1

Tell them the rest of the plan

```json
{
  "next_scene": "scene_074",
  "entry_intro": "sting"
}
```

---

## scene_074 — Both at Once

### Entry intro: lure

You run all the way from the shuttle bay to the bridge. “It opens up when it hunts!” you tell them, before you’ve even got your breath back. “It was wide open, right behind us! We have to sting it while it’s chasing something!”

### Entry intro: sting

“It needs bait,” you say. “The shuttle. If the shuttle puts out enough portal energy, it’ll chase it, and it’ll open up. And then the ship stings it.”

### Passage

There’s a short, terrible silence.

“The key cannot be in two places,” the Captain says.

“It doesn’t have to be,” Dr. Wren cuts in. “The shuttle’s engine core will put out something close enough, if you overload it. It’ll smell like a portal for a few minutes. Then it’ll burn out.”

So this is the plan. The shuttle runs, screaming portal energy, and gets the World-Eater to open its mouth. The ship comes in from the side and fires the key’s one shot right down its throat. If the shuttle’s too slow, it gets swallowed. If the ship misses, there’s no second try.

Two jobs. Flying the bait needs somebody who can hold a line with steady hands while the biggest thing in the universe comes up behind them. Firing the shot needs somebody who can watch a moving target, find the pattern, and call the one right moment.

You’ve spent three weeks learning to be both of those people.

“Crewmate {hero_name},” the Captain says. “I have never asked anyone so young to do something like this, and I would not ask now if I had any other choice. Where do you want to be?”

### Choices

#### Choice 1

Fly the shuttle with Trace

```json
{
  "next_scene": "scene_075"
}
```

#### Choice 2

Take the firing station on the bridge

```json
{
  "next_scene": "scene_076"
}
```

---

## scene_075 — The Bait

### Passage

Trace overloads the engine core, and the whole shuttle starts to hum the portal note. You take the sticks.

“I will handle the power,” he says. “You fly. Do not think about it.”

“You said thinking is useful.”

“I have revised my position.”

It comes.

You’ve never flown like this. You’re not reading a map, because there IS no map. There’s only the darkness rising up behind you, and the edges of it folding open, wider than a continent, with that dim red glow inside like coals.

“Hold the line,” the Captain’s voice says. “Ten more seconds. We are almost in position.”

The shuttle is shaking itself apart. A panel bursts. Sparks rain down on your side of the cockpit, and before you can even flinch, Trace has put his arm across you. It takes the whole shower. When he pulls it back, the metal is black and the fingers aren’t moving.

“Your ARM!”

“It is an arm. I have another. I do not feel fear, {hero_name}. But I have calculated that you do, and you are flying anyway. Hold the handle. Five more seconds.”

You hold the handle.

The red glow fills every mirror.

“NOW!” the Captain roars. “Break left! PERCY, FIRE!”

You break left, harder than you’ve ever turned in your life, and something bright goes past you the other way.

### Choices

#### Choice 1

Look back

```json
{
  "next_scene": "scene_077",
  "entry_intro": "flew"
}
```

---

## scene_076 — The Shot

### Passage

You take the firing station. It’s one screen, one crosshair, and one button, with your notebook open on your knee.

Out in the dark, Trace is flying the shuttle alone, with its engine core screaming portal energy, and the World-Eater is rising up behind him like a wave.

“It’s opening!” Percy shouts. “There it is!”

The edges of the darkness fold outward. Inside is that dim red glow, like coals. But the mouth isn’t holding still. It ripples, and flexes, and pulses.

One shot.

“Crewmate,” the Captain says. “Any time.”

“Not yet.”

You watch. You count. You write it down, the way you always do. Wide, narrow, narrow, wide. Wide, narrow, narrow, wide. It’s BREATHING. Every fourth beat, the glow in the center is brightest, and there’s a clear path all the way in.

“The shuttle’s coming apart,” Percy says. “{hero_name}, he can’t hold it!”

“I have lost the use of one arm,” Trace’s voice says calmly over the comm. “I have another. Please take the time you need. I would prefer that you did not miss.”

Wide. Narrow. Narrow.

You think of Solaris. You think of Trellis, and Loop, and Azure. You think of all those names, spelled correctly.

“Trace, break left. Now.”

Wide.

You press the button.

### Choices

#### Choice 1

Watch it fly

```json
{
  "next_scene": "scene_077",
  "entry_intro": "fired"
}
```

---

## scene_077 — Stung

### Entry intro: flew

In the mirror, you watch the shot go in.

### Entry intro: fired

The portal key’s one and only shot leaps from the front of the ship, passes the fleeing shuttle by a hair, and goes in.

### Passage

It’s a single thread of brilliant white light, carrying every bit of power the {world_name} has. It slides straight down the middle, into the red glow, and vanishes.

For a moment, nothing happens.

Then the World-Eater shudders.

You don’t hear it, because there’s no sound in space. But you feel it, in your ribs, in the deck, in the air…a huge, low note from something that has never once been hurt, finding out what it’s like. A crack of white light runs across the darkness from one side to the other, like lightning across a night sky.

The mouth slams shut.

And the World-Eater turns away. Away from the shuttle, away from the ship, away from the little green planet with four thousand people on it. It’s moving faster than you’ve ever seen it move. The starless patch shrinks, and shrinks, until it’s a smudge, and then a speck.

Then it’s only stars.

The bridge of the {world_name} goes WILD. Percy is screaming and hugging Dr. Wren. Dr. Wren is crying all over her crystals. Down in the engine room, the little maintenance robot keeps right on oiling things.

“It is not dead,” Trace says, over the noise.

“No,” says the Captain. “It is wounded, and it is frightened, and it is still out there. But today it learned that some doors bite back.” His voice cracks a little. “And it learned it from us.”

Far below, the lights of Harbor are twinkling.

### Choices

#### Choice 1

Go down to Harbor

```json
{
  "next_scene": "scene_078"
}
```

---

## scene_078 — The Wall of Names

### Passage

Harbor smells like cut grass and cooking. You’d forgotten that planets have smells.

Four thousand people come out to meet the ship. You get hugged by more strangers than you can count. The little kid with the big gray ears from the Genesis runs up and hugs you around the knees.

Captain Thyme is here, and so is Ratchet, who has grown a whole inch. Keeper Cobble has been given a little round house with a garden, and there are green shoots coming up in it that nobody on Harbor has ever seen before. Trace’s arm is already being rebuilt, and he’s already supervising. Percy finds a fried dough stand run by their cousin Zenta, and they don’t come back for an hour.

In the middle of town there’s a long white wall covered in names. Thousands and thousands of them, with the name of a lost world above each group. It’s Trace’s list, carved where everyone can see it. People leave flowers along the bottom.

At the very end, there’s a fresh, empty stretch of wall. While you’re standing there, a woman with a chisel carves a new heading into it.

SOLARIS.

And underneath it, she starts carving names. There are six already. Six people who fell through portals just like you did, got picked up by other ships, and were brought here.

You read them three times. You don’t know any of them.

But there are six. Yesterday there were none. And there’s a LOT of empty wall.

Captain Aster comes to stand beside you.

“More will come,” he says. “They always do. Some will be brought here. Some are still out there, waiting for a ship. You have earned the right to choose, {hero_name}. You can stay here on Harbor and be the first face every Solarian sees when they arrive. Or you can come with us, and go and find them.”

### Choices

#### Choice 1

Stay on Harbor and wait by the wall

```json
{
  "next_scene": "scene_079"
}
```

#### Choice 2

Stay with the crew and keep searching

```json
{
  "next_scene": "scene_080"
}
```

---

## scene_079 — The First Face

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

The {world_name} lifts off three days later. Percy cries and pretends they aren’t. Trace shakes your hand with his new arm, because he’s learned you’re a hand-shaker.

“I will continue to search the list for your family every night,” he says. “When I find them, you will be the first to know. I have said when. I considered the word carefully.”

You watch the ship until it’s just one more star.

Then you get to work. You build a little welcome station by the gates, with blankets, and water, and sandwiches. A LOT of sandwiches. You pin a map of Harbor to the wall, drawn by hand.

Every time a ship lands, you’re there, in a gray jumpsuit that’s a little less too big every month.

“Hi,” you say, to every lost and frightened face. “I’m {hero_name}. I’m from Solaris. You’re safe. Let me show you the wall.”

Out there in the dark, something huge and wounded is still drifting between the stars.

But the wall keeps getting longer, and you check the new names every single morning.

One day, you know, you’re going to recognize one.

The End.

### Choices

---

## scene_080 — The Space Walker

### Scene metadata

```json
{
  "ending": true
}
```

### Passage

“I can’t wait by a wall,” you say. “I’m not built for it. If my family’s out there, they’re waiting for a ship. I want to be ON the ship.”

The Captain’s ears twitch. Both of them, twice.

“I was hoping you would say that. I have already told the quartermaster to find you a jumpsuit that fits.”

“No thanks,” you say, and you roll your sleeves up one more time. “I’ll grow into this one.”

The {world_name} lifts off three days later with a rebuilt shuttle, a repaired synthoid, a pilot full of fried dough, and a scientist who’s decided she’s not going back to an ice moon. And you.

Before you go, you carve your family’s names on the wall yourself, under MISSING. Trace checks the spelling.

On your first night back in space, you lie on the floor of the observation deck with your notebook, drawing a map. It’s got every lost world on it, and every place a survivor has ever been found. There’s a pattern in there somewhere. There always is.

“It is still out there,” Trace says from the doorway. “It will heal. It will come back.”

“I know,” you say, without looking up. “And when it does, it’s gonna find out we’ve been practicing.”

WHOOP. WHOOP. WHOOP.

You grab your satchel. Rope, compass, notebook, sandwiches. A good delver is always prepared.

“Crewmate {hero_name} to the bridge,” says the Captain’s voice.

You’re already running. You don’t make a single wrong turn.

The End.

### Choices
