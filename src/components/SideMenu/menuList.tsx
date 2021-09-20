import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { Home, SwapHoriz } from "@material-ui/icons"

export default function MenuList(props: any){
  return (
    <List>
    <ListItem button key={"Home"} onClick={() => props.changePage("Home")}>
        <ListItemIcon>
            <Home />
        </ListItemIcon>
        <ListItemText primary={"Home"} />
    </ListItem>
    <ListItem button key={"Swap"} onClick={() => props.changePage("Claim")}>
        <ListItemIcon>
            <SwapHoriz />
        </ListItemIcon>
        <ListItemText primary={"Swap"} />
    </ListItem>
</List>
  )
} 