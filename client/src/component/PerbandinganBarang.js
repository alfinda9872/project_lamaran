import React,{useState, useEffect} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from 'axios';
import {Form, Container, Row, Col, CardGroup, Card} from 'react-bootstrap';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';

export default function PerbandinganBarang() {

	const [banding, setBanding] = useState([]);
	const [banding2, setBanding2] = useState([]);
	const [tanggal1, setTanggal1] = useState(null);
	const [tanggal2, setTanggal2] = useState(null);

	useEffect(() => {
		let isLoading = true;
		const tampil = async () => {
		const pangs = await axios.get("http://localhost:3001/api/perbandinganDataTerjual")
		.then((res) => {
			if(isLoading){
				setBanding(res.data);	
			}
		})
	}
	tampil();
	return () => {isLoading = false};
	},[])

	useEffect(() => {
		let isLoading  = true;
		const tampilkan = async () => {
		const panggil = await axios.get(`http://localhost:3001/api/perbandinganDataTerjual2/${tanggal1}&${tanggal2}`)
		.then((res) => {
			if(isLoading){
				setBanding2(res.data);	
			}
		})
	}
	tampilkan();
	return () => { isLoading = false};
	})

	return (

		<>
		<Container>
		<Row className="justify-content-md-center">
		<Slide left>
		<h1>Data Penjualan (Jenis Barang)</h1>
		</Slide>
		<Row>
		<CardGroup>
		{banding.map((s,i) => {
			const persen = parseFloat((s.jumlah_jenis/s.total_terjual)*100).toFixed(2);
			return(
		<>
		<Col>
		<Flip bottom>
		<Card>
	    <Card.Body>
	      <Card.Title>{s.barang}</Card.Title>
	      <hr />
	      <Card.Text>
	      <Row>
		    <Col xs lg="3">
		    <br />
		     <Progress
			  type="circle"
			  strokeWidth={8}
			  percent={persen}
			/>
			<p>Total Penjualan(%)</p>
			</Col>
		    <Col  xs lg="9">
		    <p>Deskripsi : </p>
		    <p style={{textAlign: 'justify'}}>Jenis barang ini memiliki jumlah penjualan paling terbanyak sebesar <b>{s.terbesar}</b> Penjualan, dan paling terkecil sebesar <b>{s.terkecil}</b> Penjualan. 
		    Dengan total penjualan sebanyak <b>{s.total_terjual}</b> Penjualan. Jenis Barang ini berisikan produk diantaranya <b>{s.kumpulan_nama}</b>
		    </p>
			</Col>
		  </Row>
	      </Card.Text>
	    </Card.Body>
	  </Card>
	  		</Flip>
		</Col>
		</>
		)
		})}
		</CardGroup>
		</Row>
		{/* filter by tanggal yang dipilih*/}
		<p />
		<p />
		<Slide right>
		<Row>
		<CardGroup>
		<Card>
		<Card.Header><center><h4>Filter By Tanggal Transaksi</h4></center></Card.Header>
		<Card.Text>
		<Row style={{padding: '10px'}}>
			<Col>
			<Card.Title>Dari Tanggal</Card.Title>
			 <Form.Control type="date" onChange={(e) => {setTanggal1(e.target.value)}}/>
			</Col>
			<Col>
			<Card.Title>Ke Tanggal</Card.Title>
			 <Form.Control type="date" onChange={(e) => {setTanggal2(e.target.value)}}></Form.Control>
			</Col>
		</Row>
		</Card.Text>
		<Row>
		{tanggal1 ? 
		banding2.map((s,i) => {
			const persen = parseFloat((s.jumlah_jenis/s.total_terjual)*100).toFixed(2);
			return(
		<>
		<Col>
		<Slide left>
	    <Card.Body>
	      <Card.Title>{s.barang}</Card.Title>
	      <hr />
	      <Card.Text>
	      <Row>
		    <Col xs lg="3">
		    <br />
		     <Progress
			  type="circle"
			  strokeWidth={8}
			  percent={persen}
			/>
			<p>Total Penjualan(%)</p>
			</Col>
		    <Col  xs lg="9">
		    <p>Deskripsi : </p>
		    <p style={{textAlign: 'justify'}}>Jenis barang ini memiliki jumlah penjualan paling terbanyak sebesar <b>{s.terbesar}</b> Penjualan, dan paling terkecil sebesar <b>{s.terkecil}</b> Penjualan. 
		    Dengan total penjualan sebanyak <b>{s.total_terjual}</b> Penjualan. Jenis Barang ini berisikan produk diantaranya <b>{s.kumpulan_nama}</b>
		    </p>
			</Col>
		  </Row>
	      </Card.Text>
	    </Card.Body>
	    </Slide>
		</Col>
		</>
		)
		}): <center><h4>Selamat Datang, Cari Jenis Barang Berdasarkan Jarak Tanggal</h4></center> }
		</Row>
		</Card>
		</CardGroup>
		</Row>
		</Slide>
		</Row>
		</Container>
		</>
		)
}