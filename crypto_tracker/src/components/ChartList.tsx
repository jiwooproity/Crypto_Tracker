import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPriceHistory } from "../config/api";

interface chartProps {
    coinId: string;
}

interface IChartProps {
    close: number;
    high: number;
    low: number;
    market_cap: number;
    open: number;
    time_close: string;
    time_open: string;
    volume: number;
}

const PropH1 = styled.h1`
    font-size: 30px;

    text-transform: uppercase;

    margin-bottom: 10px;
`;

function ChartList({coinId}: chartProps) {
    const { isLoading, data } = useQuery<IChartProps[]>(["ohlcvData", coinId], () => fetchPriceHistory(coinId));
    return (
        <>
            {isLoading ? (
                "loading..."
            ) : (
                <>
                    <PropH1>{coinId}</PropH1>
                    <p>차트 준비중</p>
                </>
            )}
        </>
    )
}

export default ChartList;