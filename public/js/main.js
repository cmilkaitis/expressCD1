$(document).ready(() => {
  $(".deleteItem").on("click", getId);
});

function getId() {
  let id = $(this).data("id");
  console.log(id);
  console.log(items);
}
