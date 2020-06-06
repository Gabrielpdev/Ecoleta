import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

`;

export const Content = styled.form`
  background: #fff;
  width: 80%;

  display: flex;
  flex-direction:column;

  margin: 30px auto 0 auto;

  border-radius: 10px;

  padding: 64px;

  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 10px 0 20px;
  }

  div.header {
    display: flex;
    align-items:center;
    justify-content: space-between;

    select {
      max-width: 250px;
      margin-bottom:36px;
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

    h1 {
      margin: 0 auto 36px 0;
      font-size: 36px;
    }
  }

  div.field {
    flex: 1;

    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      color: #2FB86E;
      font-size: 24px;
      margin-bottom: 8px;
    }

    input {
      flex: 1;
      background: #F0F0F5;
      border-radius: 8px;
      border: 0;
      padding: 16px 100px 16px 24px;
      font-size: 16px;
      color: #6C6C80;
    }

  }

  >button.back{
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

  button {
    width: 100%;
    height: 56px;
    background: var(--primary-color);
    border-radius: 8px;
    color: #FFF;
    font-weight: bold;
    font-size: 24px;
    border: 0;
    margin-top: 4px;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #2FB86E;
  }
`;
