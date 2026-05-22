import json
import os


# ----------------------------
# SAVE FILE SETTINGS
# ----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVE_DIR = os.path.join(BASE_DIR, "saves")
SAVE_FILE = os.path.join(SAVE_DIR, "save_slot_1.json")


# ----------------------------
# SAVE / LOAD FUNCTIONS
# ----------------------------

def save_game(save_data):
    os.makedirs(SAVE_DIR, exist_ok=True)

    with open(SAVE_FILE, "w") as file:
        json.dump(save_data, file, indent=4)


def load_game():
    if not os.path.exists(SAVE_FILE):
        return None

    with open(SAVE_FILE, "r") as file:
        return json.load(file)


def clear_save():
    if os.path.exists(SAVE_FILE):
        os.remove(SAVE_FILE)


# ----------------------------
# ENGINE FUNCTIONS
# ----------------------------

def choose_story(stories):
    print()
    print("Choose your adventure:")
    print()

    for story_number, story_data in stories.items():
        title = story_data["title"]
        description = story_data.get("description", "No description yet.")
        theme = story_data.get("theme", "unknown")

        print(f"{story_number}. {title}")
        print(f"   {description}")
        print(f"   Theme: {theme}")
        print()

    story_choice = input("Choose a story: ")

    while story_choice not in stories:
        print("Hmm, that wasn't one of the choices. Try again!")
        story_choice = input("Choose a story: ")

    return story_choice, stories[story_choice]


def setup_player():
    print("Welcome to Adventure Engine")
    print()

    hero_name = input("What is your hero's name? ")
    world_name = input("What would you like to name your world? ")

    player = {
        "hero_name": hero_name,
        "world_name": world_name
    }

    return player


def show_scene(scene, hero_name, world_name, current_entry_intro):
    print()
    print(f"--- {scene['title']} ---")
    print()

    if current_entry_intro and "entry_intros" in scene:
        intro_text = scene["entry_intros"].get(current_entry_intro)

        if intro_text:
            print(intro_text.format(hero_name=hero_name, world_name=world_name))

    print(scene["text"].format(hero_name=hero_name, world_name=world_name))


def show_choices(choices):
    for choice_number, choice_data in choices.items():
        print(f"{choice_number}. {choice_data['text']}")


def get_valid_choice(choices):
    valid_choices = ", ".join(choices.keys())

    player_choice = input(f"Choose {valid_choices}: ")

    while player_choice not in choices:
        print("Hmm, that wasn't one of the choices. Try again!")
        player_choice = input(f"Choose {valid_choices}: ")

    return player_choice


def play_story(story, story_id, save_data=None):
    if save_data:
        print()
        print("Loading saved adventure...")

        hero_name = save_data["hero_name"]
        world_name = save_data["world_name"]
        current_scene_id = save_data["current_scene_id"]
        current_entry_intro = save_data["current_entry_intro"]

    else:
        player = setup_player()

        hero_name = player["hero_name"]
        world_name = player["world_name"]
        current_scene_id = story["start_scene"]
        current_entry_intro = None

    while True:
        scene = story["scenes"][current_scene_id]

        show_scene(scene, hero_name, world_name, current_entry_intro)

        if scene.get("ending") == True:
            print()
            print("The End.")
            clear_save()
            break

        choices = scene["choices"]

        print()
        input("Press Enter when you're ready to see your choices...")
        print()

        show_choices(choices)

        player_choice = get_valid_choice(choices)

        selected_choice = choices[player_choice]

        current_scene_id = selected_choice["next_scene"]
        current_entry_intro = selected_choice.get("entry_intro")

        save_data = {
            "story_id": story_id,
            "hero_name": hero_name,
            "world_name": world_name,
            "current_scene_id": current_scene_id,
            "current_entry_intro": current_entry_intro
        }

        save_game(save_data)


def show_welcome_menu(has_save):
    print()
    print("==============================")
    print("   Welcome to Adventure Engine")
    print("==============================")
    print()

    if has_save:
        print("1. Continue Adventure")
        print("2. Start New Adventure")
        print("3. Quit")

        menu_choice = input("Choose an option: ")

        while menu_choice not in ["1", "2", "3"]:
            print("Hmm, that wasn't one of the choices. Try again!")
            menu_choice = input("Choose an option: ")

    else:
        print("1. Start New Adventure")
        print("2. Quit")

        menu_choice = input("Choose an option: ")

        while menu_choice not in ["1", "2"]:
            print("Hmm, that wasn't one of the choices. Try again!")
            menu_choice = input("Choose an option: ")

    return menu_choice


def start_new_game(stories):
    clear_save()
    story_id, selected_story = choose_story(stories)
    play_story(selected_story, story_id)


def start_game(stories):
    saved_game = load_game()
    has_save = saved_game is not None

    menu_choice = show_welcome_menu(has_save)

    if has_save:
        if menu_choice == "1":
            story_id = saved_game["story_id"]
            story = stories[story_id]
            play_story(story, story_id, saved_game)

        elif menu_choice == "2":
            start_new_game(stories)

        elif menu_choice == "3":
            print()
            print("See you next time!")

    else:
        if menu_choice == "1":
            start_new_game(stories)

        elif menu_choice == "2":
            print()
            print("See you next time!")