const jobCardsContainer = document.querySelector('#job-cards-container');
const noJobCard = document.querySelector('.no-job-card');
const interviewContainer = document.querySelector('#interview-cards-container');
const sectionAll = document.querySelector("#selection-all");
const interviewSection = document.querySelector("#selection-interviews");
const rejectedSection = document.querySelector("#selection-rejected");
const rejectedContainer = document.querySelector('#rejected-cards-container');
const sectionJobNumber = document.querySelector('#section-job-number');
const totalNumber = document.querySelector('#total-job-number');
const totalJobNumber = document.querySelector("#total-jobs");
const interviewNumber = document.querySelector('#interview-job-number');
const rejectedNumber = document.querySelector('#rejected-job-number');
let objIdCounter = 0;
let cardIdCounter = 0;
totalNumber.innerText = `${totalJobs.length}`;
totalJobNumber.innerText = `${totalJobs.length}`;
const interviewJobs = [];
const rejectedJobs = [];

function addJob(job) {
    return `<div class="job-cards p-6 bg-white shadow rounded-lg flex flex-col gap-5">
                    <div class="flex justify-between items-center">
                        <div><h2 class="text-lg font-bold text-[#002C5C] capitalize">${job.companyName}</h2>
                        <p class="text-[15px] text-gray-500 capitalize">${job.skillNeed}</p></div>
                        <div class="delete cursor-pointer btn btn-circle">
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                    </div>
                    <div>
                        <p class="text-[14px] text-gray-500">${job.addressAndTime}</p>
                    </div>
                    <div class="space-y-2">
                        <div class="status-badge bg-[#EEF4FF] text-[#002C5C] rounded-md px-3 py-2 w-fit font-medium">NOT APPLIED
                        </div>
                        <p class="text-[14px] text-[#323B49]">${job.details}</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-outline btn-success border-2">INTERVIEW</button>
                        <button class="btn btn-outline btn-error border-2">REJECTED</button>
                    </div>
                </div>`;
}

for (let i = 1; i <= totalJobs.length; i++) {
    jobCardsContainer.insertAdjacentHTML('beforeend', addJob(totalJobs[i - 1]));
}
totalJobs.forEach((job) => {
    job.id = ++objIdCounter;
});
document.querySelectorAll('.job-cards').forEach((card) => {
    card.dataset.id = ++cardIdCounter;
});

document.querySelectorAll(".add-new").forEach((input) => {
    input.addEventListener("input", () => {
        let empty = false;
        document.querySelectorAll(".add-new").forEach((input) => {
            if (input.value.trim() === "") {
                empty = true;
            }
        });

        if (empty) {
            document.querySelector(".add-new-btn-div").classList.add("cursor-not-allowed");
            document.querySelector("#add-new-btn").classList.add("pointer-events-none");
        }
        else {
            document.querySelector(".add-new-btn-div").classList.remove("cursor-not-allowed");
            document.querySelector("#add-new-btn").classList.remove("pointer-events-none")
        }
    })
});

