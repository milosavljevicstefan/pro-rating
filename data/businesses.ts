export interface BusinessDetails {
  image: string;
  ownerEmail: string;
  googleLink: string;
  languages: string[];
  backgroundColor: string;
  textColor: string;
}

export const businessDetails: { [key: string]: BusinessDetails } = {
  "PizzaPlace": {
    image: "/images/caribic-picerija.png",
    ownerEmail: "owner@pizzaplace.com",
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGc",
    languages: ["srb"],
    backgroundColor: "#FF6347", // Tomato red
    textColor: "#FFD700" // Gold
  },
  "CoffeeShop": {
    image: "/images/caribic-picerija.png",
    ownerEmail: "stefan.milosavljevic01@gmail.com",
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
    languages: ["en", "srb"],
    backgroundColor: "#6F4E37", // Coffee brown
    textColor: "#C0C0C0" // Silver
  },
  "Camelot": {
    image: "/images/camelot.png",
    ownerEmail: "milosavljevicstefan555@gmail.com",
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
    languages: ["srb"],
    backgroundColor: "#C0C0C0", // Silver
    textColor: "#6F4E37" // Coffee brown
  }
  // Add more businesses as needed
};
