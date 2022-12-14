import { Button, Row, Card, Modal } from "antd";
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import React, { useState, useEffect, } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../services/api';
import './cssContainers/listShop.css';


const { Meta } = Card;
const p_marg = 4;



export default function ListShop() {

    const [size, setSize] = useState('medium');
    const [lists, setList] = useState([]);
    const [indica, setIndica] = useState([]);
    const guardProd = [];


    useEffect(() => {
        async function loadlist() {
            const response = await api.get('/api/list/');
            setList(response.data);
        }
        loadlist()
    }, [])

    useEffect(() => {
        async function loadindica() {
            const response = await api.get('/api/ind/');
            setIndica(response.data);
        }
        loadindica()
    }, [])


    async function reload() {
        const response = await api.get('/api/list/');
        setList(response.data);
    }

    async function handleDelete(id) {
        let result = await api.delete('/api/list/' + id);
        reload()
    }

    //Func. Mais Item
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

    //Func. Menos Item
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

    //Func. Total Compra
    function totalGeral() {
        const total = lists.reduce((acumulado, produto) => acumulado + produto.list_totalPrice, 0);
        return total
    }


    //Func. Indicações
    async function loadIndi() {

        const responseList = await api.get('/api/list/');
        const responseProd = await api.get('/api/products');
        const geraList = responseList.data;

        let i = 0;
        while (i < 2) {
            let nomeProd = responseProd.data[Math.floor(Math.random() * 14)]._id
            const result = geraList.find(item => item.list_id === nomeProd);
            if (result === undefined && nomeProd != guardProd[0]) {
                guardProd[i] = nomeProd;
                i++;
            }
        }

        // console.log(guardProd)

        for (let z = 0; z < guardProd.length;) {
            let id = "";
            const responseind = await api.get('/api/products.details/' + guardProd[z]);
            // const responseind = await api.get('/api/products.details/' + "63853ade565f1a299fe3eddc");
            if (z === 0) {
                id = '639a522a48101fd28fcb17ce'
                z++
            } else {
                id = '639a522a48101fd28fcb17cc'
            }

            let respInd = responseind.data
            const listIndiq = {
                _id: id,
                ind_id: respInd._id,
                ind_name: respInd.product_name,
                ind_brand: respInd.product_brand,
                ind_reference: respInd.product_referencee,
                ind_description: respInd.product_description,
                ind_price: respInd.product_price,
                ind_quantity: respInd.product_quantity,
                ind_image: respInd.product_image,
                ind_class: respInd.product_class
            }
            let updateInd = await api.put('/api/ind/', listIndiq);
        }
    }



    //________________________

    async function handlePost(id, name, brand, reference, price) {
        const listCar = {
            list_id: id,
            list_name: name,
            list_brand: brand,
            list_reference: reference,
            list_price: price,
            list_totalPrice: price,
            list_quantity: "1"
        }
        let responseCar = await api.post('/api/list', listCar);
        reload()
    }


    async function modalCard(name, brand, reference, description) {
        let modal_name = name;
        let modal_brand = brand;
        let modal_reference = reference;
        let modal_description = description;

        Modal.success({
            title: modal_name,
            content: (
                <div>
                    <p>{modal_brand}</p>
                    <p>{modal_reference}</p>
                    <p style={{ textAlign: "justify" }}>{modal_description}</p>
                </div>
            ),
            onOk() { },
        });
    }

    function inventory(inv, price) {
        if (inv <= p_marg) {
            return "-"
        } else {
            let priceNumb = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(price);
            return priceNumb
        }
    }

    function isButOn(inv) {
        if (inv <= p_marg) {
            return "Esgotado";
        } else {
            return "Add";
        }
    }

    function isIconOn(inv) {
        if (inv <= p_marg) {
            return "";
        } else {
            return <PlusCircleFilled />
        }
    }

    function isButAb(inv) {
        if (inv <= p_marg) {
            return 'none';
        } else {

        }
    }

    //________________________

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
                                    <TableCell align="center">Quantidade</TableCell>
                                    <TableCell align="center">Preço</TableCell>
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

                                        <TableCell align="center">
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
                                    onLoad={loadIndi()}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        padding: '2%'
                                    }}>

                                    {indica.map((row) => (
                                        < Card
                                            id={row._id}
                                            style={{
                                                width: 300,
                                                borderRadius: '10px',
                                                border: 'hidden',
                                                boxShadow: '10px 10px 9px -8px rgba(179,179,179,1)',
                                                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 46%, rgba(246,246,246,1) 72%, rgba(237,237,237,1) 100%'
                                            }}

                                            cover={
                                                <img
                                                    className="imgCard"
                                                    alt="error"
                                                    src={row.ind_image}
                                                />
                                            }



                                            actions={[
                                                <Button
                                                    className="buttonNull"
                                                    shape="round"
                                                    disabled
                                                >
                                                    {inventory(row.ind_quantity, row.ind_price)}
                                                </Button>,

                                                < Button
                                                    style={{ pointerEvents: isButAb(row.ind_quantity) }}
                                                    type="primary"
                                                    shape="round"
                                                    icon={isIconOn(row.ind_quantity)}
                                                    onClick={
                                                        () =>
                                                            handlePost(row.ind_id, row.ind_name, row.ind_brand, row.ind_reference, row.ind_price)
                                                    }>
                                                    {isButOn(row.ind_quantity)}
                                                </Button>
                                            ]}>


                                            <Meta
                                                style={{
                                                    height: 80,
                                                    marginBottom: '6px'
                                                }}
                                                title={row.ind_name}
                                                description={row.ind_brand + " - " + row.ind_reference}
                                            />

                                            <Button
                                                shape="round"
                                                onClick={
                                                    () => modalCard(row.ind_name, row.ind_brand, row.ind_reference, row.ind_description)
                                                }>
                                                Mais Detalhes
                                            </Button>
                                        </Card>
                                    ))
                                    }

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