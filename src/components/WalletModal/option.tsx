import { Card } from "react-bootstrap";
import styled from "styled-components";

const IconWrapper = styled.div<{ size?: number | null }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

export default function Option ({
    
    link = null,
    clickable = true,
    size,
    onClick = undefined,
    color,
    header,
    subheader = null,
    icon,
    active = false,
    id,
}: {
    link?: string | null
    clickable?: boolean
    size?: number | null
    onClick?: undefined | (() => void)
    color: string
    header: React.ReactNode
    subheader: React.ReactNode | null
    icon: string
    active?: boolean
    id: string
}
){
    const content = (
        <Card onClick={onClick} id={id} >
            <Card.Body>
                <IconWrapper size={size}>
                    <img src={icon} alt={'Icon'} />
                </IconWrapper>
                <Card.Title>{header}</Card.Title>
                {subheader && <Card.Text>{subheader}</Card.Text>}
            </Card.Body>
        </Card>
    )
    return content
}