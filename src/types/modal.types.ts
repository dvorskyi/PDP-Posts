import { ModalTypes } from "@/enums";


export interface IModalProps<P = unknown> {
  headerTitle?: string;
  description?: string;
  type: ModalTypes;
  size?: "small" | "medium" | "large";
  params?: P;
  onConfirm?: (params?: unknown) => void;
  withoutHeader?: boolean
}
