document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const productsTableBody = document.querySelector('#products-table tbody');

    // Load products on page load
    loadProducts();

    // Handle form submission (Add/Edit product)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = productIdInput.value;
        const product_name = document.getElementById('product_name').value;
        const merk = document.getElementById('merk').value;
        const category = document.getElementById('category').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        const data = { product_name, merk, category, quantity, price };

        if (id) {
            // Edit product
            data.id = id;
            fetch('backend/edit_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    loadProducts();
                    resetForm();
                }
            });
        } else {
            // Add product
            fetch('backend/add_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    loadProducts();
                    resetForm();
                }
            });
        }
    });

    // Handle cancel edit
    cancelEditBtn.addEventListener('click', () => {
        resetForm();
    });

    // Load products into the table
    function loadProducts() {
        fetch('backend/get_products.php')
            .then(response => response.json())
            .then(products => {
                productsTableBody.innerHTML = '';
                products.forEach(product => {
                    const total = (product.quantity * product.price).toFixed(2);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.product_name}</td>
                        <td>${product.merk}</td>
                        <td>${product.category}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                        <td>${total}</td>
                        <td>
                            <button class="action-btn edit-btn" data-id="${product.id}">Edit</button>
                            <button class="action-btn delete-btn" data-id="${product.id}">Delete</button>
                        </td>
                    `;
                    productsTableBody.appendChild(row);
                });

                // Add event listeners for edit and delete buttons
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        const product = products.find(p => p.id == id);
                        document.getElementById('product-id').value = product.id;
                        document.getElementById('product_name').value = product.product_name;
                        document.getElementById('merk').value = product.merk;
                        document.getElementById('category').value = product.category;
                        document.getElementById('quantity').value = product.quantity;
                        document.getElementById('price').value = product.price;
                        document.querySelector('#product-form button[type="submit"]').textContent = 'Update Product';
                        cancelEditBtn.style.display = 'inline-block';
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        if (confirm('Are you sure you want to delete this product?')) {
                            fetch('backend/delete_product.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: new URLSearchParams({ id })
                            })
                            .then(response => response.json())
                            .then(result => {
                                if (result.status === 'success') {
                                    loadProducts();
                                }
                            });
                        }
                    });
                });
            });
    }

    // Reset the form after adding/editing
    function resetForm() {
        productForm.reset();
        productIdInput.value = '';
        document.querySelector('#product-form button[type="submit"]').textContent = 'Add Product';
        cancelEditBtn.style.display = 'none';
    }
});