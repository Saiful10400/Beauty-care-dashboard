import {
  Package,
  Tags,
  Settings,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Table,
  Menu,
  X,
  Image,
  ClipboardList,
  Star,
  Gift,
  Percent,
  Layers3,
} from "lucide-react";
import { useState, type JSX } from "react";
import { NavLink } from "react-router";

type MenuItem = {
  name: string;
  icon: JSX.Element;
  children?: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  icon: JSX.Element;
  path?: string;
  children?: { name: string; path: string; icon: JSX.Element }[];
};

const menu: MenuItem[] = [
  {
    name: "Order",
    icon: <ClipboardList className="w-5 h-5" />,
    children: [
      { name: "Orders", path: "/order", icon: <Table className="w-4 h-4" /> },
    ],
  },
  {
    name: "Settings",
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        name: "General",
        path: "/settings/general",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Category",
    icon: <Package className="w-5 h-5" />,
    children: [
      {
        name: "Create Category",
        path: "/category/create",
        icon: <PlusCircle className="w-4 h-4" />,
      },
      {
        name: "Categories",
        path: "/category",
        icon: <Table className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Brand",
    icon: <Tags className="w-5 h-5" />,
    children: [
      {
        name: "Create Brand",
        path: "/brand/create",
        icon: <PlusCircle className="w-4 h-4" />,
      },
      {
        name: "Brands",
        path: "/brand",
        icon: <Table className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Product",
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      {
        name: "Create Product",
        path: "/product/create",
        icon: <PlusCircle className="w-4 h-4" />,
      },
      {
        name: "Products",
        path: "/product",
        icon: <Table className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Banner",
    icon: <Image className="w-5 h-5" />,
    children: [
      {
        name: "Create Banner",
        path: "/banner/create",
        icon: <PlusCircle className="w-4 h-4" />,
      },
      {
        name: "Banners",
        path: "/banner",
        icon: <Table className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Review",
    icon: <Star className="w-5 h-5" />,
    children: [
      {
        name: "Create Review",
        path: "/review/create",
        icon: <PlusCircle className="w-4 h-4" />,
      },
      {
        name: "Reviews",
        path: "/review",
        icon: <Table className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Offer",
    icon: <Gift className="w-5 h-5" />,
    children: [
      {
        name: "Combo Offer",
        icon: <Layers3 className="w-4 h-4" />,
        children: [
          {
            name: "Create",
            path: "/offer/combo/create",
            icon: <PlusCircle className="w-4 h-4" />,
          },
          {
            name: "Manage",
            path: "/offer/combo",
            icon: <Table className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Free Gift Offer",
        icon: <Gift className="w-4 h-4" />,
        children: [
          {
            name: "Create",
            path: "/offer/free-gift/create",
            icon: <PlusCircle className="w-4 h-4" />,
          },
          {
            name: "Manage",
            path: "/offer/free-gift",
            icon: <Table className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Discount",
        icon: <Percent className="w-4 h-4" />,
        children: [
          {
            name: "Create",
            path: "/offer/discount/create",
            icon: <PlusCircle className="w-4 h-4" />,
          },
          {
            name: "Manage",
            path: "/offer/discount",
            icon: <Table className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
];

export default function Nav() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [nestedExpanded, setNestedExpanded] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleExpand = (name: string) => {
    setExpanded(expanded === name ? null : name);
  };

  const toggleNested = (name: string) => {
    setNestedExpanded(nestedExpanded === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-10 flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 bg-gray-900 text-white w-64 min-h-screen shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 text-xl font-bold border-b border-gray-800 flex items-center justify-between md:block">
          <span>Admin Dashboard</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          <nav className="flex-1 p-4 overflow-y-auto space-y-1">
            {menu.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="flex cursor-pointer justify-between items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 transition"
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

                {expanded === item.name && item.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((sub) =>
                      sub.children ? (
                        <div key={sub.name}>
                          <button
                            onClick={() => toggleNested(sub.name)}
                            className="flex cursor-pointer justify-between items-center w-full px-2 py-1 rounded-md hover:bg-gray-800 transition"
                          >
                            <div className="flex items-center gap-2">
                              {sub.icon}
                              <span>{sub.name}</span>
                            </div>
                            {nestedExpanded === sub.name ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>

                          {nestedExpanded === sub.name && (
                            <div className="ml-4 mt-1 space-y-1">
                              {sub.children.map((leaf) => (
                                <NavLink
                                  key={leaf.name}
                                  to={leaf.path}
                                  onClick={() => setSidebarOpen(false)}
                                  className={({ isActive }) =>
                                    `flex items-center gap-2 text-sm px-3 py-1 rounded-md transition ${isActive
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                                    }`
                                  }
                                >
                                  {leaf.icon}
                                  {leaf.name}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          key={sub.name}
                          to={sub.path!}
                          onClick={() => setSidebarOpen(false)}
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
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 w-full text-left text-red-400 hover:text-red-500 hover:bg-gray-800 px-4 py-3 border-t border-gray-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
