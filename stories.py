# ----------------------------
# SPACE WALKER
# ----------------------------

space_walker = {
    "id": "space_walker",
    "title": "The Space Walker",
    "description": "A sci-fi space adventure that starts aboard a mysterious starship.",
    "theme": "space",
    "start_scene": "scene_001",

    "scenes": {
        "scene_001": {
            "title": "The Portal",
            "text": """
{hero_name} steps through a glowing portal into {world_name}.

Disoriented, you look around and see that you are no longer home. It looks like you have stepped into a starship from some of your favorite movies.

You walk around, touching the cold metal walls, and find a window. You look out and see a vast starscape.

Shocked, you turn around and notice the portal is gone. In its place is a door with the word BRIDGE written above it. To your left, you see a smaller starship. In front of you, you hear footsteps coming toward you.

Now choose your path:
""",
            "choices": {
                "1": {
                    "text": "Go through the door onto the bridge",
                    "next_scene": "scene_002"
                },
                "2": {
                    "text": "Run to the starship and take off into space",
                    "next_scene": "scene_003"
                },
                "3": {
                    "text": "Walk toward the footsteps and see who, or what, is approaching",
                    "next_scene": "scene_004"
                }
            }
        },

        "scene_002": {
            "title": "The Bridge",
            "text": """
You go through the door onto the bridge and see what looks like airplane flight controls, along with flashing lights and buttons everywhere.

You look closer and discover that you can actually read all the labels.

You look up at the screens and see what looks like a giant green sun and an orange-and-yellow planet.

As you are exploring the bridge, you hear the door behind you start to open.

What do you do next?
""",
            "choices": {
                "1": {
                    "text": "Try to hide from whoever is coming in",
                    "next_scene": "scene_005",
                    "entry_intro": "bridge_hide"
                },
                "2": {
                    "text": "Turn around and greet whoever enters",
                    "next_scene": "scene_005",
                    "entry_intro": "bridge_greet"
                },
                "3": {
                    "text": "Try to run away through the opposite door before they notice you",
                    "next_scene": "scene_005",
                    "entry_intro": "bridge_run"
                }
            }
        },

        "scene_003": {
            "title": "The Shuttle",
            "text": """
You take off toward the starship and jump inside the cockpit.

You look down and see a button labeled ENGINES. You press it as you slide smoothly into the pilot seat.

The engines roar to life, and the ship launches forward, pinning you to your seat.

You think to yourself, I need to get out of here and find a way home.

But as you leave the ship, you look up and see a giant green sun and a planet that looks similar to Earth. Instead of familiar blue and green, it glows yellow and orange.

That is when you realize you are not even in your solar system anymore.

As you cruise forward, you notice a sharp pull on your ship. You look around and realize you are being pulled backward by a tether.

Then you hear a voice through the ship’s speakers:

“To whoever took my shuttle, power down your engines and let us pull you back in.”

What do you do next?
""",
            "choices": {
                "1": {
                    "text": "Push forward on the controls and try to break the tether",
                    "next_scene": "scene_005",
                    "entry_intro": "shuttle_break_tether"
                },
                "2": {
                    "text": "Look for the comms button and power down the engines",
                    "next_scene": "scene_005",
                    "entry_intro": "shuttle_power_down"
                },
                "3": {
                    "text": "Get up and look around the ship for something to help you out of this mess",
                    "next_scene": "scene_005",
                    "entry_intro": "shuttle_search"
                }
            }
        },

        "scene_004": {
            "title": "The Footsteps",
            "text": """
You decide the best course of action is to walk toward the footsteps and hope whoever is coming can help you figure out where you are.

As you turn the corner, you see an almost seven-foot-tall humanoid creature with a large nose, wide ears, and skin that glistens blue.

To their left is a smaller humanoid creature, and beside them stands a gray robot about five feet tall, holding a tablet-like device.

What do you do next?
""",
            "choices": {
                "1": {
                    "text": "Walk closer to the aliens and see if you can speak with them",
                    "next_scene": "scene_005",
                    "entry_intro": "footsteps_approach"
                },
                "2": {
                    "text": "Turn around and head toward the bridge again",
                    "next_scene": "scene_005",
                    "entry_intro": "footsteps_bridge"
                },
                "3": {
                    "text": "Run back to the ship you saw earlier and try to get out of here",
                    "next_scene": "scene_005",
                    "entry_intro": "footsteps_ship"
                }
            }
        },

        "scene_005": {
            "title": "Meeting the Captain",

            "entry_intros": {
                "bridge_hide": """
You duck behind the captain’s chair just as the bridge door slides open.

The captain walks toward the chair, pauses, and notices you almost immediately.
""",

                "bridge_greet": """
You turn around and raise your hand awkwardly as the bridge door slides open.

Three figures step inside and freeze when they see you standing near the controls.
""",

                "bridge_run": """
You sprint for the opposite door, but you are too late.

You hear a commotion behind you. You spin around and see three figures staring directly at you.
""",

                "shuttle_break_tether": """
You push the controls all the way forward, and the shuttle lurches violently as the engines fight against the tether.

Then you feel another bump. And another.

Three more tethers latch onto the shuttle.

Slowly, you are pulled back in. Resigned to your fate, you power everything down and wait to meet whoever is on the other end.
""",

                "shuttle_power_down": """
You find the comms button, shut down the engines, and the shuttle is slowly pulled back.

“Umm, hi,” you say into the comms. “Sorry about that. I’m shutting everything down now.”

Then you sit back and wait to meet whoever is on the other end of the tether.
""",

                "shuttle_search": """
You unbuckle yourself and stumble through the shuttle, looking for anything useful.

Then you find it: a small stun device.

You shove it into your pocket and head back to the console, only to realize you are no longer moving forward.

Now it is just a waiting game until you meet whoever is on the other side of the tether.
""",

                "footsteps_approach": """
You walk toward the footsteps and turn the corner.

The three figures stop as soon as they see you.
""",

                "footsteps_bridge": """
You turn back toward the bridge, but the footsteps grow louder behind you.

You run toward the bridge, but before you can reach it, you hear a commotion behind you.
""",

                "footsteps_ship": """
You race back toward the small ship, but someone calls out behind you.

Before you can reach the cockpit, three figures appear at the entrance to the hangar.
"""
            },

            "text": """
The tallest one stops dead and says, “Stop there. How did you get in here?”

You put your hands up and say, “Hi, umm, I honestly don’t know. I walked through a portal and ended up here. I promise I’m not dangerous.”

The robot moves closer and says, “It’s okay, Captain. I scanned them. They have no weapons. Their heart rate is elevated, but they appear to be telling the truth.”

The captain lowers their weapon slightly, but their eyes stay locked on you.
""",

            "choices": {
                "1": {
                    "text": "Ask where you are",
                    "next_scene": "scene_006"
                },
                "2": {
                    "text": "Ask if they know about portals",
                    "next_scene": "scene_007"
                },
                "3": {
                    "text": "Ask if they can help you get home",
                    "next_scene": "scene_008"
                }
            }
        },

        "scene_006": {
            "title": "Where Am I?",
            "text": """
The captain studies you carefully.

“You are aboard the starship Horizon Walker,” they say. “And if you truly came through a portal, then you are much farther from home than you realize.”

This scene still needs to be written.
""",
            "ending": True
        },

        "scene_007": {
            "title": "The Portal Question",
            "text": """
At the word portal, the smaller alien looks sharply at the captain.

The robot taps quickly on its tablet and says, “Captain, we may have a match in the anomaly records.”

This scene still needs to be written.
""",
            "ending": True
        },

        "scene_008": {
            "title": "Finding a Way Home",
            "text": """
The captain looks at the robot, then back at you.

“If you are telling the truth,” they say, “then helping you get home may be more important than you know.”

This scene still needs to be written.
""",
            "ending": True
        }
    }
}

