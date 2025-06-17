import {  DeleteIcon, Edit } from "lucide-react";

 

const TableEditCell = () => {
    return (
        <div>
         
            <button><DeleteIcon/></button>
            <button><Edit/></button>
        </div>
    );
};

export default TableEditCell;