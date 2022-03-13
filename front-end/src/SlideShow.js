import React,{Component} from "react";
import image1 from './images/image10.jpeg';
import image2 from './images/image11.jpeg';
import image3 from './images/image13.jpeg';
import image4 from './images/image12.jpeg';
import image5 from './images/image3.jpeg';
import image7 from './images/image15.jpeg';
import heartsvg from './images/cup.svg';
import {Row,Col} from 'react-bootstrap';
import 'animate.css';
export default class SlideShow extends Component {
render(){
  return (
    <div>
        <Row className="padd"><Col  md={4} xl={4} sm={4}> 
        <div className="card animate__animated animate__fadeInDown">
            <img className="oneImage" src={image1}/>
            <h5>Review Foods</h5>
            <p className="para">Rate every food What you eat</p>
        </div>
        </Col>
        <Col md={4} xl={4} sm={4}> <div className="card2 animate__animated animate__fadeInDown">
        <img className="oneImage" src={image2}/>
            <h5>Restaurant Finder</h5>
            <p className="para">Find good restarant near you</p>
        </div>  </Col>
        <Col md={4} xl={4} sm={4}>  <div className="card3 animate__animated animate__fadeInDown">
        <img className="oneImage" src={image3}/>
            <h5>Search Spicy Foods</h5>
        </div></Col>
        </Row>
<Row className="animate__animated animate__heartBeat"> <h3 className="all-about">All About Food <span> <img className="heart-image" src={heartsvg} ></img></span></h3> 
<p className="food-des">Only for Food Lovers - Search Yummy Foods  - Review Foods! </p>  </Row>

        <Row className="padd">

        <Col md={4} xl={4} sm={4}> <div className="card4 animate__animated animate__fadeInUp">
        <img className="oneImage" src={image7}/>
            <h5>Filter Out Foods</h5>
            <p className="para">Filter out foods with strategy</p>
        </div>   </Col>
        <Col md={4} xl={4} sm={4}>  <div className="card5 animate__animated animate__fadeInUp">
        <img className="oneImage" src={image5}/>
            <h5>Barbeques</h5>
            <p className="para">Search for hot food parties</p>
        </div> </Col>
        <Col md={4} xl={4} sm={4}> <div className="card6 animate__animated animate__fadeInUp">
        <img className="oneImage" src={image4}/>
            <h5>Need More? Search here!</h5>
        </div>  </Col>
        </Row>
        </div>
  );
}
}
