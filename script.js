const totalJobs = [1, 1, 1, 1, 1, 1, 1, 1];
const interviewJobs = [];
const rejectedJobs = [];
const jobCards = `<div class="job-cards p-6 bg-white shadow rounded-lg flex flex-col gap-5">
                    <div class="flex justify-between items-center">
                        <div><h2 class="text-lg font-bold text-[#002C5C]">Mobile First Corp</h2>
                        <p class="text-[15px] text-gray-500">React Native Developer</p></div>
                        <div class="cursor-pointer">
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                    </div>
                    <div>
                        <p class="text-[14px] text-gray-500">Remote • Full-time • $130,000 - $175,000</p>
                    </div>
                    <div class="space-y-2">
                        <div class="status-badge bg-[#EEF4FF] text-[#002C5C] rounded-md px-3 py-2 w-fit font-medium">NOT APPLIED
                        </div>
                        <p class="text-[14px] text-[#323B49]">Build cross-platform mobile applications using React
                            Native. Work on products used by millions of users worldwide.</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-outline btn-success border-2">INTERVIEW</button>
                        <button class="btn btn-outline btn-error border-2">REJECTED</button>
                    </div>
                </div>`;

const jobCardsContainer = document.querySelector('#job-cards-container');
const interviewContainer = document.querySelector('#interview-cards-container');
const rejectedContainer = document.querySelector('#rejected-cards-container');
const totalNumber = document.querySelector('#total-job-number');
const totalJobNumber = document.querySelector("#total-jobs");
const interviewNumber = document.querySelector('#interview-job-number');
const rejectedNumber = document.querySelector('#rejected-job-number');
let idCounter = 0;
totalNumber.innerText = `${totalJobs.length}`;
totalJobNumber.innerText = `${totalJobs.length}`;

for (let i = 1; i <= totalJobs.length; i++) {
    jobCardsContainer.insertAdjacentHTML('afterbegin', jobCards);
    document.querySelectorAll('.job-cards').forEach((card) =>{
        card.dataset.id = ++idCounter;
    });
}

document.querySelectorAll('.job-cards').forEach(card => {
    card.querySelector('.btn-success').addEventListener('click', () => {
        if (!card.classList.contains("already-in-interview") && !card.classList.contains("already-in-rejection")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge", "badge-success");
            badge.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]", "rounded-md", "px-3", "py-2", "w-fit", "font-medium");
            badge.innerText = "APPLIED";
            const cloneCard = card.cloneNode(true);
            interviewContainer.appendChild(cloneCard);
            interviewJobs.push(1);
            interviewNumber.innerText = `${interviewJobs.length}`
            card.classList.add('already-in-interview');
        }
        else if(card.classList.contains("already-in-rejection")){
            const badge = card.querySelector(".status-badge");
            badge.classList.remove("badge-error");
            badge.classList.add("badge-success");
            badge.innerText = "APPLIED";
            const cloneCard = card.cloneNode(true);
            interviewContainer.appendChild(cloneCard);
            interviewJobs.push(1);
            const cardId = card.dataset.id;
            const rejectCard = rejectedContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            if(rejectCard) rejectCard.remove();
            rejectedJobs.pop();
            interviewNumber.innerText = `${interviewJobs.length}`
            rejectedNumber.innerText = `${rejectedJobs.length}`
            card.classList.add('already-in-interview');
            card.classList.remove('already-in-rejection')
        }
    });

    card.querySelector('.btn-error').addEventListener('click', () => {
        if (!card.classList.contains("already-in-rejection")  && !card.classList.contains("already-in-interview")) {
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge", "badge-error");
            badge.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]", "rounded-md", "px-3", "py-2", "w-fit", "font-medium");
            badge.innerText = "REJECTED";
            const cloneCard = card.cloneNode(true);
            rejectedContainer.appendChild(cloneCard);
            rejectedJobs.push(1);
            rejectedNumber.innerText = `${rejectedJobs.length}`
            card.classList.add('already-in-rejection');
        }
        else if(card.classList.contains("already-in-interview")){
            const badge = card.querySelector(".status-badge");
            badge.classList.add("badge-error");
            badge.classList.remove("badge-success");
            badge.innerText = "REJECTED";
            const cloneCard = card.cloneNode(true);
            rejectedContainer.appendChild(cloneCard);
            rejectedJobs.push(1);
            const cardId = card.dataset.id;
            const interviewCard = interviewContainer.querySelector(`.job-cards[data-id="${cardId}"]`);
            if(interviewCard) interviewCard.remove();
            interviewJobs.pop();
            interviewNumber.innerText = `${interviewJobs.length}`
            rejectedNumber.innerText = `${rejectedJobs.length}`
            card.classList.remove('already-in-interview');
            card.classList.add('already-in-rejection')
        }
    });
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
            jobCardsContainer.classList.remove('hidden');
            document.querySelector('.no-job-card').classList.add('hidden');
            interviewContainer.classList.add('hidden');
            interviewContainer.classList.remove('flex');
            rejectedContainer.classList.add('hidden');
            rejectedContainer.classList.remove('flex');
        }
        else if ((button.id === 'selection-interviews' && interviewJobs.length === 0) || (button.id === 'selection-rejected' && rejectedJobs.length === 0)) {
            jobCardsContainer.classList.add('hidden');
            document.querySelector('.no-job-card').classList.remove('hidden');
            interviewContainer.classList.add('hidden');
            rejectedContainer.classList.add('hidden');
            interviewContainer.classList.remove('flex');
            rejectedContainer.classList.remove('flex');
        }
        else if (button.id === 'selection-interviews' && interviewJobs.length !== 0) {
            document.querySelector('.no-job-card').classList.add('hidden');
            jobCardsContainer.classList.add('hidden');
            rejectedContainer.classList.add('hidden');
            rejectedContainer.classList.remove('flex');
            interviewContainer.classList.remove('hidden');
            interviewContainer.classList.add('flex');
        }
        else if (button.id === 'selection-rejected' && rejectedJobs.length !== 0) {
            document.querySelector('.no-job-card').classList.add('hidden');
            jobCardsContainer.classList.add('hidden');
            rejectedContainer.classList.remove('hidden');
            interviewContainer.classList.add('hidden');
            rejectedContainer.classList.add('flex');
            interviewContainer.classList.remove('flex');
        }
        if (button.classList.contains('btn-info') && button.id === "selection-interviews") {
            document.getElementById("section-job-number").innerHTML = `${interviewJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else if(button.classList.contains('btn-info') && button.id === "selection-all"){
            document.getElementById("section-job-number").innerHTML = `<span id="total-jobs">${totalJobs.length}</span> jobs`;
        }
        else{
            document.getElementById("section-job-number").innerHTML = `${rejectedJobs.length} of <span id="total-jobs">${totalJobs.length}</span> jobs`;
        }

    });
});