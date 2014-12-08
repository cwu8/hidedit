/*
    This file is part of hidedit.
    (C) Copyright 2012 Ilan Tayari

    hidedit is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    hidedit is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with hidedit.  If not, see http://www.gnu.org/licenses/
*/

// Infrastructure:
function makeStruct(names) {
    names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}

function dec2hex(dec, padToLength) {
    var ret = dec.toString(16).toUpperCase();
    if (padToLength) {
        while (ret.length < padToLength)
            ret = "0" + ret;
    }
    return ret;
}

function hex2dec(hex) {
    return parseInt(hex, 16);
}

function parseEnum(value, type) {
    for (var candName in type) {
        var candObj = type[candName];
        if (typeof candObj.value === 'number') {
            if (candObj.value == value)
                return candObj;
        } else if (typeof candObj.value === 'object') {
            if ((value >= candObj.value[0]) && (value <= candObj.value[1]))
                return candObj;
        }
    }
    throw "Value " + value + " (0x" + dec2hex(value) + ") is not part of " + type.name;
}

function cleanHex(data) {
    var hex = "";
    for (var i = 0; i < data.length; i++) {
        var c = data.charAt(i);
        if ((c >= '0') && (c <= '9'))
            hex += c;
        else if (((c >= 'a') && (c <= 'f')) || ((c >= 'A') && (c <= 'F')))
            hex += c.toUpperCase();
    }
    return hex;
}

function hasClass(item, className) {
    var index = item.className.indexOf(" " + className + " ");
    return (index >= 0);
}

function addClass(item, className) {
    if (item.className.indexOf(className) >= 0)
        return;

    item.className += " " + className + " ";
}

function delClass(item, className) {
    var index = item.className.indexOf(" " + className + " ");
    if (index < 0)
        return;

    item.className = item.className.substr(0, index) + item.className.substr(index + className.length + 2, item.className.length - (index + className.length + 2));
}

function onDescriptorChanged() {
    var run = new HIDRun(descriptor);
    try {
        run.run();
    }
    catch (runException) {
        treeView.show(descriptor);
        treeView.setErrorItem(runException.item.elem);
        reportsView.showError(runException.error);
        return;
    }
    treeView.show(descriptor);
    reportsView.show(run.reports);
}

function writelog(str) {
    var log = document.getElementById('log');
    var text = document.createElement('TextNode');
    text.textContent = str;
    log.appendChild(text);
}

// Program's global state
var descriptor = null;

// UI components
var hidedit = document.getElementById('hidedit');
var toolbar = null;
var treeView = null;
var reportsView = null;

document.addEventListener('DOMContentLoaded', function() {
    var loading = document.getElementById('loadingText');
    loading.parentElement.removeChild(loading);

    // Init global state
    descriptor = new HIDDescriptor();

    // Init UI components
    toolbar = new Toolbar();
    treeView = new Tree();
    reportsView = new Reports();
});
