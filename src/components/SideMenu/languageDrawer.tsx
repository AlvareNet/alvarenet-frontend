import { Button, Menu, MenuItem } from '@mui/material';
import { LanguageRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function PositionedMenu() {
const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="language-positioned-button"
        aria-controls="language-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <LanguageRounded/>
      </Button>
      <Menu
        id="language-positioned-menu"
        aria-labelledby="language-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem><Button key="de" onClick={() => {i18n.changeLanguage("de")
    handleClose()}} style={{ fontWeight: i18n.resolvedLanguage === "de" ? 'bold' : 'normal' }}>
                            {t('lang.de')}</Button></MenuItem>
        <MenuItem><Button key="en" onClick={() => {i18n.changeLanguage("en")
    handleClose()}} style={{ fontWeight: i18n.resolvedLanguage === "en" ? 'bold' : 'normal' }}>
                            {t('lang.en')}</Button></MenuItem>
        <MenuItem><Button key="cn" onClick={() => {i18n.changeLanguage("cn")
    handleClose()}} style={{ fontWeight: i18n.resolvedLanguage === "cn" ? 'bold' : 'normal' }}>
                            {t('lang.cn')}</Button></MenuItem>
      </Menu>
    </>
  );
}