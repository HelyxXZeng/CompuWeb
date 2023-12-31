import { Autocomplete, MenuItem, Select, TextField, TextareaAutosize, ThemeProvider, createTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import './updatePromotion.scss'
import productsVariantAPI from '../../api/productsVariantAPI';
import promotionAPI, { PromotionDef } from '../../api/promotionAPI';
type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData(): Promise<void>;
    promotionData: any;
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

const UpdatePromotion = (props :Props) => {

  const [SValue, setSValue] = useState<Dayjs | null>(
    props.promotionData ? dayjs(props.promotionData.startDate) : dayjs('2023-11-27')); 
  const [validation, setValidation] = useState<Record<string, boolean>>({});
  const [EValue, setEValue] = useState<Dayjs | null>(
    props.promotionData ? dayjs(props.promotionData.endDate) : dayjs('2023-11-27'));
  const [StatusValue, setStatusValue] = useState<string>(
    props.promotionData ? props.promotionData.status : '');
  const [productPromotionValue, setProductPromotionValue] = useState<{id: any,name: any}>({
    id: props.promotionData ? props.promotionData.productVariantIdPromotion : null,
    name: props.promotionData ? props.promotionData.productVariantNamePromotion : null,
  });
  const [purchaseValue, setPurchaseValue] = useState<{id: any,name: any}>({
    id: props.promotionData ? props.promotionData.productVariantIdPurchase : null,
    name: props.promotionData ? props.promotionData.productVariantNamePurchase : null,
  });
  const [productVariant, setProductVariant] = useState<any>([]);
  const [textValue, setTextValue] = useState(props.promotionData ? props.promotionData.content : '');
  const [nameValue, setNameValue] = useState(
    props.promotionData ? props.promotionData.name : '');
  const [discountValue, setDiscountValue] = useState(
    props.promotionData ? props.promotionData.value : '');
  useEffect(() => {
    const fetchData = async () => {
        const productVariantData = await productsVariantAPI.getAll({ _page: 1, _limit: 100000 });//await fetchProductVariant();
        setProductVariant(productVariantData.data);
        //const purchaseProduct = productVariant.find((product:any) => product.name === props.promotionData.productVariantNamePurchase);
      //setPurchaseValue({props.promotionData.productVariantNamePurchase,props.promotionData.productVariantIdPurchase});

        //const promotionProduct = productVariant.find((product:any) => product.name === props.promotionData.productVariantNamePromotion);
      //setProductPromotionValue(props.promotionData.productVariantNamePromotion);
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
            id: props.promotionData.id,
            name:'',
            startDate: dayjs().toDate(),
            endDate: dayjs().toDate(),
            status: '',
            content:'',
            productVariantIdPromotion:0,
            productVariantIdPurchase:0,
            value:0,
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
            await promotionAPI.update(formData.id, formData)
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

                <div className="updatepromotion">
                    <div className="modal">
                        <span className="close" onClick={() => props.setOpen(false)}>
                            X
                        </span>
                        <h1>Update Promotion</h1>
                        <form onSubmit={handleSubmit}>
                            {props.columns
                                .filter((item) => item.field !== "Id")
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
                                        
                                          {column.field === 'name' && (
                                            <input
                                            type="text"
                                            placeholder={column.field}
                                            name={column.field}
                                            value={nameValue}
                                            onChange={(e) => setNameValue(e.target.value)}
                                            />
                                          )}
                                           {column.field === 'value' && (
                                            <input
                                            type="text"
                                            placeholder={column.field}
                                            name={column.field}
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(e.target.value)}
                                            />
                                          )}
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
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option.id === value.id && option.name === value.name
                                                  }
                                                disablePortal
                                                disabled
                                                value={productPromotionValue}
                                                //onChange={(_, newValue) => setProductPromotionValue(newValue)}
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
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option.id === value.id && option.name === value.name
                                                  }
                                                disablePortal
                                                disabled
                                                value={purchaseValue}
                                                //onChange={(_, newValue) => setPurchaseValue(newValue)}
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

export default UpdatePromotion