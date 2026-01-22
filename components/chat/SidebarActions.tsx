import { 
  LayoutDashboard, 
  MessageSquare, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Settings 
} from "lucide-react";

export default function SidebarActions() {
  const menuItems = [
    { label: "Dashboard",       icon: LayoutDashboard, active: false },
    { label: "Chatbot",         icon: MessageSquare,   active: true }, // Active per requirements
    { label: "Symptom Tracker", icon: Activity,        active: false },
    { label: "Report & Analytics", icon: FileText,     active: false },
    { label: "Emergency",       icon: AlertTriangle,   active: false },
    { label: "Settings & Personalization", icon: Settings, active: false },
  ];

  return (
    <div className="space-y-0.5">
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors
            ${item.active 
              ? "bg-pink-50 text-pink-600" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
          `}
        >
          <item.icon className={`w-4 h-4 ${item.active ? "text-pink-500" : "text-gray-400"}`} />
          {item.label}
          {item.active && (
             <span className="ml-auto bg-pink-500 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
               Active
             </span>
          )}
        </div>
      ))}
    </div>
  );
}
