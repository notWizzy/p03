'use strict';

class TableTemplate {
    // FILL IN METHOD
    static fillIn(id, dictionary, columnName) {
        // GET TABLE BASED ON ITS ELEMENT ID
        const table = document.getElementById(id);
        if (columnName === undefined) {
            // USING THE TEMPLATE PROCESSOR FROM PREVIOUS PROJECT
            const templateProcessor = new TemplateProcessor(table.innerHTML);
            table.innerHTML = templateProcessor.fillIn(dictionary);
        }
        else {
            const headerRow = table.rows[0];
            let templateProcessor = new TemplateProcessor(headerRow.innerHTML);
            headerRow.innerHTML = templateProcessor.fillIn(dictionary);
            let processingIndex = null;
            for (let index = 0; index < headerRow.cells.length; index++) {
                if (headerRow.cells[index].innerHTML === columnName) {
                    processingIndex = index;
                    break;
                }
            }
            if (processingIndex !== null) {
                for (let i = 1; i < table.rows.length; i++) {
                    const row = table.rows[i];
                    for (let j = 0; j < row.cells.length; j++) {
                        if (j === processingIndex) {
                            const cell = row.cells[j];
                            templateProcessor = new TemplateProcessor(cell.innerHTML);
                            cell.innerHTML = templateProcessor.fillIn(dictionary);
                        }
                    }
                }
            }
        }
        // MAKE TABLE VISIBLE
        table.style.visibility = "visible";
    }
}