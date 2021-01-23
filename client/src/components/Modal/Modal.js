import React, { useState } from "react";
import Form from "../Form/Form";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { Context } from "../../context/context";

const Modal = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {showModal ? (
        <Backdrop
          close={() => {
            setShowModal(false);
          }}
        />
      ) : null}
      {showModal ? (
        <div className={classes.Modal}>
          <div className="container">
            <h4>Save As</h4>
            <Context.Consumer>
              {(context) => (
                <form onSubmit={context.saveList}>
                  <input
                    type="text"
                    name={props.name}
                    placeholder={props.placeholder}
                  />
                  <button
                    type="submit"
                    className="waves-effect waves-green btn-flat"
                  >
                    SAVE
                  </button>
                  <div
                    className="waves-effect waves-green btn-flat"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    CANCEL
                  </div>
                </form>
              )}
            </Context.Consumer>
          </div>
        </div>
      ) : (
        <div
          className="waves-effect waves-light btn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Save As
        </div>
      )}
    </div>
  );
};

export default Modal;
