type PaperTextareaProps = {
  placeholder: string;
};

export function PaperTextarea({ placeholder }: PaperTextareaProps) {
  return <textarea className="textarea" placeholder={placeholder} />;
}
