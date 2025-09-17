import { useOverlay } from "../../OverlayProvider";

type CloseButtonProps = {
  closeName: string;
};

export function CloseButton({ closeName }: CloseButtonProps) {
  const { open, close } = useOverlay("close_button");
  function onClose() {
    close(closeName);
  }

  return <button onClick={onClose}>close</button>;
}
