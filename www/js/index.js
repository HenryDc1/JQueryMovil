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

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#addTaskBtn").on("click", function () {
        const text = prompt("Afegir text a la tasca :")
        const newLiContent = `<li><a href="#${text}">${text}</a></li>`;
        $("#pageList").append(newLiContent);
        $("#pageList").listview("refresh");

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
            $("<h1>", { text: text })
        );

        const content = $("<div>", {
            "class": "ui-content"
        }).append(
            $("<p>", { text: `This is ${text}` })
        );

        const footer = $("<div>", {
            "data-role": "footer",
            "data-position": "fixed"
        }).append(
            $("<h1>", { text: text })
        );

        page.append(header, content, footer);
        $("body").append(page);

    });
}


