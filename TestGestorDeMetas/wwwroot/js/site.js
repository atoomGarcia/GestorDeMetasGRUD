
function init() {
    //loadTareasTable();
}

function Add_Meta() {
    var metaName = $("#metaName").val();
    var url = "http://localhost:5281/api/TodoApp/AddMeta?newMeta=" + encodeURIComponent(metaName);

    $.ajax({
        url: url,
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        location.reload(); 
                    }
                });
                $("#addMetaModal").modal("hide");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message
                });
            }
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error
            });
        }
    });
}

function Add_Tarea() {
    var tareaName = $("#tareaName").val();
    var IdMeta = $("#hiddenIdMeta").val();
    var IdDesc = $("#tareaDesc").val();

    var url = "http://localhost:5281/api/TodoApp/AddTarea?newTarea=" + encodeURIComponent(tareaName) + "&desc=" + encodeURIComponent(IdDesc) + "&IdMeta=" + IdMeta;
    $.ajax({
        url: url,
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                $("#addMetaModal").modal("hide");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message
                });
            }
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error
            });
        }
    });
    var tareaName = $("#tareaName").val("");
    var IdDesc = $("#tareaDesc").val("");
    $("#addTareaModal").hide(); 

    recargarTablaTareas();
}

function Eliminar_Meta(IdMeta,NombreMeta) {
    Swal.fire({
        title: "Está seguro?",
        text: "Confirma que quiere eliminar la meta: " + NombreMeta +"?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Acepto elimninar el registro!"
    }).then((result) => {
        if (result.isConfirmed) {

            var url = "http://localhost:5281/api/TodoApp/DeleteMeta?id=" + IdMeta;

            $.ajax({
                url: url,
                method: "DELETE",
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Meta eliminada exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    });
                },
                error: function (error) {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!",
                        footer: error
                    });
                }
            });
        }
    });
};

function editarTarea(IdTarea) {

    $("#hiddenIdTarea").val(IdTarea);

    $("#ChangeTareaModal").modal("show");
}


function ModificaNombreTarea() {

   

    var IdTarea = $("#hiddenIdTarea").val();
    var newName = $("#newTareaName").val();
    var IdMeta = $("#hiddenIdMeta").val();

    var url = "http://localhost:5281/api/TodoApp/editarTarea?id=" + IdTarea + "&IdMeta=" + IdMeta + "&newName=" + encodeURIComponent(newName);

    $.ajax({
        url: url,
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Nombre modificado exitosamente",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("Actualización exitosa:", response);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error.responseText || error.statusText || "Error desconocido"
            });
            console.error("Error al actualizar el nombre:", error);
        }
    });

    recargarTablaTareas();
    $("#ChangeTareaModal").modal("hide");
};

function eliminarTarea(IdTarea) {
    Swal.fire({
        title: "Está seguro?",
        text: "Confirma que quiere eliminar la tarea?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Acepto elimninar el registro!"
    }).then((result) => {
        if (result.isConfirmed) {

            var url = "http://localhost:5281/api/TodoApp/DeleteTarea?id=" + IdTarea;

            $.ajax({
                url: url,
                method: "DELETE",
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Tarea eliminada exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    recargarTablaTareas();
                },
                error: function (error) {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!",
                        footer: error
                    });
                }
            });
        }
    });
};

function recargarTablaTareas() {
    var table = $('#tabTareas').DataTable();
    table.ajax.reload(null, false); 
}


function ChangeMetaModal() {
    var NombreMeta = $("#newName").val();
    var IdMeta = $("#hiddenId").val();

    var url = "http://localhost:5281/api/TodoApp/UpdateMeta?id=" + encodeURIComponent(IdMeta) + "&newName=" + encodeURIComponent(NombreMeta);

    $.ajax({
        url: url,
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Meta modificada exitosamente",
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            });
            console.log("Actualización exitosa:", response);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error.responseText || error.statusText || "Error desconocido"
            });
            console.error("Error al actualizar la meta:", error);
        }
    });

};

function Modificar_Meta(IdMeta, NombreMeta) {


    $("#newName").val(NombreMeta);
    $("#hiddenId").val(IdMeta);

    $("#ChangeMetaModal").modal("show");
}

