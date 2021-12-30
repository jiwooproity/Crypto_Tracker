import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchCoinInfo } from "../config/api";
import mainImg from "../image/coinbg.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MainWrapper = styled.div`
    font-weight: 600;

    width: 100%;
    height: 100%;

    position: relative;

    z-index: -1;

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
    height: 250px;

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

function Coin() {
    const { coinId } = useParams() as unknown as RouteParams;

    const { isLoading, data } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    
    const coinDate = data?.first_data_at.slice(0, 10);

    return (
        <HelmetProvider>
            <MainWrapper>
                <Helmet>
                    <title>{data?.id.toUpperCase()}</title>
                    <link rel="icon" href={`https://cryptoicon-api.vercel.app/api/icon/${data?.symbol.toLowerCase()}`} />
                </Helmet>
                <HomeBgWrapper>
                    <HomeImg />
                    <BackgroundCover />
                    <CoinDetailTitle>CRYPTO TRACKER</CoinDetailTitle>
                    <ImgDesWrapper>
                        {isLoading ? (
                            <LoadingPage>
                                <i className="fas fa-spinner fa-pulse"></i>
                                <span>Loading ...</span>
                            </LoadingPage>
                        ) : (
                            <CoinDetailGrid>
                                <CoinInfoBox>
                                    <CoinSymbolBox>
                                        <CoinSymbol src={`https://cryptoicon-api.vercel.app/api/icon/${data?.symbol.toLowerCase()}`}/>
                                        <h1>{data?.name}</h1>
                                        <span>{data?.symbol}</span>
                                    </CoinSymbolBox>
                                    <CoinRankBox>
                                        <CoinTypeBoxAccent>Rank #{data?.rank}</CoinTypeBoxAccent>
                                        <CoinTypeBox>{data?.type.slice(0, 1).toUpperCase()}{data?.type.slice(1)}</CoinTypeBox>
                                        <CoinTypeBox>{coinDate}</CoinTypeBox>
                                    </CoinRankBox>
                                    <TagsSpan>Tags: </TagsSpan>
                                    <CoinTagsBox>
                                        {data?.tags?.map((item) => (
                                            <CoinTypeBox key={item.id}>#{item.name}</CoinTypeBox>
                                        ))}
                                    </CoinTagsBox>
                                </CoinInfoBox>
                                <CoinInfoBox>
                                    <h1>Price</h1>
                                </CoinInfoBox>
                                <CoinInfoBox>
                                    <h1>Graph</h1>
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