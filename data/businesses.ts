import { BusinessDetails } from "@/types";

export const businessDetails: { [key: string]: BusinessDetails } = {
  "PizzaPlace": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["owner@pizzaplace.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJmSXJPQ5wWkcRgBl2_qXGdpc",
    languages: ["srb", "ro"],
    reward: false,
    rewardText: 'nagrada pizzaplace',
    backgroundColor: "#FF6347", // Tomato red
    textColor: "#FFFFFF"
  },
  "CoffeeShop": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["stefan.milosavljevic01@gmail.com", "milosavljevicstefan555@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJmSXJPQ5wWkcRgBl2_qXGdpc",
    languages: ["en", "srb"],
    reward: true,
    rewardText: 'nagrada coffeeshop',
    backgroundColor: "#6F4E37", // Coffee brown
    textColor: "#000000"
  },
  "Camelot": {
    image: "/images/camelot.png",
    ownerEmails: ["milosavljevicstefan555@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJmSXJPQ5wWkcRgBl2_qXGdpc",
    languages: ["srb"],
    reward: true,
    rewardText: 'nagrada camelot',
    backgroundColor: "#C0C0C0", // Silver
    textColor: "#FFFFFF"
  },
  "test": {
    image: "/images/camelot.png",
    ownerEmails: ["darko.jocic.ns@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJmSXJPQ5wWkcRgBl2_qXGdpc",
    languages: ["srb"],
    reward: true,
    rewardText: 'nagrada testa',
    backgroundColor: "#C0C0C0", // Silver
    textColor: "#FFFFFF"
  },
  "crveni-cot": {
    image: "/images/crveni-cot.png",
    ownerEmails: ["darko.jocic.ns@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJmSXJPQ5wWkcRgBl2_qXGdpc",
    languages: ["gg"],
    reward: true,
    rewardText: 'nagrada cot',
    backgroundColor: "#e8f4fc", // Silver
    textColor: "#000000"
  },
  "hvmzm": {
    image: "/images/HVMZM logo ls.png",
    ownerEmails: ["darko.jocic.ns@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJVRXIjNh3nkcRUqXPsNscmO0",
    languages: ["de"],
    reward: true,
    rewardText: 'Ako u narednih mesec dana dovedete novog polaznika na sledeci kurs imate 50% popusta!',
    backgroundColor: "#FFFFFFF", // Silver
    textColor: "#000000"
  }
};
