import { GridColDef } from "@mui/x-data-grid";
import "./addPromotion.scss"
import { Autocomplete, MenuItem, Select, TextField, TextareaAutosize, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import productsVariantAPI, {ProductVariant} from "../../api/productsVariantAPI";
import { products } from "../../data";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const theme = createTheme({
  palette: {
      background: {
          paper: '#2a3447',
      },
      text: {
          primary: '#fff',
          secondary: "#ddd",
      },
      mode: "dark"
  }
});


const AddPromotion = (props: Props) => {
  const [SValue, setSValue] = useState<Dayjs | null>(dayjs('2023-11-27'));
  const [validation, setValidation] = useState<Record<string, boolean>>({});
  const [EValue, setEValue] = useState<Dayjs | null>(dayjs('2023-11-27'));
  const [StatusValue, setStatusValue] = useState('');
  const [productPromotionValue, setProductPromotionValue] = useState<any>(null);
  const [purchaseValue, setPurchaseValue] = useState<any>(null);
  const [productVariant, setProductVariant] = useState<any>([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
        const fetchData = async () => {
            const productVariantData = products;//await fetchProductVariant();
            setProductVariant(productVariantData);
        };

        fetchData();
    }, []);  

    const handleTextChange = (event: any) => {
        setTextValue(event.target.value);
      };

    const handleValidation = () => {
        const newValidation: Record<string, boolean> = {};

        props.columns
        .forEach((column) => {
            if (column.field === 'StartDate' || column.field === 'EndDate') {
                return;
            } 
                
            const inputValue = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`)?.value || '';
            if (column.field === 'Status') {
                newValidation[column.field] = StatusValue.trim() !== '';
            }
            else if (column.field === 'Content') {
                newValidation[column.field] = textValue.trim() !== '';
            } else newValidation[column.field] = inputValue.trim() !== '';
        });
        
        setValidation(newValidation);
        
        return Object.values(newValidation).every((valid) => valid);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 

        const isValid = handleValidation();
        //add new item
        // axios.post('/api/${slug}s')
        if (isValid) {
            //debug
            const formData: Record<string, any> = {};

            props.columns
                .forEach((column) => {
                if (column.field === 'StartDate') {
                    formData[column.field] = SValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'EndDate') {
                    formData[column.field] = EValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'Status') {
                    formData[column.field] = StatusValue;
                } else if (column.field === "Content") {
                    formData[column.field] = textValue;
                } else if (column.field === "Promotion") {
                    formData[column.field] = productPromotionValue.id;
                }  else if (column.field === "Purchase") {
                    formData[column.field] = purchaseValue.id;
                } else {
                    const inputElement = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`) as HTMLInputElement;
                    formData[column.field] = inputElement?.value || null;
                }
                });

            console.log('Form Data:', formData);
            //end debug

            // Perform your form submission logic
            // axios.post('/api/${slug}s')
            props.setOpen(false);
          }
          else {
            console.error('Form validation failed');
          }
    };


  return (
    <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <div className="addpromotion">
                    <div className="modal">
                        <span className="close" onClick={() => props.setOpen(false)}>
                            X
                        </span>
                        <h1>Add New Promotion</h1>
                        <form onSubmit={handleSubmit}>
                            {props.columns
                                .filter((item) => item.field !== "id")
                                .map((column) => (
                                  <div
                                    className={`item ${
                                      validation[column.field] === false ? "invalid" : ""
                                    } ${column.field === "Name" ? "name-content-row" : ""}
                                    ${column.field === "Content" ? "name-content-row" : ""}`}
                                    key={column.field}
                                  >
                                        <label>{column.headerName}</label>
                                        {/* Use DatePicker for the "Join Date" column */}
                                          {column.field === 'StartDate' && (
                                              <DatePicker
                                                  value={SValue}
                                                  onChange={(newValue) => setSValue(newValue)}
                                              />
                                          )}
                                          {column.field === 'EndDate' && (
                                              <DatePicker
                                                  value={EValue}
                                                  onChange={(newValue) => setEValue(newValue)}
                                              />
                                          )}
                                          {column.field === 'Status' && (
                                            <Select
                                            value={StatusValue}
                                            onChange={(event) => setStatusValue(event.target.value as string)}
                                            sx={{ width: '100%', height: '40px' }}
                                            >
                                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                            <MenuItem value="CANCELED">CANCELED</MenuItem>
                                            <MenuItem value="OUTOFSTOCK">OUTOFSTOCK</MenuItem>
                                            <MenuItem value="OUTDATED">OUTDATED</MenuItem>
                                            <MenuItem value="NOTREADY">NOTREADY</MenuItem>
                                            </Select>
                                        )}
                                        {column.field === "Content" && (
                                            <TextareaAutosize
                                                placeholder={column.field}
                                                name={column.field}
                                                value={textValue}
                                                onChange={handleTextChange}
                                                minRows={2} // Adjust the number of rows as needed
                                                maxRows={4}
                                                style={{ background: theme.palette.background.paper, color: theme.palette.text.primary, borderRadius: 5 }}
                                            />
                                        )}
                                        {column.field === "Promotion" && (
                                            <Autocomplete
                                                options={productVariant}
                                                getOptionLabel={(option: any) => option.name}
                                                disablePortal
                                                value={productPromotionValue}
                                                onChange={(_, newValue) => setProductPromotionValue(newValue)}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    type={column.field}
                                                    placeholder={column.field}
                                                    name={column.field}
                                                />
                                                )}
                                            />
                                        )}
                                        {column.field === "Purchase" && (
                                            <Autocomplete
                                                options={productVariant}
                                                getOptionLabel={(option: any) => option.name}
                                                disablePortal
                                                value={purchaseValue}
                                                onChange={(_, newValue) => setPurchaseValue(newValue)}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    type="text"
                                                    placeholder={column.field}
                                                    name={column.field}
                                                />
                                                )}
                                            />
                                        )}
                                        {column.field !== 'StartDate' && column.field !== 'EndDate' &&
                                          column.field !== 'Content' && column.field != 'Status' &&
                                          column.field !== 'Purchase' && column.field !== 'Promotion' && (
                                            <input type={column.type} placeholder={column.field} name={column.field} />
                                        )}
                                        
                                    </div>
                                ))}
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
  )
}

export default AddPromotion