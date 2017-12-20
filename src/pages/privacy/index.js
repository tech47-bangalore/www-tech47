/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { Box } from '../../components/Layout';
import colors from '../../utils/colors';

const Privacy = ({ data }) => {
  const { markdownRemark: remark } = data;
  console.log(data);
  return (
    <Box bg={colors.primary}>
      <Box css="margin: 2.5em">
        <h1>{remark.frontmatter.title}</h1>
        <div
          css="text-align: left;"
          dangerouslySetInnerHTML={{ __html: remark.html }}
        />
      </Box>
    </Box>
  );
};

export const privacyQuery = graphql`
  query privacyQuery {
    markdownRemark(
      fileAbsolutePath: {
        eq: "/Users/jai/work/guides/consulting/epiphany-consulting/src/pages/privacy/privacy.md"
      }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Privacy;
