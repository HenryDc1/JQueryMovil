/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
var tasks = [];

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    $("#addTaskBtn").on("click", addTask);
    $("#deleteTaskBtn").on("click", deleteTask);
    displayTasks();
}
function addTask() {
    const text = prompt("Añadir nombre de la tarea:");
    if (text !== null) {
        // Verificar si la tarea ya existe en el array antes de agregarla
        if (!tasks.includes(text)) {
            // Agregar la tarea al array y guardar en el LocalStorage
            tasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Mostrar las tareas actualizadas
            displayTasks();
        } else {
            alert("La tarea ya existe.");
        }
    }
}

function displayTasks() {
    // Limpiar la lista antes de mostrar las tareas
    $("#pageList").empty();

    // Iterar sobre las tareas y agregarlas a la lista
    tasks.forEach(function (text) {
        const newLiContent = `<li><a href="#${text}">${text}</a><button class="deleteTaskBtn">BORRAR</button></li>`;
        $("#pageList").append(newLiContent);

        // Asignar el evento al nuevo botón
        $(`#pageList li:contains(${text}) .deleteTaskBtn`).on("click", function () {
            deleteTask(this, text); // Pasar el botón actual y el nombre de la tarea como argumentos
        });

        const page = createPage(text);
        $("body").append(page);
    });

    // Refrescar el listview
    $("#pageList").listview("refresh");
    console.log('Contenido del array "tasks":', tasks);
}


function createPage(text) {
    const page = $("<div>", {
        "data-role": "page",
        id: text
    });

    const header = $("<div>", {
        "data-role": "header"
    }).append(
        $("<a>", {
            href: "#",
            "data-icon": "back",
            "data-rel": "back",
            title: "Go back",
            text: "Back"
        }),
        $("<h1>", { text: text }),
        $("<a>", {
            href: "#",
            "data-icon": "edit",
            title: "Edit",
            text: "Edit",
            click: function () {
                editPageName(text);
            }
        })
    );

    const content = $("<div>", {
        "class": "ui-content"
    }).append(
        $("<textarea>")
    );

    const footer = $("<div>", {
        "data-role": "footer",
        "data-position": "fixed"
    }).append(
        $("<h1>", { text: text })
    );

    page.append(header, content, footer);
    return page;
}

function editPageName(oldName) {
    const newName = prompt("Edita el nom de la pàgina:", oldName);
    if (newName !== null) {
        // Actualizar el nombre en el encabezado, pie de página y enlace
        $(`#${oldName} [data-role="header"] h1`).text(newName);
        $(`#${oldName} [data-role="footer"] h1`).text(newName);
        $(`#${oldName} [href="#${oldName}"]`).text(newName);

        // Actualizar el párrafo en el contenido de la página
        $(`#${oldName} .ui-content p`).text(`This is ${newName}`);

        // Actualizar el nombre en el listview
        const listItem = $(`#pageList li:contains(${oldName})`);
        listItem.find("a").text(newName);

        // Refrescar el listview
        $("#pageList").listview("refresh");
    }
}

function deleteTask(button, taskName) {
    // Obtener el índice de la tarea a eliminar
    const index = tasks.indexOf(taskName);

    if (index !== -1) {
        // Eliminar la tarea del array
        tasks.splice(index, 1);

        // Guardar en el LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Resto del código para eliminar el elemento con el nombre taskName
        $(`#pageList li:contains(${taskName})`).remove();
        $("#pageList").listview("refresh");

        // Mostrar el contenido actualizado del array en la consola
        console.log('Contenido del array "tasks" después de eliminar:', tasks);
    } else {
        alert("La tarea no se encuentra en la lista.");
    }
}
