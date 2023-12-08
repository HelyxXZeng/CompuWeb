import { GridColDef } from "@mui/x-data-grid";
import "./addPromotion.scss"
import { TextareaAutosize, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

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

    const handleValidation = () => {
        const newValidation: Record<string, boolean> = {};

        props.columns
        .forEach((column) => {
            if (column.field === 'StartDate' || column.field === 'EndDate') {
                return;
            } 
                
            const inputValue = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`)?.value || '';
            /* if (column.field === 'Gender') {
                newValidation[column.field] = genderValue.trim() !== '';
            } 
            else */  newValidation[column.field] = inputValue.trim() !== '';
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
                /* if (column.field === 'JoinDate') {
                    formData[column.field] = SValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'Birthday') {
                    formData[column.field] = EValue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'Gender') {
                    formData[column.field] = genderValue;
                } else { */
                    const inputElement = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`) as HTMLInputElement;
                    formData[column.field] = inputElement?.value || null;
                // }
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
                        <h1>Add new {props.slug}</h1>
                        <form onSubmit={handleSubmit}>
                            {props.columns
                                .filter((item) => item.field !== "id")
                                .map((column) => (
                                  <div
                                    className={`item ${
                                      validation[column.field] === false ? "invalid" : ""
                                    } ${column.field === "Name" ? "name-content-row" : ""}
                                    ${column.field === "Content" ? "name-content-row" : ""}
                                    ${column.field === "Value" ? "value-row" : ""}`}
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
                                          {column.field === "Content" && (
                                            <TextareaAutosize
                                                placeholder={column.field}
                                                name={column.field}
                                                minRows={2} // Adjust the number of rows as needed
                                                maxRows={4}
                                                style={{ background: theme.palette.background.paper, color: theme.palette.text.primary, borderRadius: 5 }}
                                            />
                                          )}
                                        {column.field !== 'StartDate' && column.field !== 'EndDate' &&
                                          column.field !== 'Content' && (
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