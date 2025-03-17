const path = require("path");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });

console.log("CONTENTFUL_SPACE_ID:", process.env.CONTENTFUL_SPACE_ID);
console.log("CONTENTFUL_ACCESS_TOKEN:", process.env.CONTENTFUL_ACCESS_TOKEN);

module.exports = {
  siteMetadata: {
    title: "Rohit Gupta",
    description: "Personal Site",
    author: "@rohitguptab",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.resolve(__dirname, "src/images"),
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Rohit Gupta",
        short_name: "Rohit Gupta",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#333",
        icon: "src/images/fev_icon.png",
      },
    },
    "gatsby-plugin-offline",
  ],
};