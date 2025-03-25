import { ReactNode } from "react"
import styled from "styled-components"

export const ErrorMessage = (props: { children?: ReactNode }) => {

    return (
        <ErrorElement>
            {props.children}
        </ErrorElement>
    )
}

const ErrorElement = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 2px;
`
