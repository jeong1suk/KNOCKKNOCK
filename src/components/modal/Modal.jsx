import styled from 'styled-components';

function Modal({ onClose, children })  {
  return(
  <ModalBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export default Modal;