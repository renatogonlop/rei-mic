import { Button, Space, Alert, Row } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
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




    useEffect(() => {
        async function loadlist() {
            const response = await api.get('/api/list/');
            setList(response.data);
        }
        loadlist()
    }, [])


    async function reload() {
        const response = await api.get('/api/list/');
        setList(response.data);
    }

    async function handleDelete(id) {
        let result = await api.delete('/api/list/' + id);
        reload()
    }

    async function aumentarQuantidade(id, idList, quantidade, valor) {
        let result = await api.get('/api/products.details/' + idList)
        const quantEstoque = result.data.product_quantity;
        if (quantidade >= quantEstoque) {
            alert("Quantidade em estoque é insuficiente!")
        } else {
            let quant = quantidade + 1;
            let precoTotal = valor * quant;
            const updateQuant = {
                _id: id,
                list_quantity: quant,
                list_totalPrice: precoTotal
            }
            let newQuant = await api.put('/api/list/', updateQuant)
        }
        reload()
    }

    async function diminuirQuantidade(id, quantidade, valor) {
        if (quantidade <= 1) {
            handleDelete(id)
        } else {
            let quant = quantidade - 1;
            let precoTotal = valor * quant;
            const updateQuant = {
                _id: id,
                list_quantity: quant,
                list_totalPrice: precoTotal
            }
            let newQuant = await api.put('/api/list/', updateQuant)
        }
        reload()
    }


    function totalGeral() {
        const total = lists.reduce((acumulado, produto) => acumulado + produto.list_totalPrice, 0);
        return total
    }

    return (
        <div className="page-wrapper">

            <Row className="boxList" justify="center">
                <div style={{ width: "75%" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Produto</TableCell>
                                    <TableCell align="left">Marca / Modelo</TableCell>
                                    <TableCell align="center">Preço</TableCell>
                                    <TableCell align="center">Quantidade</TableCell>
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
                                            align="center">
                                            <Button
                                                className="buttonNull"
                                                type="text"
                                                onLoad={row.list_totalPrice}
                                            >
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(row.list_totalPrice)}
                                            </Button>
                                        </TableCell>

                                        <TableCell>
                                            <div className="buttonsCount-container">
                                                <Button
                                                    className="buttonsCount"
                                                    type="primary"
                                                    shape="circle"
                                                    onClick={() => diminuirQuantidade(row._id, row.list_quantity, row.list_price)}
                                                >-</Button>
                                                <Button className="buttonNull" type="text">{row.list_quantity}</Button>
                                                <Button
                                                    className="buttonsCount"
                                                    type="primary"
                                                    shape="circle"
                                                    onClick={() => aumentarQuantidade(row._id, row.list_id, row.list_quantity, row.list_price)}
                                                >+</Button>
                                            </div>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                shape="round"
                                                type="primary"
                                                icon={<DeleteOutlined Color="#fffff" />}
                                                size={size}
                                                onClick={
                                                    () => handleDelete(row._id)
                                                }>

                                            </Button>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Row >


            <Row className="boxList" justify="center" style={{ border: 'hidden' }}>
                <div style={{ width: "55%", display: "inline-flex" }} >
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table" >
                            <TableBody >

                                <h3
                                    style={{
                                        marginLeft: "2%",
                                    }}>Sugestões para você: </h3>


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

                                    <TableCell
                                        align="center"
                                    >
                                        <h3
                                            style={{ marginBottom: 0 }}
                                        >
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(totalGeral())}
                                        </h3>
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