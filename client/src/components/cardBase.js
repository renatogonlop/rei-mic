import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';

const { Meta } = Card;

const cardList = () => (
    <Card
        style={{
            width: 200,
            border:'none'
        }}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
        actions={[
            <SettingOutlined key="setting" />,

            < Button
                style={{}}
                // className={(row._id + "ButAddCard")}
                type="primary"
                shape="round"
                icon={<PlusCircleFilled />}
                // onLoad={isButOn((row._id + "ButAddCard"), row.product_quantity)}
            // onClick={
            //     () =>
            //         handlePost(row._id, row.product_name, row.product_brand, row.product_reference, row.product_price, row.product_quantity)
            // }
            >
            </Button>
        ]}
    >
        <Meta
            title="Card title"
            description="This is the description"
        />
    </Card>
);

export default cardList;