import styled from 'styled-components';
import imageBackground from '../../assets/home-background.svg';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  display:flex;
  align-items:center;
  flex-direction:column;



  header {
    margin-top: 48px;
    min-width: 80% ;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .profile{
      margin-left: auto;
      margin-right: 10px;

      padding-right: 10px;
      border-right: 1px solid #DCD3E8;

      height: 50px;

      display:flex;
      flex-direction:column;

      >strong {
        color: #322153;
        font-size: 23px;
      }

      >a {
        text-decoration:none;
        text-align:right;
        color: #A293BF;

        &:hover{
          color: #322153;
        }
      }
    }

    > button.logout {
      border:0;
      color: #000;
      font-size: 20px;
      display: flex;
      align-items:center;
      justify-content: center;
      padding: 5px;

      >svg {
      margin-left: 10px;
      }
    }
  }

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
  }
`;

export const Content = styled.div`

  background: #fff;
  border: 2px solid #34CB79;

  border-radius: 50px;
  margin-top: 20px;

  width: 80%;
  min-inline-size: auto;

  display: flex;
  align-items: center;
  justify-content:space-between;
  flex-direction: row;

  color: #322153;

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

    width: 30%;
    height: 150px;

    display:flex;
    flex-direction: column;

    margin-right: 10px;

    padding: 20px;
    >li {
      font-size: 17px;
    }
  }
`;
