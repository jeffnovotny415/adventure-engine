summoned_mage = {
    "id": "summoned_mage",
    "title": "The Summoned Mage",
    "description": "A fantasy adventure about being summoned into a world losing its magic.",
    "theme": "fantasy",
    "setup_prompt": "What would you like to name the magical world? ",
    "start_scene": "scene_001",

    "scenes": {

        "scene_001": {
            "title": "Opening",

            "text": """
You open your eyes and look around you, the darkness breaking way to the barest of light. As your eyes adjust you notice you are seated inside of a small circle with unlit candles all around you. Confused you look up and notice you are not alone, laying on the floor in front of you is a girl about your age splayed out and unmoving. As you slowly move forward she stirs and her eye snap open. “It worked…oh my; it worked.” She looks you in the eyes and says “I can’t believe it worked, you must be so confused. I am Elliana, and I summoned you here to help my world.” You look back at her, mouth dry and heart pounding, unsure whether to speak, run, or simply breathe.
""",

            "choices": {
                "1": {
                    "text": "\u201cYou summoned me? What does that even mean, where am I? Why me?\u201d",
                    "next_scene": "scene_002"
                },
                "2": {
                    "text": "You get up and run, as fast as your legs can handle, which honestly isn\u2019t that fast. You are feeling awful weak",
                    "next_scene": "scene_003"
                },
                "3": {
                    "text": "You close your eyes and take a deep breath, something you learned from your Dad, it always helped when you were worried",
                    "next_scene": "scene_004"
                }
            }
        },

        "scene_002": {
            "title": "Questions",

            "text": """
Ok, so you have a lot of questions, that’s fair. Yes, I summoned you and…as she is talking you notice her purple hair and fluffy tail….she has a tail!?!? Then you look closer at her eyes, they are a deep yellow with slits like a cat. As you look around you notice the air around her is glowing a deep blue…”Hello, are you listening?” Breaks you out of your revere at your environment
""",

            "choices": {
                "1": {
                    "text": "[I\u2019m sorry, you say. I drifted there for a second, can you explain this all again?]",
                    "next_scene": "scene_005",
                    "entry_intro": "asked_questions"
                }
            }
        },

        "scene_003": {
            "title": "The Barrier",

            "text": """
In a split second you are up and running towards the opening you saw but your legs betray you and you stumble forwards and hit the ground…hard, you look back and Elliana is staring at you with wide eyes. You get back to your feet and try to move again, finding the doorways ahead of you rush forwards as your legs pump, but are greeted with a clear almost glass like barrier. You rebound off the barrier and smash backwards into the ground. Slightly dazed you look back at Elliana.
""",

            "choices": {
                "1": {
                    "text": "Realizing you have no where to go, you head back to Elliana",
                    "next_scene": "scene_005",
                    "entry_intro": "ran_into_barrier"
                }
            }
        },

        "scene_004": {
            "title": "The Candle Flame",

            "text": """
As you breath, you picture a flame flickering in the dark, focusing on it makes you feel better, but it also strangely makes you feel a lot warmer. You look down and notice the candles are all alight. But how did that happen, you look up at Elliana.
""",

            "choices": {
                "1": {
                    "text": "Ok, well I hope you are going to explain what is going on here.",
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
        “I’m sorry,” Elliana says, rushing toward you. “You’re probably weak from the summoning, but I can’t let you run before we talk about this.”
""",
                "lit_candles": """
        Elliana stares at the candles, her yellow eyes wide. “You lit them,” she whispers. “But how did you do that, its impossible.”
"""
            },

            "text": """
Elliana, shakes her head to clear it and starts talking again, “well first things first,” Elliana says. “I summoned you here to help my world. As you can probably tell, things are a little different here.” Her tail flicks nervously. “For one thing, you look different from anyone I have ever met, where is your tail?”
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
                    "text": "Ask if she can just send you home",
                    "next_scene": "scene_008"
                }
            }
        },

        # Source has no numbered CHOICES list here, just '→ Leads to: SM_009'. Added a generic '(continue)' choice label since the engine needs button text - not part of your original prose.
        "scene_006": {
            "title": "What Help Is Needed",

            "text": """
Elliana takes a deep breath then starts to explain.

“My worlds magic is…dying,” she says. “Not all at once. Slowly. Quietly. And no one knows why.”

→ Leads to: SM_009 - The Seers' Prophecy
""",

            "choices": {
                "1": {
                    "text": "(continue)",
                    "next_scene": "scene_009"
                }
            }
        },

        # Same as scene_006 - generic '(continue)' label added for the same reason.
        "scene_007": {
            "title": "Why You",

            "text": """
“Well, I didn’t choose you exactly,” Elliana says.

She looks embarrassed.

“The spell was supposed to find someone who could help. Someone with a spark for magic strong enough to answer.”

→ Leads to: SM_009 - The Seers' Prophecy
""",

            "choices": {
                "1": {
                    "text": "(continue)",
                    "next_scene": "scene_009"
                }
            }
        },

        # Same as scene_006 - generic '(continue)' label added for the same reason.
        "scene_008": {
            "title": "Going Home",

            "text": """
Elliana’s ears lower. Wait, she can lower her ears…stop getting distracted.

“I understand,” she says softly. “I really do. But sending you home is not as simple as opening the door again.”

“The magic portal brought you here because something answered from your side. To send you back, we may need to find out what that something was.”

→ Leads to: SM_009 - The Seers' Prophecy
""",

            "choices": {
                "1": {
                    "text": "(continue)",
                    "next_scene": "scene_009"
                }
            }
        },

        # Confirmed shared/single text per your note - no entry_intros needed despite 3 incoming paths.
        # entry_intro tag 'Magic/Mage' is what's literally in the source; your top-level note mentions a 'Wow' entry intro instead - scene_010 has no entry_intros dict yet either way, so this is inert for now, just flagging the name mismatch in case it matters later.
        "scene_009": {
            "title": "The Seers' Prophecy",

            "text": """
You see, our seers foretold a summoned mage would come and put the world back on track. The problem was, no one knew the ritual. I went and gathered all the stories in the world and tried and tried until finally…finally…well…you!
""",

            "choices": {
                "1": {
                    "text": "Did you say, magic\u2026wait, hold on\u2026does this mean I\u2019m a mage?",
                    "next_scene": "scene_010",
                    "entry_intro": "Magic/Mage"
                }
            }
        },

        # Dead end as written - real prose, but no CHOICES section, matches your note that this is 'left exactly as incomplete as it was in the source.'
        "scene_010": {
            "title": "Am I a Mage",

            "text": """
“Did you say, magic…wait, hold on…does this mean I’m a mage?”
“It does, doesn’t it. If I was the one summoned…does that mean I can use magic?”
You walk over to Elliana, who is still sitting on the ground in the circle and reach down with your hand out. “I’m {hero_name}, Id love to hear more about this magic.”
Elliana, reaching out here hand grasps it in hers and lets out a breath she didn’t realize she was holding. “Does this mean you are willing to help?”
“Yes, I think…it is still a lot to be honest, but if I can’t get home without fixing this issue anyway I may as well jump right into it with you right?” I say as I turn around and fling out my hand like I am going to shoot a fireball.
""",

            "ending": True
        },

        # Text is your SYNOPSIS placeholder, not final prose - kept verbatim, navigation is fully wired since the destinations are decided.
        "scene_011": {
            "title": "Choose Your Element",

            "text": """
SYNOPSIS: Player poses and thinks of a spell: fire, lightning, or stone.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Pose and think of Fire",
                    "next_scene": "scene_012"
                },
                "2": {
                    "text": "Pose and think of Lightning",
                    "next_scene": "scene_013"
                },
                "3": {
                    "text": "Pose and think of Stone",
                    "next_scene": "scene_014"
                }
            }
        },

        # Text is your SYNOPSIS placeholder, not final prose.
        "scene_012": {
            "title": "Fire Spell Happens",

            "text": """
SYNOPSIS: The fire spell happens.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "(continues into)",
                    "next_scene": "scene_015"
                }
            }
        },

        # Text is your SYNOPSIS placeholder, not final prose.
        "scene_013": {
            "title": "Lightning Spell Happens",

            "text": """
SYNOPSIS: The lightning spell happens.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "(continues into)",
                    "next_scene": "scene_015"
                }
            }
        },

        # Text is your SYNOPSIS placeholder, not final prose.
        "scene_014": {
            "title": "Stone Bullet Spell Happens",

            "text": """
SYNOPSIS: The stone bullet spell happens.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "(continues into)",
                    "next_scene": "scene_015"
                }
            }
        },

        # Text is your SYNOPSIS placeholder. No entry_intros in source despite 3 incoming paths (Fire/Lightning/Stone) - treated as a clean shared merge, matching the SM_009 pattern.
        "scene_015": {
            "title": "The Spell Lands",

            "text": """
SYNOPSIS: Fire/Lightning/Stone merge back together after the spell lands. “Oh my goodness, I'm a MAGE.”

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Leave through the Door",
                    "next_scene": "scene_016"
                },
                "2": {
                    "text": "Leave through the Hole",
                    "next_scene": "scene_017"
                },
                "3": {
                    "text": "Teleport away",
                    "next_scene": "scene_018"
                }
            }
        },

        # Text is your SYNOPSIS placeholder. Added entry_intro tags matching the entry-point names YOU noted in SM_019/SM_025's synopsis, even though those scenes don't have entry_intros written yet - harmless now, saves you wiring it up later.
        "scene_016": {
            "title": "The Door",

            "text": """
SYNOPSIS: You leave with Elliana.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Take trail to town",
                    "next_scene": "scene_019",
                    "entry_intro": "from_door"
                },
                "2": {
                    "text": "Head towards Forest",
                    "next_scene": "scene_025",
                    "entry_intro": "from_door"
                }
            }
        },

        # Text is your SYNOPSIS placeholder.
        "scene_017": {
            "title": "The Hole",

            "text": """
SYNOPSIS: Leave the cave through a hole punched in the wall by accident - made by whichever spell the player cast (fire/lightning/stone).

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Walk out onto the mountains",
                    "next_scene": "scene_023",
                    "entry_intro": "from_hole"
                },
                "2": {
                    "text": "Head towards forest",
                    "next_scene": "scene_025",
                    "entry_intro": "from_hole"
                },
                "3": {
                    "text": "Go toward trail",
                    "next_scene": "scene_019",
                    "entry_intro": "from_hole"
                }
            }
        },

        # Text is your SYNOPSIS placeholder.
        "scene_018": {
            "title": "Teleport Away",

            "text": """
SYNOPSIS: Test your ability and teleport.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Try to teleport back",
                    "next_scene": "scene_028"
                },
                "2": {
                    "text": "Explore your surroundings (forest)",
                    "next_scene": "scene_025",
                    "entry_intro": "from_teleport"
                }
            }
        },

        # Text is your SYNOPSIS placeholder, includes your 'possible entry points (not yet written)' note verbatim.
        # GAP: scene_027 ('Run From Animals') also has a choice leading here ('Follow trail to town') that isn't among the 3 entry points you listed (from_door/from_hole/from_mountains) - didn't invent a 4th key, just left that one incoming link untagged. Worth a look.
        "scene_019": {
            "title": "Trail to Town",

            "text": """
SYNOPSIS: Reused destination, reached via Door, Hole, and Mountains' "make way down to trail" reuse (3 routes total).

Possible entry points (not yet written): from_door, from_hole, from_mountains

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Attack bandits with magic",
                    "next_scene": "scene_020"
                },
                "2": {
                    "text": "Try to escape",
                    "next_scene": "scene_021"
                },
                "3": {
                    "text": "Leave it to Elliana",
                    "next_scene": "scene_022"
                }
            }
        },

        # All 3 choices are '(not yet decided)' in source - no valid destinations exist yet, so this is a dead end for now, same treatment as your existing scene_006/007/008 stubs.
        "scene_020": {
            "title": "Attack Bandits",

            "text": """
SYNOPSIS: How the player attacks - not yet decided which of these become separate paths vs flavor text.

(not yet written)
""",

            "ending": True
        },

        # Only choice is '(not yet decided)' - dead end for now.
        "scene_021": {
            "title": "Try to Escape",

            "text": """
SYNOPSIS: Open thread - only "Fight" noted so far.

(not yet written)
""",

            "ending": True
        },

        # Only choice is '(not yet decided)' - dead end for now.
        "scene_022": {
            "title": "Leave It to Elliana",

            "text": """
SYNOPSIS: Open thread - only "Continue to town" noted so far.

(not yet written)
""",

            "ending": True
        },

        # Text is your SYNOPSIS placeholder.
        "scene_023": {
            "title": "Mountains",

            "text": """
SYNOPSIS: Reached by leaving through the Hole.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Check rock slide",
                    "next_scene": "scene_024"
                },
                "2": {
                    "text": "Make way down to trail",
                    "next_scene": "scene_019",
                    "entry_intro": "from_mountains"
                }
            }
        },

        # Source explicitly says '(no further choices mapped yet)' - dead end for now.
        "scene_024": {
            "title": "Check Rock Slide",

            "text": """
SYNOPSIS: Mostly crossed out/undecided in the notes - open thread.

(not yet written)

(no further choices mapped yet)
""",

            "ending": True
        },

        # Text is your SYNOPSIS placeholder, includes your 'possible entry points (not yet written)' note verbatim.
        # GAP: scene_028 ('Teleport Back') also leads here and isn't among the 3 entry points you listed (from_door/from_hole/from_teleport) - didn't invent a 4th key, left that incoming link untagged. Worth a look.
        "scene_025": {
            "title": "Forest",

            "text": """
SYNOPSIS: Reused destination - noted as "3 unique intros": from the Door (head towards forest), from the Hole (head towards forest), and from Teleport (explore your surroundings).

Possible entry points (not yet written): from_door, from_hole, from_teleport

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Look for yelling person",
                    "next_scene": "scene_026"
                },
                "2": {
                    "text": "Run from Animals",
                    "next_scene": "scene_027"
                }
            }
        },

        # Both choices are '(not yet decided)' - dead end for now.
        "scene_026": {
            "title": "Look for Yelling Person",

            "text": """
SYNOPSIS: Crossed out: an idea about finding a young woman. Surviving options below.

(not yet written)
""",

            "ending": True
        },

        # Source has 2 choices; 'Fight back' is '(not yet decided)' and was dropped for now (no valid destination to route to) - only the working choice is included, renumbered to 1. Add the second choice back in once its destination is decided.
        "scene_027": {
            "title": "Run From Animals",

            "text": """
SYNOPSIS: Open thread.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Follow trail to town",
                    "next_scene": "scene_019"
                }
            }
        },

        # Text is your SYNOPSIS placeholder.
        "scene_028": {
            "title": "Teleport Back",

            "text": """
SYNOPSIS: Leads straight back into the Forest scene.

(not yet written)
""",

            "choices": {
                "1": {
                    "text": "Explore Forest",
                    "next_scene": "scene_025"
                }
            }
        },

    }
}
