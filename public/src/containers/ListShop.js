import { Button, Col, Form, Input, message, Row, Divider, InputNumber } from "antd";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../services/api';
import './cssContainers/listShop.css';
import CardList from "../components/cardBase";


export default function ListShop() {

    const [size, setSize] = useState('medium');
    const [lists, setList] = useState([]);
    let [count, setCount] = useState(1);
    let [price, setPrice] = useState();

    useEffect(() => {
        async function loadlist() {
            const response = await api.get('/api/list/');
            setList(response.data);
            // console.log(response.data);
        }
        loadlist()
    }, [])

    async function handleDelete(id) {
        let result = await api.delete('/api/list/' + id);
        window.location.href = '/listshop'
    }

    async function calcPrice(price, numbId) {
        console.log(price)
        console.log(numbId)
    }

    return (
        <div className="page-wrapper">
            <Row className="boxList" justify="center">
                <div style={{ width: "75%" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Brand / Reference</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lists.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.list_name}
                                        </TableCell>

                                        <TableCell align="left">
                                            <TableRow>{row.list_brand}</TableRow>
                                            <TableRow>{row.list_reference}</TableRow>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                        // onChange={() => setPrice(row.list_price)}
                                        >
                                            {/* {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format()} */}
                                            <Button
                                                className="buttonNull"
                                                type="text"
                                                onLoad={price = row.list_price}
                                            >
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(price)}
                                            </Button>
                                        </TableCell>

                                        <TableCell>

                                            <div className="buttonsCount-container">
                                                <Button
                                                    className="buttonsCount"
                                                    type="primary"
                                                    shape="circle"
                                                    onClick={() => {
                                                        if (count > 0) {
                                                            setCount(count - 1)
                                                            setPrice(price - 1000)
                                                        }
                                                    }
                                                    }
                                                >-</Button>
                                                <Button className="buttonNull" type="text">{count}</Button>
                                                <Button
                                                    className="buttonsCount"
                                                    type="primary"
                                                    shape="circle"
                                                    onClick={() => {
                                                        if (count != 0) {
                                                            setCount(count + 1)
                                                            setPrice(price + 1000)
                                                            console.log(price)
                                                        }
                                                    }
                                                    }
                                                >+</Button>
                                            </div>

                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                shape="round"
                                                type="primary"
                                                size={size}
                                                onClick={
                                                    () => handleDelete(row._id)
                                                }>
                                                Remove
                                            </Button>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Row >


            <Row className="boxList" justify="center" style={{border: 'hidden'}}>
                <div style={{ width: "55%", display: "inline-flex" }} >
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 300}} size="small" aria-label="a dense table" >
                            <TableBody >

                                <h1
                                    style={{
                                        marginLeft: "2%",
                                    }}>Special suggestions for you!</h1>


                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        padding: '2%'
                                    }}>
                                    <CardList />
                                    <CardList />
                                    <CardList />
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Row>


            <Row className="boxList" justify="center">
                <div style={{ width: "35%" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format()}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            shape="round"
                                            type="primary"
                                            size="big"
                                            onClick={"null"}>
                                            Buy
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Row>
        </div >
    );
}