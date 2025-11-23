import { Modal } from "react-native";
import {
  ModalBackground,
  ModalBox,
  ModalTitle,
  ModalMessage,
  ModalButtons,
  ModalButton,
  ModalButtonText,
} from "./styles";

export default function ConfirmDialog({ visible, onCancel, onConfirm }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <ModalBackground>
        <ModalBox>
          <ModalTitle>Atenção</ModalTitle>

          <ModalMessage>
            Você tem certeza que deseja deletar esse registro?
          </ModalMessage>

          <ModalButtons>
            <ModalButton onPress={onCancel}>
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>

            <ModalButton onPress={onConfirm}>
              <ModalButtonText>Continuar</ModalButtonText>
            </ModalButton>
          </ModalButtons>
        </ModalBox>
      </ModalBackground>
    </Modal>
  );
}
