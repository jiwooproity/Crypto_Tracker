import styled from "styled-components";
import { fetchCoin } from "../config/api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

interface side {
  toggle: boolean;
}

const WebWrapper = styled.div<side>`
  width: ${(props) => (props.toggle ? "50px" : "100%")};
  height: ${(props) => (props.toggle ? "0px" : "100%")};

  position: absolute;

  transition: width 0.5s ease, height 0.5s ease;

  z-index: 2;
`;

const InnerContainer = styled.div<side>`
  width: ${(props) => (props.toggle ? "50px" : "100%")};
  height: ${(props) => (props.toggle ? "0px" : "100%")};
  display: flex;

  transition: width 0.5s ease, height 0.5s ease;
`;

const SideWrapper = styled.div<side>`
  width: ${(props) => (props.toggle ? "0px" : "100%")};
  height: ${(props) => (props.toggle ? "0px" : "100%")};

  position: relative;

  color: ${(props) => props.theme.sideTextColor};

  overflow-y: scroll;

  transition: width 0.5s ease, height 0.5s ease;

  &::before {
    content: "";

    width: ${(props) => (props.toggle ? "0px" : "100%")};
    height: ${(props) => (props.toggle ? "0px" : "100%")};

    background-color: ${(props) => props.theme.sideOpacityAccent};

    position: fixed;
    top: 0;
    left: 0;

    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(5px);
    -moz-backdrop-filter: blur(5px);
    -o-backdrop-filter: blur(5px);
    -ms-backdrop-filter: blur(5px);

    z-index: -1;

    transition: width 0.5s ease, height 0.5s ease;

    @media only screen and (max-width: 768px) {
      background-color: rgba(41, 48, 71, 0.9);
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SideToggleBtn = styled.div<side>`
  font-size: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 12.5px;
  left: 30px;

  color: ${(props) => props.theme.sideTextColor};

  /* border-top-right-radius: ${(props) => (props.toggle ? "0px" : "5px")};
    border-bottom-right-radius: ${(props) => (props.toggle ? "0px" : "5px")}; */

  transition: height 0.5s ease, border-radius 2s ease, background-color 0.5s ease, position 0.5s ease, top 0.5s ease,
    left 0.5s ease, bottom 0.5s ease, right 0.5s ease, color 0.5s ease;

  cursor: pointer;

  i {
    cursor: pointer;
  }
`;

const SideMenuList = styled.ul`
  width: 100%;

  padding: 0px 70px 0px 70px;

  position: absolute;
  top: 60px;

  padding-bottom: 10px;

  /* background-color: ${(props) => props.theme.sideOpacityAccent}; */
`;

const SideCoinSymbol = styled.img`
  width: 20px;

  position: absolute;
  top: 50%;
  left: 12px;

  transform: translateY(-50%);
