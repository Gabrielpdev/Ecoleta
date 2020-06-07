import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  button.add {

    margin: 2% 10% 0 auto;
    display:flex;
    align-items:center;

    padding: 16px 24px;

    background: var(--primary-color);

    border-radius: 8px;
    border: 0;
    color: #FFF;

    font-size: 16px;

    align-self: flex-end;

    svg {
      margin-right: 10px;
    }
    &:hover {
      background: #2FB86E;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  border: 2px solid #34CB79;

  border-radius: 50px;
  margin: 20px auto 0 auto;

  width: 80%;
  min-inline-size: auto;

  display: flex;
  justify-content:space-between;
  flex-direction: row;

  div.clicker{
    width: 800px;
    margin: 0;
    color: #322153;
    display: flex;
    align-items: center;
    justify-content:space-between;
    flex-direction: row;

    cursor: pointer;

    & + & {
      margin-top: 25px;
    }

    &:last-child {
      margin-bottom: 64px;
    }

    &:hover{
      opacity: 0.7;
    }
  }

  div.delete{
    margin: 20px 20px 0 0;

    div.circle {
      display: flex;
      align-items:center;
      justify-content: center;
      background: #DEA2A2;
      border: 2px solid #ED0000;


      padding: 5px;
      width: 40px;
      height: 40px;
      border-radius: 20px;

      cursor: pointer;

      &:hover{
        opacity: 0.7;
      }
    }
  }

  div.image {
    display:flex;
    align-content:center;
    justify-content:center;

    padding: 20px;

    img{
    margin: auto;
    width: 150px;
    height:150px;

    border-radius: 75px;
    }
  }

  div.description {
    width: 50%;
    display:flex;
    margin-left: 0;
    align-content:center;
    flex-direction: column;
    padding: 20px;

    >strong {
      font-size: 33px;
    }

    >text {
      font-weight:bold;
      font-size: 18px;
    }
  }

  div.itens {

    border-radius:30px;

    min-width: 30%;
    height: 150px;

    display:flex;
    flex-direction: column;

    padding: 20px;
    >li {
      font-size: 17px;
    }
  }
`;
