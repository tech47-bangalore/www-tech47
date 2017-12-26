/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { css } from 'react-emotion';
import { Box, Flex } from '../../components/Layout';
import colors from '../../utils/colors';
import ButtonPrimary from '../../components/Buttons';

const input = css`
  display: block;
  box-sizing: border-box;
  padding: 10px 16px;
  width: 100%;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 0;
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  color: #616161;
  font-size: 18px;
  line-height: 1.3333333;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  & :focus {
    border-color: ${colors.primary};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(59, 89, 152, 0.6);
  }
`;

const label = css`
  display: inline-block;
  text-align: left;
  margin-bottom: 16px;
  width: 100%;
`;

const ContactForm = () => (
  <Flex>
    <form
      css="max-width: 500px;"
      action="//formspree.io/jaikant@gmail.com"
      method="POST"
    >
      <label className={label} htmlFor="name">
        <input
          className={input}
          type="text"
          placeholder="Your Name"
          name="name"
        />
      </label>
      <label className={label} htmlFor="_replyto">
        <input
          className={input}
          type="email"
          placeholder="Your email ... example@domain.com"
          name="_replyto"
        />
      </label>
      <label className={label} htmlFor="message">
        <textarea
          className={input}
          name="message"
          rows="3"
          placeholder="Your Message"
        />
      </label>
      <input
        type="hidden"
        name="_subject"
        value="Message via http://domain.com"
      />
      <ButtonPrimary css="margin-bottom: 32px;" type="submit">
        Submit
      </ButtonPrimary>
    </form>
  </Flex>
);

const Contact = ({ data }) => {
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
        <ContactForm />
      </Box>
    </Box>
  );
};

export const contactQuery = graphql`
  query contactQ {
    markdownRemark(
      fileAbsolutePath: {
        eq: "/Users/jai/work/guides/consulting/epiphany-consulting/src/pages/contact/contact.md"
      }
    ) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Contact;
