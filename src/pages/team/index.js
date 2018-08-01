/*eslint-disable */
import React from 'react'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import styled, { css } from 'react-emotion'
import Card from '../../components/team/card.js'
import Layout from '../../layouts';
import Helmet from '../../components/helmet';
import Img from 'gatsby-image'

const teamCards =css`
 		display:flex;
 		flex-wrap:wrap;
 		flex-direction:row;
 		justify-content:center;
 		align-items:center;
 		margin-top:60px;
 		margin-bottom:60px;
`
const Wrapper = styled.section`
  position: relative;
  margin: 0;
`
const BgImg = styled(Img)`
  position: absolute;
  margin-top: 0px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: -1;
  height: ${props => props.height || 'auto'};
  @media (min-width: 35em) {
    min-height: 300px;
  }
  & > img {
    object-fit: ${props => props.fit || 'cover'} !important;
    object-position: ${props => props.position || '20% 0%'} !important;
  }
  &:before {
    content: '';
    background: rgba(0,0,0,0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`

const Title = styled.h1`
  font-size: 1.5em;
  line-height: 1.5em;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  font-weight: 600;
  position: absolute;
  width: 90%;
  max-width: 650px;
  padding: 0 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
`;

const Line = styled.h1`
  display: none;
  font-size: 2em;
  font-weight: 600;
  position: absolute;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-left: 3px solid white;
  height: 2em;
`;


const BannerSection = (props) => (
  <Wrapper>
    <BgImg height={props.height} sizes={props.image.sizes} position={`50% ${props.position}%`}/>
    { props.title && <Line /> }
    { props.title && <Title>{props.title}</Title> }
  </Wrapper>
)
class TeamPage extends React.Component{
render(){
	const we= this.props.data.TeamImages.edges['0'].node.teamImages;
	const bannerImage = this.props.data.BannerImage.edges['0'].node.teamBanner;
	const yAxisForCoverImage = 20;
	console.log(this.props)
	return(
		<Layout location={this.props.location}>
			<Helmet
	          title='Tech47 | team'
	          description='Tech47-team'
	          image={bannerImage.sizes}
	          pathname={this.props.location.pathname}
	          absoluteUrl={true}
        	/>
        	 <BannerSection
       		 	title='Our Team'
        		image={bannerImage}
        		height={'50vh'}
        		position={yAxisForCoverImage}
        	/>

			
			<div className={teamCards} >
			 { 
			 	we.map((team) => (<Card key={team.title}  
			 		description={team.description}
			 		pictureUrl={team.resolutions}
			 		fullName={team.title}/>))
			 }	
			</div>	
		</Layout>)
}

}

export const contentfulTeamQuery = graphql`
  query TeamQuery {
  TeamImages:allContentfulTeamImages{
   	edges{
      node{
        teamImages{
          title
          description
          resolutions(width:150, height: 150){
           ...GatsbyContentfulResolutions
          }
        }
      }
    }
  }
  BannerImage:allContentfulTeamBanner{
    edges{
      node{
        teamBanner{
        	sizes(maxWidth: 1800, quality:100) {
        ...GatsbyContentfulSizes_noBase64
      }
        }
      }
    }
  }
}
`;

export default TeamPage;



