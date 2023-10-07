import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Berlin_reichstag_CP.jpg/800px-Berlin_reichstag_CP.jpg",
//     title: "A First meetup",
//     address: "Captial Building, 5th General Consult, Germany",
//     description: "This is the first meetup",
//   },
//   {
//     id: "m2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bauhaus.JPG/220px-Bauhaus.JPG",
//     title: "A Second meetup",
//     address: "Bahaus Building, 5th Bhaus road, Germany",
//     description: "This is the second meetup",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   //https request
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  //return <MeetupList meetups={loadedMeetups}></MeetupList>;
  console.log(props.meetups);
  return (
    <Fragment>
      <Head>
        <title>React Meetup Form</title>
        <meta
          name="description"
          content="This is a Meetup froum build using React framework"
        />
      </Head>

      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const res = context.res
//   const req = context.req
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const mongodbUrl =
    "mongodb+srv://saravananrnd:GF5TaF1MY0xUK5WT@cluster0.l04bjmf.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(mongodbUrl);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
