import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router"; // Fixed import source
import { useDeleteBrandMutation } from "../redux/api";

type TableEditCellProps = {
    target: string;
    id: string;
};

const TableEditCell = ({ target, id }: TableEditCellProps) => {
    const navigate = useNavigate();
    const editRoute = `/${target}/edit/${id}`;

    const handleEdit = () => {
        navigate(editRoute);
    };

    const [deleteBrand] = useDeleteBrandMutation();
    // delete handle.
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this brand?");
        if (!confirmDelete) return;

        deleteBrand(id)
            .unwrap()
            .then(() => {
                alert("Brand deleted successfully");
            })
            .catch(() => {
                alert("Failed to delete brand");
            });
    };


    return (
        <div className="flex space-x-2">
            <button onClick={handleDelete}
                aria-label="Delete"
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer"
                title="Delete"
            >
                <Trash2 className="h-5 w-5" />
            </button>

            <button
                onClick={handleEdit}
                aria-label="Edit"
                className="p-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition cursor-pointer"
                title="Edit"
            >
                <Pencil className="h-5 w-5" />
            </button>
        </div>
    );
};

export default TableEditCell;
