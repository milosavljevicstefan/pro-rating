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
      image: "/caribic-picerija.png",
      ownerEmail: "owner@pizzaplace.com",
      googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGc",
      language: "srb",
      primaryColor: "#FF6347", // Tomato red
      secondaryColor: "#FFD700" // Gold
    },
    "CoffeeShop": {
      image: "/caribic-picerija.png",
      ownerEmail: "owner@coffeeshop.com",
      googleLink: "https://search.google.com/local/writereview?placeid=ChIJ22HMobawVUcRrFM3OthfQGcp",
      language: "en",
      primaryColor: "#6F4E37", // Coffee brown
      secondaryColor: "#C0C0C0" // Silver
    },
    // Add more businesses as needed
  };
  