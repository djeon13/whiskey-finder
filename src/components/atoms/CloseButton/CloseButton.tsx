import "./CloseButton.css";

export interface CloseButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export function CloseButton({
  onClick,
  label,
  className = "close-button",
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      ×
    </button>
  );
}
