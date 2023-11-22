
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.div`
    width: 100%;
    height: 35px;

    padding: 25px 30px;

    position: absolute;
    top: 0;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    z-index: 1;
`;

const NavMenu = styled.ul`
    text-transform: uppercase;

    display: flex;
`;

const NavMenuItem = styled.li`
    font-size: 20px;
    color: ${(props) => props.theme.sideTextColor};

    margin-left: 15px;

    a {
        text-decoration: none;

        color: ${(props) => props.theme.sideTextColor};
    }
`;

function Navbar() {
    return (
        <NavWrapper>
            <NavMenu>
                <NavMenuItem>
                    <Link to="/about">About</Link>
                </NavMenuItem>
                <NavMenuItem>
                    <a href="https://api.coinpaprika.com" target="_blank" rel="noreferrer">API</a>
                </NavMenuItem>
            </NavMenu>
        </NavWrapper>
    )
}

export default Navbar;