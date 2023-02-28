import styled from 'styled-components'

export const Container = styled.div`
`

export const Row = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `

export const Col = styled.div`
    width: 15%;
    background: #ccc; 
    margin: 5px;
    flex: auto;
    text-align: center;
    min-height: 20px;
    vertical-align: text-bottom;
    padding: 10px;
`
