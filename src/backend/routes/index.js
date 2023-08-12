const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { BookModel } = require("../models/books/book");

const routes = (app) => {
  const router = express.Router();

  router.post("/books", (req, res) => {
    const Book = new BookModel({
      title: req.body.title,
      description: req.body.description,
    });

    Book.save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.put("/books/:id", (req, res) => {
    const dataUpdate = {
      title: req.body.title,
      description: req.body.description,
    };
    BookModel.findByIdAndUpdate(req.params.id, dataUpdate, { new: true })
      .then((books) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL_UPDATE, books);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.delete("/books/:id", (req, res) => {
    BookModel.findByIdAndRemove(req.params.id)
      .then((books) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE, books);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/", (req, res) => {
    BookModel.find({}, { __v: 0 })
      .then((books) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, books);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
