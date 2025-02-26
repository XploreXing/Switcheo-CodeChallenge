import styled from 'styled-components'
import { translations } from '../data'
const Navigation=styled.div`
 width: 50%;
 height: 15%;
 background-color: none;
 justify-content: flex-start;
 align-items: center;
 display:flex;
 margin:10px 10px;
 padding: 10px;
 background: rgba(255, 255, 255, 0.1);
 border-radius: 12px;
 backdrop-filter: blur(10px);
 
`
const NavPanel=styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  padding: 0.75rem 1.5rem;
  border: none;
  color: white;
  flex:1;
  margin: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Courier New', Courier, monospace;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.03);
  }
  
`

function NavBar({activePanel, setActivePanel,language}){
  const t=translations[language]
  return (
   
  <>
    <Navigation>
      <NavPanel $active={activePanel==='swap'} onClick={()=>setActivePanel('swap')}>{t.Swap}</NavPanel>
      <NavPanel $active={activePanel==='limit' } onClick={()=>setActivePanel('limit')}>{t.Limit}</NavPanel>
      <NavPanel $active={activePanel==='send' } onClick={()=>setActivePanel('send')}>{t.Send}</NavPanel>
      <NavPanel $active={activePanel==='buy' } onClick={()=>setActivePanel('buy')}>{t.Buy}</NavPanel>
     </Navigation>
  </>
  )
}
export default NavBar