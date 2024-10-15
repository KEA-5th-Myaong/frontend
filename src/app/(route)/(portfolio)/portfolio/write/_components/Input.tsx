interface InputProps {
  element: 'input' | 'textarea';
  label: string;
  size: 'sm' | 'lg' | 'textarea';
  type: React.HTMLInputTypeAttribute;
  placeholder: string | undefined;
}
//필수 입력 여부
//date 여부
//color

export default function Input() {
  return (
    <div>
      <label>
        <input type="text" />
      </label>
    </div>
  );
}
