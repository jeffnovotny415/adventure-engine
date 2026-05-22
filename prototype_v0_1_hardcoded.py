print("Welcome to Adventure Engine")
hero_name = input("What is your hero's name? ")

print(f"Welcome, {hero_name}!")
world_name = input("What would you like to name your world? ")

print(f"{world_name}! That is a good name!")
print("What kind of world is it?")
print("1. Magical Forest Kingdom")
print("2. High Tech City with Robots")
print("3. A Kingdom in the Stars")

world_type = input("Choose 1, 2, or 3: ")

while world_type not in ["1", "2", "3"]:
    print("Hmm, that wasn't one of the choices. Try again!")
    world_type = input("Choose 1, 2, or 3: ")

if world_type == "1":
    world_type_name = "Magical Forest Kingdom"
    world_description = "a magical forest kingdom full of ancient trees, elves, dragons, and hidden treasures"
elif world_type == "2":
    world_type_name = "High-Tech City with Robots"
    world_description = "a high-tech city buzzing with robots, neon lights, and superheroes"
elif world_type == "3":
    world_type_name = "Kingdom in the Stars"
    world_description = "a kingdom in the stars, floating among planets and glowing moons"

print(f"Outstanding. {world_name} is a {world_type_name}.")
print(f"{hero_name} steps through a glowing portal into {world_name}, {world_description}.")

if world_type == "1":
    choice_1 = "Follow a trail of glowing mushrooms"
    choice_2 = "Climb an ancient tree tower"
    choice_3 = "Approach a sleeping dragon"

elif world_type == "2":
    choice_1 = "Enter the neon night market"
    choice_2 = "Follow the tiny repair drone"
    choice_3 = "Go into the superhero command center"

elif world_type == "3":
    choice_1 = "Walk across the moonstone bridge"
    choice_2 = "Board a tiny space ship"
    choice_3 = "Follow a comet trail toward the giant starship"

print()
print("Your hero looks around and sees three possible paths.")
print(f"1. {choice_1}")
print(f"2. {choice_2}")
print(f"3. {choice_3}")

first_choice = input("Choose 1, 2, or 3: ")

while first_choice not in ["1", "2", "3"]:
    print("Hmm, that wasn't one of the choices. Try again!")
    first_choice = input("Choose 1, 2, or 3: ")