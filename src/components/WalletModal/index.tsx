import { AbstractConnector } from "@web3-react/abstract-connector"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { isMobile } from 'react-device-detect'
import { useState, useEffect } from "react"
import { injected } from "../../connectors"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import Option from "./option"
import MetamaskIcon from '../../assets/images/metamask.png'
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { useTranslation } from 'react-i18next';

export default function WalletModal() {
  const { t } = useTranslation();
  const { active, connector, activate, deactivate } = useWeb3React()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (active) {
      setShow(false)
    }
  }, [active])

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

  const handleDisconnect = () => {
    deactivate()
  }

  function getOptions() {
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
      <Button variant="contained" onClick={active ? handleDisconnect : handleShow} disableElevation>
        {active ? t("walletConnect.buttonDisconnect") : t("walletConnect.buttonConnect")}
      </Button>

      <Dialog open={show} onClose={handleClose} sx={{
        background: "rgba(0,0,0,0.5)",
        ['.MuiDialog-paper']: {
          width: '85%',
          borderRadius: '10px',
        }
      }}>
      <DialogTitle sx={{ textAlign: "center",fontFamily: "Black Ops One" }}>
        {t("walletConnect.selectWallet")}
      </DialogTitle>
      <DialogContent>{getOptions()}</DialogContent>
    </Dialog>
    </>
  );
}