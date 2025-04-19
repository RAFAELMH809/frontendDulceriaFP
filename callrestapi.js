var url = "https://pg-restapidulceriabp.onrender.com/api/dulces";
let selectedDulceId = null;



function postDulce() {
    console.log(url);

    var myNombre = $('#nombre').val();
    var myPrecio = $('#precio').val();
    var myCantidad = $('#cantidad').val();
    var myDescripcion = $('#descripcion').val();
    

    if (!myNombre || !myPrecio || !myCantidad || !myDescripcion) {
        alert('Por favor completa todos los campos');
        return;
    }
    

    var dulce = {
        nombre: myNombre,
        precio: myPrecio,
        cantidad: myCantidad,
        descripcion: myDescripcion
    };
    
    console.log(dulce);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dulce),
        success: function (data) {
            console.log(data);
            alert('Usuario agregado correctamente');
            clearForm(); 
            $('#resultado').html(JSON.stringify(data.dulce));
        },
       
    });
}

function getDulces() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrDulces = json.dulces;

        var htmlTableDulces = '<table border="1">';

        arrDulces.forEach(function(item, index) {
            console.log(item);
            htmlTableDulces += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nombre}</td>
                    <td>${item.precio}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.descripcion}</td>
                <td>
                <button class="btn-eliminar" onclick="deleteDulce(${item.id})">Eliminar</button>

                <button class="btn-editar" onclick="fillForm(${item.id}, '${item.nombre}', '${item.precio}', ${item.cantidad}, '${item.descripcion}')">Editar</button>

            </td>
        </tr>
    `;
});
     htmlTableDulces += '</table>';

        $('#resultado').html(htmlTableDulces);
    });
}

function deleteDulce(id) {
    const confirmar = confirm("¿Deseas eliminar este dulce?");
    if (!confirmar) return;

    $.ajax({
        url: `${url}/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Dulce eliminado');
            getDulces();
        },
        error: function (err) {
            console.error('Error al eliminar:', err);
        }
    });
}
function updateDulce() {
    if (!selectedDulceId) {
        alert("Primero selecciona un dulce con el botón Editar");
        return;
    }

    const nombre = $('#nombre').val();
    const precio = $('#precio').val();
    const cantidad = $('#cantidad').val();
    const descripcion = $('#descripcion').val();

    if (!nombre || !precio|| !cantidad|| !descripcion) {
        alert("Completa todos los campos para actualizar");
        return;
    }

    const updatedDulce = { nombre, precio, cantidad, descripcion };

    $.ajax({
        url: `${url}/${selectedDulceId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedDulce),
        success: function () {
            alert("Dulce actualizado correctamente");
            getDulces();
            clearForm();
            $('#updateBtn').hide(); // ocultar botón actualizar
            selectedDulceId = null;
        },
        error: function (err) {
            console.error('Error al actualizar:', err);
        }
    });
}

function fillForm(id, nombre, precio, cantidad, descripcion) {
    $('#nombre').val(nombre);
    $('#precio').val(precio);
    $('#cantidad').val(cantidad);
    $('#descripcion').val(descripcion);
    selectedDulceId = id;

    $('#updateBtn').show(); // muestra botón actualizar
}



// Limpiar inputs
function clearForm() {
    $('#nombre').val('');
    $('#precio').val('');
    $('#cantidad').val('');
    $('#descripcion').val('');
    selectedDulceId = null;
    $('#updateBtn').hide(); 
}