module.exports = {
  plugins: [
     // Your other plugins...
     `gatsby-plugin-mdx`,
     {
       resolve: `gatsby-source-filesystem`,
       options: {
         name: `pages`,
         path: `${__dirname}/src/pages`,
       },
     },
     {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
 
  ],
}