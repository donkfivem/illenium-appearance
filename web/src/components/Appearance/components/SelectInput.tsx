import { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 14px;
    color: #f8fafc;
    margin-bottom: 8px;
    
    small:last-child {
      color: #fef2f2;
      background: rgba(220, 38, 38, 0.3);
      padding: 2px 8px;
      border-radius: 6px;
      border: 1px solid rgba(220, 38, 38, 0.4);
      font-weight: 600;
    }
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

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName("Select" + title + "__option--is-selected")[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  return (
    <Container>
      <span>
        <small>{title}</small>
        <small>{clientValue}</small>
      </span>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={"Select" + title}
        classNamePrefix={"Select" + title}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;
