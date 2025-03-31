import { ReactNode } from "react"
import styled from "styled-components"

export const Loading = (props: { children?: ReactNode }) => {

    return (
        <LoadingElement>
            {props.children}
        </LoadingElement>
    )
}

const LoadingElement = styled.div`
    min-height: calc(100vh - 77px);
    width: 100%;
    background-color: var(--background);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
