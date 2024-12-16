import styled from 'styled-components';

interface ContainerProps {
    size?: 'small' | 'medium' | 'extra-medium' | 'large';
  }

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 400px;';
      case 'medium':
        return 'width: 520px;';
      case 'extra-medium':
        return 'width: 600px;';
      case 'large':
        return 'width: 720px;';
      default:
        return '';
    }
  }}
`;