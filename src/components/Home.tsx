import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    padding: 10px;

    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const typingAnimation = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const HomeImageTitle = styled.h1`
    font-size: 100px;
    font-weight: 700;

    white-space: pre;

    position: relative;

    color: ${(props) => props.theme.sideTextColor};

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

    opacity: 0.9;

    @media only screen and (max-width: 768px) {
        font-size: 42px;
    }

    &::after {
        content: '';

        width: 5px;
        height: 90px;
        margin-left: 5px;
        position: absolute;
        top: 50%;

        transform: translateY(-50%);

        background-color: ${(props) => props.theme.sideTextColor};

        animation: ${typingAnimation} 1s linear infinite;

        @media only screen and (max-width: 768px) {
            height: 40px;
        }
    }
`;

const HomeAPI = styled.p`
    font-size: 20px;

    color: ${(props) => props.theme.sideTextColor};

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

    opacity: 0.8;

    @media only screen and (max-width: 768px) {
        font-size: 15px;
    }
`;

function Home() {
    const txt = "RYPTO TRACKER";
    const [ Text, setText ] = useState('');
    const [ Count, setCount ] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setText(Text + txt[Count]);
            setCount(Count + 1);
        }, 200);

        if(Count === txt.length) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    })

    return (
        <HelmetProvider>
            <Helmet>
                <title>CRYPTO TRACKER</title>
            </Helmet>
            <MainWrapper>
                <HomeBgWrapper>
                    <HomeImg />
                    <BackgroundCover />
                    <ImgDesWrapper>
                        <HomeImageTitle>
                            C{Text}
                        </HomeImageTitle>
                        <HomeAPI>
                            https://api.coinpaprika.com
                        </HomeAPI>
                    </ImgDesWrapper>
                </HomeBgWrapper>
            </MainWrapper>
        </HelmetProvider>
    )
}

export default Home;