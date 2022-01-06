import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPriceHistory } from "../config/api";
import ApexChart from "react-apexcharts";

interface chartProps {
    coinId: string;
    coinName: string;
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

const GraphBoxText = styled.div`
    font-size: 12px;
    
    position: absolute;
    top: 20px;
    left: 20px;
`;

function ChartList({coinId, coinName}: chartProps) {
    const { isLoading, data } = useQuery<IChartProps[]>(["ohlcvData", coinId], () => fetchPriceHistory(coinId),
    {
        refetchInterval: 5000,
    });
    
    return (
        <>
            {isLoading ? (
                <GraphBoxText>
                    Loading...
                </GraphBoxText>
            ) : (
                <>
                    <GraphBoxText>
                        {coinName} Chart
                    </GraphBoxText>
                    <ApexChart 
                        type="candlestick"

                        series={[
                            {
                                data: data?.map((price) => {
                                    return {
                                        x: price.time_close.slice(2, 10),
                                        y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                                    }
                                })
                            }
                        ]}

                        options={{
                            chart: {
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
                            },
                        }}
                    />
                </>
            )}
        </>
    )
}

export default ChartList;