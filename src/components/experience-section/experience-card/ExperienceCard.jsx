import './ExperienceCard.scss';

function ExperienceCard() {
  return (
    <div className='card'>
        <div className='header'>
            <div className='position'>
                <h1>Product Manager</h1>
            </div>
            <div className='details'>
                <span className='company'>Blueport</span> <span className='location'>Boston, MA</span>
            </div>
        </div>
        <div className='description'>
            <div className='text'>
                <p>Led a web performance focused 4-person scrum team in daily standups and sprint planning. Regularly met and communicated with several internal and external…</p>
            </div>
            <div className='dates'>
                <p>Jan 2022 - Present</p>
            </div>
        </div>
        <div className='action'>
            <button className='moreButton'>Details</button>
        </div>
    </div>
  );
}

export default ExperienceCard;