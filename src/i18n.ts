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
      en: {
        translation: {
          lang: {
            de: "German",
            en: "English"
          },
          walletConnect: {
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
            suffix: " ANET available",
            now: "Claim Now",
            approve: "Approve",
            connectWallet: "Please connect your wallet"
          }
        }
      },
      de: {
        translation: {
          lang: {
            de: "Deutsch",
            en: "Englisch"
          },
          walletConnect: {
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
            suffix: " ANET verfügbar",
            now: "Jetzt claimen",
            approve: "Approve",
            connectWallet: "Bitte verbinde deine Wallet"
          }
        }
      }
    }
  });

export default i18n;