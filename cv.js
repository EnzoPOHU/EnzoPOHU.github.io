let imgs = document.getElementsByTagName("img");
for (var i=0; i < imgs.length; ++i) imgs[i].draggable = false;

let request = new XMLHttpRequest();
request.open("GET", "cv.json"); 
request.responseType = "text";
request.send();
request.onload = function () {
  let content = JSON.parse(request.response);

  let topbarContent = document.getElementById("topbar-content");
  topbarContent.innerHTML = `<h1>${content["job"]}</h1>`;


  let contact = document.getElementById("info");
  contact.innerHTML += `
    <h2>${content["name"]}, ${content["age"]}</h2>
    <p>
      ${content["phone"]}<br />
      ${content["email"]}<br />
      ${content["place"]}<br />
      ${content["driving-license"]}
    </p>
    `;
  contact.innerHTML += "<div id='socials'></div>";  

  let socials = document.getElementById("socials");
  content["socials"].forEach(function(social) {
    socials.innerHTML += `
    <a class="text-decoration-none" target="_blank"
      rel="noopener noreferrer" href="${social["link"]}">
      <i class="devicon-${social["icon"]}-plain"></i>
    </a>
  `});
  
  let hardskills = document.getElementsByClassName("hard-skills")[0];
  content["hardskills"].forEach(function(hardskill) {
    hardskills.innerHTML += `
      <div class="hard-skills-items">
        <i class="devicon-${hardskill["icon"]}"></i>${hardskill["name"]}
      </div>
    `;
  });
  
  let nextHardskills = document.getElementsByClassName("hard-skills")[1];
  content["nextHardskills"].forEach(function(hardskill) {
    nextHardskills.innerHTML += `
      <div class="hard-skills-items">
        <i class="devicon-${hardskill["icon"]}"></i>${hardskill["name"]}
      </div>
    `;
  });

  let langs = document.getElementById("langs");
  content["langs"].forEach(function(lang) {
    langs.innerHTML += `<p>${lang}</p>`; });

  let softskills = document.getElementById("soft-skills");
  content["softskills"].forEach(function(softskill) {
    softskills.innerHTML += `<p>${softskill}</p>`;
  });

  let educations = document.getElementById("educations");
  educations.innerHTML += `<p id="situation">${content["situation"]}</p>`;
  content["education"].forEach(function(education) {
      educations.innerHTML += `
        <div class="place">
          <a target="_blank" rel="noopener noreferrer" href="${education["link"]}">
            <img src="img/${education["img"]}" alt="Logo ${education["name"]}">
          </a>
          <p>
            <i>${education["timeRange"]}</i><br />
            <b>${education["title"]}</b><br />
            ${education["name"]}, ${education["place"]}
          </p>
        </div>
        <ul class="education-skills"></ul>
      `;    
      if (education["skills"] !== undefined) {
        let skillsLists = document.getElementsByClassName("education-skills");
        let latestList = skillsLists[skillsLists.length - 1];
        education["skills"].forEach(function(skill){
          latestList.innerHTML += `<li>${skill}</li>`
        });
      }
  });

  let interests = document.getElementById("interests");
  content["interests"].forEach(function(interest) {
    interests.innerHTML += `<br/><b>${interest.title}</b><br/>`;
    interest.items.forEach(function(item) {
      interests.innerHTML += `<p>${item}</p>`;
    });
  });

  document.getElementById("pitch").innerHTML = content["pitch"];
  
  let jobs = document.getElementById("jobs");
  content["jobs"].forEach(function(job) {
    jobs.innerHTML += `
      <div class="place">
        <a title="Site ${job["corpName"]}" target="_blank" 
          rel="noopener noreferrer" href="${job["corpLink"]}">
          <img src="img/${job["corpLogo"]}" alt="Logo ${job["corpName"]}">
        </a>
        <p>
          <i>${job["dateRange"]}</i><br />
          <b>${job["name"]}</b><br />
          ${job["corpName"]}, ${job["corpPlace"]}
        </p>
      </div>
      <ul class="jobs-skills"></ul>
    `;
    if (job["skills"] !== undefined) {
      let skillsLists = document.getElementsByClassName("jobs-skills");
      let latestList = skillsLists[skillsLists.length - 1];
      job["skills"].forEach(function(skill){
        latestList.innerHTML += `<li>${skill}</li>`
      });
    }
  });
  
  let projects = document.getElementById("projects");
  content["projects"].forEach(function(project) {
    projects.innerHTML += `
      <div class="project-card">
        <a title="Dépôt Github ${project["name"]}" target="_blank"
        rel="noopener noreferrer" class="text-decoration-none"
        href="${project["link"]}">
          <h2>${project["name"]}</h2>
          <div>
            <div class="project-card-time-people">
              <span class="material-symbols-outlined">event</span>
              <p>${project["dateRange"]}</p>
            </div>
            <div class="project-card-time-people">
              <span class="material-symbols-outlined">hourglass_empty</span>
              <p>${project["duration"]}</p>
            </div>
            <div class="project-card-time-people">
              <span class="material-symbols-outlined">group</span>
              <p>${project["collaborators"]}</p>
            </div>
          </div>
          <p>${project["desc"]}</p>
        </a>
      </div>
    `;
  });  
  projects.innerHTML += `
    <p id="more-on-gh">
      Plus de projets disponibles sur mon 
      <a title="Profil Github" target="_blank" rel="noopener noreferrer"
        href="https://github.com/EnzoPOHU">
        <b>Github</b>
      </a>
    </p>
  `;
}