# ----------------------------
# SUMMONED MAGE
# ----------------------------

summoned_mage = {
    "id": "summoned_mage",
    "title": "The Summoned Mage",
    "description": "A fantasy adventure about a world losing its magic.",
    "theme": "fantasy",
    "start_scene": "scene_001",

    "scenes": {
        "scene_001": {
            "title": "The Summoning Circle",
            "text": """
You open your eyes and look around. The darkness breaks away into the barest hint of light.

As your eyes adjust, you notice that you are seated inside a small circle with unlit candles all around you.

Confused, you look up and realize you are not alone. Lying on the floor in front of you is a girl about your age, splayed out and unmoving.

As you slowly move forward, she stirs, and her eyes snap open.

“It worked… oh my, it worked.”

She looks you in the eyes and says, “I can’t believe it worked. You must be so confused. I am Elliana, and I summoned you here to help my world.”

You look back at her, mouth dry and heart pounding, unsure whether to speak, run, or simply breathe.
""",
            "choices": {
                "1": {
                    "text": "“You summoned me? What does that even mean? Where am I? Why did you summon me?”",
                    "next_scene": "scene_002"
                },
                "2": {
                    "text": "Get up and run, as fast as your legs can handle, which honestly is not very fast right now",
                    "next_scene": "scene_003"
                },
                "3": {
                    "text": "Close your eyes and focus on your breathing, something you always do when you feel worried",
                    "next_scene": "scene_004"
                }
            }
        },

        "scene_002": {
            "title": "Too Many Questions",
            "text": """
“Okay, so you have a lot of questions,” Elliana says. “That’s fair. Yes, I summoned you, and…”

As she talks, you notice her purple hair and fluffy tail.

Wait.

A tail?

Then you look closer at her eyes. They are a deep yellow and shaped sort of like a cat’s.
""",
            "choices": {
                "1": {
                    "text": "“I’m sorry,” you say. “I drifted there for a second. Can you explain this all again?”",
                    "next_scene": "scene_005",
                    "entry_intro": "asked_questions"
                }
            }
        },

        "scene_003": {
            "title": "The Barrier",
            "text": """
You try to run, but your legs feel weak and shaky.

After only a few steps, you stumble forward and hit the ground hard.

You look back, and Elliana is staring at you with wide eyes.

You get back to your feet and look around. Spotting a doorway ahead, you rush toward it, but you slam into a clear, glass-like barrier and bounce backward.

You look back at Elliana again.
""",
            "choices": {
                "1": {
                    "text": "Realizing you have nowhere to go, head back to Elliana",
                    "next_scene": "scene_005",
                    "entry_intro": "ran_into_barrier"
                }
            }
        },

        "scene_004": {
            "title": "The Candle Flame",
            "text": """
You close your eyes and picture a flame flickering in the dark.

Focusing on it makes you feel calmer.

But it also strangely makes you feel warmer.

You open your eyes and look down.

The candles around you are all lit.

But how did that happen?

You look up at Elliana.
""",
            "choices": {
                "1": {
                    "text": "“Okay, well, I hope you are going to explain what is going on here.”",
                    "next_scene": "scene_005",
                    "entry_intro": "lit_candles"
                }
            }
        },

        "scene_005": {
            "title": "Elliana Explains",

            "entry_intros": {
                "asked_questions": """
“Yes, of course,” Elliana says quickly. “You must be completely overwhelmed.”
""",

                "ran_into_barrier": """
“I’m sorry,” Elliana says, rushing toward you. “You’re probably weak from the summoning, but I can’t let you run before I explain.”
""",

                "lit_candles": """
Elliana stares at the candles, her yellow eyes wide.

“You lit them,” she whispers. “But you shouldn’t know how to do that.”
"""
            },

            "text": """
“First things first,” Elliana says. “I summoned you here to help my world. As you can probably tell, things are a little different here.”

Her tail flicks nervously.

“For one thing, I noticed you do not have a tail.”
""",

            "choices": {
                "1": {
                    "text": "Ask what kind of help her world needs",
                    "next_scene": "scene_006"
                },
                "2": {
                    "text": "Ask why she chose you",
                    "next_scene": "scene_007"
                },
                "3": {
                    "text": "Ask what happens if you just want to go home",
                    "next_scene": "scene_008"
                }
            }
        },

        "scene_006": {
            "title": "A World in Trouble",
            "text": """
Elliana takes a deep breath.

“My world is losing its magic,” she says. “Not all at once. Slowly. Quietly. Like a candle burning down.”

She looks at the flames around the circle.

“And somehow, you were able to light those candles without even knowing what you were doing.”

This scene still needs to be written.
""",
            "ending": True
        },

        "scene_007": {
            "title": "Why You?",
            "text": """
“I didn’t choose you exactly,” Elliana says.

She looks embarrassed.

“The spell was supposed to find someone who could help. Someone with a spark strong enough to answer.”

She looks at the candles again.

“I think it found you.”

This scene still needs to be written.
""",
            "ending": True
        },

        "scene_008": {
            "title": "Going Home",
            "text": """
Elliana’s ears lower.

“I understand,” she says softly. “I really do. But sending you home is not as simple as opening the door again.”

The candles flicker.

“The portal brought you here because something answered from your side. To send you back, we may need to find out what that something was.”

This scene still needs to be written.
""",
            "ending": True
        }
    }
}

# ----------------------------
# AVAILABLE STORIES
# ----------------------------

available_stories = {
    "1": space_walker,
    "2": summoned_mage
}