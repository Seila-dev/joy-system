interface SubmitProps{
    text: string
    icon: string
    disabled: boolean
}

export const SubmitButton = ({ text, icon, disabled }: SubmitProps) => {
    return (
      <button type="submit" disabled={disabled}>
        {icon && <span className="material-symbols-outlined icon">{icon}</span>}
        {text}
      </button>
    );
  };