import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import About from "./components/About";
import Coin from "./components/Coin";
import Coins from "./components/Coins";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const WebWrapper = styled.div`
    width: 100%;
    height: 100vh;
`;

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
`;

function Router() {
    return (
        <HashRouter>
            <WebWrapper>
                <InnerContainer>
                    <Navbar />
                    <Coins />
                    <Routes>
                        <Route path='/:coinId' element={<Coin />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </InnerContainer>
            </WebWrapper>
        </HashRouter>
    )
}

export default Router;