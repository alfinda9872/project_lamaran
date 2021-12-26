import React,{useState} from 'react';
import {Container, Card, Row, Col, CardGroup, Image, Toast, Button} from 'react-bootstrap';
import Depan from '../component/utama.jpg';
import Tengah from '../component/utama2.jpg';
import Bounce from 'react-reveal/Bounce';
import Pencarian from '../component/PencarianBarang';
import TampilPenjualan from '../component/TampilPenjualan';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

export default function HalamanUtama(){
	const [bukaToast, setBukaToast] = useState(false);
	return(

		<>
		<Card  className="bg-white text-white">
		<Zoom>
		<Card.Img src={Depan} alt="Card image" />
		</Zoom>
  		<Card.ImgOverlay>
    	 <center>
		  <Fade top>
		    <h1>Selamat Datang Di Website Penjualan Kami</h1>
		  <Card.Text>By ADRIAN SYAHPUTRA ALFINDA</Card.Text>
		  </Fade>
		  </center>
		</Card.ImgOverlay>
		</Card>
		<Container fluid>
		  <Row>
		  <Fade bottom>
		  	<Pencarian />
		  	<p />
		  	<p>
		  	<Button variant="light" onClick={() => {setBukaToast(!bukaToast)}} style={{float: 'right'}}>Download API</Button>
		  	<Toast show={bukaToast} onClose={() => {setBukaToast(false)}} style={{float: 'right'}}>
	          <Toast.Header>
	            <strong className="me-auto">API</strong>
	          </Toast.Header>
	          <Toast.Body>http://localhost:3001/api/tampilDataPenjualan</Toast.Body>
	        </Toast>
	        </p>
		  	<div style={{padding: '80px', width: '100%', height: '50%' , backgroundImage: `url(${Tengah})`, backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
		    <center>
		    <p style={{color: 'white', fontSize: '50px', textDecoration: 'bold'}}><b>Supplier</b></p>
		    </center>
		    </div>
		  	<TampilPenjualan />
		  </Fade>
		  </Row>	
		</Container>

		</>


		);
}