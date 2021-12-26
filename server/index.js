const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'stok_barang',
})


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/tambahDataPenjualan", (req, res) => {
	const sNama = req.body.namaBar;
	const sStok = req.body.stokBar;
	const sJums = req.body.jumlahTer;
	const sTangs = req.body.tanggalTran;
	const sJenis = req.body.jenisBar;
	
	const que = "INSERT INTO kumpulan_barang (nama_barang, stok, jumlah_terjual, tanggal_transaksi, id_jenis_barang) VALUES (?,?,?,?,?)";
	db.query(que, [sNama, sStok, sJums, sTangs, sJenis], (err, result) => {
		res.send(result);
		console.log(err);

	})
})

app.get("/api/tampilDataPenjualan", (req, res) => {
	const tams = "SELECT kumpulan_barang.id_barang, kumpulan_barang.nama_barang, kumpulan_barang.stok, kumpulan_barang.jumlah_terjual, kumpulan_barang.tanggal_transaksi, jenis_barang.id_jenis_barang, jenis_barang.jenis_barang FROM kumpulan_barang JOIN jenis_barang ON kumpulan_barang.id_jenis_barang = jenis_barang.id_jenis_barang ORDER BY kumpulan_barang.id_barang";
	db.query(tams, (err, result) => {
		res.send(result);
	})
})

app.put("/api/ubahDataPenjualan", (req,res) => {
	const sId = req.body.id_bar;
	const sNama = req.body.namaBar;
	const sStok = req.body.stokBar;
	const sJums = req.body.jumlahTer;
	const sTangs = req.body.tanggalTran;
	const sJenis = req.body.jenisBar;

	const up = "UPDATE kumpulan_barang SET nama_barang = ?, stok = ?, jumlah_terjual = ?, tanggal_transaksi = ?, id_jenis_barang = ? WHERE id_barang = ?";
	db.query(up, [sNama, sStok, sJums, sTangs, sJenis, sId], (err, result) => {
		res.send(result);
		console.log(err);
	})
})

app.delete("/api/deleteData/:id_barang", (req,res) => {
	const id_bar = req.params.id_barang;
	const haps = "DELETE FROM kumpulan_barang WHERE id_barang = ?";
	db.query(haps, id_bar, (err, result) => {
		res.send(result);
		console.log(err);
	})
})


app.get("/api/pencarianData", (req, res) => {
	const qua = "SELECT * FROM kumpulan_barang JOIN jenis_barang ON kumpulan_barang.id_jenis_barang = jenis_barang.id_jenis_barang ORDER BY kumpulan_barang.nama_barang ASC";
	db.query(qua, (err, result) => {
		res.send(result);
	})
})

app.get("/api/perbandinganDataTerjual", (req,res) => {
	const quw = "SELECT DISTINCT(jenis_barang.jenis_barang) as barang, SUM(kumpulan_barang.jumlah_terjual) as total_terjual, COUNT(jenis_barang.jenis_barang) as jumlah_jenis, MIN(kumpulan_barang.jumlah_terjual) as terkecil , MAX(kumpulan_barang.jumlah_terjual) as terbesar, GROUP_CONCAT(DISTINCT(kumpulan_barang.nama_barang)) as kumpulan_nama FROM kumpulan_barang JOIN jenis_barang ON kumpulan_barang.id_jenis_barang = jenis_barang.id_jenis_barang GROUP BY jenis_barang.jenis_barang"
	db.query(quw, (err,result) => {
		res.send(result);
	})
})

app.get("/api/perbandinganDataTerjual2/:tangs1&:tangs2", (req,res) => {
	const tangga1 = req.params.tangs1;
	const tangga2 = req.params.tangs2;
	const quw = "SELECT DISTINCT(jenis_barang.jenis_barang) as barang, SUM(kumpulan_barang.jumlah_terjual) as total_terjual, COUNT(jenis_barang.jenis_barang) as jumlah_jenis, MIN(kumpulan_barang.jumlah_terjual) as terkecil , MAX(kumpulan_barang.jumlah_terjual) as terbesar , kumpulan_barang.nama_barang FROM kumpulan_barang JOIN jenis_barang ON kumpulan_barang.id_jenis_barang = jenis_barang.id_jenis_barang WHERE kumpulan_barang.tanggal_transaksi BETWEEN ? AND ? GROUP BY jenis_barang.jenis_barang";
	db.query(quw, [tangga1, tangga2] , (err,result) => {
		res.send(result);
	})
})
 
app.listen(3001, () => {
	console.log('server berjalan lancar');
})

//SELECT DISTINCT(jenis_barang.jenis_barang) as barang, SUM(kumpulan_barang.jumlah_terjual) as total_terjual, COUNT(jenis_barang.jenis_barang) as jumlah_jenis, MIN(kumpulan_barang.jumlah_terjual) as terkecil , MAX(kumpulan_barang.jumlah_terjual) as terbesar ,(SELECT kumpulan_barang.nama_barang FROM kumpulan_barang WHERE kumpulan_barang.jumlah_terjual= (SELECT MAX(kumpulan_barang.jumlah_terjual) FROM kumpulan_barang)), MAX(stok) as stok_terbanyak, kumpulan_barang.nama_barang FROM kumpulan_barang JOIN jenis_barang ON kumpulan_barang.id_jenis_barang = jenis_barang.id_jenis_barang WHERE kumpulan_barang.tanggal_transaksi BETWEEN '2021-05-05' AND '2021-05-10' GROUP BY jenis_barang.jenis_barang