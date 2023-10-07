import { Fragment } from "react";
import classes from "./MeetupsDetail.module.css";

function MeetupDetail(props) {
  return (
    <Fragment>
      <section className={classes.detail}>
        <img src={props.data.image} alt={props.data.title} />
        <h1>{props.data.title}</h1>
        <address>{props.data.address}</address>
        <p>{props.data.description}</p>
      </section>
    </Fragment>
  );
}



export default MeetupDetail;
