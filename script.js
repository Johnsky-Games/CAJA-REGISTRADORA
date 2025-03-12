// Espera a que el DOM se cargue completamente antes de ejecutar cualquier código.
// Esto asegura que todos los elementos a los que se hace referencia en el script existan en el momento de uso.
document.addEventListener('DOMContentLoaded', () => {

    // Se obtiene la referencia del elemento de visualización que mostrará el total.
    const display = document.getElementById('display');

    // Se obtienen las referencias de los botones para agregar producto, aplicar impuestos, aplicar descuento y calcular total.
    const addProductBtn = document.getElementById('add-product');
    const applyTaxBtn = document.getElementById('apply-tax');
    const applyDiscountBtn = document.getElementById('apply-discount');
    const calculateTotalBtn = document.getElementById('calculate-total');

    // Se obtienen las referencias de los inputs para el precio del producto, la tasa de impuestos y el porcentaje de descuento.
    const productPriceInput = document.getElementById('product-price');
    const taxRateInput = document.getElementById('tax-rate');
    const discountRateInput = document.getElementById('discount-rate');

    const salesHistory = document.getElementById('sales-history');

    let total = 0;
    let items = [];

    //Función para actualizar la pantalla de visualización

    function updateTotalDisplay() {
        display.textContent = `Total a pagar: $ ${total.toFixed(2)}`;
    }

    // Función para agregar un producto

    function addProduct() {
        const price = parseFloat(productPriceInput.value);

        if (isNaN(price) || price <= 0) {
            alert('Por favor, Ingrese un precio válido!');
            return;
        }

        items.push(price);
        total += price;
        updateTotalDisplay();
        productPriceInput.value = '';
    }

    //Función para aplicxar impuestos

    function applyTax() {
        const taxRate = parseFloat(taxRateInput.value);

        if (isNaN(taxRate) || taxRate <= 0) {
            alert('Por favor, Ingrese una tasa de impuestos válida!');
            return;
        }

        total += total * (taxRate / 100);
        updateTotalDisplay();
        taxRateInput.value = '';
    }

    //Función para aplicar descuento

    function applyDiscount() {
        const discountRate = parseFloat(discountRateInput.value);

        if (isNaN(discountRate) || discountRate <= 0) {
            alert('Por favor, Ingrese una tasa de descuento válida!');
            return;
        }

        total -= total * (discountRate / 100);
        updateTotalDisplay();
        discountRateInput.value = '';
    }

    // Función para calcular el total y guardar el registro

    function calculateTotal() {
        if (items.length === 0) {
            alert('No hay productos en la lista!');
            return;
        }

        const sale = {
            items: [...items],
            total: total.toFixed(2),
            date: new Date().toLocaleDateString()
        }

        saveSale(sale);
        displaySale(sale);

        //Resetea el totaL y los items para la próxima venta
        total = 0;
        items = [];
        updateTotalDisplay();
    }

    // Función para guardar la venta en el localStorage

    function saveSale(sale) {
        let sales = JSON.parse(localStorage.getItem('sales')) || [];
        sales.push(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
    }

    //Función para mostrar la venta en el historial de ventas

    function displaySale(sale) {
        const saleElement = document.createElement('div');
        saleElement.classList.add('sale');
        saleElement.innerHTML = `
        <strong>Fecha: </strong> ${sale.date} <br>
        <strong>Productos: </strong> ${sale.items.join(", ")}<br>
        <strong>Total: </strong> ${sale.total}
        `;
        salesHistory.appendChild(saleElement);
    }


    //Añade eventos a los botones

    addProductBtn.addEventListener('click', addProduct);
    applyTaxBtn.addEventListener('click', applyTax);
    applyDiscountBtn.addEventListener('click', applyDiscount);
    calculateTotalBtn.addEventListener('click', calculateTotal);

});