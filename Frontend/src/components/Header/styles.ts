import styled from 'styled-components';

export const Container = styled.div`
 margin-top: 48px;
  min-width: 80% ;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    cursor: pointer;
  }

  div.navigation {
    margin-left: 20px;
    a {
      margin: auto;
      font-weight: bold;
      color: #322153;
      margin-left: 10px;
      text-decoration: none;
      font-size: 20px;

      &:hover {
        color: #2FB86E;
      }

      &.active {
        color: #2FB86E;
      }
    }
  }

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
`;
