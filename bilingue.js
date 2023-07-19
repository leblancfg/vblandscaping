function loadContent() {
  return fetch('content.json')
    .then(response => response.json());
}

function createBulletList(items) {
  const listElement = document.createElement('ul');

  for (const item of items) {
    const listItemElement = document.createElement('li');
    listItemElement.textContent = item;
    listElement.appendChild(listItemElement);
  }

  return listElement;
}

function updateContent(content) {
  const language = document.documentElement.lang;

  for (const sectionKey in content) {
    const sectionContent = content[sectionKey][language];
    const sectionElement = document.getElementById(sectionKey);

    if (sectionElement) {
      for (const subSectionKey in sectionContent) {
        const elementId = `${sectionKey}-${subSectionKey}`;
        const element = document.getElementById(elementId);
        const contentValue = sectionContent[subSectionKey];

        if (element) {
          // Check if the content value is a list
          if (Array.isArray(contentValue)) {
            // Create a bulleted list element
            const listElement = createBulletList(contentValue);

            // Replace the existing element with the bulleted list
            element.innerHTML = '';
            element.appendChild(listElement);
          } else {
            // If the content value is not a list, set the text content as before
            element.textContent = contentValue;
          }
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadContent().then(content => {
    console.log('Content:', content);
    updateContent(content);
  });
});

function toggleLanguage(language) {
  document.documentElement.lang = language;
  loadContent().then(content => {
    console.log("Toggle language to:", language);
    updateContent(content);
  });
}

