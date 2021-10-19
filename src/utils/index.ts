import { commify, formatUnits } from "@ethersproject/units";
import { ethers } from "ethers";

export function BigNumberToDisplay(number : ethers.BigNumber, decimals: number) : string {
    var divider = 1;
    if(decimals > 3){
        divider = Math.pow(10, (decimals-3))
    }
    var returnstring = commify(formatUnits(number.div(divider), 3))
    return returnstring;
}