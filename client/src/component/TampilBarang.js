import React,{useState, useEffect} from 'react'; 
import {Form,Table, Button, Modal, Container, Row,Collapse, Alert} from 'react-bootstrap';
import axios from 'axios';
import Slide from 'react-reveal/Slide';


export default function TampilBarang() {
	
	const [namaBarang, setNamaBarang] = useState('');
	const [stokBarang, setStokBarang] = useState(0);
	const [jumlahTerjual, setJumlahTerjual] = useState(0);
	const [tanggalTransaksi, setTanggalTransaksi] = useState(null);
	const [jenisBarang, setJenisBarang] = useState(0);
	const [id, setId] = useState(0);
	const [buka, setBuka] = useState(false);

	const [muncul, setMuncul]  = useState(false);
	const [munculDelete, setMunculDelete] = useState(false);
	const [munculEdit, setMunculEdit] = useState(false);
	const [munculTambah, setMunculTambah] = useState(false);
	const [warn, setWarn] = useState(false);
	const [validasi, setValidasi] = useState('');

	const [tampilData, setTampilData] = useState([]);

	const cekValid = () => {
			if(namaBarang==''){
				alert('Nama Barang Beleum Diisi')
			} else if(stokBarang==0){
				alert('Stock Harus Diisi Dengan Benar');
			} else if(jumlahTerjual==0){
				alert('Jumlah Terjual Belum Diisi');
			}else if(tanggalTransaksi==null){
				alert('Pilih Tanggal Transaksi Barang Terlebih Dahulu');
			} else if(jenisBarang==0){
				alert('Pilih Jenis Barang Terlebih Dahulu')
			} else {
				setMunculTambah(true);
			}
	}

	const simpanData = () => {

				axios.post('http://localhost:3001/api/tambahDataPenjualan',
								{namaBar : namaBarang, stokBar : stokBarang, jumlahTer : jumlahTerjual, tanggalTran : tanggalTransaksi,
								jenisBar : jenisBarang
				}).then((response) => {
					setValidasi('New');
					setWarn(true);
					setTimeout(() => {
						setWarn(false);
					},2000);
					setBuka(false);
					setNamaBarang('');
					setStokBarang(0);
					setJumlahTerjual(0);
					setTanggalTransaksi(null);
					setJenisBarang(0);
					setMunculTambah(false);
				}).catch((err) => {
					setValidasi('Error');
					setWarn(true);
					setTimeout(() => {
						setWarn(false);
					},2000);
				})

	}

	const bukaDialogDelete = (idss) => {
		setId(idss);
		setMunculDelete(true);
	}

	const hapusData = (ids) => {
		axios.delete(`http://localhost:3001/api/deleteData/${ids}`)
		.then((response) => {
			setValidasi('Delete');
			setWarn(true);
			setTimeout(() => {
				setWarn(false);
			},2000);
			setId(0);
		}).catch((err) => {
			setValidasi('Error');
			setWarn(true);
			setTimeout(() => {
				setWarn(false);
			},2000);
		})
	}

	const cekData = (id, nambar, stobar, jumter, tangtas, jenbar) => {
		setId(id);
		setNamaBarang(nambar);
		setStokBarang(stobar);
		setJumlahTerjual(jumter);
		setTanggalTransaksi(tangtas);
		setJenisBarang(jenbar);
		setMuncul(true);
	}

	const bersihkanData = () => {
		setId(0);
		setNamaBarang('');
		setStokBarang(0);
		setJumlahTerjual(0);
		setTanggalTransaksi(null);
		setJenisBarang(0);
		setMuncul(false);
	}

	const ubahData = () => {
		axios.put("http://localhost:3001/api/ubahDataPenjualan", 
			{id_bar : id, namaBar : namaBarang, stokBar : stokBarang, jumlahTer : jumlahTerjual, 
				tanggalTran : tanggalTransaksi,
				jenisBar : jenisBarang
			})
		.then((response) => {
			setValidasi('Update');
			setWarn(true);
			setTimeout(() => {
				setWarn(false);
			},2000);
			setMunculEdit(false);
			setMuncul(false);
		})
		.catch((err) => {
			setValidasi('Error');
			setWarn(true);
			setTimeout(() => {
				setWarn(false);
			},2000);
		})
	}

	const Peringatan = () => {
		if(validasi == 'Delete'){
			return (
			 <Alert show={warn} variant="success">
			   <h5>Data Telah Berhasil Dihapus</h5>
			  </Alert>
		  );
		} else if(validasi == 'Update'){
			return (
			 <Alert show={warn} variant="success">
			   <h5>Data Telah Berhasil Diubah</h5>
			  </Alert>
		  );
		} else if(validasi == 'New'){
			return (
			 <Alert show={warn} variant="success">
			   <h5>Data Telah Berhasil DiTambah</h5>
			  </Alert>
			);
		} else if(validasi == 'Error') {
			return (
			 <Alert show={warn} variant="danger">
			   <h5>Telah Terjadi Kesalahan</h5>
			  </Alert>
		   );
		} else {
			return null;
		}
		
	}

	useEffect(() => {

		let isLoading  = true;
		const tampilkan = async () => {
		const panggil = await axios.get("http://localhost:3001/api/tampilDataPenjualan")
		.then((res) => {
			if(isLoading){
				setTampilData(res.data);
			}
		})
		}
		tampilkan();
		return () => { isLoading = false};
	})

	return(
		<>
		<Container>
			<Row className="justify-content-md-center">
			<Slide left>
				<h1>Data Penjualan</h1>		
			</Slide>
			<Slide right>
					<Table striped bordered hover size="sm" responsive>
				  <thead style={{textAlign: 'center'}}>
				    <tr>
				      <th>No</th>
				      <th>Nama Barang</th>
				      <th>Stok</th>
				      <th>Jumlah Terjual</th>
				      <th>Tanggal Transaksi</th>
				      <th>Jenis Barang</th>	
				      <th colSpan="2">Action</th>	
				    </tr>
				  </thead>
				  <tbody>
				    {tampilData.map((t, i) => {
				    	const as = i + 1;
				    	return(
				    		<>
				    		<tr>
				    		<td style={{display: "none"}}>{t.id_barang}</td>
				    		<td>{as}</td>
				    		<td>{t.nama_barang}</td>
				    		<td>{t.stok}</td>
				    		<td>{t.jumlah_terjual}</td>
				    		<td>{t.tanggal_transaksi}</td>
				    		<td>{t.jenis_barang}</td>
				    		<td style={{textAlign: 'center'}}>
				    		<Button variant="warning" onClick={() => {cekData(t.id_barang,t.nama_barang,t.stok,t.jumlah_terjual,t.tanggal_transaksi,t.id_jenis_barang); setBuka(false)}}>Update</Button>
				    		</td>
				    		<td><Button variant="danger" onClick={() => {bukaDialogDelete(t.id_barang)}}>Delete</Button></td>
				    		</tr>
				    		</>
				    		)
				    })}
				  </tbody>
				</Table>
				</Slide>
			</Row>
			<Peringatan />
			<Slide left>
			{ buka ? <Button variant="danger" onClick={() => {
					setBuka(!buka);setNamaBarang('');
					setStokBarang(0);
					setJumlahTerjual(0);
					setTanggalTransaksi(null);
					setJenisBarang(0);}} 
				aria-control="example-Collapse-text" 
				aria-expanded={buka}>Batal</Button>
				
				: 

				<Button variant="primary" onClick={() => {setBuka(!buka)}} 
				aria-control="example-Collapse-text" 
				aria-expanded={buka}>Data Baru</Button>


			}
				<Collapse in={buka}>
				<div id="example-collapse-text">
		          	<br />
		          	<Form.Label>Nama Barang</Form.Label>
					<Form.Control type="text" placeholder="Masukkan Nama Barang" onChange={(e) => {setNamaBarang(e.target.value)}} />
					<br />
					<Form.Label>Stok</Form.Label>
					<Form.Control type="number" placeholder="Stok Barang" onChange={(e) => {setStokBarang(e.target.value)}} />
					<br />
					<Form.Label>Jumlah Terjual</Form.Label>
					<Form.Control type="number" placeholder="Jumlah Terjual" onChange={(e) => {setJumlahTerjual(e.target.value)}} />
					<br />
					<Form.Label>Tanggal Transaksi</Form.Label>
					<Form.Control type="date" onChange={(e) => {setTanggalTransaksi(e.target.value)}} />
					<br />
					<Form.Select onChange={(e) => {setJenisBarang(e.target.value)}}>
						<option value="0">Pilih Jenis Barang</option>
						<option value="1">Konsumsi</option>
						<option value="2">Pembersih</option>
					</Form.Select>
					<br />
					<Button variant="primary" onClick={cekValid}>Tambah Data</Button>
		        </div>
				</Collapse>
				</Slide>
		</Container>
		

	{/* edit data */}
	<Modal
	      size="lg"
		        show={muncul}
		        onHide={bersihkanData}
		        aria-labelledby="example-modal-sizes-title-lg"
		        centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          Mengubah Data [ {namaBarang} ]
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      <Form.Label>Nama Barang</Form.Label>
	       <Form.Control type="text" value={namaBarang} placeholder="Nama Barang" onChange={(e) => {setNamaBarang(e.target.value)}} />
			<br />
			<Form.Label>Stok</Form.Label>
			<Form.Control type="number" value={stokBarang} placeholder="Stok Barang" onChange={(e) => {setStokBarang(e.target.value)}} />
			<br />
			<Form.Label>Jumlah Terjual</Form.Label>
			<Form.Control type="number" value={jumlahTerjual} placeholder="Jumlah Terjual" onChange={(e) => {setJumlahTerjual(e.target.value)}} />
			<br />
			<Form.Label>Tanggal Transaksi</Form.Label>
			<Form.Control type="date" value={tanggalTransaksi} onChange={(e) => {setTanggalTransaksi(e.target.value)}} />
			<br />
			<Form.Label>Jenis Barang</Form.Label>
			<Form.Select value={jenisBarang} onChange={(e) => {setJenisBarang(e.target.value)}}>
				<option value="1">Konsumsi</option>
				<option value="2">Pembersih</option>
			</Form.Select>
			<br />
			<Button variant="success" onClick={() => {setMunculEdit(true)}}>Ubah Data</Button> 
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={bersihkanData}>Tutup</Button>
	      </Modal.Footer>
	    </Modal>

		{/* hapus data */}
	    <Modal
	      size="sm"
		        show={munculDelete}
		        onHide={() => {setMunculDelete(false)}}
		        aria-labelledby="example-modal-sizes-title-lg"
		        centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          Hapus Data 
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      <p>Apakah Anda Yakin Ingin Menghapus Data Ini?</p> 
	      </Modal.Body>
	      <Modal.Footer>
	        <Button variant="warning" onClick={() => {setMunculDelete(false); setId(0)}}>Tidak</Button>
	        <Button variant="danger" onClick={() => {hapusData(id); setMunculDelete(false)}}>Ya</Button>
	      </Modal.Footer>
	    </Modal>

		{/* simpan edit data */}
	    <Modal
	      size="sm"
		        show={munculEdit}
		        onHide={() => {setMunculEdit(false)}}
		        aria-labelledby="example-modal-sizes-title-lg"
		        centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	         Update Data 
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      <p>Apakah Anda Yakin Ingin Mengubah Data Ini?</p> 
	      </Modal.Body>
	      <Modal.Footer>
	        <Button variant="warning" onClick={() => {setMunculEdit(false)}}>Tidak</Button>
	        <Button variant="danger" onClick={ubahData}>Ya</Button>
	      </Modal.Footer>
	    </Modal>


	{/* simpan data */}
	    <Modal
	      size="sm"
		        show={munculTambah}
		        onHide={() => {setMunculTambah(false)}}
		        aria-labelledby="example-modal-sizes-title-lg"
		        centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	         Simpan Data 
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      <p>Apakah Anda Yakin Ingin Menambahkan Data Ini?</p> 
	      </Modal.Body>
	      <Modal.Footer>
	        <Button variant="warning" onClick={() => {setMunculTambah(false)}}>Tidak</Button>
	        <Button variant="danger" onClick={simpanData}>Ya</Button>
	      </Modal.Footer>
	    </Modal>

		</>
		);
}