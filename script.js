const select = document.querySelector("select");
const button = document.querySelector("button");
const blague = document.querySelector(".blague");

const fetchCategories = async () => {
  const result = await fetch("https://api.blablagues.net/?list_cat");
  const data = await result.json();
  const categories = Object.keys(data.blagues);

  categories.forEach((categorie) => {
    const option = document.createElement("option"); // <option></option>
    option.textContent = categorie.replace(/[+]/g, " "); // <option>attrape nigaux</option>
    option.value = categorie; // <option value="animaux">animaux</option>
    select.appendChild(option); // <select><option>animaux</option></select>
  });
};
let x;
const fetchBlague = async () => {
  const selectValue = select.value;
  const result = await fetch(
    "https://api.blablagues.net/?rub=blagues&cat=" + selectValue
  );
  const data = await result.json();
  const content = data.data.content;
  x = content;
  console.log(content);
  blague.innerHTML =
    `<p> ${content.text_head} </p>` +
    (content.text !== "" ? `<p> ${content.text} </p>` : "") +
    (content.text_hidden !== "" ? `<p> ${content.text_hidden} </p>` : "");
};

fetchCategories();
button.addEventListener("click", fetchBlague);
