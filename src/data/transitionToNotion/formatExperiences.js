const experiences = require('../experience').experiences;

experiences.forEach((experience) => {
  console.log(`\nCompany: ${experience.company}`);
  console.log(`Location: ${experience.location}`);
  console.log(`URL: ${Array.isArray(experience.url) ? experience.url.join(', ') : experience.url}`);
  console.log(`LinkedIn: ${experience.linkedin}`);
  console.log(`Header Image: ${experience.headerImage}`);
  console.log(`Logo: ${experience.logo}`);
  console.log('Additional Information:');
  console.log(experience.additionalInformation.trim());

  experience.positions.forEach((position, index) => {
    console.log(`\nPosition ${index + 1}:`);
    console.log(`  Title: ${position.title}`);
    console.log(`  Dates: ${position.dates}`);
    console.log(`  Type: ${position.type}`);
    console.log(`  Description: ${'[' + position.description.map(item => `"${item}"`).join(', ') + ']'}`);
    if (position.summary) {
      console.log(`  Summary: ${position.summary}`);
    }
  });
  console.log('\n' + '='.repeat(80));
});

console.log('Data formatted successfully!');
