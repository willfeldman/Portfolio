import "./BarButton.scss";

import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${props => props.color};
    &:hover svg {
        color: ${props => props.imgHoverColor};
    }
`;

export default function BarButton(props) {
        
    return (
        <div className={`barButton ${props.className}`}>
            <StyledButton onClick={props.onClick} color={props.color} imgHoverColor={props.imgHoverColor}>
                <div className="barButtonImg">
                    {props.children}
                </div>
            </StyledButton>
        </div>
    );
}
