"use strict";

class TableTemplate {
    static fillIn(tableId, dictionary, columnName) {
        // ACCESS TABLE ELEMENT USING THE TABLE ID
        const table = document.getElementById(tableId);

        // REPLACE TEMPLATE STRINGS IN THE TABLE HEADER ROW
        const headerRow = table.rows[0];
        this.replaceTemplateStrings(headerRow, dictionary);

        // SPECIFIC COLUMN BASED ON SPECIFIED columnName
        if (columnName) {
            const columnIndex = this.getColumnIndex(headerRow, columnName);

            if (columnIndex !== -1) {
                for (let i = 1; i < table.rows.length; i++) {
                    const cell = table.rows[i].cells[columnIndex];
                    this.replaceTemplateStrings(cell, dictionary);
                }
            }
        }
        else {
            // PROCESSES THE TABLE ROWS AND COLUMNS WITHOUT SPECIFIC columnName
            for (let i = 1; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    this.replaceTemplateStrings(table.rows[i].cells[j], dictionary);
                }
            }
        }

        // MAKES THE TABLE VISIBLE
        table.style.visibility = "visible";
    }

    static replaceTemplateStrings(element, dictionary) {
        const regex = /{{(.*?)}}/g;
        const matches = element.innerHTML.match(regex);

        if (matches) {
            for (const match of matches) {
                const property = match.slice(2, -2);
                if (dictionary.hasOwnProperty(property)) {
                    element.innerHTML = element.innerHTML.replace(match, dictionary[property]);
                } else {
                    element.innerHTML = element.innerHTML.replace(match, "");
                }
            }
        }
    }

    static getColumnIndex(headerRow, columnName) {
        for (let i = 0; i < headerRow.cells.length; i++) {
            if (headerRow.cells[i].textContent.trim() === columnName) {
                return i;
            }
        }
        return -1;
    }
}