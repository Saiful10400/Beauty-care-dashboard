import {
    Package,
    Tags,
    Settings,
    ShoppingBag,
    ChevronDown,
    ChevronRight,
    PlusCircle,
    Table,
} from "lucide-react";
import { useState, type JSX } from "react";
import { NavLink } from "react-router";


type MenuItem = {
    name: string;
    icon: JSX.Element;
    children: { name: string; path: string; icon: JSX.Element }[];
};

const menu: MenuItem[] = [
    {
        name: "Brand",
        icon: <Tags className="w-5 h-5" />,
        children: [
            { name: "Create Brand", path: "/brand/create", icon: <PlusCircle className="w-4 h-4" /> },
            { name: "Brands", path: "/brand", icon: <Table className="w-4 h-4" /> },
        ],
    },
    {
        name: "Category",
        icon: <Package className="w-5 h-5" />,
        children: [
            { name: "Create Category", path: "/category/create", icon: <PlusCircle className="w-4 h-4" /> },
            { name: "Categories", path: "/category", icon: <Table className="w-4 h-4" /> },
        ],
    },
    {
        name: "Product",
        icon: <ShoppingBag className="w-5 h-5" />,
        children: [
            { name: "Create Product", path: "/product/create", icon: <PlusCircle className="w-4 h-4" /> },
            { name: "Products", path: "/product", icon: <Table className="w-4 h-4" /> },
        ],
    },
    {
        name: "Settings",
        icon: <Settings className="w-5 h-5" />,
        children: [
            { name: "General", path: "/settings/general", icon: <Settings className="w-4 h-4" /> },
        ],
    },
];

export default function Nav() {
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (name: string) => {
        setExpanded(expanded === name ? null : name);
    };

    return (
        <aside className="w-full md:w-64 min-h-screen bg-gray-900 text-white flex flex-col shadow-lg">
            <div className="p-6 text-xl font-bold border-b border-gray-800">Admin Dashboard</div>

            <nav className="flex-1 p-4 overflow-y-auto space-y-1">
                {menu.map((item) => (
                    <div key={item.name}>
                        <button
                            onClick={() => toggleExpand(item.name)}
                            className="flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 transition"
                        >
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                            {expanded === item.name ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>

                        {expanded === item.name && (
                            <div className="ml-6 mt-1 space-y-1">
                                {item.children.map((sub) => (
                                    <NavLink
                                        key={sub.name}
                                        to={sub.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 text-sm px-3 py-1 rounded-md transition ${isActive
                                                ? "bg-gray-800 text-white"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800"
                                            }`
                                        }
                                    >
                                        {sub.icon}
                                        {sub.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
