import { BusinessDetails } from "@/types";

export const businessDetails: { [key: string]: BusinessDetails } = {
  "PizzaPlace": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["owner@pizzaplace.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGc",
    languages: ["srb", "ro"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#FF6347", // Tomato red
    textColor: "#FFFFFF"
  },
  "CoffeeShop": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["stefan.milosavljevic01@gmail.com", "milosavljevicstefan555@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
    languages: ["en", "srb"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#6F4E37", // Coffee brown
    textColor: "#000000"
  },
  "Camelot": {
    image: "/images/camelot.png",
    ownerEmails: ["milosavljevicstefan555@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
    languages: ["srb"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#C0C0C0", // Silver
    textColor: "#FFFFFF"
  }
  // Add more businesses as needed
};
