// app/(userDashboard)/user-dashboard/layout.tsx
import ChatBot from "@/features/ChatBot";
import UserHomeNavbar from "./userNavbar/page";

type UserDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  return (
    <div className="min-h-screen relative bg-[linear-gradient(to_bottom,rgba(216,36,121,0.1)_0px,rgba(216,36,121,0.1)_15%,rgba(233,245,250,0.1)_35%,rgba(233,245,250,0.1)_40%,white_65%,white_100%)]">
      {/* Fixed Navbar */}
      <UserHomeNavbar />
      <ChatBot />

      {/* Main content with padding to avoid overlap with fixed navbar */}
      <main className="mt-26 px-6 flex flex-col items-center">
        {/* pt-[104px] = navbar height (adjust if your navbar height changes) */}
        <div className="w-full container mx-auto ">{children}</div>
      </main>
    </div>
  );
}
