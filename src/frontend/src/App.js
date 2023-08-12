import React, { Fragment } from "react";
import axios from "axios";
import ReactModal from 'react-modal';
import "./App.scss";
import Books from "./components/Books";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      titleModel: "Create",
      formData: {
        id: '',
        title: '',
        description: ''
      },
      books: [],
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal (formData = {
    _id: '',
    title: '',
    description: ''
  }) {
    this.setState({
      showModal: true,
      titleModel: formData._id ? 'Update' : 'Create',
      formData: formData,
    });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  componentDidMount() {
    axios.get("/api")
      .then((response) => {
        this.setState({
          books: response.data.data,
        });
      })
      .catch((e) => console.log("Error : ", e));
  }

  handleSubmit = () => {
    const data = {
      title: this.state.formData.title,
      description: this.state.formData.description
    };

    if (this.state.formData._id) {
      this.requestUpdate(data, this.state.formData._id)
    } else {
      this.requestCreate(data)
    }

    this.handleCloseModal();
  };

  requestCreate = (data) => {
    axios.post("/api/books", data)
      .then((response) => {
        const dataResult = response.data.data
        this.setState({
          books: [...this.state.books, {
            _id: dataResult._id,
            title: dataResult.title,
            description: dataResult.description
          }],
        });
      })
      .catch((e) => console.log("Error : ", e));
  }

  requestUpdate = (data, bookId) => {
    axios.put("/api/books/"+bookId, data)
      .then((response) => {
        const indexToUpdate = this.state.books.findIndex(item => item._id === bookId);
        if (indexToUpdate !== -1) {
          const dataResult = response.data.data
          this.state.books[indexToUpdate] = {
            _id: dataResult._id,
            title: dataResult.title,
            description: dataResult.description
          };
          this.setState({
            books: this.state.books,
          });
        }
      })
      .catch((e) => console.log("Error : ", e));
  }

  handleUpdate = (bookInfo) => {
    this.handleOpenModal(bookInfo);
  }

  handleDelete = (bookId) => {
    axios.delete("/api/books/"+bookId)
      .then(() => {
        const indexToRemove = this.state.books.findIndex(item => item._id === bookId);
        if (indexToRemove !== -1) {
          this.state.books.splice(indexToRemove, 1);
          this.setState({
            books: this.state.books,
          });
        }
      })
      .catch((e) => console.log("Error : ", e));
  }

  render() {
    return (
      <Fragment>
        <div className="App container">
          <div className="container">
            <div className="row px-3">
              <h2 className="text-center px-0">Books</h2>
              <div className="d-flex justify-content-end px-0 pb-4">
                <button className="btn btn-primary w-auto"
                onClick={this.handleOpenModal}>Add</button>
              </div>
            </div>
            <div className="row">
              <Books
                books={this.state.books}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </div>

        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Book Modal"
           onRequestClose={this.handleCloseModal}
           className="modal-content"
           overlayClassName="modal-overlay"
        >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.state.titleModel}</h5>
                <button type="button" className="close" onClick={this.handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form noValidate className="col-12 form-group">
                  <label className="mt-3">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    minLength={1}
                    className="form-control"
                    value={this.state.formData.title}
                    onChange={this.handleOnChange}
                  />
                  <label className="mt-3">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    className="form-control"
                    value={this.state.formData.description}
                    onChange={this.handleOnChange}
                    rows="4"
                  />
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-3" type="button" onClick={this.handleSubmit}>
                      {this.state.titleModel}
                    </button>
                  </div>
                </form>
              </div>
        </ReactModal>
      </Fragment>
    );
  }
}
