let currentDate;

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function renderCalendar() {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
    ];

    const calendarContainer = document.getElementById("calendar-container");

    const calendarHTML = `
        <div id="calendar-header">
            <button onclick="prevMonth()">&lt;</button>
            <h2>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>
            <button onclick="nextMonth()">&gt;</button>
        </div>
        <div id="calendar-days">
            <div class="day">Dom</div>
            <div class="day">Seg</div>
            <div class="day">Ter</div>
            <div class="day">Qua</div>
            <div class="day">Qui</div>
            <div class="day">Sex</div>
            <div class="day">Sáb</div>
            ${generateDaysHTML(daysInMonth, firstDayOfMonth, lastDayOfMonth)}
        </div>
        <div id="calendar-footer">
            <p>© ${currentDate.getFullYear()} LucasNFortes</p>
        </div>
    `;

    calendarContainer.innerHTML = calendarHTML;
}

function generateDaysHTML(daysInMonth, firstDayOfMonth, lastDayOfMonth) {
    let daysHTML = "";
    let dayCount = 1;

    const raceTimes = [
        "11:00", "13:00", "01:00", "01:00", "02:00", "15:30", "09:00", "09:00",  //Bahrein,Arábia Saudita,Austrália,Japão,China,Miami,Emília-Romanha,Mônaco
        "14:00", "09:00", "09:00", "10:00", "09:00", "09:00", "09:00", "09:00",  //Canadá,Espanha,Áustria,Grã-Bretanha,Hungria,Bélgica,Países Baixos,Itália
        "07:00", "08:00", "15:00", "16:00", "13:00", "02:00", "13:00", "09:00"  //Azerbaijão,Singapura,Estados Unidos,Cidade do México,São Paulo,Las Vegas,Catar,Abu Dhabi
    ];

    const classificationTimes = [
        "11:00", "13:00", "01:00", "02:00", "02:00", "16:00", "10:30", "10:00",  //Bahrein,Arábia Saudita,Austrália,Japão,China,Miami,Emília-Romanha,Mônaco
        "16:00", "10:00", "10:30", "10:00", "10:00", "11:00", "09:00", "10:00",  //Canadá,Espanha,Áustria,Grã-Bretanha,Hungria,Bélgica,Países Baixos,Itália
        "09:30", "09:00", "18:00", "17:00", "14:30", "04:00", "13:30", "10:00"  //Azerbaijão,Singapura,Estados Unidos,Cidade do México,São Paulo,Las Vegas,Catar,Abu Dhabi
    ];

    const grandPrixData = [
        { date: new Date(2024, 2, 2), grandPrix: "Bahrein" },
        { date: new Date(2024, 2, 9), grandPrix: "Arábia Saudita" },
        { date: new Date(2024, 2, 24), grandPrix: "Austrália" },
        { date: new Date(2024, 3, 7), grandPrix: "Japão" },
        { date: new Date(2024, 3, 21), grandPrix: "China" },
        { date: new Date(2024, 4, 5), grandPrix: "Miami" },
        { date: new Date(2024, 4, 19), grandPrix: "Emília-Romanha" },
        { date: new Date(2024, 4, 26), grandPrix: "Mônaco" },
        { date: new Date(2024, 5, 9), grandPrix: "Canadá" },
        { date: new Date(2024, 5, 23), grandPrix: "Espanha" },
        { date: new Date(2024, 5, 30), grandPrix: "Áustria" },
        { date: new Date(2024, 6, 7), grandPrix: "Grã-Bretanha" },
        { date: new Date(2024, 6, 21), grandPrix: "Hungria" },
        { date: new Date(2024, 6, 28), grandPrix: "Bélgica" },
        { date: new Date(2024, 7, 25), grandPrix: "Países Baixos" },
        { date: new Date(2024, 8, 1), grandPrix: "Itália" },
        { date: new Date(2024, 8, 15), grandPrix: "Azerbaijão" },
        { date: new Date(2024, 8, 22), grandPrix: "Singapura" },
        { date: new Date(2024, 9, 20), grandPrix: "Estados Unidos" },
        { date: new Date(2024, 9, 27), grandPrix: "Cidade do México" },
        { date: new Date(2024, 10, 3), grandPrix: "São Paulo" },
        { date: new Date(2024, 10, 23), grandPrix: "Las Vegas" },
        { date: new Date(2024, 11, 1), grandPrix: "Catar" },
        { date: new Date(2024, 11, 8), grandPrix: "Abu Dhabi" }
    ];

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || (dayCount > daysInMonth)) {
                daysHTML += `<div class="day"></div>`;
            } else {
                const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCount);
                const gpInfo = getGrandPrixInfo(currentDay);
                const flagURL = getFlagURL(gpInfo.grandPrix);
                const raceTime = grandPrixData.some(gp => gp.date.getTime() === currentDay.getTime())
                ? raceTimes[grandPrixData.findIndex(gp => gp.date.getTime() === currentDay.getTime())]
                : '';

                daysHTML += `
                    <div class="day" style="background: url(${flagURL})">
                        <span>${dayCount}</span>
                        <p class="country">${gpInfo.grandPrix}</p>
                        ${raceTime ? `<p class="hour">${raceTime}</p>` : ''}
                        </div>`;
                dayCount++;
            }
        }
    }

    return daysHTML;
}


