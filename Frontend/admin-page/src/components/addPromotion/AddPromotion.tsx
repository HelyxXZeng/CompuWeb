import { GridColDef } from "@mui/x-data-grid";
import "./addPromotion.scss"
import { Autocomplete, MenuItem, Select, TextField, TextareaAutosize, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import productsVariantAPI from "../../api/productsVariantAPI";
import promotionAPI, { PromotionDef } from "../../api/promotionAPI";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData(): Promise<void>;
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
  const [SValue, setSValue] = useState<Dayjs | null>(dayjs());
  const [validation, setValidation] = useState<Record<string, boolean>>({});
  const [EValue, setEValue] = useState<Dayjs | null>(dayjs());
  const [StatusValue, setStatusValue] = useState('');
  const [productPromotionValue, setProductPromotionValue] = useState<any>(null);
  const [purchaseValue, setPurchaseValue] = useState<any>(null);
  const [productVariant, setProductVariant] = useState<any>([]);
  const [textValue, setTextValue] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await productsVariantAPI.getAll({ _page: 1, _limit: 100000 });//await fetchProductVariant();
            const productVariantData = response.data;
            setProductVariant(productVariantData);
        } catch (error) {
            alert("Cannot get product Variant Data. Error: " + error)
            throw(error)
        }
    }
    fetchData();
    }, []);  

    const handleTextChange = (event: any) => {
        setTextValue(event.target.value);
      };

    const handleValidation = () => {
        const newValidation: Record<string, boolean> = {};

        props.columns
        .forEach((column) => {
            if (column.field === 'startDate' || column.field === 'endDate') {
                return;
            } 
                
            const inputValue = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`)?.value || '';
            if (column.field === 'status') {
                newValidation[column.field] = StatusValue.trim() !== '';
            }
            else if (column.field === 'content') {
                newValidation[column.field] = textValue.trim() !== '';
            } else newValidation[column.field] = inputValue.trim() !== '';
        });
        
        setValidation(newValidation);
        
        return Object.values(newValidation).every((valid) => valid);
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 

        const isValid = handleValidation();
        //add new item
        // axios.post('/api/${slug}s')
        if (isValid) {
            //debug
            const formData: PromotionDef = {
                id: 0,
                name: '',
                productVariantIdPurchase: 0,
                productVariantIdPromotion: 0,
                startDate: dayjs().toDate(),
                endDate: dayjs().toDate(),
                content: '',
                value: 0,
                status: ''
            };

            props.columns
                .forEach((column) => {
                if (column.field === 'startDate') {
                    formData[column.field] = SValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'endDate') {
                    formData[column.field] = EValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'status') {
                    formData[column.field] = StatusValue;
                } else if (column.field === "content") {
                    formData[column.field] = textValue;
                } else if (column.field === "productVariantNamePromotion") {
                    formData['productVariantIdPromotion'] = productPromotionValue.id;
                }  else if (column.field === "productVariantNamePurchase") {
                    formData['productVariantIdPurchase'] = purchaseValue.id;
                } else {
                    const inputElement = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`) as HTMLInputElement;
                    (formData as any)[column.field] = inputElement?.value || null;
                }
                });

            console.log('Form Data:', formData);
            //end debug

            // Perform your form submission logic
            try {
                await promotionAPI.add(formData)
            } catch (error) {
                alert("False to add new promotion. Error: " + error);
                throw(error);
            }
            props.setOpen(false);
            props.fetchData();
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
                        <h1>Add New promotion</h1>
                        <form onSubmit={handleSubmit}>
                            {props.columns
                                .filter((item) => item.field !== "id")
                                .map((column) => (
                                  <div
                                    className={`item ${
                                      validation[column.field] === false ? "invalid" : ""
                                    } ${column.field === "name" ? "name-content-row" : ""}
                                    ${column.field === "content" ? "name-content-row" : ""}
                                    ${(column.field === "productVariantNamePurchase" || column.field === "productVariantNamePromotion") ? "name-content-row" : ""}`}
                                    key={column.field}
                                  >
                                        <label>{column.headerName}</label>
                                        {/* Use DatePicker for the "Join Date" column */}
                                          {column.field === 'startDate' && (
                                              <DatePicker
                                                  value={SValue}
                                                  onChange={(newValue) => setSValue(newValue)}
                                              />
                                          )}
                                          {column.field === 'endDate' && (
                                              <DatePicker
                                                  value={EValue}
                                                  onChange={(newValue) => setEValue(newValue)}
                                              />
                                          )}
                                          {column.field === 'status' && (
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
                                        {column.field === "content" && (
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
                                        {column.field === "productVariantNamePromotion" && (
                                            <Autocomplete
                                                options={productVariant}
                                                getOptionLabel={(option: any) => `Id:${option.id} - ${option.name}`}
                                                isOptionEqualToValue={() => true}
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
                                        {column.field === "productVariantNamePurchase" && (
                                            <Autocomplete
                                                options={productVariant}
                                                getOptionLabel={(option: any) => `Id:${option.id} - ${option.name}`}
                                                disablePortal
                                                isOptionEqualToValue={() => true}
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
                                        { (column.field === "name" || column.field === "value") && (
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