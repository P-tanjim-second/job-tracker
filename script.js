const totalJobs = [{
    companyName: "Mobile First Corp",
    skillNeed: "React Native Developer",
    addressAndTime: "Remote • Full-time • $130,000 - $175,000",
    details: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide."
}, {
    companyName: "WebFlow Agency",
    skillNeed: "Web Designer & Developer",
    addressAndTime: "Los Angeles, CA • Part-time • $80,000 - $120,000",
    details: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends."
}, {
    companyName: "DataViz Solutions",
    skillNeed: "Data Visualization Specialist",
    addressAndTime: "Boston, MA • Full-time • $125,000 - $165,000",
    details: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking."
}, {
    companyName: "CloudFirst Inc",
    skillNeed: "Backend Developer",
    addressAndTime: "Seattle, WA • Full-time • $140,000 - $190,000",
    details: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure."
}, {
    companyName: "Innovation Labs",
    skillNeed: "UI/UX Engineer",
    addressAndTime: "Austin, TX • Full-time • $110,000 - $150,000",
    details: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required."
}, {
    companyName: "MegaCorp Solutions",
    skillNeed: "JavaScript Developer",
    addressAndTime: "New York, NY • Full-time • $130,000 - $170,00",
    details: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities."
}, {
    companyName: "StartupXYZ",
    skillNeed: "Full Stack Engineer",
    addressAndTime: "Remote • Full-time • $120,000 - $160,000",
    details: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included."
}, {
    companyName: "TechCorp Industries",
    skillNeed: "Senior Frontend Developer",
    addressAndTime: "San Francisco, CA • Full-time • $130,000 - $175,000",
    details: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects."
}];
const interviewJobs = [];
const rejectedJobs = []; 

function addJob(job) {
    return `<div class="job-cards p-6 bg-white shadow rounded-lg flex flex-col gap-5">
                    <div class="flex justify-between items-center">
                        <div><h2 class="text-lg font-bold text-[#002C5C]">${job.companyName}</h2>
                        <p class="text-[15px] text-gray-500">${job.skillNeed}</p></div>
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

const jobCardsContainer = document.querySelector('#job-cards-container');
const noJobCard = document.querySelector('.no-job-card');
const interviewContainer = document.querySelector('#interview-cards-container');
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

for (let i = 1; i <= totalJobs.length; i++) {
    jobCardsContainer.insertAdjacentHTML('beforeend', addJob(totalJobs[i-1]));
}
totalJobs.forEach((job) => {
    job.id = ++objIdCounter;
});
document.querySelectorAll('.job-cards').forEach((card) => {
    card.dataset.id = ++cardIdCounter;
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
            if(orjObjId !== -1){
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
            if(orjObjId !== -1){
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
            if(orjObjId !== -1){
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
            if(orjObjId !== -1){
                totalJobs.splice(orjObjId, 1);
            }
            totalNumber.innerText = `${totalJobs.length}`;
            rejectedNumber.innerText = `${rejectedJobs.length}`;
            sectionJobNumber.innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else {
            jobCard.remove();
            const orjObjId = totalJobs.findIndex(object => object.id == cardId);
            if(orjObjId !== -1){
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