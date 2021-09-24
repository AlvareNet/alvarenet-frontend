import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import styled from "styled-components";
import Hexagon from "../../assets/images/hexagon.png"

const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '50px')};
    width: ${({ size }) => (size ? size + 'px' : '50px')};
    margin-bottom: 10px;
    left: 50%;
    position: relative;
    transform: translate(-50%,0);
  },

`

export default function Option({

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
) {
  const content = (
    <Card sx={{
      maxWidth: 340,
      position: 'relative',
      left: '50%',
      transform: 'translate(-50%,0)',
      boxShadow: 0,
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '10px',
      background: ((theme) => theme.palette.mode === "light" ? "#E5E5E5": "")
    }} >
      <CardActionArea onClick={onClick}  sx={{
        
      }}>
        <CardContent sx={{
            background: `url(${Hexagon})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
          <IconWrapper size={size}>
            <img src={icon} alt={'Icon'} />
          </IconWrapper>
        </CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center">
            {header}
          </Typography>
          {subheader &&
            <Typography variant="body2" color="text.secondary">
              {subheader}
            </Typography>}
      </CardActionArea>
    </Card>
  )
  return content
}