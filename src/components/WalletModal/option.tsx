import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import styled from "styled-components";

const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '50px')};
    width: ${({ size }) => (size ? size + 'px' : '50px')};
    margin-bottom: 10px;
  },

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
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <IconWrapper size={size}>
                <img src={icon} alt={'Icon'}  />
            </IconWrapper>
            <Typography gutterBottom variant="h5" component="div" align="center">
                {header}
            </Typography>
            {subheader && 
            <Typography variant="body2" color="text.secondary">
            {subheader}
            </Typography>}
          </CardContent>
        </CardActionArea>
        </Card>
    )
    return content
}