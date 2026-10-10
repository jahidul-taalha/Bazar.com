export default function ProductCard({ product }) {
  const { nameBn, image, today, unit, change } = product;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const changeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const unitBn = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("bn-BD").format(price);

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {image}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${changeStyle}`}
        >
          {changeIcon} {formatPrice(Math.abs(change?.pct ?? 0))}%
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-800">
        {nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {unitBn[unit] ?? unit}
      </p>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">আজকের দাম</p>

        <p className="mt-1 text-2xl font-bold text-gray-900">
          ৳{formatPrice(today)}
          <span className="ml-1 text-sm font-normal text-gray-500">
            /{unitBn[unit] ?? unit}
          </span>
        </p>
      </div>
    </article>
  );
}