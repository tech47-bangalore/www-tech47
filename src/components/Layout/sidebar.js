/* eslint-disable */
import React from 'react';
import { Link } from 'gatsby';
import { Box, Flex, Tags, EmailCaptureHomePage, ServiceCard } from '.';
import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right';
import Img from 'gatsby-image';
import styled, { css, keyframes } from 'react-emotion';
import colors from '../../utils/colors';
import media from '../../utils/media';
import about from '../../pages/images/idea.svg';
import serverless from '../../pages/images/blackboard.svg';
import reactsvg from '../../pages/images/space-ship.svg';

const SidebarCard = styled.div`
  background-color: ${colors.tech47white};
  position: relative;
  width: 290px;
  height: auto;
  margin: 8px 0px;
  ${media.tablet`
    margin: 8px 8px;
  `};
  ${media.desktop`
    margin: 8px 0px;
  `};
  overflow: hidden;
  text-align: left;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);
  -moz-box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);
  box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);

  img,
  h4 {
    margin: auto;
  }
`;

const bodyStyle = css`
  font-size: 0.9em;
  color: ${colors.gray.calm};
`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`

const imgStyle = css`
  display: flex;
  flex-direction: row;
  margin: 0;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  ${media.mid`
    flex-direction: row;
  `};
  list-style: none;
`;

const StyledSpan = styled.span`
  color: ${colors.light};
  font-size: 0.65em;
`;

const SideBar = ({ group, first, last, previousUrl, nextUrl }) => {
  return (
    <div>
      <Flex css={`
              ${media.mobile`
                -ms-transform: translate(0px, -16vh);
                -webkit-transform: translate(0px, -16vh);
                transform: translate(0px, -16vh);
              `};
              ${media.tablet`
                -ms-transform: translate(0px, -16vh);
                -webkit-transform: translate(0px, -16vh);
                transform: translate(0px, -16vh);
              `};
              ${media.desktop`
                max-width: 290px;
                -ms-transform: translate(0px, 0vh);
                -webkit-transform: translate(0px, 0vh);
                transform: translate(0px, 0vh);
              `};

            `}
      >
          <SidebarCard>
            <div css="padding: 24px;">
               <h5> Subscribe </h5>
               <div className={bodyStyle}>
                  Receive our news letter to stay on top of the latest updates in technology
               </div>
               <EmailCaptureHomePage />
            </div>
          </SidebarCard>
          <SidebarCard>
              <ServiceCard
                name="DEVELOPMENT"
                image={reactsvg}
                service="We build modern websites and apps on the cloud, using Reactjs, GraphQL and other modern web technologies"
                url="/development"
                urltext="More Info"
              />
          </SidebarCard>
          <SidebarCard>
            <ServiceCard
              name="CONSULTING"
              image={about}
              service="Architect your technology to save money. Scale seamlessly using JAMStack, micro services & AWS Cloud."
              url="/consulting"
              urltext="More Info"
            />
          </SidebarCard>
          <SidebarCard>
            <ServiceCard
              name="TRAINING"
              image={serverless}
              service="We can help teaching you ReactJs, NodeJs, MongoDb, GraphQL ..."
              url="/training"
              urltext="More Info"
            />
          </SidebarCard>

            <ul className={imgStyle}>
          </ul>
      </Flex>
    </div>
  );
};

export default SideBar;
