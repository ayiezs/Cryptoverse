import React from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangeList = data?.data?.exchanges

    if(isFetching) return <Loader />;
    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangeList.map((exchanges) =>(
                    <Col span={24}>
                         <Collapse accordion>
                            <Panel
                                key={exchanges.id}
                                showArrow={false}
                                header={
                                    <Row key={exchanges.id}>
                                        <Col span={6}>
                                            <Text><strong>{exchanges.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchanges.iconUrl} />
                                            <Text><strong>{exchanges.name}.</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchanges.volume)}</Col>
                                        <Col span={6}>${millify(exchanges.numberOfMarkets)}</Col>
                                        <Col span={6}>${millify(exchanges.marketShare)}</Col>
                                    </Row>
                                }>
                                {HTMLReactParser(exchanges.description || '')}
                            </Panel>
                         </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges