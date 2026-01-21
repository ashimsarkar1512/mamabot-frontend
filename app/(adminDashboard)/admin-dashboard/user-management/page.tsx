"use client";
import DashboardCard from '@/components/adminDashboard/manageUser/DashboardCard';
import { DashboardCardProps } from '@/types/admin/admin';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

// 1. Define the Types for easier RTK integration later
interface User {
    id: string;
    name: string;
    email: string;
    status: "Active" | "Deactivate"; // 'Deactivate' here represents the 'Deactivated' state as per image text
    currentPhase: string;
    deliveryType: string; // Use "---" for null/empty in UI
    lastActivity: string;
}


const DUMMY_DASHBOARD_CARDS: DashboardCardProps[] = [
    {
        title: "Total Users",
        value: "102348",
        percentage: 100,
    },
    {
        title: "Active Users",
        value: "2390",
        percentage: -23,
    },
    {
        title: "AI Chat Logs",
        value: "43",
        percentage: 50,
    },
    {
        title: "Postpartum Segment",
        value: "50",
        percentage: 0.23,
    },
];

// 2. Dummy Data matching the image
const DUMMY_USERS: User[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        status: "Active",
        currentPhase: "Pregnancy (Week 24)",
        deliveryType: "---",
        lastActivity: "2026-01-14",
    },
    {
        id: "2",
        name: "Maria Garcia",
        email: "maria.g@email.com",
        status: "Active",
        currentPhase: "Postpartum (Week 3)",
        deliveryType: "Cesarean",
        lastActivity: "2026-01-14",
    },
    {
        id: "3",
        name: "Emily Chen",
        email: "emily.c@email.com",
        status: "Deactivate", // Matches image red pill text
        currentPhase: "Pregnancy (Week 16)",
        deliveryType: "---",
        lastActivity: "2026-01-14",
    },
    {
        id: "4",
        name: "Jessica Williams",
        email: "jessica.w@email.com",
        status: "Active",
        currentPhase: "Postpartum (Week 6)",
        deliveryType: "Vaginal",
        lastActivity: "2026-01-14",
    },
];

export default function UserManagementPage() {
    const [search, setSearch] = React.useState("");
    // Initialize local state with dummy data (replace with RTK Query data later)
    const [users, setUsers] = React.useState<User[]>(DUMMY_USERS);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // Toggle status handler to simulate API call
    const toggleUserStatus = (id: string) => {
        setUsers((prev) =>
            prev.map((user) => {
                if (user.id === id) {
                    return {
                        ...user,
                        status: user.status === "Active" ? "Deactivate" : "Active",
                    };
                }
                return user;
            })
        );
    };

    // Filter logic
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full space-y-6">

            {/* Search Input Box */}
            <div className="relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D82479]" />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#229ECF]/20! rounded-full focus:outline-none focus:ring-2 focus:ring-[#229ECF] text-gray-700 placeholder-gray-400"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {DUMMY_DASHBOARD_CARDS.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>

            {/* Users Table */}
            <h1 className="text-2xl font-semibold text-[#229ECF]">User Directory</h1>
            <div className="w-full overflow-x-auto rounded-lg">
                <table className="w-full min-w-[1000px] border-separate border-spacing-y-2 border-spacing-x-0">
                    <thead>
                        <tr className="bg-[#FFF8ED] text-left rounded-lg [&>th:first-child]:rounded-l-lg [&>th:last-child]:rounded-r-lg">
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                User Name
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                Current Phase
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                Delivery Type
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider">
                                Last Activity
                            </th>
                            <th className="py-4 px-6 text-md font-semibold text-gray-700 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="bg-white rounded-lg hover:bg-gray-50/50 transition-colors [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg">

                                    {/* Name */}
                                    <td className=" py-5 px-6 text-gray-700 font-medium">
                                        {user.name}
                                    </td>

                                    {/* Email */}
                                    <td className="py-5 px-6 text-gray-600">
                                        {user.email}
                                    </td>

                                    {/* Status Pill */}
                                    <td className="py-5 px-6">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${user.status === "Active"
                                                ? "bg-[#C8E6C9]/60 text-[#2E7D32]" // Green shade
                                                : "bg-[#FFCDD2]/50 text-[#D32F2F]" // Red shade
                                                }`}
                                        >
                                            {user.status === "Active" ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <XCircle className="w-4 h-4" />
                                            )}
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Phase */}
                                    <td className="py-5 px-6 text-gray-600">
                                        {user.currentPhase}
                                    </td>

                                    {/* Delivery Type */}
                                    <td className="py-5 px-6 text-gray-600">
                                        {user.deliveryType}
                                    </td>

                                    {/* Last Activity */}
                                    <td className="py-5 px-6 text-gray-600">
                                        {user.lastActivity.replace(/-/g, " — ")}
                                    </td>

                                    {/* Actions Button */}
                                    <td className="py-5 px-6 text-right">
                                        <button
                                            onClick={() => toggleUserStatus(user.id)}
                                            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${user.status === "Active"
                                                ? "bg-[#F44336] hover:bg-[#D32F2F]" // Show 'Deactivate' button (Red) if active
                                                : "bg-[#4CAF50] hover:bg-[#388E3C]" // Show 'Active' button (Green) if inactive
                                                }`}
                                        >
                                            {user.status === "Active" ? "Deactivate" : "Active"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-gray-500">
                                    No users found matching "{search}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* ----------------------------------- */}
                {/* later i will implement here paginatio  */}
                {/* ----------------------------------- */}
            </div>
        </div>
    );
}