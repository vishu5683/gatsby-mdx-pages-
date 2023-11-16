const path = require("path");
const postTemplate = path.resolve(`./src/templates/post.jsx`);
const testTemplate = path.resolve(`./src/templates/test.jsx`);
const policyTemplate = path.resolve(`./src/templates/policy.jsx`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { contenType: { in: ["text", "blog", "policy"] } } }) {
        nodes {
          id
          frontmatter {
            slug
            contenType
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach(node => {
    const contentType = node.frontmatter.contentType;
    const template = contentType === "test" ? testTemplate : contentType === "blog" ? postTemplate : policyTemplate;

    createPage({
      path: node.frontmatter.slug,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};
