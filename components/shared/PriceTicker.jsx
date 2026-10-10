const prices = [
  { name: "চাল", price: "৭২", unit: "কেজি", change: "+২.৫%", up: true, icon: "🍚" },
  { name: "আলু", price: "৩৫", unit: "কেজি", change: "-৫.২%", up: false, icon: "🥔" },
  { name: "পেঁয়াজ", price: "৬৫", unit: "কেজি", change: "+৩.১%", up: true, icon: "🧅" },
  { name: "সয়াবিন তেল", price: "১৭৫", unit: "লিটার", change: "-১.৮%", up: false, icon: "🫙" },
  { name: "ডিম", price: "১৪০", unit: "ডজন", change: "+৪.২%", up: true, icon: "🥚" },
];

export default function PriceTicker() {
  return (
    <div className="overflow-hidden border-b border-green-100 bg-green-50">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-8 px-4 py-3 sm:gap-10"
          >
            {prices.map((item) => (
              <div
                key={item.name}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
              >
                <span aria-hidden="true">{item.icon}</span>

                <span className="font-medium text-gray-700">
                  {item.name}
                </span>

                <span className="font-semibold text-gray-900">
                  ৳{item.price}/{item.unit}
                </span>

                <span
                  className={
                    item.up ? "font-semibold text-green-600" : "font-semibold text-red-500"
                  }
                >
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}