import styled from 'styled-components';
import { Map } from 'react-leaflet';

interface YourProps {
  visible: boolean
}

export const Container = styled.div`

  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

form {
  margin: 80px auto;
  padding: 32px 64px 64px 64px;
  max-width: 730px;
  background: #FFF;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
}

form h1 {
  font-size: 36px;
}

form fieldset {
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
}

form legend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

form legend h2 {
  font-size: 24px;
}

form legend span {
  font-size: 14px;
  font-weight: normal;
  color: var(--text-color);
}

form .field-group {
  flex: 1;
  display: flex;
}

form .field {
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

form .field input[type=text],
form .field input[type=email],
form .field input[type=number] {
  flex: 1;
  background: #F0F0F5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6C6C80;
}

form .field select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: #F0F0F5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6C6C80;
}

form .field input::placeholder {
  color: #A0A0B2;
}

form .field label {
  font-size: 14px;
  margin-bottom: 8px;
}

form .field :disabled {
  cursor: not-allowed;
}

form .field-group .field + .field {
  margin-left: 24px;
}

form .field-group input + input {
  margin-left: 24px;
}

form .field-check {
  flex-direction: row;
  align-items: center;
}

form .field-check input[type=checkbox] {
  background: #F0F0F5;
}

form .field-check label {
  margin: 0 0 0 8px;
}

form .leaflet-container {
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
}

form >button.back{
  background: none;
  padding:0;
  color: #2FB86E;
  display: flex;
  align-items:center;
  margin: 0 auto 10px 0;
  font-size: 18px;

  width: 190px;
  height: 40px;
  &:hover {
    background: none;
  }

}

form button {
  width: 260px;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
}

form button:hover {
  background: #2FB86E;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
}

.items-grid li {
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;
}

.items-grid li span {
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: var(--title-color)
}

.items-grid li.selected {
  background: #E1FAEC;
  border: 2px solid #34CB79;
}

`;

export const Mapa = styled(Map)`
    visibility: ${(props: YourProps) => (props.visible ? 'visible' : 'hidden')};
`;

export const Concluido = styled.div`
 visibility: ${(props: YourProps) => (props.visible ? 'visible' : 'hidden')};

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #FFF;
  font-weight: bold;
  font-size: 40px;

  background: #000;

`;
