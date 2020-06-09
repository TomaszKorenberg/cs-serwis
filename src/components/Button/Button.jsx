import React from "react";
import styled from "styled-components";



function Button(props) {
    const ButtonStyled = styled.button`
    height:${props => props.height || "5px;"};
    width:50px;
    `;

    return (
        <ButtonStyled>{props.children}</ButtonStyled>
    );
}

export default Button;