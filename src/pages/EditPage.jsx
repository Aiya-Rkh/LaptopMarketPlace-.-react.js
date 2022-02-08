import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminProvider";

const EditPage = () => {
  // ! получает Id конкретного продукта чрз params
  const params = useParams();
  const { getProductToEdit, productToEdit, saveEditedProduct } =
    useContext(AdminContext);
  const [productEdit, setProductEdit] = useState(productToEdit);

  const navigate = useNavigate();

  useEffect(() => {
    setProductEdit(productToEdit);
  }, [productToEdit]);

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    // !проверка на пустоту
    for (const key in productEdit) {
      if (!productEdit[key]) {
        alert("Заполните поля");
        return;
      }
    }
    saveEditedProduct(productEdit);
    navigate("/admin-panel");
  };

  if (!productEdit) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Edit Page</h2>
        <form onSubmit={handlesubmit}>
          <TextField
            value={productEdit.name}
            onChange={(e) =>
              setProductEdit({ ...productEdit, name: +e.target.value })
            }
            label="Введите название"
            variant="standard"
          ></TextField>
          <TextField
            value={productEdit.brand}
            onChange={(e) =>
              setProductEdit({ ...productEdit, brand: e.target.value })
            }
            label="Введите бренд"
            variant="standard"
          ></TextField>
          <TextField
            value={productEdit.price}
            onChange={(e) =>
              setProductEdit({ ...productEdit, price: e.target.value })
            }
            label="Введите цену"
            variant="standard"
            type="number"
          ></TextField>
          <TextareaAutosize
            value={productEdit.description}
            onChange={(e) =>
              setProductEdit({ ...productEdit, description: +e.target.value })
            }
            placeholder="Введите описание"
            minRows={3}
          />
          <TextField
            value={productEdit.image}
            onChange={(e) =>
              setProductEdit({ ...productEdit, image: e.target.value })
            }
            label="Введите картинку"
            variant="standard"
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              value={productEdit.color}
              onChange={(e) =>
                setProductEdit({ ...productEdit, color: e.target.value })
              }
              labelId="color-select"
              label="Выберите цвет"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="gray">Серый</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
            </Select>
          </FormControl>
          <Button color="success" variant="outlined" type="submit">
            Сохранить изменения
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditPage;
