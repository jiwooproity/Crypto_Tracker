import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchCoinInfo } from "../config/api";
import mainImg from "../image/coinbg.jpg";

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
`;

HomeImg.defaultProps = {
    src: mainImg,
};

const ImgDesWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    padding: 10px;

    background-color: ${(props) => props.theme.sideOpacityColor};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HomeImageTitle = styled.h1`
    font-size: 150px;
    font-weight: 700;

    white-space: pre;

    color: ${(props) => props.theme.sideTextColor};

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.9);

    opacity: 0.9;
`;

const CoinImageTitle = styled.h1`
    font-size: 7vh;
    font-weight: 700;

    white-space: pre;

    color: ${(props) => props.theme.sideTextColor};

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.9);

    opacity: 0.9;
`;

const HomeAPI = styled.p`
    font-size: 20px;

    color: ${(props) => props.theme.sideTextColor};

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.9);

    opacity: 0.8;
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
}

function Coin() {
    const { coinId } = useParams() as unknown as RouteParams;

    const { isLoading, data } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));

    console.log(data);
    
    //const { state } = useLocation();
    
    return (
        <MainWrapper>
            <HomeBgWrapper>
                <HomeImg />
                <ImgDesWrapper>
                    <CoinImageTitle>
                    </CoinImageTitle>
                </ImgDesWrapper>
            </HomeBgWrapper>
        </MainWrapper>
    )
}

export default Coin;