import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchCoinInfo, fetchPrice, fetchPriceHistory } from "../config/api";
import mainImg from "../image/coinbg.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ChartList from "./ChartList";

const MainWrapper = styled.div`
    font-weight: 600;

    width: 100%;
    height: 100%;

    position: relative;

    z-index: 1;

    display: flex;
    justify-content: center;
`;

const HomeBgWrapper = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
`;

const HomeImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    position: fixed;
`;

HomeImg.defaultProps = {
    src: mainImg,
};

const BackgroundCover = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;

    background-color: ${(props) => props.theme.sideOpacityColor};
`;

const ImgDesWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    padding: 200px 50px 80px 50px;

    display: flex;
    justify-content: center;
`;

const CoinDetailGrid = styled.div`
    width: 1200px;

    grid-gap: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));

    border-radius: 5px;
`;

const LoadingPage = styled.div`
    width: 100%;
    height: 100vh;

    z-index: 5;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme.sideTextColor};

    i {
        font-size: 100px;
    }

    span {
        padding-top: 20px;
    }
`;

const CoinInfoBox = styled.div`
    width: 100%;
    height: 260px;

    position: relative;

    padding: 20px;
    
    border-radius: 15px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);

    color: ${(props) => props.theme.mainTextColor};

    background-color: ${(props) => props.theme.mainBgColor};
`;

const TagsSpan = styled.span`
    font-size: 10px;
    margin-top: 10px;

    display: block;
`;

const CoinSymbol = styled.img`
    width: 30px;
    
    margin-right: 5px;
`;

const CoinSymbolBox = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;

    h1 {
        font-size: 30px;
    }

    span {
        font-size: 12px;

        display: block;
        padding: 5px 5px;
        margin-left: 10px;

        background-color: rgba(232, 232, 232, 1);
        color: ${(props) => props.theme.mainTextColor};

        border-radius: 5px;
    }
`;

const CoinRankBox = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    
    margin-top: 15px;
`;

const CoinTypeBoxAccent = styled.span`
    margin-right: 8px;

    font-size: 10px;
    padding: 5px;

    display: block;

    border-radius: 5px;

    background-color: rgba(100, 100, 100, 1);
    color: ${(props) => props.theme.sideTextColor};
`;

const CoinTypeBox = styled.span`
    margin-right: 8px;

    font-size: 10px;

    display: block;

    padding: 5px;

    border-radius: 5px;

    background-color: rgba(232, 232, 232, 1);
    color: ${(props) => props.theme.mainTextColor};
`;

const OpenSourceLink = styled.span`
    margin-right: 8px;

    font-size: 10px;

    display: block;

    border-radius: 5px;

    background-color: rgba(232, 232, 232, 1);
    color: ${(props) => props.theme.mainTextColor};

    a {
        font-size: 10px;

        padding: 5px;

        display: block;

        text-decoration: none;

        border-radius: 5px;

        color: ${(props) => props.theme.mainTextColor};

        &:hover {
            background-color: rgba(100, 100, 100, 1);
            color: ${(props) => props.theme.sideTextColor};
        }

        i {
            font-size: 10px;
        }
    }
`;

const CoinTagsBox = styled.div`
    width: 100%;
    
    margin-top: 10px;

    gap: 5px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
`;

const CoinDetailTitle = styled.div`
    font-size: 80px;

    white-space: pre;

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);

    color: ${(props) => props.theme.sideTextColor};

    position: absolute;
    top: 80px;
    left: 50%;

    transform: translateX(-50%);

    @media only screen and (max-width: 768px) {
        font-size: 40px;
    }
`;

const CoinPriceName = styled.span`
    font-size: 11px;

    padding: 0px 0px 6px 0px;

    width: 100%;
    display: block;

    white-space: pre;

    text-align: left;
`;

const PriceStatus = styled.h1`
    font-size: 35px;
    font-weight: 700;

    padding: 0px 0px 6px 0px;

    width: 100%;
    display: block;

    white-space: pre;

    text-align: left;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PriceDetailGrid = styled.div`
    width: 100%;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
`;

const PriceDetailohlv = styled.div`
    padding: 8px 0px 8px 0px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
        border: none;
    }

    span {
        font-size: 11px;
    }

    p {
        padding: 8px 0px 0px 0px;
    }
