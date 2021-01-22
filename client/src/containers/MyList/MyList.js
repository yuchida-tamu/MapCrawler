import React from "react";
import List from "../../components/List/List";
import { Context } from "../../context/context";
import classes from "./MyList.module.css";
import Modal from "../../components/Modal/Modal";

const MyList = (props) => {
  const styles = `row ${classes.MyList}`;
  const listContainerStyle = `${classes.ListContainer}`;

  return (
    <Context.Consumer>
      {(context) => (
        <div className={styles}>
          <h5 style={{ textAlign: "center" }}>MyList</h5>
          <div className="row">
            <a
              className="btn-floating btn-small waves-effect waves-light grey"
              style={{ float: "left" }}
            >
              <i className="material-icons  white-text" onClick={props.close}>
                close
              </i>
            </a>

            <a
              className="btn-floating btn-small waves-effect waves-light "
              style={{ float: "right" }}
              href={context.href}
              download="data.json"
            >
              <i className="material-icons white-text ">file_download</i>
            </a>
            <div className={listContainerStyle}>
              <List
                places={context.placeList}
                placeList={context.placeList}
                showMyList={true}
                isMyList={true}
              />
            </div>
            <Modal name="savelist" placeholder="Save the list as..." />
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

export default MyList;
