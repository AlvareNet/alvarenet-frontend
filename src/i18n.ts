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
              walletConnectInfo: "连接钱包以使用所有的功能.",
              wallet: "你的钱包地址: {{wallet}}"
            },
            balance: {
              total: "Total ALVN Balance",
              totalvalue: "ALVN value",
              reflection: "ALVN reflections",
              reflectionvalue: "Reflection value",
              usd: "USD"
            }
          },
          sidebar: {
            home: "主页",
            swap: "兑换"
          },
          claim: {
            reset: "Reset Wallet",
            forwallet: "Showing info for Wallet Address: {{wallet}}",
            suffix: " ALVN 可兑换量",
            now: "现在兑换",
            approve: "同意",
            connectWallet: "请连接你的钱包",
            nothing: "没有可兑换的 ALVN 币",
            already: "你已经提取过ALVN 币了",
            tokenssold: "你没有足够的slth币用来兑换快照中的alvn币. 你是否在快照之后出售过slth币?"
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
              walletConnectInfo: "Connect your wallet to use all features.",
              wallet: "Your connected Wallet address: {{wallet}}"
            },
            balance: {
              reset: "Reset Wallet",
              forwallet: "Showing info for Wallet Address: {{wallet}}",
              total: "Total ALVN Balance",
              totalvalue: "ALVN value in USD",
              reflection: "ALVN reflections",
              reflectionvalue: "Reflection value",
              usd: "USD"
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
            connectWallet: "Please connect your wallet",
            nothing: "No ALVN token available",
            already: "You have already claimed your ALVN tokens",
            tokenssold: "You dont have enought tokens to swap anymore. Did you sell tokens?"
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
              walletConnectInfo: "Verbinde deine Wallet um alle Features zu nutzen.",
              wallet: "Deine verbundene Wallet Adresse: {{wallet}}"
            },
            balance: {
              reset: "Reset Wallet",
              forwallet: "Informationen für Wallet Adresse: {{wallet}}",
              total: "Total ALVN Balance",
              totalvalue: "ALVN value in USD",
              reflection: "ALVN reflections",
              reflectionvalue: "Reflection value",
              usd: "USD"
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
            connectWallet: "Bitte verbinde deine Wallet",
            nothing: "Es sind keine ALVN Token verfügbar",
            already: "ALVN tokens wurden bereits überführt",
            tokenssold: "Du hast nicht mehr genug Token zum Tauschen. Hast du Token verkauft?"
          }
        }
      }
    }
  });

export default i18n;