`;

const SideMenuItem = styled.li`
  font-weight: 700;
  font-size: 20px;

  i {
    width: 20px;

    position: absolute;
    top: 50%;
    left: 11px;

    transform: translateY(-50%);
  }

  a {
    padding: 15px 39px;

    display: block;

    position: relative;

    white-space: pre;

    text-decoration: none;

    /* background-color: ${(props) => props.theme.sideOpacityAccent}; */
    color: ${(props) => props.theme.sideTextColor};

    border-radius: 10px;

    transition: color 0.5s ease;
  }

  &:hover {
    a {
      color: orange;
    }
  }

  /* &:nth-child(1):hover {
        a {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: ${(props) => props.theme.sideTextColor};
            color: ${(props) => props.theme.mainTextColor}
        }

        a::before {
            display: none;
        }

        a::after {
            content: '';

            width: 20px;
            height: 20px;

            z-index: 1;

            position: absolute;
            bottom: -20px;
            right: 0px;
            
            border-radius: 50%;

            box-shadow: 10px -10px 0px 1px ${(props) => props.theme.mainBgColor};

            background-color: ${(props) => props.theme.sideColor};
        }
    } */

  a.active {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: ${(props) => props.theme.sideColor2};
    color: ${(props) => props.theme.sideTextColor};

    transition: color 0.5s ease, background-color 0.5s ease;
  }

  /* a.active::before {
        content: '';

        width: 20px;
        height: 20px;

        position: absolute;
        top: -20px;
        right: 0px;
            
        border-radius: 50%;

        box-shadow: 10px 10px 0px 1px ${(props) => props.theme.mainBgColor};

        background-color: rgba(41, 48, 71, 0);
    }

    a.active::after {
        content: '';

        width: 20px;
        height: 20px;

        z-index: 1;

        position: absolute;
        bottom: -20px;
        right: 0px;
            
        border-radius: 50%;

        box-shadow: 10px -10px 0px 1px ${(props) => props.theme.mainBgColor};

        background-color: rgba(41, 48, 71, 0);
    } */

  span {
    font-size: 5px;

    padding-left: 5px;

    position: absolute;
    top: 18px;

    color: #df3d2e;
  }

  /* &:hover {
        a {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: ${(props) => props.theme.sideTextColor};
            color: ${(props) => props.theme.mainTextColor}
        }

        a::before {
            content: '';

            width: 20px;
            height: 20px;

            position: absolute;
            top: -20px;
            right: 0px;
            
            border-radius: 50%;

            box-shadow: 10px 10px 0px 1px ${(props) => props.theme.mainBgColor};

            background-color: ${(props) => props.theme.sideColor};
        }

        a::after {
            content: '';

            width: 20px;
            height: 20px;

            z-index: 1;

            position: absolute;
            bottom: -20px;
            right: 0px;
            
            border-radius: 50%;

            box-shadow: 10px -10px 0px 1px ${(props) => props.theme.mainBgColor};

            background-color: ${(props) => props.theme.sideColor};
        }
    }

    &:last-child:hover {
        a {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: ${(props) => props.theme.sideTextColor};
            color: ${(props) => props.theme.mainTextColor}
        }

        a::before {
            content: '';

            width: 20px;
            height: 20px;

            position: absolute;
            top: -20px;
            right: 0px;
            
            border-radius: 50%;

            box-shadow: 10px 10px 0px 1px ${(props) => props.theme.mainBgColor};

            background-color: ${(props) => props.theme.sideColor};
        }

        a::after {
            content: '';

            width: 20px;
            height: 20px;

            z-index: 1;

            position: absolute;
            bottom: -20px;
            right: 0px;
            
            border-radius: 50%;

            box-shadow: 10px -10px 0px 1px ${(props) => props.theme.mainBgColor};

            background-color: ${(props) => props.theme.sideColor};
        }
    }

    */
`;

/* const CoinSection = styled.div<side>`
    width: ${(props) => props.toggle ? "100%" : "calc(100% - 300px);"};
    height: 100%;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.mainBgColor};
`; */

const LoadingPage = styled.div<side>`
  width: 100%;
  height: 100vh;

  display: ${(props) => (props.toggle ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.sideTextColor};
  background-color: ${(props) => props.theme.sideOpacityAccent};

  backdrop-filter: blur(15px);

  i {
    font-size: 100px;
  }

  span {
    padding-top: 20px;
  }
`;

interface ICoinList {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoinList[]>("coinlist", fetchCoin);

  const [isActive, setIsActive] = useState(true);
  const [isClassActive, setIsClassActive] = useState(-1);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleActive = (index: number) => {
    setIsClassActive(index);
    setIsActive(!isActive);
  };

  return (
    <WebWrapper toggle={isActive}>
      {isLoading ? (
        <LoadingPage toggle={isActive}>
          <i className="fas fa-spinner fa-pulse"></i>
          <span>Loading ...</span>
        </LoadingPage>
      ) : (
        <InnerContainer toggle={isActive}>
          <SideWrapper toggle={isActive}>
            <SideMenuList>
              <SideMenuItem>
                <Link
                  to={{
                    pathname: `/`,
                  }}
                  key={-1}
                  onClick={() => handleActive(-1)}
                  className={isClassActive === -1 ? "active" : ""}
                >
                  <i className="fas fa-home"></i>
                  HOME
                </Link>
              </SideMenuItem>
              {data?.slice(0, 300).map((coin, index) => (
                <SideMenuItem key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                    }}
                    state={{
                      name: coin.name,
                    }}
                    key={index + 1}
                    onClick={() => handleActive(index)}
                    className={isClassActive === index ? "active" : ""}
                  >
                    <SideCoinSymbol src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name}
                    <span>{coin.symbol}</span>
                  </Link>
                </SideMenuItem>
              ))}
            </SideMenuList>
          </SideWrapper>
          <SideToggleBtn toggle={isActive} onClick={handleClick}>
            <i onClick={handleClick} className={isActive ? "fas fa-bars" : "fas fa-times"}></i>
          </SideToggleBtn>
        </InnerContainer>
      )}
    </WebWrapper>
  );
}

export default Coins;
