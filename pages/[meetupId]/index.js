import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupsDetail";
import Head from "next/head";
import { Fragment } from "react";

// const meetupDetail = {
//   imgLink:
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Berlin_reichstag_CP.jpg/800px-Berlin_reichstag_CP.jpg",
//   title: "A First Meetup",
//   address: "#5, Bhausas Street, Bhausas Castle, Germany",
//   description: "This is the first First Meetup",
// };

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description}></meta>
      </Head>
      <MeetupDetail data={props.meetup} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const mongodbUrl =
    "mongodb+srv://saravananrnd:GF5TaF1MY0xUK5WT@cluster0.l04bjmf.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(mongodbUrl);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const mongodbUrl =
    "mongodb+srv://saravananrnd:GF5TaF1MY0xUK5WT@cluster0.l04bjmf.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(mongodbUrl);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const data = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetup: {
        ...data,
        id: meetupId,
        _id: meetupId,
      },
    },
  };
}

export default MeetupDetails;
