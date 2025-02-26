import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import styled from 'styled-components';
import { CurrencyExchangeRate,translations } from '../data';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color:rgba(26, 26, 26, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 28rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color:rgba(32, 170, 225, 0.91);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const CloseButton = styled.button`
  padding: 0.25rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  background: none;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SearchContainer = styled.div`
  padding: 1rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.75rem 2.5rem;
  background-color: #f3f4f6;
  border-radius: 0.75rem;
  outline: none;
  border: none;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1.75rem;
  top: 1.75rem;
  color: #9ca3af;
`;

const SectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const TokenList = styled.div`
  max-height: 24rem;
  overflow-y: auto;
`;

const TokenItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  background: none;
  text-align: left;

  &:hover {
    background-color: #f9fafb;
  }
`;

const TokenIcon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
  /* background-color: ${props => getNetworkColor(props.network)};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  margin-right: 0.75rem; */
`;

const TokenInfo = styled.div`
  flex: 1;
`;

const TokenName = styled.div`
  font-weight: 500;
`;

const TokenDetails = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TokenAddress = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const TokenNetwork = styled.span`
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  background-color: ${props => getNetworkColor(props.network)}20;
  color: ${props => getNetworkColor(props.network)};
  border-radius: 0.375rem;
`;

const TokenPrice = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
  text-align: right;
`;


// Network color mapping function
function getNetworkColor(network) {
  const networkColors = {
    ethereum: '#627EEA',
    cosmos: '#2E3148',
    terra: '#2043B5',
    osmosis: '#750BBB',
    evmos: '#ED4E33',
    neo_n3: '#00E599',
    fiat: '#2563eb',
    default: '#94A3B8'
  };
  return networkColors[network] || networkColors.default;
}


const TokenSelector = ({ isOpen, onClose, onSelect,language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = CurrencyExchangeRate.filter(token => 
    token.currency.toLowerCase().includes(searchTerm.toLowerCase())||
    token.network.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  const formatPrice = (price) => {
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toFixed(2);
  };

  return (
    <div>
      {isOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{t.searchToken}</ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>

            <SearchContainer>
              <SearchInput
                type="text"
                placeholder={t.searchToken}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIconWrapper>
                <Search size={20} />
              </SearchIconWrapper>
            </SearchContainer>

            <SectionTitle>
              {t.volume24h}
            </SectionTitle>

            <TokenList>
              {filteredTokens.map((token, index) => (
                <TokenItem key={index} onClick={()=>{onSelect(token),onClose()}}>
                  <TokenIcon src={`/images/tokens/${token.currency}.svg`}
                    alt={token.currency}/>
                  
                  <TokenInfo>
                    <TokenName>{token.currency}</TokenName>
                    <TokenDetails>
                      <TokenNetwork $network={token.network}>
                        {token.network}
                      </TokenNetwork>
                      <TokenAddress>
                        {token.address.slice(0, 6)}...{token.address.slice(-4)}
                      </TokenAddress>
                    </TokenDetails>
                  </TokenInfo>
                  <TokenPrice>
                    ${formatPrice(token.price)}
                  </TokenPrice>
                </TokenItem>
              ))}
            </TokenList>
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default TokenSelector;