document.querySelector("#add-new-btn").addEventListener("click", () => {
    const inputValue = document.querySelectorAll(".add-new");
    const newJob = {
        companyName: inputValue[0].value.trim(),
        skillNeed: inputValue[1].value.trim(),
        addressAndTime: inputValue[2].value.trim(),
        details: inputValue[3].value.trim(),
        id: ++objIdCounter
    };
    totalJobs.push(newJob);
    
    jobCardsContainer.insertAdjacentHTML("afterbegin", addJob(newJob));
    jobCardsContainer.firstElementChild.dataset.id = ++cardIdCounter;

    totalNumber.innerText = `${totalJobs.length}`;
    if (sectionAll.classList.contains("btn-info")) {
        sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
    }
    else if (interviewSection.classList.contains("btn-info")) {
        sectionJobNumber.innerHTML = `${interviewJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
    }
    else {
        sectionJobNumber.innerHTML = `${rejectedJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
    }
});

document.addEventListener("click", (e) => {
    const card = e.target.closest(".job-cards");
    if (!card) return;

    // INTERVIEW CARD CLICK
    if (e.target.closest('.btn-success')) {
        if (!card.classList.contains("already-in-interview") && !card.classList.contains("already-in-rejection")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge", "badge-success");
            badge.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]", "rounded-md", "px-3", "py-2", "w-fit", "font-medium");
            badge.innerText = "APPLIED";
            card.classList.add('already-in-interview');
            const cloneCard = card.cloneNode(true);
            interviewContainer.appendChild(cloneCard);
            interviewJobs.push(1);
            interviewNumber.innerText = `${interviewJobs.length}`;
        }
        else if (card.classList.contains("already-in-rejection")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.remove("badge-error");
            badge.classList.add("badge-success");
            badge.innerText = "APPLIED";
            card.classList.add('already-in-interview');
            card.classList.remove('already-in-rejection');
            const cloneCard = card.cloneNode(true);
            interviewContainer.appendChild(cloneCard);
            interviewJobs.push(1);
            const cardId = card.dataset.id;
            const rejectCard = rejectedContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            const orjCard = jobCardsContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            orjCard.querySelector(".status-badge").classList.remove("badge-error");
            orjCard.querySelector(".status-badge").classList.add("badge-success");
            orjCard.querySelector(".status-badge").innerText = "APPLIED";
            if (rejectCard) rejectCard.remove();
            rejectedJobs.pop();
            interviewNumber.innerText = `${interviewJobs.length}`;
            rejectedNumber.innerText = `${rejectedJobs.length}`;
            if (rejectedJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                rejectedContainer.classList.add("hidden");
            }
            else {
                noJobCard.classList.add("hidden");
            }
            if(rejectedSection.classList.contains("btn-info")) {
                sectionJobNumber.innerHTML = `${rejectedJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
            }
        }
    }

    // REJECTED CARD CLICK
    else if (e.target.closest('.btn-error')) {
        if (!card.classList.contains("already-in-rejection") && !card.classList.contains("already-in-interview")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge", "badge-error");
            badge.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]", "rounded-md", "px-3", "py-2", "w-fit", "font-medium");
            badge.innerText = "REJECTED";
            card.classList.add('already-in-rejection');
            const cloneCard = card.cloneNode(true);
            rejectedContainer.appendChild(cloneCard);
            rejectedJobs.push(1);
            rejectedNumber.innerText = `${rejectedJobs.length}`;
        }
        else if (card.classList.contains("already-in-interview")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge-error");
            badge.classList.remove("badge-success");
            badge.innerText = "REJECTED";
            card.classList.remove('already-in-interview');
            card.classList.add('already-in-rejection');
            const cloneCard = card.cloneNode(true);
            rejectedContainer.appendChild(cloneCard);
            rejectedJobs.push(1);
            const cardId = card.dataset.id;
            const interviewCard = interviewContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            const orjCard = jobCardsContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            orjCard.querySelector(".status-badge").classList.add("badge-error");
            orjCard.querySelector(".status-badge").classList.remove("badge-success");
            orjCard.querySelector(".status-badge").innerText = "REJECTED";
            if (interviewCard) interviewCard.remove();
            interviewJobs.pop();
            interviewNumber.innerText = `${interviewJobs.length}`;
            rejectedNumber.innerText = `${rejectedJobs.length}`;
            if (interviewJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                interviewContainer.classList.add("hidden");
            }
            else {
                noJobCard.classList.add("hidden");
            }
            if (interviewSection.classList.contains("btn-info")) {
                sectionJobNumber.innerHTML = `${interviewJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
            }
        }
    }

    else if (e.target.closest('.delete')) {
        let activeBtn = '';
        document.querySelector("#selection-button").querySelectorAll("button").forEach((btn) => {
            if (btn.classList.contains("btn-info")) {
                activeBtn = btn.id;
            }
        })
        const cardId = card.dataset.id;
        const interviewCard = interviewContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
        const rejectedCard = rejectedContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
        const jobCard = jobCardsContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
        if (interviewCard && activeBtn === "selection-interviews") {
            interviewCard.remove();
            interviewJobs.pop();
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if (orjObjId !== -1) {
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            interviewNumber.innerText = `${interviewJobs.length}`;
            sectionJobNumber.innerHTML = `${interviewJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
            if (interviewJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                interviewContainer.classList.add("hidden");
            }
            else {
                noJobCard.classList.add("hidden");
            }
        }
        else if (interviewCard && activeBtn !== "selection-interviews") {
            interviewCard.remove();
            interviewJobs.pop();
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if (orjObjId !== -1) {
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            interviewNumber.innerText = `${interviewJobs.length}`;
            sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else if (rejectedCard && activeBtn === "selection-rejected") {
            rejectedCard.remove();
            rejectedJobs.pop();
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if (orjObjId !== -1) {
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            rejectedNumber.innerText = `${rejectedJobs.length}`;
            sectionJobNumber.innerHTML = `${rejectedJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
            if (rejectedJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                rejectedContainer.classList.add("hidden");
            }
            else {
                noJobCard.classList.add("hidden");
            }
        }
        else if (rejectedCard && activeBtn !== "selection-rejected") {
            rejectedCard.remove();
            rejectedJobs.pop();
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if (orjObjId !== -1) {
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            rejectedNumber.innerText = `${rejectedJobs.length}`;
            sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else {
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if (orjObjId !== -1) {
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
            if (totalJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                jobCardsContainer.classList.add("hidden");
            }
            else {
                noJobCard.classList.add("hidden");
            }
        }
    }
});

document.querySelectorAll('#selection-button button').forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('btn-info')) {
            document.querySelectorAll('#selection-button button').forEach(button => {
                button.classList.remove('btn-info', 'text-white');
                button.classList.add('border', 'border-transparent', 'bg-white', 'hover:border', 'hover:border-blue-300');
            });
            button.classList.add('btn-info', 'text-white');
            button.classList.remove('border', 'border-transparent', 'bg-white', 'hover:border', 'hover:border-blue-300');
        }
        if (button.id === 'selection-all') {
            if (totalJobs.length === 0) {
                noJobCard.classList.remove("hidden");
                jobCardsContainer.classList.add("hidden");
            }
            else {
                jobCardsContainer.classList.remove('hidden');
                jobCardsContainer.classList.add("flex");
                noJobCard.classList.add('hidden');
            }
            interviewContainer.classList.add('hidden');
            interviewContainer.classList.remove('flex');
            rejectedContainer.classList.add('hidden');
            rejectedContainer.classList.remove('flex');
        }
        else if ((button.id === 'selection-interviews' && interviewJobs.length === 0) || (button.id === 'selection-rejected' && rejectedJobs.length === 0)) {
            jobCardsContainer.classList.add('hidden');
            noJobCard.classList.remove('hidden');
            interviewContainer.classList.add('hidden');
            rejectedContainer.classList.add('hidden');
            interviewContainer.classList.remove('flex');
            rejectedContainer.classList.remove('flex');
        }
        else if (button.id === 'selection-interviews' && interviewJobs.length !== 0) {
            noJobCard.classList.add('hidden');
            jobCardsContainer.classList.add('hidden');
            rejectedContainer.classList.add('hidden');
            rejectedContainer.classList.remove('flex');
            interviewContainer.classList.remove('hidden');
            interviewContainer.classList.add('flex');
        }
        else if (button.id === 'selection-rejected' && rejectedJobs.length !== 0) {
            noJobCard.classList.add('hidden');
            jobCardsContainer.classList.add('hidden');
            rejectedContainer.classList.remove('hidden');
            interviewContainer.classList.add('hidden');
            rejectedContainer.classList.add('flex');
            interviewContainer.classList.remove('flex');
        }
        if (button.classList.contains('btn-info') && button.id === "selection-interviews") {
            sectionJobNumber.innerHTML = `${interviewJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else if (button.classList.contains('btn-info') && button.id === "selection-all") {
            sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else {
            sectionJobNumber.innerHTML = `${rejectedJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
        }

    });
});