function getGrandPrixInfo(date) {
    const grandPrixData = [
        { date: new Date(2024, 2, 2), grandPrix: "Bahrein" },
        { date: new Date(2024, 2, 9), grandPrix: "Arábia Saudita" },
        { date: new Date(2024, 2, 24), grandPrix: "Austrália" },
        { date: new Date(2024, 3, 7), grandPrix: "Japão" },
        { date: new Date(2024, 3, 21), grandPrix: "China" },
        { date: new Date(2024, 4, 5), grandPrix: "Miami" },
        { date: new Date(2024, 4, 19), grandPrix: "Emília-Romanha" },
        { date: new Date(2024, 4, 26), grandPrix: "Mônaco" },
        { date: new Date(2024, 5, 9), grandPrix: "Canadá" },
        { date: new Date(2024, 5, 23), grandPrix: "Espanha" },
        { date: new Date(2024, 5, 30), grandPrix: "Áustria" },
        { date: new Date(2024, 6, 7), grandPrix: "Grã-Bretanha" },
        { date: new Date(2024, 6, 21), grandPrix: "Hungria" },
        { date: new Date(2024, 6, 28), grandPrix: "Bélgica" },
        { date: new Date(2024, 7, 25), grandPrix: "Países Baixos" },
        { date: new Date(2024, 8, 1), grandPrix: "Itália" },
        { date: new Date(2024, 8, 15), grandPrix: "Azerbaijão" },
        { date: new Date(2024, 8, 22), grandPrix: "Singapura" },
        { date: new Date(2024, 9, 20), grandPrix: "Estados Unidos" },
        { date: new Date(2024, 9, 27), grandPrix: "Cidade do México" },
        { date: new Date(2024, 10, 3), grandPrix: "São Paulo" },
        { date: new Date(2024, 10, 23), grandPrix: "Las Vegas" },
        { date: new Date(2024, 11, 1), grandPrix: "Catar" },
        { date: new Date(2024, 11, 8), grandPrix: "Abu Dhabi" }
    ];

    const matchingGrandPrix = grandPrixData.find(gp => gp.date.getTime() === date.getTime()) || { grandPrix: "" };
    return matchingGrandPrix;
}

function getFlagURL(grandPrix) {
    const flagURLs = {
        "Bahrein": "https://flagicons.lipis.dev/flags/4x3/bh.svg",
        "Arábia Saudita": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "Austrália": "https://flagicons.lipis.dev/flags/4x3/au.svg",
        "Japão": "https://flagicons.lipis.dev/flags/4x3/jp.svg",
        "China": "https://flagicons.lipis.dev/flags/4x3/cn.svg",
        "Miami": "https://flagicons.lipis.dev/flags/4x3/us.svg",
        "Emília-Romanha": "https://flagicons.lipis.dev/flags/4x3/it.svg",
        "Mônaco": "https://flagicons.lipis.dev/flags/4x3/mc.svg",
        "Canadá": "https://flagicons.lipis.dev/flags/4x3/ca.svg",
        "Espanha": "https://flagicons.lipis.dev/flags/4x3/es.svg",
        "Áustria": "https://flagicons.lipis.dev/flags/4x3/at.svg",
        "Grã-Bretanha": "https://flagicons.lipis.dev/flags/4x3/gb.svg",
        "Hungria": "https://flagicons.lipis.dev/flags/4x3/hu.svg",
        "Bélgica": "https://flagicons.lipis.dev/flags/4x3/be.svg",
        "Países Baixos": "https://flagicons.lipis.dev/flags/4x3/nl.svg",
        "Itália": "https://flagicons.lipis.dev/flags/4x3/it.svg",
        "Azerbaijão": "https://flagicons.lipis.dev/flags/4x3/az.svg",
        "Singapura": "https://flagicons.lipis.dev/flags/4x3/sg.svg",
        "Estados Unidos": "https://flagicons.lipis.dev/flags/4x3/us.svg",
        "Cidade do México": "https://flagicons.lipis.dev/flags/4x3/mx.svg",
        "São Paulo": "https://flagicons.lipis.dev/flags/4x3/br.svg",
        "Las Vegas": "https://flagicons.lipis.dev/flags/4x3/us.svg",
        "Catar": "https://flagicons.lipis.dev/flags/4x3/qa.svg",
        "Abu Dhabi": "https://flagicons.lipis.dev/flags/4x3/ae.svg"
    };

    return flagURLs[grandPrix] || "../bg-t.png";
}

document.addEventListener("DOMContentLoaded", function () {
    currentDate = new Date();
    renderCalendar();
});
