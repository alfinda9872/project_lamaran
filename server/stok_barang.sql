-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 26, 2021 at 02:29 PM
-- Server version: 10.2.3-MariaDB-log
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stok_barang`
--

-- --------------------------------------------------------

--
-- Table structure for table `jenis_barang`
--

CREATE TABLE `jenis_barang` (
  `id_jenis_barang` int(5) NOT NULL,
  `jenis_barang` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jenis_barang`
--

INSERT INTO `jenis_barang` (`id_jenis_barang`, `jenis_barang`) VALUES
(1, 'Konsumsi'),
(2, 'Pembersih');

-- --------------------------------------------------------

--
-- Table structure for table `kumpulan_barang`
--

CREATE TABLE `kumpulan_barang` (
  `id_barang` int(5) NOT NULL,
  `nama_barang` varchar(30) NOT NULL,
  `stok` int(5) NOT NULL,
  `jumlah_terjual` int(5) NOT NULL,
  `tanggal_transaksi` varchar(30) NOT NULL,
  `id_jenis_barang` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kumpulan_barang`
--

INSERT INTO `kumpulan_barang` (`id_barang`, `nama_barang`, `stok`, `jumlah_terjual`, `tanggal_transaksi`, `id_jenis_barang`) VALUES
(66, 'Kopi', 100, 10, '2021-05-01', 1),
(67, 'Teh', 100, 10, '2021-05-05', 1),
(68, 'Kopi', 90, 15, '2021-05-10', 1),
(69, 'Pasta Gigi', 100, 20, '2021-05-11', 2),
(70, 'Sabun Mandi', 100, 30, '2021-05-11', 2),
(71, 'Sampo', 100, 25, '2021-05-12', 2),
(72, 'Teh', 81, 5, '2021-05-12', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jenis_barang`
--
ALTER TABLE `jenis_barang`
  ADD PRIMARY KEY (`id_jenis_barang`);

--
-- Indexes for table `kumpulan_barang`
--
ALTER TABLE `kumpulan_barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jenis_barang`
--
ALTER TABLE `jenis_barang`
  MODIFY `id_jenis_barang` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kumpulan_barang`
--
ALTER TABLE `kumpulan_barang`
  MODIFY `id_barang` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
