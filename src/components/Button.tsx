type Props = {
  label?: string;
  bgColor?: string;
};

export default function Button({ label = '仲直りさせる', bgColor = 'bg-blue-500' }: Props) {
  return (
    <button className={`px-20 py-5 text-2xl font-bold text-white -sm:px-10 -sm:py-4 ${bgColor}`}>
      {label}
    </button>
  );
}
