import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Card, Row, Col, CardGroup, Form} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';


export default function PencarianBarang() {

	const [formCari, setFormCari] = useState([]);
	const [isi, setIsi] = useState('');
	const [check, setCheck] = useState(false);

	const ceklis = () => {
		setCheck(!check);
	}

	useEffect(() => {
		axios.get("http://localhost:3001/api/pencarianData")
		.then((res) => {
			setFormCari(res.data);
		})
	},[])

	return(

		<>
		<center>
		<h1>Macam-Macam Produk</h1>
		<hr width="600"/>
		<Container>
		<Row className="justify-content-md-center">
			<Col md="auto">
		<Form.Control type="search" placeholder="Cari Nama Barang" className="me-2" aria-label="Search" onChange={(e) =>{setIsi(e.target.value)}} />
        <br />
        <Form.Check type="checkbox" checked={check} label="Sort by Nama Barang & Tanggal Transaksi" onChange={ceklis} />
        <br />
			</Col>
		</Row>
        </Container>
		</center>
		
        {/*.sort((a,b) => new Date(...a.tanggal_transaksi.split('-').reverse()) - new Date(...b.tanggal_transaksi.split('-').reverse())).*/}
        <CardGroup>
        {!check ?
       		 formCari.filter((a) =>{
	        	if(isi==''){
	        		return a;
	        	}else if(a.nama_barang.toLowerCase().includes(isi.toLowerCase())){
	        		return a;
	        	}
        }).map((a) => {
	        	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				let tanggal_translate = new Date(a.tanggal_transaksi).toLocaleString('id', options) + "";
        	return(
        		<>	
        			<Col xs lg="4">
        			<Fade bottom>
					<Card border="info">
				    <Card.Header><h4>{a.nama_barang}</h4></Card.Header>
				    <Card.Body>
				      <Card.Text>
				       <p>Jumlah Terjual : {a.jumlah_terjual}</p>
				       <p>Tanggal Transaksi : {tanggal_translate}</p>
				      </Card.Text>
				    </Card.Body>
				    <Card.Footer>
				      <small className="text-muted" style={{float: 'right'}}>{a.jenis_barang}</small>
				    </Card.Footer>
			  		</Card>
			  		</Fade>
			  		</Col>
			  		</>
        )
        }) 
        
        : 

         formCari.filter((a) =>{
        if(isi==''){
        	return a;
        }else if(a.nama_barang.toLowerCase().includes(isi.toLowerCase())){
        	return a;
        }
        }).sort((a,b) => new Date(...a.tanggal_transaksi.split('-').reverse()) - new Date(...b.tanggal_transaksi.split('-').reverse()),(e, d) => d.nama_barang.localeCompare(e.nama_barang)).map((a) => {
	        	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				let tanggal_translate = new Date(a.tanggal_transaksi).toLocaleString('id', options) + "";
        	return(
        		<>
        			<Col xs lg="3">
        			<Fade bottom>
					<Card border="success">
				    <Card.Header>{a.jenis_barang}</Card.Header>
				    <Card.Body>
				      <Card.Title>{a.nama_barang}</Card.Title>
				      <Card.Text>
				       <p>Jumlah Terjual : {a.jumlah_terjual}</p>
				       <p>Tanggal Transaksi : {tanggal_translate}</p>
				      </Card.Text>
				    </Card.Body>
			  		</Card>
			  		</Fade>
			  		</Col>
			  		</>
        )
        }) 

        }
        </CardGroup>
        
		</>

		)
}
