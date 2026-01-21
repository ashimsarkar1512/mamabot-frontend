// app/(userDashboard)/user-dashboard/layout.tsx
import UserHomeNavbar from "./userNavbar/page";

type UserDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Fixed Navbar */}
      <UserHomeNavbar />

      {/* Main content with padding to avoid overlap with fixed navbar */}
      <main className="mt-26 px-6 flex flex-col items-center">
        {/* pt-[104px] = navbar height (adjust if your navbar height changes) */}
        <div className="w-full container mx-auto ">
          {children}
        </div>
      </main>
    </div>
  );
}
