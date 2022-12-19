//send message

const URL = "http://localhost:3000";
const ringBackForm = document.getElementById("ringBackForm");
const ringBackPhone = document.getElementById("ringBackPhone");

ringBackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const body = { phone: ringBackPhone.value.toString() };
  return sendBody(body);
});

async function sendBody(body) {
  try {
    const request = await fetch(`${URL}/emails/ring`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      console.log("Сообщение не отправлено");
    }
    console.log("Сообщение отправлено");
  } catch (error) {
    console.log("Сообщение не отправлено");
  }
}
