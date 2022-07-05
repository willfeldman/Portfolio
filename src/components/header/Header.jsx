import './Header.css';

function Header() {
  return (
    <div className='container'>
        <div className='profile'>
            <img src="https://ik.imagekit.io/feldman/profile.jpg/tr:q-50,h-600,w-600" alt="Profile picture"/>
        </div>
        <div className='text'>
            <h1 className='name'>Will Feldman</h1>
            <h1 className='position'>Student at Northeastern</h1>
        </div>
    </div>
  );
}

export default Header;