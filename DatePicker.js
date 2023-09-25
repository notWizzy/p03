class DatePicker {
    constructor(elementId, callback) {
        this.elementId = elementId;
        this.callback = callback;
        this.selectedDate = null;
        this.currentDate = new Date();
        this.render(this.currentDate);
    }

    render(selectedMonth) {
        const container = document.getElementById(this.elementId);

        if (!container) {
            console.error("Element with id", this.elementId, "not found.");
            return;
        }

        // Create a new date object for the selected month
        const currentDate = new Date(selectedMonth);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Create a table element for the calendar
        const table = document.createElement("table");
        table.classList.add("datepicker");

        // Create the header row for day abbreviations (Su, Mo, Tu, etc.)
        const headerRow = document.createElement("tr");
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (const dayName of dayNames) {
            const headerCell = document.createElement("th");
            headerCell.textContent = dayName;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Get the first day of the month and the last day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        // Initialize variables for date rendering
        let currentDateRender = new Date(firstDay);
        let currentWeek = document.createElement("tr");

        // Render the days of the month
        while (currentDateRender <= lastDay) {
            const day = currentDateRender.getDate();
            const dayOfWeek = currentDateRender.getDay();

            const dayCell = document.createElement("td");
            dayCell.textContent = day;

            if (currentDateRender.getMonth() !== currentMonth) {
                dayCell.classList.add("dimmed");
                dayCell.addEventListener("click", () => {
                    this.render(new Date(currentYear, currentMonth, day));
                });
            } else {
                dayCell.addEventListener("click", () => {
                    this.selectedDate = {
                        year: currentYear,
                        month: currentMonth + 1, // Months are 0-based
                        day,
                    };
                    this.callback(this.elementId, this.selectedDate);
                });
            }

            currentWeek.appendChild(dayCell);

            if (dayOfWeek === 6 || currentDateRender >= lastDay) {
                table.appendChild(currentWeek);
                currentWeek = document.createElement("tr");
            }

            currentDateRender.setDate(day + 1);
        }

        // Create the calendar header with navigation controls
        const header = document.createElement("div");
        header.classList.add("datepicker-header");

        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            this.render(currentDate);
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            this.render(currentDate);
        });

        const monthYearText = document.createElement("span");
        monthYearText.textContent =
            new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
            }).format(selectedMonth);

        header.appendChild(prevButton);
        header.appendChild(monthYearText);
        header.appendChild(nextButton);

        // Clear the container and append the new calendar
        container.innerHTML = "";
        container.appendChild(header);
        container.appendChild(table);
    }
}
