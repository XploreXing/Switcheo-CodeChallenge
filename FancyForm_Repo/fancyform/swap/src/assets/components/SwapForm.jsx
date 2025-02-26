import styled from "styled-components";
import {ArrowDropDown, SouthRounded} from '@mui/icons-material';
import { useState,useEffect } from "react";
import { translations } from "../data";
const FormContainer=styled.form`
      width: 100%;
      max-width: 680px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap:10px;
      border: none;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(0px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      align-items: center;
    
`
const InputGroup=styled.div`
      background-color: rgba(215, 213, 213, 0.4);
      border-radius: 12px;
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 0px solid grey;
    label {
    color:rgb(98, 118, 252);
    font-family: 'Courier New', Courier, monospace;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

`
const Exchangedir=styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    margin: 0 auto;  
    display: flex;
    justify-content: center;
    align-items: center;  
    transition: all 0.02s ease;
    cursor: pointer;   
    &:active{
        background-color: rgba(255, 255, 255, 0.15);
    }

`
const Selectmenu=styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`
const Selectinput=styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.25rem;
  outline: none;
  padding: 0.5rem;
  &::placeholder {
    color:rgb(113, 128, 150);
  }
`
const TokenIcon= styled.img`
  width: 10px;
  height: 10px;
  margin-right: 8px;
  flex: 1;
`;
const Menubutton=styled.button`
   margin-left:5px;
   border: 2px solid grey;
   border-radius: 5rem;
   background-color: rgba(255, 255, 255, 0.1);
   display: flex;
   align-items:center;
   color: rgb(113, 128, 150);
   &:active{
        background-color: rgba(252, 246, 246, 0.3);
        transform:scale(1.02);
    }
`
const  USexchange=styled.div`
 border: 0px solid grey;
 border-radius: 2rem;
 padding:5px;
 color:rgb(113, 128, 150);
`
const ConfirmationContainer=styled.div`
    width: 100%;
    max-width: 680px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(0px);
    display: flex;
`
const ConfirmBTN=styled.button`
    flex:1;
    border: none;
    color:rgb(113, 128, 150);
    background-color: transparent;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:active{
        transform:scale(1.1);
    }
`
function SwapForm({selectedSellToken, selectedBuyToken,setIsTokenSelectOpen,setActiveSide,language}){
    const [sellAmount,setSellAmount]=useState(''); //管理的是sell input中的value
    const [buyAmount,setBuyAmount]=useState('');
    const [usdValue,setUsdValue]=useState('0');

    useEffect(()=>{
      if (sellAmount && selectedSellToken){
        const usdAmount=parseFloat(sellAmount)*selectedSellToken.price;
        setUsdValue(usdAmount); 
      } if(selectedBuyToken) {
            const buyAmount=usdValue/selectedBuyToken.price
            setBuyAmount(buyAmount.toFixed(6));
    }
    },[selectedBuyToken,selectedSellToken,sellAmount]
);
    

    const calculatesSwapAmount=(amount,side)=>{
        if (!amount || isNaN(amount)) {
            setBuyAmount('');
            setSellAmount('');
            setUsdValue('0');
            return;
    }
        const numAmount=parseFloat(amount);
       
        if (selectedSellToken){
            setSellAmount(amount);
            const usdAmount=numAmount*selectedSellToken.price;
            setUsdValue(usdAmount); 
        }
    };

    
   const handleSellClick =(e)=>{
        e.preventDefault();
        setActiveSide('sell');
        setIsTokenSelectOpen(true);

   };
   const handleBuyClick =(e)=>{
        e.preventDefault();
        setActiveSide('buy');
        setIsTokenSelectOpen(true);

   }
   const t=translations[language];
    return (
        <>
            <FormContainer>
                <InputGroup>
                    <label> {t.sell} </label>
                    <Selectmenu>
                        <Selectinput type="number" value={sellAmount} onChange={(e)=>calculatesSwapAmount(e.target.value,'sell')} placeholder="0.0"/>
                        <Menubutton onClick={handleSellClick} >
                        { selectedSellToken?
                            (<><TokenIcon src={`/images/tokens/${selectedSellToken.currency}.svg`}/>{selectedSellToken.currency}</>)//这里一定要tolowercase才能匹配吗？
                            :(<>{t.selectToken}</>)
                        }
                        <ArrowDropDown/>
                        </Menubutton>
                    </Selectmenu>
                    <USexchange>{`$${Number(usdValue).toFixed(2)}`}</USexchange>
                </InputGroup>
                <Exchangedir>
                    <SouthRounded/>
                </Exchangedir>
                <InputGroup>
                    <label> {t.buy }</label>
                    <Selectmenu>
                        <Selectinput type="number" value={buyAmount} onChange={(e)=>calculatesSwapAmount(e.target.value,'buy')} placeholder="0.0"/>
                        <Menubutton onClick={handleBuyClick}>
                        {selectedBuyToken?
                            (<><TokenIcon src={`/images/tokens/${selectedBuyToken.currency}.svg`}/>{selectedBuyToken.currency}</>)//这里一定要tolowercase才能匹配吗？
                            :(<>{t.selectToken}</>)
                        }
                        <ArrowDropDown/>
                        </Menubutton>
                    </Selectmenu>
                    <USexchange>{`$${Number(usdValue).toFixed(2)}`}</USexchange>
                </InputGroup>
                <ConfirmationContainer>
                    <ConfirmBTN>{t.confirm}</ConfirmBTN>
                </ConfirmationContainer>
            </FormContainer>
        </>
    )
}

export default SwapForm