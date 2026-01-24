const TipsCard = ({ tips }: { tips: string[] | string }) => {
  return (
    <div className="my-4">
      {Array.isArray(tips) && tips.length > 1 ? (
        <div className="flex flex-col items-start  gap-2 py-3 px-6 bg-[#229ECF]/10 rounded">
          <p className="text-[#229ECF]">Tips: </p>
          <div className="flex flex-col items-start mt-3">
            {tips.map((item, index) => (
              <p key={index} className="text-left font-medium text-sm mb-3">
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2 py-3 px-6 bg-[#229ECF]/10 rounded">
          <p className="text-[#229ECF]">Tip: </p>
          <p className="text-gray-500 font-medium text-sm text-left">{tips}</p>
        </div>
      )}
    </div>
  );
};
export default TipsCard;
