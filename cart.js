const tbody = document.querySelector(".tbody");
let cartTotal = document.querySelector(".cart-total");
let cartQuantity = document.querySelector(".quantity");
function templateData() {
  const productData = JSON.parse(localStorage.getItem("product"));
  if (productData && productData.length > 0) {
    let newTotal = 0; // Khởi tạo biến newTotal để tính tổng giá trị

    productData.forEach((product) => {
      const template = ` <tr class="cart-item">
        <td class="cart-image">
          <img
            style="width: 100px"
            src="${product.image}"
            alt=""
          />
        </td>
        <td class="cart-product"><p>${product.title}</p></td>
        <td class="cart-price">
          <p><span>${parseFloat(product.price)}</span> đ</p>
        </td>
        <td class="cart-quantity">
          <input
            class="quantity"
            type="number"
            value="1"
            min="0"
            max="999"
          />
        </td>
        <td class="cart-total"><span>${newTotal}</span></td>
        <td class="cart-delete"><i class="fa-solid fa-trash"></i></td>
        </tr>`;
      newTotal = `${parseFloat(product.price)} đ`;
      tbody.insertAdjacentHTML("beforeend", template);
    });
  }
}
templateData();

const cartDelete = document.querySelector(".fa-trash");
cartDelete.addEventListener("click",handleCartDelete);

function handleCartDelete(){
    let productData = localStorage.getItem(JSON.parse("product"));
}