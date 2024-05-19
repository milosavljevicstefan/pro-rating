// data/businesses.ts

interface BusinessDetails {
    image: string;
    ownerEmail: string;
    googleLink: string;
  }
  
  export const businessDetails: { [key: string]: BusinessDetails } = {
    "PizzaPlace": {
      image: "/caribic-picerija.png",
      ownerEmail: "owner@pizzaplace.com",
      googleLink: "https://maps.google.com/?q=Pizza+Place"
    },
    "CoffeeShop": {
      image: "/caribic-picerija.png",
      ownerEmail: "owner@coffeeshop.com",
      googleLink: "https://maps.google.com/?q=Coffee+Shop"
    },
    // Add more businesses as needed
  };
  