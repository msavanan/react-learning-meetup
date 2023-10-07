import { useRouter } from "next/router";
import Head from "next/head"
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";

function NewMeetup() {
  const router = useRouter();
  async function onAddMeetupHandler(meetupData) {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>New Meetup Form</title>
        <meta name="description" content="Add a new meetup"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>
    </Fragment>
  );
}

export default NewMeetup;
