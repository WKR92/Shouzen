import redNikes from "../photos/transparentBg_red-nikes.png";
import blueNike from  "../photos/blueNike.png";
import orangeNikes from "../photos/transparentBg_orange_nikes2.png";
import blackAndWhiteNikes from "../photos/black_nike.png";

const products =[
    {
        "name"          : "Blue Nikes",
        "id"            : "Blue_Nikes",
        "price"         : 73,
        "picture"       : blueNike,
        "amount"        : 90,
        "amountToOrder" : 0,
        "headline"      : "For those who measure higher",
        "description"   : "Become skywalker and run for your dreams in those light as cloud sneakers.",
        "callToAction"  : "Try them now."
    },
    {
        "name"          : "Orange Nikes",
        "id"            : "Orange_Nikes",
        "price"         : 81,
        "picture"       : orangeNikes,
        "amount"        : 40,
        "amountToOrder" : 0,
        "headline"      : "Better known as urban legends.",
        "description"   : "If you fit them, you will become the spirit of the city.",
        "callToAction"  : "Fear no concrete jungle. Make the city yours."

    },
    {
        "name"          : "Red Nikes",
        "id"            : "Red_Nikes",
        "price"         : 92,
        "picture"       : redNikes,
        "amount"        : 120,
        "amountToOrder" : 0,
        "headline"      : "Make your city life intense.",
        "description"   : "The night is coming. Bring the fire to your everyday reality.",
        "callToAction"  : "Put them on. Light it up."
    },
    {
        "name"          : "Black and White Nikes",
        "id"            : "Black_and_White_Nikes",
        "price"         : 67,
        "picture"       : blackAndWhiteNikes,
        "amount"        : 83,
        "amountToOrder" : 0,
        "headline"      : "To combine comfort and elegance.",
        "description"   : "Almost like your second feet - but classy. Be ready wherever you go.",
        "callToAction"  : "Just slide in them."
    }
]
export default products;