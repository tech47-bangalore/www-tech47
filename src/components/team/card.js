/*eslint-disable*/
import React from 'react'
import Fade from 'react-reveal/Fade';
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
const img = css`
	-webkit-filter: grayscale(180%);
	filter: grayscale(180%);
	opacity: 1;
	border-radius:50%;
	transition: all 1s ease;
	`
const CardName = styled('div')`
		font-weight: bold;
		font-size:12px;
		flex:1;
		text-transform: uppercase;
		letter-spacing:2px;
		opacity: 1;
`
const card =css`
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items: center;
	opacity:0.5;
	box-sizing:border-box;
	padding:20px 70px;
	transition: all 1s ease;
	& :hover{
	  opacity: 1;
	  background-color:#f2dff7;
	  .${img}{
	  	-webkit-filter: opacity(100%);
	    filter: opacity(100%);
	  }
	}
`

const CardBody =css`
	display: flex;
	flex-direction: column;
	margin-left:5px;
	flex:1;
	
`

const CardText = styled('p')`
	font-weight:italic;
	font-size: 16px;
	text-align:justify;
	flex:3;
	color:grey;
`


class Card extends React.Component{

	render(){
		return(

			<div className={card}>
			  	<Fade left>
			  		<Img className={img}  resolutions={this.props.pictureUrl} alt={this.props.fullName}/>
			  	</Fade>
			  	<Fade right><div className={CardBody}>
			  		<CardName>{this.props.fullName}</CardName>
			  		<CardText>{this.props.description}</CardText>
			  	</div></Fade>	
			</div>
	)
	}
}



export default Card;