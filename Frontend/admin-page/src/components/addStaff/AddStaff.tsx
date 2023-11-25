import { GridColDef } from "@mui/x-data-grid";
import "./addstaff.scss"
import { useState } from "react";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};



const AddStaff = (props: Props) => {

    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //add new item
        // axios.post('/api/${slug}s')
        props.setOpen(false)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* cần xử lý hình ảnh lưu thành base64 sau đó updatabase */
        const file = e.target.files?.[0];
        if (file) {
          setImage(file);
        }
      };
    

    return (
        <div className="addstaff">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((item) => item.field !== "id" && item.field !== "img")
                        .map((column) => (
                            <div className="item">
                                <label>{column.headerName}</label>
                                <input type={column.type} placeholder={column.field} />
                            </div>
                        ))}
                    <div className="item">{/* image button */}
                        <label>Upload an Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default AddStaff