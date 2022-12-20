export default function sendMoviesToServer(data) {
    return {
      type: "SEND_MOVIES_TO_SERVER",
      payload: { data },
    };
  }
  