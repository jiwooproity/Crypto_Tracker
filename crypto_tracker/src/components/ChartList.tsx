import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPriceHistory } from "../config/api";
import ApexChart from "react-apexcharts";

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
                <ApexChart 
                    type="candlestick"

                    series={[
                        {
                            name: "price",
                            data: data?.map((price) => {
                                return {
                                    x: price.time_close,
                                    y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                                }
                            })
                        }
                    ]}

                    options={{
                        theme: {
                            mode: "dark",
                        },
    
                        chart: {
                            width: "100%",
                            toolbar: {
                                show: false,
                            },
    
                            background: "transparent",
                        },
    
                        grid: {
                            show: false,
                        },
    
                        stroke: {
                            curve: "smooth",
                            width: 1,
                        },
    
                        yaxis: {
                            show: false,
                        },
    
                        xaxis: {
                            axisBorder: {
                                show: false,
                            },
    
                            axisTicks: {
                                show: false,
                            },
    
                            labels: {
                                show: false,
                            },
    
                            type: "datetime",
                            categories: data?.map((price) => price.time_close),
                        },
    
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(3)}`,
                            }
                        }
                    }}
                />
            )}
        </>
    )
}

export default ChartList;