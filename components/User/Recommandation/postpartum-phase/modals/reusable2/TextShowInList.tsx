import { Dot } from "lucide-react";

const TextShowInList = ({
  list,
  title,
}: {
  title: string;
  list: { icon: React.ReactNode; title: string; description: string[] }[];
}) => {
  return (
    <div className="p-5 bg-sky-100/50 rounded-xl grid gap-5">
      <h1 className="text-lg font-semibold">{title}</h1>
      {list.map(
        (
          item: { icon: React.ReactNode; title: string; description: string[] },
          index: number,
        ) => (
          <div key={index}>
            <div className="flex items-center gap-2 text-lg font-regular mb-3">
              {item.icon}
              <p className="text-[#229ECF] text-md md:text-lg">{item.title}</p>
            </div>
            <div className="mt-2 text-lg font-regular ">
              {item.description.map((desc, index) => (
                <p
                  key={index}
                  className="text-xs md:text-sm flex items-center gap-2"
                >
                  <Dot />
                  {desc}
                </p>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
};
export default TextShowInList;
