import { AbstractConnector } from "@web3-react/abstract-connector"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { isMobile } from 'react-device-detect'
import { useState } from "react"
import { injected } from "../../connectors"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import Option from "./option"
import MetamaskIcon from '../../assets/images/metamask.png'
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { connected } from "process"


export default function WalletModal(){
    const { active, account, connector, activate, error } = useWeb3React()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tryActivation = async (connector: AbstractConnector | undefined) => {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })
  
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
  
      connector &&
        activate(connector, undefined, true).catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          }
        })
    }

    function getOptions(){
      const isMetamask = window.ethereum && window.ethereum.isMetaMask
      return Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]

        if (isMobile) {
          if (!window.web3 && !window.ethereum && option.mobile) {
            return (
              <Option
                onClick={() => {
                  option.connector !== connector && !option.href && tryActivation(option.connector)
                }}
                id={`connect-${key}`}
                key={key}
                active={option.connector && option.connector === connector}
                color={option.color}
                link={option.href}
                header={option.name}
                subheader={null}
                icon={option.iconURL}
              />
            )
          }
          return null
        }

              // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={"Install Metamask"}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
                !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      )

      })
    }

    return (
      <>
          <Button variant="contained" onClick={handleShow} disableElevation>
            {active ? account : 'Connect Wallet' }
          </Button>
    
          <Dialog open={show} onClose={handleClose} sx={{
            background:"rgba(0,0,0,0.5)"}}>
            <DialogTitle sx={{textAlign: "center"}}>
              Select a Wallet
            </DialogTitle>
            <DialogContent>{getOptions()}</DialogContent>
          </Dialog>
        </>
      );
}