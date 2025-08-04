const MAX_STARS = 5;

function getDistribution(ratings) {
  const counts = Array(MAX_STARS).fill(0);
  ratings.forEach((r) => {
    if (r >= 1 && r <= 5) counts[r - 1]++;
  });
  return counts;
}

export default function RatingOverview({ ratings }) {
  const dist = getDistribution(ratings);

  // Create progress bar width as % of largest count
  const maxCount = Math.max(...dist);

  return (
    <div className=" rounded-xl shadow-lg w-80">
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center text-sm">
            <span className="w-5">{star}</span>
            <div className="flex-1 mx-2 h-2 rounded-full bg-gray-200 relative">
              <div
                className="absolute left-0 top-0 h-2 bg-yellow-400 rounded-full"
                style={{
                  width:
                    maxCount === 0
                      ? "0%"
                      : `${(dist[star - 1] / maxCount) * 100}%`,
                }}
              ></div>
            </div>
            <span className="w-8 text-right">{dist[star - 1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
