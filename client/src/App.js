import React from 'react';
import Tampil from './component/TampilBarang';
import Pencarian from './component/PencarianBarang';
import Halaman from './component/HalamanUtama';
import PerbandinganBarang from './component/PerbandinganBarang';
import { BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';


function App() {
  return (
    <>
    <Router>
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		  <Container fluid>
		  <Navbar.Brand as={NavLink} to="/"><b>TOKO DUMMY</b></Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="me-auto">
		    	<Nav.Link as={NavLink} to="/Tampil">Penjualan</Nav.Link>
	          <Nav.Link as={NavLink} to="/PerbandinganBarang">Cek Penjualan</Nav.Link>
		    </Nav>
		  </Navbar.Collapse>
		  </Container>
		</Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/Tampil" element={Tampil}>
            <Tampil />
          </Route>
          <Route exact  path="/PerbandinganBarang" element={PerbandinganBarang}>
            <PerbandinganBarang />
          </Route>
          <Route exact  path="/" element={Halaman}>
            <Halaman />
          </Route>
          <Route>
         <center>
         <h1>Halaman Tidak Ditemukan</h1>
         <h2>404 Not Found</h2>
         </center>
         </Route>
        </Switch>
    </Router>

    {/*<Tampil />
    <Pencarian />
    <PerbandinganBarang />*/}

    </>
  );
}

export default App;
