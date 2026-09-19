# Adventure Engine

> **Current app: Paths of Wonder.** Development is in [`webapp/`](webapp/README.md),
> designed for landscape iPhone and iPad reading. V1 uses entirely authored
> stories; AI-generated storytelling is reserved for a separate V2 release.
> The responsive web app does not yet include a native iOS wrapper.
> The sections below describe the original Python prototype. See the
> [web-app guide](webapp/README.md) for setup, checks, and release requirements.

A branching interactive fiction engine built in Python. Write a story world once — scenes, choices, and paths — and the engine handles the rest.

## Why I Built This

I wanted to create something my son Ollie could actually experience. He's nine. He reads the stories, tells me what he wants to happen next, and I go build it. What started as a weekend project turned into a real engine with a clean architecture I keep coming back to.

The stories themselves are mine — written from scratch, with Ollie as the audience and first critic. The engine logic is my own Python work, developed with AI as a thinking partner and debugging assistant along the way.

It also turned out to be a genuinely interesting design problem: how do you separate story content from story logic cleanly enough that adding new scenes doesn't require touching the engine? That question drove most of the structural decisions here.

## How It Works

The engine runs on three files:

- **engine.py** — the core runtime. Handles scene loading, player input, choice validation, and state tracking. Knows nothing about the story itself.
- **scenes.py** — the story content. Each scene has an ID, descriptive text, and a list of choices that map to other scene IDs. Adding a new scene means adding to this file only.
- **main.py** — the entry point. Initializes the engine, loads the story, and starts the loop.

The separation means the engine is reusable. Swap in a different scenes file and you have a different story. The engine doesn't care.

## Running It

```bash
python main.py
```

No dependencies beyond the Python standard library.

## What's Next

The current engine is an authored experience — the story worlds, scenes, and branching paths are all written by me. The reader makes choices, but the content is fixed. I plan to add more stories as I write them

The next version flips that. The plan is to connect the engine to the Claude API so kids can have real creative freedom inside a structured world — I write the bones, define the rules, and set the guardrails, and the AI helps them actually build and explore the story themselves. The architecture is designed for this: the engine already separates content from logic cleanly, so plugging in a generative layer is a natural next step rather than a rebuild.

The goal is something a nine-year-old can use to write their own stories without running into content that shouldn't be there — creative freedom with the right walls around it.

## About

Built by Jeff Novotny — writer, builder, and dad. More at [github.com/jeffnovotny415](https://github.com/jeffnovotny415).
