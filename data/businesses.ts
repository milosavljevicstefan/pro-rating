// data/businesses.ts

interface BusinessDetails {
    image: string;
    ownerEmail: string;
    googleLink: string;
    language: string;
    primaryColor: string;
    secondaryColor: string;
  }
  
  export const businessDetails: { [key: string]: BusinessDetails } = {
    "PizzaPlace": {
      image: "/images/caribic-picerija.png",
      ownerEmail: "owner@pizzaplace.com",
      googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGc",
      language: "srb",
      primaryColor: "#FF6347", // Tomato red
      secondaryColor: "#FFD700" // Gold
    },
    "CoffeeShop": {
      image: "/images/caribic-picerija.png",
      ownerEmail: "stefan.milosavljevic01@gmail.com",
      googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
      language: "en",
      primaryColor: "#6F4E37", // Coffee brown
      secondaryColor: "#C0C0C0" // Silver
    },
    "Camelot": {
      image: "/images/camelot.png",
      ownerEmail: "milosavljevicstefan555@gmail.com",
      googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
      language: "srb",
      primaryColor: "#C0C0C0",
      secondaryColor: "#6F4E37" 
    }
    // Add more businesses as needed
  };
  