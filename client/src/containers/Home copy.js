import { PlusCircleFilled } from '@ant-design/icons';
import { Space, Card, Button, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import Carousel from "../utility/Carousel";
import api from '../services/api';

const { Meta } = Card;

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function loadproducts() {
            const response = await api.get('/api/products');
            console.log(response.data)
            setProducts(response.data)
        }
        loadproducts()
    }, [])


    // const data = {
    //     product_name: name,
    //     product_reference: reference,
    // }
    




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
                    border: 'red 1px solid',
                    paddingLeft: '1.5%',
                    paddingRight: '1.5%',
                }}>

                {new Array(12).fill(products).map((_, index) => (

                    <Card
                        style={{
                            width: 300,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }

                        actions={[
                            "R$ 29,90",
                            <InputNumber min={0} defaultValue={0} />,
                            <Button type="primary" shape="round" icon={<PlusCircleFilled />} >
                                Add
                            </Button>,
                        ]}>

                        <Meta
                            title = {product_name}
                            // description = {setReference}
                            // title="Card title"
                            description="This is the description"
                        />
                    </Card>
                ))}

            </Space>

        </Space>

    )
}

export default Home