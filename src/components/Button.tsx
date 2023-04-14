type Props = {
  label?: string;
  bgColor?: string;
  isFetching?: boolean;
};

export default function Button({
  label = '仲直りさせる',
  bgColor = 'bg-blue-500',
  isFetching,
}: Props) {
  return (
    <button
      className={`px-20 py-5 text-2xl font-bold text-white -sm:px-10 -sm:py-4 ${bgColor} ${
        isFetching && 'cursor-wait'
      }`}
      disabled={isFetching}
    >
      {label}
    </button>
  );
}
