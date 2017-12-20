const parseFilepath = require('parse-filepath');
const path = require('path');
const slash = require('slash');
const createPaginatedPages = require('gatsby-paginate');

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      });

      break;
  }
  return config;
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = parseFilepath(fileNode.relativePath);

    const slug = `/${parsedFilePath.dir}`;
    createNodeField({ node, name: 'slug', value: slug });
  }
};

const createTagPages = (createPage, edges) => {
  const tagTemplate = path.resolve(`src/templates/tags.js`);
  const posts = {};
  console.log("creating posts");

  edges
    .forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags
          .forEach(tag => {
            if (!posts[tag]) {
              posts[tag] = [];
            }
            posts[tag].push(node);
          });
      }
    });

  createPage({
    path: '/tags',
    component: tagTemplate,
    context: {
      posts
    }
  });

  Object.keys(posts)
    .forEach(tagName => {
      const post = posts[tagName];
      createPage({
        path: `/tags/${tagName}`,
        component: tagTemplate,
        context: {
          posts,
          post,
          tag: tagName
        }
      })
    });
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(
      'src/templates/blog-post-template.js'
    );
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {fields: {slug: {regex: "/blog/" }}}) {
              edges {
                node {
                  id
                  excerpt(pruneLength: 200)
                  timeToRead
                  frontmatter {
                    title
                    tags
                    date(formatString: "MMMM DD, YYYY")
                    imgdesc
                    image {
                      childImageSharp {
                        resize(width: 300, height: 200, cropFocus: ENTROPY) {
                          src
                        }
                      }
                    }
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.error) {
          reject(result.error);
        }

        const posts = result.data.allMarkdownRemark.edges;
        createTagPages(createPage, posts);

        posts.forEach((post, index) => {

          createPaginatedPages({
            edges: posts,
            createPage: createPage,
            pageTemplate: "src/templates/blog.js",
            pageLength: 10,
            pathPrefix: "blog"
          });

          const prev = index === 0 ? false : posts[index - 1].node;
          const next = index === posts.length - 1 ? false : posts[index + 1].node;
          createPage({
            path: `${post.node.fields.slug}`,
            component: slash(blogPostTemplate),
            context: {
              slug: post.node.fields.slug,
              prev: prev,
              next: next
            }
          });
        });
      })
    );
  });
};
