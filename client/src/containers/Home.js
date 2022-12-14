import { PlusCircleFilled } from '@ant-design/icons';
import { Space, Card, Button, InputNumber, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import Carousel from "../utility/Carousel";
import api from '../services/api';
import './cssContainers/home.css';
import { buttonBaseClasses } from '@mui/material';


const { Meta } = Card;
const p_marg = 4;


function Home() {

    const [products, setProducts] = useState([]);
    const [quantityCont, setQuantityCont] = useState('1');


    useEffect(() => {
        async function loadproducts() {
            const response = await api.get('/api/products');
            setProducts(response.data)
        }
        loadproducts()
    }, [])



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

        let responseCar = await api.post('/api/list/', listCar);
        console.log(listCar)
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




    return (

        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}>

            <Carousel />

            <Space
                size="large"
                wrap
                style={{
                    padding: 0,
                    justifyContent: 'center',
                }}>

                {products.map((row) => (
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
                                src={row.product_image}
                            />
                        }



                        actions={[
                            <Button
                                className="buttonNull"
                                shape="round"
                                disabled
                            >
                                {inventory(row.product_quantity, row.product_price)}
                            </Button>,

                            < Button
                                style={{ pointerEvents: isButAb(row.product_quantity) }}
                                type="primary"
                                shape="round"
                                icon={isIconOn(row.product_quantity)}
                                onClick={
                                    () =>
                                        handlePost(row._id, row.product_name, row.product_brand, row.product_reference, row.product_price)
                                }>
                                {isButOn(row.product_quantity)}
                            </Button>
                        ]}>

                        {/* onClick={() => handlePost(row._id, row.product_name, row.product_brand, row.product_reference, row.product_price, (document.getElementById('qtyCont').value), (row.product_quantity - document.getElementById('qtyCont').value))} */}



                        <Meta
                            style={{
                                height: 80,
                                marginBottom: '6px'
                            }}
                            title={row.product_name}
                            description={row.product_brand + " - " + row.product_reference}
                        />

                        <Button
                            shape="round"
                            onClick={
                                () => modalCard(row.product_name, row.product_brand, row.product_reference, row.product_description)
                            }>
                            Mais Detalhes
                        </Button>
                    </Card>
                ))
                }
            </Space >

        </Space >
    )
}

export default Home