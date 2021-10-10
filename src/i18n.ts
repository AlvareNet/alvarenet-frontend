import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      cn: {
        translation: {
          lang: {
            de: "Deutsch",
            en: "English",
            cn: "中文"
          },
          walletConnect: {
            unknownError: "未知错误,请尝试重新连接!",
            wrongChain: "错误的链!",
            wrongChainMessageLong: "请在钱包中选择正确的链! 只有bsc,binance smart chain才可以!",
            buttonConnect: "连接钱包",
            buttonDisconnect: "取消连接钱包",
            selectWallet: "选择钱包"
          },
          home: {
            welcome: {
              title: "欢迎来到 AlvareNet的 dApp",
              walletConnectInfo: "连接钱包以使用所有的功能."
            }
          },
          sidebar: {
            home: "主页",
            swap: "兑换"
          },
          claim: {
            suffix: " ALVN 可兑换量",
            now: "现在兑换",
            approve: "同意",
            connectWallet: "请连接你的钱包"
          }
        }
      },
      en: {
        translation: {
          lang: {
            cn: "中文",
            de: "Deutsch",
            en: "English"
          },
          walletConnect: {
            unknownError: "Unknown Error, try reloading!",
            wrongChain: "Wrong Chain!",
            wrongChainMessageLong: "Wrong chain selected in wallet! Only Binance Smart Chain is supported!",
            buttonConnect: "Connect Wallet",
            buttonDisconnect: "Disconnect",
            selectWallet: "Select Wallet"
          },
          home: {
            welcome: {
              title: "Welcome to AlvareNet's dApp",
              walletConnectInfo: "Connect your wallet to use all features."
            }
          },
          sidebar: {
            home: "Home",
            swap: "Swap"
          },
          claim: {
            suffix: " ALVN available",
            now: "Claim Now",
            approve: "Approve",
            connectWallet: "Please connect your wallet"
          }
        }
      },
      de: {
        translation: {
          lang: {
            cn: "中文",
            de: "Deutsch",
            en: "English"
          },
          walletConnect: {
            unknownError: "Unbekannter Error!",
            wrongChain: "Falsche Chain!",
            wrongChainMessageLong: "Falsche Chain aktiv im Wallet! Nur Binance Smart Chain ist supportet!",
            buttonConnect: "Wallet verbinden",
            buttonDisconnect: "Wallet trennen",
            selectWallet: "Wallet auswählen"
          },
          home: {
            welcome: {
              title: "Willkommen bei AlvareNet's dApp",
              walletConnectInfo: "Verbinde deine Wallet um alle Features zu nutzen."
            }
          },
          sidebar: {
            home: "Start",
            swap: "Swap"
          },
          claim: {
            suffix: " ALVN verfügbar",
            now: "Jetzt claimen",
            approve: "Approve",
            connectWallet: "Bitte verbinde deine Wallet"
          }
        }
      }
    }
  });

export default i18n;