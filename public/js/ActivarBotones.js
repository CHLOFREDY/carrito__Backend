import {
  recibirDataID,
  actualizarOverlay,
  actualizarValorTotal,
  productosActualizados,
  iconCart,
} from "./carrito.js"
import { actualizarBoton } from "./ActualizarBoton.js"

export function activarBoton() {
  let botones = document.querySelectorAll(".botones__agregar")

  botones.forEach((button) => {
    // Eliminar event listeners anteriores
    button.removeEventListener("click", botonesActivados)

    // Agregar nuevo event listener
    button.addEventListener("click", botonesActivados)
  })
}

async function botonesActivados(e) {
  const carritoID = await recibirDataID()

  let botonClickeado = Number(e.target.dataset.id)
  let productoSeleccionado = carritoID.find(
    (elemento) => elemento.id === botonClickeado
  )
  let productoExistente = productosActualizados.find(
    (el) => el.id === botonClickeado
  )

  if (productoSeleccionado) {
    if (productoSeleccionado.stock > 0) {
      if (productoExistente) {
        if (productoExistente.cantidad < 10000) {
          productoExistente.cantidad++
          productoSeleccionado.stock--
          productoExistente.stock = productoSeleccionado.stock
        }
      } else {
        productosActualizados.push({
          ...productoSeleccionado,
          cantidad: 1,
          stock: productoSeleccionado.stock,
        })
        productoSeleccionado.stock--
      }

      try {
        await fetch(
          `http://localhost:5000/carrito/${productoSeleccionado.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application.json",
            },
            body: JSON.stringify({
              cantidad: productoExistente ? productoExistente.cantidad : 1,
              stock: productoExistente.stock,
            }),
          }
        )
      } catch (err) {
        console.log("no se pudo agregar prodcuto al carrito", err)
      }

      let cantidadTotal = productosActualizados.reduce(
        (total, prod) => total + prod.cantidad,
        0
      )
      iconCart.innerHTML = productosActualizados.reduce(
        (total, prod) => total + prod.cantidad,
        0
      )

      localStorage.setItem(
        "Productos-Actualizados",
        JSON.stringify(productosActualizados)
      )
      actualizarValorTotal()
      actualizarOverlay()

      if (productoSeleccionado.stock === 0) {
        actualizarBoton(productoSeleccionado)
      }
    } else {
      e.target.innerHTML = "Sin stock"
      e.target.disabled = true
    }
  }
}
