export function CartEmpty({onClose}) {
  return (
    <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
        Your cart is empty
      </h2>
      <button
        onClick={onClose}
        className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
      >
        Continue shopping
      </button>
    </div>
  );
}
