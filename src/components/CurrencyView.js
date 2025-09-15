export function CurrencyView({ currency }) {
  return (
    <div className="fixed top-0 right-0 bg-black/50 p-5 text-3xl font-bold">
      {currency.ToString()}
    </div>
  );
}
