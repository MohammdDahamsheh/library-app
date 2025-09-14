import { use, useState } from "react";
import BookModel from "../../../Models/Book";
import axios from "axios";
import BookModelCreate from "../../../Models/BookModelCreate";

export const AddItem = () => {
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [category, setCategory] = useState("Category");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [imag, setImag] = useState<any>(null);

  

  const [warningAlert, setWarningAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const addBook = async () => {
    if (
      copies === 0 ||
      title.trim() === "" ||
      auther.trim() === "" ||
      description.trim() === "" ||
      category.trim() === "Category" ||
      imag.trim() === null
    ) {
      setWarningAlert(true);
      setSuccessAlert(false);
    } else {
      const newBook:BookModelCreate = {
        id: -1,
        title: title,
        author: auther,
        description: description,
        category: category,
        copies: copies,
        copiesAvailable: copies,
        img: imag,
      };
    //   console.log("DESCREPTION : "+description);
    //   console.log("new book : "+ newBook.description);
      

      const respone = await axios.post(
        "http://localhost:8080/api/createBook",
        newBook
      );

      if (respone.status !== 200) throw Error();

      setSuccessAlert(true);
      setWarningAlert(false);
      setCategory("Category");
      setCopies(0);
      setDescription("");
      setImag(null);
      setTitle("");
      setAuther("");
    }
  };

  async function convertImage(e:any) {
    if(e.target.files[0]){
        getImageConvert(e.target.files[0]);
    }
    
  }
  function getImageConvert(file :any){

    const reader=new FileReader();

    reader.readAsDataURL(file);
    reader.onload=function(){
        setImag(reader.result);
    }
    reader.onerror=function(err){
        console.log("Error : "+err);
    }

  }

  return (
    <div className="mt-3">
      <div className="container">
        {successAlert && (
          <div className="alert alert-success" role="alert">
            Creat new book successfully
          </div>
        )}

        {warningAlert && (
          <div className="alert alert-danger" role="alert">
            You should fill all the fileds
          </div>
        )}
        <div className="card rounded mb-5">
          <div className="card-header p-3">
            <p className="card-text fs-5">Add a new book</p>
          </div>
          <div className="card-body p-3">
            <form method="POST">
              <div className="row mt-3">
                {/* title */}
                <div className="col-6">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(ele) => setTitle(ele.target.value)}
                  />
                </div>
                {/* auther */}
                <div className="col-3 ">
                  <label htmlFor="auther">Auther</label>
                  <input
                    type="text"
                    className="form-control"
                    id="auther"
                    placeholder="Auther"
                    value={auther}
                    onChange={(ele) => setAuther(ele.target.value)}
                  />
                </div>
                {/* drop down category */}
                <div className="col-3">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    id="selectCategoryButtuon1"
                    type="button"
                  >
                    {category}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setCategory("FE")}
                      >
                        Frontend
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setCategory("BE")}
                      >
                        Backend
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setCategory("Data")}
                      >
                        Data
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setCategory("DevOps")}
                      >
                        DevOps
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <label htmlFor="description" className="form-label mt-3">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={description}
                onChange={(ele) => setDescription(ele.target.value)}
              ></textarea>

              <label htmlFor="copies" className="form-label mt-3">
                Copies
              </label>
              <input
                type="number"
                id="copies"
                className="form-control"
                value={copies}
                onChange={(ele) => setCopies(parseInt(ele.target.value))}
              />

              <label htmlFor="imag" className="form-label mt-3">
                Image
              </label>
              <input
                type="file"
                id="imge"
                className="form-control"
                onChange={(ele) =>convertImage(ele)}
              />

              <button className="btn btn-lg btn-primary mt-3" type="button" onClick={addBook}>
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
