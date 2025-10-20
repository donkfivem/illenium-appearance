import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import Button from './Button';
import { Tattoo } from '../interfaces';
import RangeInput from './RangeInput';
import { TattoosSettings } from '../interfaces';

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;

  > section {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const customStyles: any = {
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    background: 'linear-gradient(145deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.15) 100%)',
    fontSize: '14px',
    color: '#f8fafc',
    border: `1px solid ${isFocused ? 'rgba(220, 38, 38, 0.5)' : 'rgba(220, 38, 38, 0.3)'}`,
    borderRadius: '8px',
    outline: 'none',
    boxShadow: isFocused ? '0 0 0 2px rgba(220, 38, 38, 0.2)' : 'none',
    minHeight: '42px',
    transition: 'all 0.2s ease',

    '&:hover': {
      border: '1px solid rgba(220, 38, 38, 0.4)',
      transform: 'translateY(-1px)',
    }
  }),
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#cbd5e1',
  }),
  input: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#f8fafc',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#f8fafc',
    fontWeight: '500',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: '#94a3b8',
    padding: '8px',
    
    '&:hover': {
      color: '#f8fafc',
    }
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    zIndex: 9999,
  }),
  menu: (styles: any) => ({
    ...styles,
    background: 'linear-gradient(145deg, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.2) 100%)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(220, 38, 38, 0.2)',
    marginTop: '4px',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: 'transparent',
    borderRadius: '12px',
    padding: '8px',
    maxHeight: '200px',
    
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.6) 0%, rgba(185, 28, 28, 0.8) 100%)',
      borderRadius: '3px',

      '&:hover': {
        background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.8) 0%, rgba(185, 28, 28, 1) 100%)',
      }
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    borderRadius: '8px',
    margin: '2px 0',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: isSelected ? '#fef2f2' : '#f8fafc',
    background: isSelected
      ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.8) 0%, rgba(185, 28, 28, 0.7) 100%)'
      : isFocused
        ? 'rgba(220, 38, 38, 0.25)'
        : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    '&:hover': {
      background: isSelected
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.8) 100%)'
        : 'rgba(220, 38, 38, 0.3)',
      transform: 'translateX(2px)',
    }
  }),
};

const SelectTattoo = ({
  items,
  tattoosApplied,
  handleApplyTattoo,
  handlePreviewTattoo,
  handleDeleteTattoo,
  settings
}: SelectTattooProps) => {
  const defaultOpacity = 0.1;
  const selectRef = useRef<any>(null);
  const [currentTattoo, setCurrentTattoo] = useState<Tattoo>(items[0]);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const { label } = currentTattoo;
  const { locales } = useNuiState();

  const clientOpacity = useCallback(() => {
    if (!tattoosApplied) return defaultOpacity;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) { 
        return tattoosApplied[i].opacity ?? defaultOpacity;
      }
    }

    return defaultOpacity;
  }, [currentTattoo, tattoosApplied])();

  useEffect(() => {
    setOpacity(clientOpacity);
  }, [clientOpacity]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      handlePreviewTattoo(event.value, opacity);
      setCurrentTattoo(event.value);
    }
  };

  const handleChangeOpacity = useCallback((value : number) => {    
    setOpacity(value);
    handlePreviewTattoo(currentTattoo, value);
  }, [currentTattoo]);

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName("TattooDropdown" + items[0].zone + "__option--is-selected")[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  const isTattooApplied = useCallback(() => {
    if (!tattoosApplied) return false;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) return true;
    }

    return false;
  }, [tattoosApplied, currentTattoo])();

  if (!locales) {
    return null;
  }

  return (
    <Container>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item.label }))}
        value={{ value: currentTattoo, label }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={"TattooDropdown" + items[0].zone}
        classNamePrefix={"TattooDropdown" + items[0].zone}
        menuPortalTarget={document.body}
        menuShouldScrollIntoView={true}
      />
      <RangeInput
        title={locales.tattoos.opacity}
        min={settings.opacity.min}
        max={settings.opacity.max}
        factor={settings.opacity.factor}
        defaultValue={opacity}
        clientValue={clientOpacity}
        onChange={value => handleChangeOpacity(value)} 
      />
      <section>
        {isTattooApplied ? (
          <Button onClick={() => handleDeleteTattoo(currentTattoo)} variant="danger">
            {locales.tattoos.delete}
          </Button>
        ) : (
          <Button onClick={() => handleApplyTattoo(currentTattoo, opacity)} variant="primary">
            {locales.tattoos.apply}
          </Button>
        )}
      </section>
    </Container>
  );
};

export default SelectTattoo;
