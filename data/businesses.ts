import { BusinessDetails } from "@/types";

export const businessDetails: { [key: string]: BusinessDetails } = {
  "PizzaPlace": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["owner@pizzaplace.com"],
    googleLink: "https://www.google.com/search?q=caribic+picerija+trg+carice+milice&sca_esv=b085d2a81de27599&sca_upv=1&sxsrf=ADLYWIJSlr3iUr3JMZFAPnlq6lNaL1TOiw%3A1717272161247&ei=YX5bZpr1DeOF9u8PwZSHkAY&udm=&oq=caribic&gs_lp=Egxnd3Mtd2l6LXNlcnAiB2NhcmliaWMqAggAMgQQIxgnMgoQIxiABBgnGIoFMhMQLhiABBjHARgnGIoFGI4FGK8BMgoQIxiABBgnGIoFMhEQLhiABBjHARjLARiOBRivATIREC4YgAQYxwEYywEYjgUYrwEyERAuGIAEGMcBGMsBGI4FGK8BMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBSN0hUMwGWOwacAJ4AZABAJgBqAGgAfYIqgEDMC44uAEDyAEA-AEBmAIKoAK2CagCEcICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIFEAAYgATCAgsQLhiABBjRAxjHAcICBxAjGCcY6gLCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIMECMYgAQYExgnGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICChAAGIAEGEMYigXCAgsQLhiABBjHARivAcICBRAuGIAEwgIKEC4YgAQYQxiKBcICCBAuGIAEGMsBwgIUEC4YgAQYxwEYmAUYmgUYywEYrwGYAxKIBgGQBgq6BgYIARABGAGSBwMyLjigB4WjAQ&sclient=gws-wiz-serp#lrd=0x475b106b3a3fffff:0x8a446e43c230a3bd,3,,,,",
    languages: ["srb", "ro"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#FF6347", // Tomato red
    textColor: "#FFFFFF"
  },
  "CoffeeShop": {
    image: "/images/caribic-picerija.png",
    ownerEmails: ["stefan.milosavljevic01@gmail.com", "milosavljevicstefan555@gmail.com"],
    googleLink: "https://www.google.com/search?q=caribic+picerija+trg+carice+milice&sca_esv=b085d2a81de27599&sca_upv=1&sxsrf=ADLYWIJSlr3iUr3JMZFAPnlq6lNaL1TOiw%3A1717272161247&ei=YX5bZpr1DeOF9u8PwZSHkAY&udm=&oq=caribic&gs_lp=Egxnd3Mtd2l6LXNlcnAiB2NhcmliaWMqAggAMgQQIxgnMgoQIxiABBgnGIoFMhMQLhiABBjHARgnGIoFGI4FGK8BMgoQIxiABBgnGIoFMhEQLhiABBjHARjLARiOBRivATIREC4YgAQYxwEYywEYjgUYrwEyERAuGIAEGMcBGMsBGI4FGK8BMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBSN0hUMwGWOwacAJ4AZABAJgBqAGgAfYIqgEDMC44uAEDyAEA-AEBmAIKoAK2CagCEcICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIFEAAYgATCAgsQLhiABBjRAxjHAcICBxAjGCcY6gLCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIMECMYgAQYExgnGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICChAAGIAEGEMYigXCAgsQLhiABBjHARivAcICBRAuGIAEwgIKEC4YgAQYQxiKBcICCBAuGIAEGMsBwgIUEC4YgAQYxwEYmAUYmgUYywEYrwGYAxKIBgGQBgq6BgYIARABGAGSBwMyLjigB4WjAQ&sclient=gws-wiz-serp#lrd=0x475b106b3a3fffff:0x8a446e43c230a3bd,3,,,,",
    languages: ["en", "srb"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#6F4E37", // Coffee brown
    textColor: "#000000"
  },
  "Camelot": {
    image: "/images/camelot.png",
    ownerEmails: ["milosavljevicstefan555@gmail.com", "stefan.milosavljevic01@gmail.com"],
    googleLink: "https://www.google.com/search?q=caribic+picerija+trg+carice+milice&sca_esv=b085d2a81de27599&sca_upv=1&sxsrf=ADLYWIJSlr3iUr3JMZFAPnlq6lNaL1TOiw%3A1717272161247&ei=YX5bZpr1DeOF9u8PwZSHkAY&udm=&oq=caribic&gs_lp=Egxnd3Mtd2l6LXNlcnAiB2NhcmliaWMqAggAMgQQIxgnMgoQIxiABBgnGIoFMhMQLhiABBjHARgnGIoFGI4FGK8BMgoQIxiABBgnGIoFMhEQLhiABBjHARjLARiOBRivATIREC4YgAQYxwEYywEYjgUYrwEyERAuGIAEGMcBGMsBGI4FGK8BMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBSN0hUMwGWOwacAJ4AZABAJgBqAGgAfYIqgEDMC44uAEDyAEA-AEBmAIKoAK2CagCEcICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIFEAAYgATCAgsQLhiABBjRAxjHAcICBxAjGCcY6gLCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIMECMYgAQYExgnGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICChAAGIAEGEMYigXCAgsQLhiABBjHARivAcICBRAuGIAEwgIKEC4YgAQYQxiKBcICCBAuGIAEGMsBwgIUEC4YgAQYxwEYmAUYmgUYywEYrwGYAxKIBgGQBgq6BgYIARABGAGSBwMyLjigB4WjAQ&sclient=gws-wiz-serp#lrd=0x475b106b3a3fffff:0x8a446e43c230a3bd,3,,,,",
    languages: ["srb"],
    reward: true,
    rewardText: 'test pizzaplace',
    backgroundColor: "#C0C0C0", // Silver
    textColor: "#FFFFFF"
  }
  // Add more businesses as needed
};
