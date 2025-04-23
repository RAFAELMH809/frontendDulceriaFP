var url ="https://pg-restapidulceriabp.onrender.com/api/dulces";
let selectedDulceId = null;



function postDulce() {
    console.log(url);

    var myNombreDulces = $('#nombreDulces').val();
    var myPrecio = $('#precio').val();
    var myCantidad = $('#cantidad').val();
    var myDescripcion = $('#descripcion').val();
    var myColor = $('#color').val();
    var mySabor = $('#sabor').val();
    
    

    if (!myNombreDulces || !myPrecio || !myCantidad || !myDescripcion || !myColor || !mySabor) {
        alert('Por favor completa todos los campos');
        return;
    }
    

    var dulce = {
        nombreDulces: myNombreDulces,
        precio: myPrecio,
        cantidad: myCantidad,
        descripcion: myDescripcion,
        color: myColor,
        sabor: mySabor
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

        var htmlTableDulces = `
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Color</th>
                    <th>Sabor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;
        

        arrDulces.forEach(function(item, index) {
            console.log(item);
            htmlTableDulces += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nombreDulces}</td>
                    <td>${item.precio}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.color}</td>
                    <td>${item.sabor}</td>
                <td>
                <button class="btn-eliminar" onclick="deleteDulce(${item.id})">Eliminar</button>

                <button class="btn-editar" onclick="fillForm(${item.id}, '${item.nombreDulces}', '${item.precio}', ${item.cantidad}, '${item.descripcion}', '${item.color}', '${item.sabor}')">Editar</button>

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

    const nombreDulces = $('#nombreDulces').val();
    const precio = $('#precio').val();
    const cantidad = $('#cantidad').val();
    const descripcion = $('#descripcion').val();
    const color = $('#color').val();
    const sabor = $('#sabor').val();
    

    if (!nombreDulces || !precio || !cantidad || !descripcion || !color || !sabor) {
        alert("Completa todos los campos para actualizar");
        return;
    }

    const updatedDulce = { nombreDulces, precio, cantidad, descripcion, color, sabor };

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

function fillForm(id, nombreDulces, precio, cantidad, descripcion, color, sabor) {
    $('#nombreDulces').val(nombreDulces);
    $('#precio').val(precio);
    $('#cantidad').val(cantidad);
    $('#descripcion').val(descripcion);
    $('#color').val(color);
    $('#sabor').val(sabor);
    selectedDulceId = id;

    $('#updateBtn').show(); // muestra botón actualizar
}



// Limpiar inputs
function clearForm() {
    $('#nombreDulces').val('');
    $('#precio').val('');
    $('#cantidad').val('');
    $('#descripcion').val('');
    $('#color').val('');
    $('#sabor').val('');
    selectedDulceId = null;
    $('#updateBtn').hide(); 
}