export default function ProductCard({ product }) {
  const { nameBn, image, today, unit, change } = product;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const changeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const unitBn = {
    kg: "কেজি",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  const formattedPrice = new Intl.NumberFormat("bn-BD").format(today);
  const formattedChange = new Intl.NumberFormat("bn-BD").format(
    Math.abs(change?.pct ?? 0)
  );

  return (
    <article className="rounded-xl border border-[#e2e9e3] bg-[#fbfdfb] p-3 transition hover:border-green-200 hover:shadow-sm sm:p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl">
          {image}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold leading-5 text-[#263229]">
            {nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি {unitBn[unit] ?? unit}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${changeStyle}`}
        >
          {changeIcon} {formattedChange}%
        </span>
      </div>

      <div className="mt-3">
        <p className="text-[11px] text-gray-500">আজকের দাম</p>

        <p className="mt-0.5 text-base font-bold leading-6 text-[#202b23]">
          {formattedPrice} টাকা
          <span className="ml-1 text-xs font-normal text-gray-500">
            /{unitBn[unit] ?? unit}
          </span>
        </p>
      </div>
    </article>
  );
}

