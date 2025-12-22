type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded focus:ring focus:outline-none ${className}`}
    />
  );
}
