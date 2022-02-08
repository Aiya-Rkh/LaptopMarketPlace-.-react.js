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
import React, { useState } from "react";
import { AdminContext } from "../context/AdminProvider";
import { ToastContainer } from "react-toastify";

const AddPage = () => {
  const { addProduct } = React.useContext(AdminContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    color: "",
  });

  // const [name, setName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);
    //   ! Проверка на пустоту
    for (const key in newProduct) {
      if (!newProduct[key]) {
        alert("Заполните поля!");
        return;
      }
    }
    addProduct(newProduct);
    //   !очищаем инпуты
    setNewProduct({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      color: "",
    });
  };
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Add Page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            label="Введите название"
            variant="standard"
          />
          <TextField
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            value={newProduct.price}
            onChange={(e) => {
              if (!Number.isInteger(+e.target.value)) return;
              setNewProduct({
                ...newProduct,
                price: +e.target.value,
              });
            }}
            label="Введите цену"
            variant="standard"
          />
          <TextareaAutosize
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            minRows={3}
            placeholder="Введите описание"
            variant="standard"
          />
          <TextField
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            label="Введите фото"
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              value={newProduct.color}
              onChange={(e) =>
                setNewProduct({ ...newProduct, color: e.target.value })
              }
              labelId="color-select"
              label="Выберите цвет"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="gray">Серый</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AddPage;
