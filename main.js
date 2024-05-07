import axios from "axios";
import "./style.css";

const updateCounter = (count) => {
  const counterElement = document.getElementById("counter");
  counterElement.innerText = count.toLocaleString();
};

const fetchUserCount = async () => {
  try {
    const response = await axios.get(
      "https://fanverse-backend.onrender.com/api/user/all"
    );
    const userCount = response.data.length;
    console.log("Fetched user count:", userCount);
    updateCounter(userCount);
    localStorage.setItem("userCount", userCount);
    console.log("User count stored in local storage:", userCount);
    return userCount;
  } catch (error) {
    console.error("Error fetching user count:", error);
  }
};

const animateCounter = async () => {
  const storedUserCount = localStorage.getItem("userCount");
  let currentCount = storedUserCount
    ? parseInt(storedUserCount)
    : await fetchUserCount();

  console.log("Initial user count:", currentCount);

  setInterval(async () => {
    const newCount = await fetchUserCount();
    console.log("New user count:", newCount);
    const increment = Math.sign(newCount - currentCount);
    for (let i = currentCount; i !== newCount; i += increment) {
      currentCount += increment;
      updateCounter(currentCount);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }, 2000);
};

animateCounter();
