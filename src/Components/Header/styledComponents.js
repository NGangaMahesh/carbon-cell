import styled from 'styled-components'

export const TabItems = styled.li`
color:  ${props =>props.isActive  ? '#25d366' : '#ffffff'};
display: flex;
align-items: center;
font-size: 20px;
font-weight: 400;
` 