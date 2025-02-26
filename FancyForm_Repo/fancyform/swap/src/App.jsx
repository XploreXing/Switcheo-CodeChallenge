
import styled from 'styled-components'
import NavBar from './assets/components/NavBar'
import SwapForm from './assets/components/swapform'
import { useState } from 'react'
import LimitForm from './assets/components/LimitForm'
import BuyForm from './assets/components/BuyForm'
import SendForm from './assets/components/SendForm'
import TokenSelector from './assets/components/TokenSelector'

const LanguageSwitch = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const LanguageButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to top right,rgb(119, 236, 193),rgb(198, 189, 251));
  color: white;
`
function App() {

const [isTokenSelectOpen, setIsTokenSelectOpen] = useState(false);
const [selectedSellToken, setSelectedSellToken] = useState(null);
const [selectedBuyToken, setSelectedBuyToken] = useState(null);
const [activeSide, setActiveSide] = useState(null);
const handleSelectToken = (token) => {
  if (activeSide==='sell'){
  setSelectedSellToken(token);
}else{setSelectedBuyToken(token);}
  setIsTokenSelectOpen(false);
};

const [language, setLanguage] = useState(() => {
  return localStorage.getItem('userLanguage') || 'en';  
});
const handleLanguageChange =(lang)=>{
  setLanguage(lang);
  localStorage.setItem('userLanguage',lang);

}

const [activePanel,setActivePanel]=useState('swap');

return (
  <Container>
      <LanguageSwitch>
        <LanguageButton $active={language === 'en'} onClick={() => handleLanguageChange('en')}>EN
        </LanguageButton>
        <LanguageButton $active={language === 'ko'} onClick={() => handleLanguageChange('ko')}>한국어
        </LanguageButton>
        <LanguageButton $active={language === 'zh'} onClick={() => handleLanguageChange('zh')}>中文
        </LanguageButton>
      </LanguageSwitch>
  <NavBar  activePanel={activePanel}
          setActivePanel={setActivePanel}
          language={language}/>
  {activePanel==='swap'&&(
  <SwapForm 
        selectedSellToken={selectedSellToken}
        selectedBuyToken={selectedBuyToken}
        setIsTokenSelectOpen={setIsTokenSelectOpen}
        setActiveSide={setActiveSide}
        language={language}
  />)}
     {activePanel === 'limit' && <LimitForm language={language} />}
     {activePanel === 'buy' && <BuyForm language={language} />}
     {activePanel === 'send' && <SendForm language={language} />}
    <TokenSelector
      isOpen={isTokenSelectOpen}
      onClose={() => setIsTokenSelectOpen(false)}
      onSelect={handleSelectToken}
      language={language}
    />
  </Container>
)
}

export default App
