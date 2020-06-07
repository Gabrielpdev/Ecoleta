import styled from 'styled-components';
import imageBackground from '../../assets/home-background.svg';

export const Container = styled.div`
height: 100vh;
display: fixed;
background: url(${imageBackground}) no-repeat 90% bottom;

.content {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.content header {
  margin: 48px 0 0;
}

.content main {
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content main h1 {
  font-size: 54px;
  color: var(--title-color);
}

.content main p {
  font-size: 24px;
  margin-top: 24px;
  line-height: 38px;
}

.content main a {
  width: 100%;
  max-width: 360px;
  height: 72px;
  background: var(--primary-color);
  border-radius: 8px;
  text-decoration: none;

  display: flex;
  align-items: center;
  overflow: hidden;

  margin-top: 40px;
}

.content main a span {
  display: block;
  background: rgba(0, 0, 0, 0.08);
  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.content main a span svg {
  color: #FFF;
  width: 20px;
  height: 20px;
}

.content main a strong {
  flex: 1;
  text-align: center;
  color: #FFF;
}

form {
  margin: 10px auto;
  padding: 44px;

  min-width: 560px;
  max-width: 560px;

  background: #FFF;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
}

form fieldset {
  min-inline-size: auto;
  border: 0;
}

form .field {
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

form .field input[type=email],
form .field input[type=password] {
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
  font-size: 18px;
  margin-bottom: 8px;
}

form .field :disabled {
  cursor: not-allowed;
}

form button {
  display:flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  transition: background-color 0.2s;

  svg {
    margin-right: 10px;
  }
}

form button:hover {
  background: #2FB86E;
}

.content main a:hover {
  background: #2FB86E;
}

@media(max-width: 900px) {
  .content {
    align-items: center;
    text-align: center;
  }

  .content header {
    margin: 48px auto 0;
  }

  .content main {
    align-items: center;
  }

  .content main h1 {
    font-size: 42px;
  }

  .content main p {
    font-size: 24px;
  }
}

`;
