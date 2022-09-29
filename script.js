document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('info-table');
    const headers = table.querySelectorAll('th');
    const tableBody = table.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');

    // Направление сортировки
    const directions = Array.from(headers).map(function(header) {
        return '';
    });

    // Преобразовать содержимое данной ячейки в заданном столбце
    const transform = function(index, content) {
        // Получить тип данных столбца
        const type = headers[index].getAttribute('data-type');
        switch (type) {
            case 'number':
                return parseFloat(content);
            case 'string':
            default:
                return content;
        }
    };

    const sortColumn = function(index) {
        // Получить текущее направление
        const direction = directions[index] || 'asc';

        // Фактор по направлению
        const multiplier = (direction === 'asc') ? 1 : -1;

        const newRows = Array.from(rows);

        newRows.sort(function(rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;

            const a = transform(index, cellA);
            const b = transform(index, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiplier;
                case a < b:
                    return -1 * multiplier;
                case a === b:
                    return 0;
            }
        });

        // Удалить старые строки
        [].forEach.call(rows, function(row) {
            tableBody.removeChild(row);
        });

        // Поменять направление
        directions[index] = direction === 'asc' ? 'desc' : 'asc';

        // Добавить новую строку
        newRows.forEach(function(newRow) {
            tableBody.appendChild(newRow);
        });
    };

    [].forEach.call(headers, function(header, index) {
        header.addEventListener('click', function() {
            sortColumn(index);
        });
    });
});

/*Выпадающий список*/
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
/*Поиск по таблице*/
function tableSearch() {
    var phrase = document.getElementById('search-text');
    var table = document.getElementById('info-table');
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }

    }
}