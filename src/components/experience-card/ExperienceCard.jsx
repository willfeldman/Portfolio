import './ExperienceCard.css';

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
                <p>Lorem ipsum</p>
            </div>
            <div className='dates'>
                <p>Jan 2022 - Present</p>
            </div>
        </div>
    </div>
  );
}

export default ExperienceCard;