function loadTareasTable() {


    $('#tabTareas').DataTable({
        "processing": true, 
        "ajax": {
            "url": 'http://localhost:5281/api/TodoApp/GetTarea?IdMeta=' + IdMeta,
            "type": "GET",
            "dataType": "json",
            "dataSrc": "data",  // Propiedad que contiene los datos en la respuesta JSON
            "error": function (e) {
                alert("Error al cargar los datos de la tabla: " + e.responseText);
            }
        },
        "columns": [
            { "data": "NombreTarea" },
            { "data": "Descripcion" },
            {
                "data": "Fecha",
                "render": function (data) {
                    return new Date(data).toLocaleDateString();  // Formatear fecha si es necesario
                }
            },
            { "data": "Fecha" },  // Esto debería ser la fecha de fin si se proporciona
            {
                "data": null,  // Acciones personalizadas
                "render": function (data, type, row) {
                    return ' <button class="text-primary mr-2"  onclick="editarTarea(' + data.IdTarea + ')"> <i class="fas fa-pencil-alt"></i></button>' +
                        ' <button class="text-danger mr-2"  onclick="eliminarTarea(' + data.IdTarea + ')" class="btn btn-danger btn-sm ml-2"><i class="fas fa-trash"></i></button>';
                }
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" 
        },
        "bDestroy": true,
        "iDisplayLength": 5, 
        "order": [[0, "desc"]], 
        "searching": false  
    });
};


function ShowTareas(IdMeta, MetaName) {

    $('#addTareabutton').prop('disabled', false);
    $('#hiddenIdMeta').val(IdMeta);
    $('#lagelMetaNameTareaModal').text(MetaName);

    $('#tabTareas').DataTable({
        "processing": true,
        "ajax": {
            "url": 'http://localhost:5281/api/TodoApp/GetTarea?IdMeta=' + IdMeta,
            "type": "GET",
            "dataType": "json",
            "dataSrc": "data", 
            "error": function (e) {
                alert("Error al cargar los datos de la tabla: " + e.responseText);
            }
        },
        "columns": [
            {
                "data": "Prioridad",
                "render": function (data, type, row) {
                    var iconClass = data === 1 ? 'fas fa-star text-warning' : 'fas fa-star text-secondary';
                    return '<i class="' + iconClass + '" onclick="CambiarPrioridad(' + row.IdTarea + ')"></i>';
                }
            },
            { "data": "NombreTarea" },
            { "data": "Descripcion" },
            {
                "data": "Fecha",
                "render": function (data) {
                    return new Date(data).toLocaleDateString();
                }
            },
            {
                "data": "Estatus",
                "render": function (data, type, row) {
                    if (data === 1) {
                        return '<button class="btn btn-success">Completado</button>';
                    } else {
                        return '<button class="btn btn-secondary" onclick="CompletarTarea(' + row.IdTarea + ')">Completar</button>';
                    }
                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return ' <button class="text-primary mr-2 buttonshadowInside"  onclick="editarTarea(' + data.IdTarea + ')" > <i class="fas fa-pencil-alt"></i></button>' +
                        ' <button class="text-danger mr-2 buttonshadowInside"  onclick="eliminarTarea(' + data.IdTarea + ')" class="btn btn-danger btn-sm ml-2"><i class="fas fa-trash"></i></button>';
                }
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        "bDestroy": true,
        "iDisplayLength": 5,
        "order": [[0, "desc"]], 
        "searching": false 
    });
}

function CambiarPrioridad(IdTarea) {
    var url = "http://localhost:5281/api/TodoApp/CambiarPrioridad?id=" + (IdTarea);

    $.ajax({
        url: url,
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Prioridad modificada exitosamente",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("Actualización exitosa:", response);
            recargarTablaTareas();
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error.responseText || error.statusText || "Error desconocido"
            });
            console.error("Error al actualizar la tarea:", error);
        }
    });

}

function CompletarTarea(IdTarea) {
    var url = "http://localhost:5281/api/TodoApp/CompletarTarea?id=" + (IdTarea);

    $.ajax({
        url: url,
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usted ha marcado como completada exitosamente la tarea",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("Actualización exitosa:", response);
            recargarTablaTareas();
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                footer: error.responseText || error.statusText || "Error desconocido"
            });
            console.error("Error al actualizar la tarea:", error);
        }
    });

    recargarTablaTareas();
}


// Call the init function when the script loads
init();