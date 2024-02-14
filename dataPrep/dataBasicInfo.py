import requests
import json

path = "./test.json"


def getNumberFromPokedex():
    outputData = []
    with open(path, "r") as file:
        data = file.read()
        dataJson = json.loads(data)
    print(len(dataJson))
    for i in range(len(dataJson)):
        print(f"{dataJson[i]['name']} is the pokémon number {dataJson[i]['id']}")
        outputData.append(
            {
                "prompt": "What is the number of " + dataJson[i]["name"] + "?",
                "answer": "The number in the pokedex of "
                + dataJson[i]["name"]
                + " is "
                + str(dataJson[i]["id"]),
            }
        )
        print(outputData)

    outputData = json.dumps(outputData)
    with open("./json/NumberPokedex.json", "w") as outfile:
        outfile.write(outputData)


def getTypesOfPokemons():
    outputData = []
    with open(path, "r") as file:
        data = file.read()
        dataJson = json.loads(data)
    print(len(dataJson))
    for i in range(len(dataJson)):
        if len(dataJson[i]["types"]) == 1:
            outputData.append(
                {
                    "prompt": "What's the type of " + dataJson[i]["name"] + "?",
                    "answer": "The type of "
                    + dataJson[i]["name"]
                    + " is "
                    + dataJson[i]["types"][0],
                }
            )
        elif len(dataJson[i]["types"]) == 2:
            outputData.append(
                {
                    "prompt": "What's the type of " + dataJson[i]["name"] + "?",
                    "answer": dataJson[i]["name"]
                    + " is a"
                    + dataJson[i]["types"][0]
                    + "/"
                    + dataJson[i]["types"][1]
                    + " type",
                }
            )
        elif len(dataJson[i]["types"]) == 3:
            outputData.append(
                {
                    "prompt": "What's the type of " + dataJson[i]["name"] + "?",
                    "answer": dataJson[i]["name"]
                    + " is a"
                    + dataJson[i]["types"][0]
                    + "/"
                    + dataJson[i]["types"][1]
                    + "/"
                    + dataJson["types[2]"]
                    + " type",
                }
            )
        print(outputData)

    outputData = json.dumps(outputData)
    with open("./json/TypesPokemon.json", "w") as outfile:
        outfile.write(outputData)


if __name__ == "__main__":
    # getNumberFromPokedex()
    getTypesOfPokemons()


# a Python object (dict):
x = {"name": "John", "age": 30, "city": "New York"}

# convert into JSON:
y = json.dumps(x)
