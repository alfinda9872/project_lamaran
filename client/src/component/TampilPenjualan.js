import React,{useState, useEffect} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from 'axios';
import {Form, Container, Row, Col, CardGroup, Card} from 'react-bootstrap';

export default function TampilPenjualan() {

	const [banding, setBanding] = useState([]);

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

	return (
		<Container fluid="md">
		<center>
		<h1>Penjualan Saat Ini</h1>
		<hr width="600"/>

		<Row>
		{banding.map((s,i) => {
			const persen = parseFloat((s.jumlah_jenis/s.total_terjual)*100).toFixed(2);
			return(
		<>
		<Col>
		<Card.Title>{s.barang}</Card.Title>
		<br />	 
		     <Progress
			  type="circle"
			  strokeWidth={8}
			  percent={persen}
			/>
			<p>Total Penjualan(%)</p>
			</Col>

		</>
		)
		})}
		</Row>
				</center>
		</Container>
		);
}