`;

interface RouteParams {
    coinId: string;
}

interface IInfoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;

    links: {
        explorer: string;
        facebook: string;
        reddit: string;
        source_code: string;
        website: string;
        youtube: string;
    }

    tags: [
        {
            id: string;
            name: string;
        }
    ]
}

interface IPriceData {
    id: string;
    name : string;
    symbol: string;
    rank : number;
    circulating_supply: number;
    total_supply : number;
    max_supply: number;
    beta_value : number;
    first_data_at: string;
    last_updated : string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    const { coinId } = useParams() as unknown as RouteParams;

    const { isLoading: dataLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(["price", coinId], () => fetchPrice(coinId),
    {
        refetchInterval: 5000,
    });
    
    const coinDate = infoData?.first_data_at.slice(0, 10);

    const loading = dataLoading || priceLoading;

    return (
        <HelmetProvider>
            <MainWrapper>
                <Helmet>
                    <title>{infoData?.id.toUpperCase()}</title>
                    <link rel="icon" href={`https://cryptoicon-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} />
                </Helmet>
                <HomeBgWrapper>
                    <HomeImg />
                    <BackgroundCover />
                    <CoinDetailTitle>CRYPTO TRACKER</CoinDetailTitle>
                    <ImgDesWrapper>
                        {loading ? (
                            <LoadingPage>
                                <i className="fas fa-spinner fa-pulse"></i>
                                <span>Loading ...</span>
                            </LoadingPage>
                        ) : (
                            <CoinDetailGrid>
                                <CoinInfoBox>
                                    <CoinSymbolBox>
                                        <CoinSymbol src={`https://cryptoicon-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}/>
                                        <h1>{infoData?.name}</h1>
                                        <span>{infoData?.symbol}</span>
                                    </CoinSymbolBox>
                                    <CoinRankBox>
                                        <CoinTypeBoxAccent>Rank #{infoData?.rank}</CoinTypeBoxAccent>
                                        <CoinTypeBox>{infoData?.type.slice(0, 1).toUpperCase()}{infoData?.type.slice(1)}</CoinTypeBox>
                                        <CoinTypeBox>{coinDate}</CoinTypeBox>
                                        {infoData?.open_source ? (
                                            <OpenSourceLink>
                                                <a href={infoData?.links.source_code} target="_blank" rel="noreferrer">
                                                    <i className="fas fa-code" /> Source Code <i className="fas fa-external-link-alt" />
                                                </a>
                                            </OpenSourceLink>
                                        ) : (
                                            null
                                        )}
                                    </CoinRankBox>
                                    <TagsSpan>Tags: </TagsSpan>
                                    <CoinTagsBox>
                                        {infoData?.tags?.map((item) => (
                                                <CoinTypeBox key={item.id}>#{item.name}</CoinTypeBox>
                                        ))}
                                    </CoinTagsBox>
                                </CoinInfoBox>
                                <CoinInfoBox>
                                    <CoinPriceName>{infoData?.name} Price ({infoData?.symbol})</CoinPriceName>
                                    <PriceStatus>${priceData?.quotes.USD.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</PriceStatus>
                                    <PriceDetailGrid>
                                        <PriceDetailohlv>
                                            <span>Market Cap: </span>
                                            <p>${priceData?.quotes.USD.market_cap.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                        </PriceDetailohlv>
                                        <PriceDetailohlv>
                                            <span>All Time High: </span>
                                            <p>${priceData?.quotes.USD.ath_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                        </PriceDetailohlv>
                                        <PriceDetailohlv>
                                            <span>All Time Date: </span>
                                            <p>{priceData?.quotes.USD.ath_date.slice(0, 10)}</p>
                                        </PriceDetailohlv>
                                    </PriceDetailGrid>
                                </CoinInfoBox>
                                <CoinInfoBox>
                                    <ChartList coinId={coinId}></ChartList>
                                </CoinInfoBox>
                            </CoinDetailGrid>
                        )}
                    </ImgDesWrapper>
                </HomeBgWrapper>
            </MainWrapper>
        </HelmetProvider>
    )
}

export default Coin;