/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { graphql } from "gatsby";
import { Box } from '../../components/Layout';
import colors from '../../utils/colors';
import Layout from '../../layouts';

const Terms = ({ data, location }) => {
  const { markdownRemark: remark } = data;
  return (
    <Layout location={location}>
      <Box bg={colors.primary}>
        <Box css="margin: 2.5em">
          <h1>{remark.frontmatter.title}</h1>
          <div
            css="text-align: left;"
            dangerouslySetInnerHTML={{ __html: remark.html }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export const termsQuery = graphql`
  query termsQuery {
    markdownRemark(fileAbsolutePath: { regex: "src/pages/terms/terms.md/" }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Terms;
