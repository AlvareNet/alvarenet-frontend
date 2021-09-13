import { Button } from "@material-ui/core"
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/slothi/hooks"

export default function Claim(){
    const number = useUserUnclaimedAmount()
    const available = useUserHasAvailableClaim()
    const { claimCallback } = useClaimCallback()
    function onClaim() {
      claimCallback().then((result) => console.log(result))
        // reset modal and log error
        .catch((error) => {
          console.log(error)
        })
    }
    

    if(available){
    return(
        <Button onClick={onClaim}>
        {"Claim " + number.toString() }
        </Button>
    );
    }
    else{
    return(
        <div>
        No tokens to claim!
        </div>
    )
    }
}
