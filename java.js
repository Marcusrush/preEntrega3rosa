const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

let productoContainer = document.getElementById("producto-Container");

let url = "https://fakestoreapi.com/products"


fetch(url)
    .then(response => response.text())
    .then(data => {
        const productosFetch = JSON.parse(data);

        productosFetch.forEach((producto) => {
            const productElement = document.createElement("div");
            productElement.classList.add("card")
            productElement.innerHTML = `
            <img src="${producto.image}">
            <p>Precio: $${producto.price} </p>
            `;
            productoContainer.appendChild(productElement);
            let comprarExt = document.createElement("button")
            comprarExt.innerText = "comprar"
            comprarExt.className = "comprar";
            productElement.append(comprarExt);
            comprarExt.addEventListener("click", () => {
                carrito.push({
                    id: producto.id,
                    nombre: producto.title,
                    img: producto.image,
                    precio: producto.price,
                });
            })
        })
           
            })
    



let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $<p/>
    `

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: product.id,
            nombre: product.nombre,
            img: product.img,
            precio: product.precio,
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: false
        })
        Toast.fire({
            icon: 'success',
            title: `Se agregó ${product.nombre} al carrito`
        })
    });
});

verCarrito.addEventListener("click", () => {
    let carritoContentAll = "";
    let indice = 0;
    if (Object.keys(carrito).length > 0) {
        carrito.forEach((product) => {
            let carritoContent = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <button type="button" id="quitar-${indice}" class="quitarProd">Quitar</button>`
            carritoContentAll = carritoContentAll + carritoContent;
            indice++;
        });
    } else {
        carritoContentAll = "No hay productos en el carrito";
    }
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    Swal.fire({
        title: '<strong>Carrito de compra</strong>',
        icon: 'info',
        html: `${carritoContentAll} <br> Total: $${total}`,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
            'OK',
    })
    let quitar = document.getElementsByClassName("quitarProd");
    for (let i = 0; i < quitar.length; i++) {
        quitar[i].addEventListener("click", () => {
            //BORRAMOS PRODUCTO
            carrito.splice(i, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                iconColor: 'white',
                customClass: {
                    popup: 'colored-toast'
                },
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: false
            })
            Toast.fire({
                icon: 'error',
                title: `Se quitó el producto`
            })
        })
    }

})
