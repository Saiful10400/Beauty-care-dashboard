import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router"; // Fixed import source
import { useDeleteBrandMutation, useDeleteCategoryMutation, useDeleteComboMutation, useDeletePercentageOfferMutation, useDeleteProductMutation } from "../redux/api";

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
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [deleteComboOffer] = useDeleteComboMutation();
    const [deletePercentageOffer] = useDeletePercentageOfferMutation();
    // delete handle.
    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this ${target}?`);
        if (!confirmDelete) return;

        if (target === "brand") {
            deleteBrand(id)
                .unwrap()
                .then(() => {
                    // Optionally, you can add a success message or redirect
                    console.log(`${target} deleted successfully`);
                })
                .catch((error) => {
                    // Handle error, e.g., show an error message
                    console.error(`Failed to delete ${target}:`, error);
                });
        } else if (target === "category") {
            deleteCategory(id)
                .unwrap()
                .then(() => {
                    alert(`${target} deleted successfully`);
                })
                .catch(() => {
                    alert(`Failed to delete ${target}. Please try again.`);
                });
        }
        else if (target === "product") {
            deleteProduct(id)
                .unwrap()
                .then(() => {
                    alert(`${target} deleted successfully`);
                })
                .catch(() => {
                    alert(`Failed to delete ${target}. Please try again.`);
                });
        }
        else if (target === "Combo-offer") {

            deleteComboOffer(id)
                .unwrap()
                .then(() => {
                    alert(`${target} deleted successfully`);
                })
                .catch(() => {
                    alert(`Failed to delete ${target}. Please try again.`);
                });
        }
        else if (target === "percentage Offer Product") {

            deletePercentageOffer(id)
                .unwrap()
                .then(() => {
                    alert(`${target} deleted successfully`);
                })
                .catch(() => {
                    alert(`Failed to delete ${target}. Please try again.`);
                });
        };
    }


    return (
        <div className="flex space-x-2">
            <button onClick={handleDelete}
                aria-label="Delete"
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer"
                title="Delete"
            >
                <Trash2 className="h-5 w-5" />
            </button>

            <button hidden={target === "Combo-offer" || target === "percentage Offer Product"}
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
