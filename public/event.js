document.addEventListener("DOMContentLoaded", () => {
  const inputImg = document.querySelector("#inputIMG");
  const imgSelected = document.querySelector(".image-selected");
  inputImg.addEventListener("change", () => {
    // let reader = new FileReader();
    const file = inputImg.files;
    let fileName = file.name;
    imgSelected.setAttribute("src", fileName);
  });
});
