import { Users, Baby, Activity, CalendarHeart } from "lucide-react";
const MOCK_GROUPS = [
  {
    id: 1,
    name: "First Trimester (0-12 Weeks)",
    members: "4,312",
    active: "178",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-100",
    Icon: Baby,
  },
  {
    id: 2,
    name: "2nd Trimester (13-27 Weeks)",
    members: "4,312",
    active: "178",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-100",
    Icon: CalendarHeart,
  },
  {
    id: 3,
    name: "3rd Trimester (28-40 Weeks)",
    members: "4,312",
    active: "178",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    Icon: Activity,
  },
];
const SuggestedGroups = () => {
  return (
    <div className="mb-6 bg-sky-50/50 rounded-2xl  border-3 border-white! overflow-hidden">
      <div className="px-6 pt-6 pb-2 bg-[#E9F5FA] border-b border-white!">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-gray-800">
            Suggested Community Groups
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Join groups based on your pregnancy stage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {MOCK_GROUPS.map((group) => (
          <div
            key={group.id}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full ${group.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <group.Icon className={`w-6 h-6 ${group.iconColor}`} />
              </div>
              <div>
                <h4 className="font-bold text-[#229ECF] text-sm leading-tight mb-1">
                  {group.name}
                </h4>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {group.members} members
                  </span>
                  <span className="w-1 h-1 rounded-full bg-green-500"></span>
                  <span className="text-green-600">
                    {group.active} active now
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full py-1.5 rounded-lg border border-sky-200 text-sky-500 text-sm font-medium hover:bg-sky-50 transition-colors">
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedGroups;
