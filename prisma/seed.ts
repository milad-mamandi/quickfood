import { prisma } from "../lib/prisma";

const restaurants = ["Blue Diamond", "The Oyster Club", "Imperial Choice", "Delectable Delights", "Luxe Cuisine", "Taste Of Eden", "The Red Lion", "Sheer Delight", "Translucent", "The Ambrosia", "Starry Night", "The Hidden Gem", "Peacock House", "Vino Veritas", "Escarole Exquisite", "The Golden Eggplant", "Splendid Taste", "The Godfather’s Eatery", "The Tempting Pear", "Fantastic Eats", "The Secret Lair", "The Discreet Diner", "The Five Star Affair", "The Millionaire’s Menu", "The Epicurean", "Chefs on Fire", "Spaghetti Works", "The Blue Lagoon", "The Cajun Quail", "Aroma Kitchen", "Munchy Bites", "The Foodie Studio", "The Vibrant Rhubarb", "Delectable Bistro", "The Gilded Lobster", "Eatery of the Gods", "The Great Steakout", "The Chilli Grill", "The Grapevine", "Cafe Maximus", "Fondue Foray", "Simply Divine Dining", "Prime Time Eats", "The Luscious Peach", "Nectar & Vine", "The Cactus Club", "Cafe Lumiere", "The Happy Cow", "The White Hart", "Prime Steakhouse"]
const addresses = ["770 Jennings Street", "Bronx, NY 10456", "7142 SE. Pin Oak Dr.", "Brooklyn, NY 11225", "710 Purple Finch Dr.", "Spring Valley, NY 10977", "576B Mulberry Lane", "Bronx, NY 10466", "5 Cactus St.", "Bronx, NY 10452", "9327 Fordham Rd.", "Brooklyn, NY 11223", "7917 North Kent St.", "Bronx, NY 10457", "9635 Wellington St.", "Bronx, NY 10469", "104 St Margarets Court", "New York, NY 10002", "79 Broad Court", "New York, NY 10024", "8955 South St.", "Brooklyn, NY 11213", "7496 Old Beacon Ave.", "Brooklyn, NY 11210", "231 Tower Street", "Jamaica, NY 11432", "469 Summerhouse Drive", "Bronx, NY 10472", "7500 Westminster St.", "Brooklyn, NY 11234", "279 Halifax Ave.", "Bronx, NY 10473", "8198 Court St.", "Brooklyn, NY 11223", "24 Oak Court", "West Babylon, NY 11704", "993 Baker Court", "Unit 129", "Fresh Meadows, NY 11365", "609 Homestead Ave.", "Ridgewood, NY 11385", "636 South Leatherwood St.", "Bronx, NY 10467", "25 South Beechwood St.", "Jamestown, NY 14701", "874 Elmwood St.", "Brooklyn, NY 11235", "9 Bay Meadows St.", "South Ozone Park, NY 11420", "68 Border Lane", "Brooklyn, NY 11216"]
const Seed = async () => {
    for (let i = 0; i < restaurants.length; i++) {
        await prisma.store.create({
            data: {
                address: addresses[i],
                delivery_fee: 3,
                name: restaurants[i],
                open_time: '08-23',
                rating: Math.floor(Math.random() * 2 + 2)
            }
        })
    }
}

Seed()
    .then(async () => {

        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    })